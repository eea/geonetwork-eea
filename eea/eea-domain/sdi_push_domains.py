#!/usr/bin/env python3
"""Write the business-domain keywords into the live EEA SDI catalogue (GeoNetwork 4.4).

Reads ``series_domains_sdi.json`` (next to this script; produced by export_sdi_domains.py) and
uses the GeoNetwork batch-editing API to give every listed series exactly one
"EEA business domains and subdomains" keyword block holding exactly one keyword, its
subdomain (see xml_encoding_and_api.md in this folder for the encoding and the API calls). Self-contained: this folder (script,
JSON, RDF, documentation) can be shipped on its own; Python 3.8+, no extra packages.

Records are grouped per subdomain, so one request updates all series of that subdomain.
Each request carries two XPath edits, both guarded by a condition so re-running is safe:

  1. delete every domain block if the record has more than one, or if its block is not
     exactly the right subdomain (the series moved, or an editor added a keyword);
  2. add the block if the record has none.

A record that already has the right block is reported as unchanged and not touched.

Modes (pick one; nothing is written unless --apply is given):

    python3 sdi_push_domains.py --plan                 # offline: print the requests, no network
    python3 sdi_push_domains.py --preview              # server-side dry run, saves diffs
    python3 sdi_push_domains.py --apply                # write to the catalogue
    python3 sdi_push_domains.py --upload-thesaurus     # register eea-business-domains.rdf
                                                       # as an external (read-only) thesaurus

Filters: --uuid U (repeatable), --status active,superseded,obsolete (default: active),
--limit N. Credentials come from the GN_USER / GN_PASSWORD environment variables; batch
editing needs an Editor who can edit the records, the thesaurus upload needs a Reviewer.
Dependency-free (standard library only), like eea_datahub_xml.py.
"""
import argparse
import base64
import http.cookiejar
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
import uuid as uuidlib
from collections import defaultdict
from xml.sax.saxutils import escape, quoteattr

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_JSON = os.path.join(HERE, "series_domains_sdi.json")
DEFAULT_RDF = os.path.join(HERE, "eea-business-domains.rdf")
CL = "http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml"
NSDECL = ('xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0" '
          'xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0" '
          'xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0" '
          'xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0" '
          'xmlns:gcx="http://standards.iso.org/iso/19115/-3/gcx/1.0" '
          'xmlns:xlink="http://www.w3.org/1999/xlink"')
BATCH = 50   # uuids per request


# --- the XML we write ------------------------------------------------------------
def keyword_block(th, entry):
    """The mri:descriptiveKeywords block for one series (ISO 19115-3): one keyword, the
    subdomain. The domain is its skos:broader concept in the thesaurus."""
    sd = entry["subdomain"]
    return (
        f'<mri:descriptiveKeywords {NSDECL}><mri:MD_Keywords>'
        f'<mri:keyword><gcx:Anchor xlink:href={quoteattr(sd["uri"])}>{escape(sd["label"])}'
        '</gcx:Anchor></mri:keyword>'
        f'<mri:type><mri:MD_KeywordTypeCode codeList="{CL}#MD_KeywordTypeCode" '
        'codeListValue="theme"/></mri:type>'
        '<mri:thesaurusName><cit:CI_Citation>'
        f'<cit:title><gco:CharacterString>{escape(th["title"])}</gco:CharacterString></cit:title>'
        f'<cit:date><cit:CI_Date><cit:date><gco:Date>{th["date"]}</gco:Date></cit:date>'
        f'<cit:dateType><cit:CI_DateTypeCode codeList="{CL}#CI_DateTypeCode" '
        'codeListValue="publication"/></cit:dateType></cit:CI_Date></cit:date>'
        '<cit:identifier><mcc:MD_Identifier><mcc:code>'
        f'<gcx:Anchor xlink:href={quoteattr(th["anchor_href"])}>geonetwork.thesaurus.{th["key"]}'
        '</gcx:Anchor></mcc:code></mcc:MD_Identifier></cit:identifier>'
        '</cit:CI_Citation></mri:thesaurusName>'
        '</mri:MD_Keywords></mri:descriptiveKeywords>')


def edits_for(th, entry):
    """The two guarded batch edits that leave exactly one block with exactly one keyword,
    the series' subdomain."""
    ours = (".//mri:MD_DataIdentification/mri:descriptiveKeywords[mri:MD_Keywords/"
            "mri:thesaurusName/cit:CI_Citation/cit:identifier/mcc:MD_Identifier/mcc:code/"
            f"gcx:Anchor = 'geonetwork.thesaurus.{th['key']}']")
    right = (f"{ours}[count(mri:MD_Keywords/mri:keyword) = 1 and mri:MD_Keywords/mri:keyword/"
             f"gcx:Anchor/@xlink:href = '{entry['subdomain']['uri']}']")
    return [
        {"xpath": ours, "value": "<gn_delete></gn_delete>",
         "condition": f"count({ours}) > 1 or count({ours}) > count({right})"},
        {"xpath": ".//mri:MD_DataIdentification",
         "value": f"<gn_add>{keyword_block(th, entry)}</gn_add>",
         "condition": f"count({ours}) = 0"},
    ]


# --- HTTP ------------------------------------------------------------------------
class Catalogue:
    """Minimal GeoNetwork client: basic auth + session cookie + XSRF token."""

    def __init__(self, base, user, password):
        self.base = base.rstrip("/")
        self.jar = http.cookiejar.CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))
        self.auth = "Basic " + base64.b64encode(f"{user}:{password}".encode()).decode()
        self.xsrf = None

    def call(self, method, path, params=None, body=None, ctype=None, accept="application/json"):
        url = f"{self.base}/srv/api/{path}"
        if params:
            url += "?" + urllib.parse.urlencode(params, doseq=True)
        req = urllib.request.Request(url, data=body, method=method)
        req.add_header("Authorization", self.auth)
        req.add_header("Accept", accept)
        if ctype:
            req.add_header("Content-Type", ctype)
        if self.xsrf:
            req.add_header("X-XSRF-TOKEN", self.xsrf)
        try:
            with self.opener.open(req, timeout=300) as r:
                return r.status, r.read()
        finally:
            for c in self.jar:
                if c.name == "XSRF-TOKEN":
                    self.xsrf = c.value

    def login(self):
        status, raw = self.call("GET", "me")
        if status != 200 or not raw:
            sys.exit("Login failed: check GN_USER / GN_PASSWORD (GET /srv/api/me returned "
                     f"{status} without a user).")
        me = json.loads(raw)
        if not self.xsrf:          # some set-ups only issue the token on a later request
            self.call("GET", "site")
        # if not self.xsrf:
        #     sys.exit("Logged in, but the catalogue issued no XSRF-TOKEN cookie; write "
        #              "requests would be rejected (403).")
        return me


# --- modes -----------------------------------------------------------------------
def select(doc, args):
    statuses = set(args.status.split(","))
    out = [e for e in doc["series"] if e["status"] in statuses
           and (not args.uuid or e["uuid"] in args.uuid)]
    skipped = [e for e in out if e["schema"] != "iso19115-3"]
    if skipped:
        sys.stderr.write(f"  ! skipping {len(skipped)} non-ISO-19115-3 records\n")
    out = [e for e in out if e["schema"] == "iso19115-3"]
    return out[:args.limit] if args.limit else out


def groups(entries):
    g = defaultdict(list)
    for e in entries:
        g[e["subdomain"]["uri"]].append(e)
    for key in sorted(g):
        members = g[key]
        for i in range(0, len(members), BATCH):
            yield members[i:i + BATCH]


def run(args, doc, entries):
    th = doc["thesaurus"]
    if args.plan:
        os.makedirs(args.out, exist_ok=True)
        for n, chunk in enumerate(groups(entries), 1):
            path = os.path.join(args.out, f"request_{n:02d}_{chunk[0]['subdomain']['key']}.json")
            json.dump({"method": "PUT", "path": "/srv/api/records/batchediting",
                       "params": {"uuids": [e["uuid"] for e in chunk],
                                  "updateDateStamp": str(args.update_datestamp).lower()},
                       "body": edits_for(th, chunk[0])}, open(path, "w"), indent=1)
        print(f"plan: {len(entries)} series in {n} requests -> {args.out}/")
        return 0

    user, password = os.environ.get("GN_USER"), os.environ.get("GN_PASSWORD")
    if not (user and password):
        sys.exit("Set GN_USER and GN_PASSWORD.")
    cat = Catalogue(args.catalogue or doc["catalogue"], user, password)
    me = cat.login()
    print(f"logged in as {me.get('username')} ({me.get('profile')}) on {cat.base}")

    if args.upload_thesaurus:
        boundary = uuidlib.uuid4().hex
        fname = os.path.basename(args.rdf)
        parts = []
        # external: read-only in the catalogue admin panel, edited only via this RDF
        for name, value in (("type", "external"), ("dir", "theme")):
            parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"'
                         f'\r\n\r\n{value}\r\n'.encode())
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; '
                     f'filename="{fname}"\r\nContent-Type: application/rdf+xml\r\n\r\n'.encode()
                     + open(args.rdf, "rb").read() + b"\r\n")
        parts.append(f"--{boundary}--\r\n".encode())
        status, raw = cat.call("POST", "registries/vocabularies", body=b"".join(parts),
                               ctype=f"multipart/form-data; boundary={boundary}")
        print(f"thesaurus upload: HTTP {status} {raw[:300].decode(errors='replace')}")
        return 0

    totals = defaultdict(int)
    os.makedirs(args.out, exist_ok=True)
    for chunk in groups(entries):
        params = {"uuids": [e["uuid"] for e in chunk]}
        body = json.dumps(edits_for(th, chunk[0])).encode()
        label = f"{chunk[0]['domain']['key']}/{chunk[0]['subdomain']['key']} ({len(chunk)})"
        try:
            if args.preview:
                params["diffType"] = "diff"
                status, raw = cat.call("POST", "records/batchediting/preview", params, body,
                                       "application/json", accept="application/xml")
                path = os.path.join(args.out, f"preview_{chunk[0]['subdomain']['key']}.xml")
                open(path, "ab").write(raw)
                print(f"  preview {label}: HTTP {status} -> {os.path.relpath(path)}")
            else:
                params["updateDateStamp"] = str(args.update_datestamp).lower()
                status, raw = cat.call("PUT", "records/batchediting", params, body,
                                       "application/json")
                rep = json.loads(raw)
                nums = {k: v for k, v in rep.items() if k.startswith("numberOf") and v}
                for k, v in nums.items():
                    totals[k] += v
                print(f"  apply {label}: HTTP {status} {nums}")
                if rep.get("metadataErrors"):
                    print(f"    errors: {json.dumps(rep['metadataErrors'])[:500]}")
        except urllib.error.HTTPError as e:
            totals["failedRequests"] += 1
            print(f"  ! {label}: HTTP {e.code} {e.read()[:300].decode(errors='replace')}")
    if totals:
        print("totals:", dict(totals))
    return 1 if totals.get("failedRequests") else 0


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    mode = p.add_mutually_exclusive_group(required=True)
    mode.add_argument("--plan", action="store_true", help="write the requests to --out; no network")
    mode.add_argument("--preview", action="store_true", help="server-side dry run, diffs to --out")
    mode.add_argument("--apply", action="store_true", help="update the catalogue")
    mode.add_argument("--upload-thesaurus", action="store_true",
                      help="upload the SKOS vocabulary (--rdf) as an external thesaurus")
    p.add_argument("--json", default=DEFAULT_JSON)
    p.add_argument("--rdf", default=DEFAULT_RDF)
    p.add_argument("--catalogue", help="override the catalogue URL in the JSON (e.g. a test instance)")
    p.add_argument("--status", default="active", help="comma list of active,superseded,obsolete")
    p.add_argument("--uuid", action="append", help="only this series (repeatable)")
    p.add_argument("--limit", type=int, default=0, help="only the first N series")
    p.add_argument("--update-datestamp", action="store_true",
                   help="also bump the record's metadata date stamp")
    p.add_argument("--out", default=os.path.join(HERE, "output"),
                   help="where --plan / --preview write their files (default: ./output)")
    args = p.parse_args(argv)
    doc = json.load(open(args.json))
    entries = select(doc, args)
    if not entries and not args.upload_thesaurus:
        sys.exit("No series selected.")
    return run(args, doc, entries)


if __name__ == "__main__":
    sys.exit(main())
