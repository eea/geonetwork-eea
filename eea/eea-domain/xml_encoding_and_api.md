# Business domains in the EEA SDI — XML encoding and catalogue update

How the business domain and subdomain of a series should be recorded in its ISO
metadata, and how to write them into the live catalogue
(`https://sdi.eea.europa.eu/catalogue`, GeoNetwork **4.4.9**) with the GeoNetwork API.

This folder is self-contained and can be shipped as a zip: script, data and this
document. The JSON and RDF are generated in the SDI_Metadata_Cleanup repository by
`export_sdi_domains.py` from `changes/01-domains/domains.json` and `series_domains.json`;
edit those, then re-export rather than editing the files here.

| File | What it is |
|---|---|
| `series_domains_sdi.json` | Domain + subdomain of every series in `xml-original/series` (278 active, 1 superseded, 37 obsolete): uuid, title, status, schema, and key / label / concept URI for both levels (only the subdomain is written into the record). Looks only at the original records, not at the curated set. |
| `eea-business-domains.rdf` | The vocabulary as a SKOS thesaurus (11 top concepts: the 9 business domains plus `reference_data` and `non_domain_datasets`; 51 narrower concepts — see §1.3). |
| `sdi_push_domains.py` | Writes the keywords into the catalogue through the GeoNetwork API (§3). Python 3.8+, standard library only. |
| `xml_encoding_and_api.md` | This document. |

---

## 1. Recommended encoding

### 1.1 Register the vocabulary as a GeoNetwork thesaurus

Every EEA vocabulary in the catalogue is a registered thesaurus (`local.theme.eea-mp`,
`external.theme.eea-topics`, `local.theme.eea-categories`, …). The business domains
should be one too:

- **Key:** `external.theme.eea-business-domains` (upload `eea-business-domains.rdf` as
  type `external`, directory `theme`). *External* makes the thesaurus read-only in the
  catalogue admin panel: the vocabulary is not SDI-specific — it is the Lakehouse folder
  structure, maintained in `domains.json` — so it must not be edited in GeoNetwork. A new
  version is uploaded again from this folder.
- **Canonical names and labels:** the concept URIs and `skos:notation` use the canonical
  Lakehouse folder names (e.g. `ecosystem_condition_restoration`); the `prefLabel` is the
  label from the proposal (e.g. *Ecosystem Condition & Restoration*). Labels join terms
  with “&” throughout, at both levels (*Biodiversity & Ecosystems*).
- **Concepts:** each domain is a `skos:Concept` and a top concept of the scheme. Each
  subdomain is a `skos:Concept` with `skos:broader` pointing to its domain. Concepts have
  an English `prefLabel`, a `definition` (from the proposal) and the `notation`.
- **Concept URIs:**
  - domain: `https://sdi.eea.europa.eu/registry/business-domains/<domain>`
  - subdomain: `https://sdi.eea.europa.eu/registry/business-domains/<domain>/<subdomain>`

  These are a proposal (see §5): the URI only has to be stable and unique, but ideally it
  should resolve to the concept later.

Once registered, editors can also pick the keywords in the GeoNetwork editor (limited to
one, see §1.5), and the catalogue can offer the domains as a search facet.

### 1.2 One keyword block, one subdomain per record

Each series gets **one** `mri:descriptiveKeywords` block holding **one** keyword: its
subdomain. The block follows the existing EEA practice (compare the `EEA topics` and
`EEA Management Plan` blocks already in the records):

- **The keyword is a `gcx:Anchor`.** The link points to the concept URI; the text is the
  human label. The canonical folder name stays recoverable from the URI and from the
  thesaurus `notation`.
- **Keyword type `theme`**, as for every other topical vocabulary.
- **The thesaurus citation** carries the title, publication date and GeoNetwork's
  thesaurus identifier `geonetwork.thesaurus.external.theme.eea-business-domains`. GeoNetwork
  uses that identifier to link keywords to the registered thesaurus. It is also how the
  update script recognises the block, so it must not change.
- **Subdomain only.** The domain is not repeated: it is the subdomain's `skos:broader`
  concept, and its folder name is the first path segment of the subdomain URI. With a
  single keyword, the GeoNetwork editor can enforce one subdomain per series (§1.5).
  When GeoNetwork indexes a thesaurus keyword it also indexes the keyword's broader
  concepts (the `th_<thesaurus>_tree` field), so a domain search facet still works.
  Confirm this on the staging catalogue.

ISO 19115-3 (namespace declarations omitted):

```xml
<mri:descriptiveKeywords>
  <mri:MD_Keywords>
    <mri:keyword>
      <gcx:Anchor xlink:href="https://sdi.eea.europa.eu/registry/business-domains/biodiversity_ecosystems/ecosystem_condition_restoration">Ecosystem Condition &amp; Restoration</gcx:Anchor>
    </mri:keyword>
    <mri:type>
      <mri:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
    </mri:type>
    <mri:thesaurusName>
      <cit:CI_Citation>
        <cit:title>
          <gco:CharacterString>EEA business domains and subdomains</gco:CharacterString>
        </cit:title>
        <cit:date>
          <cit:CI_Date>
            <cit:date><gco:Date>2026-10-15</gco:Date></cit:date>
            <cit:dateType>
              <cit:CI_DateTypeCode codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="publication"/>
            </cit:dateType>
          </cit:CI_Date>
        </cit:date>
        <cit:identifier>
          <mcc:MD_Identifier>
            <mcc:code>
              <gcx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.eea-business-domains">geonetwork.thesaurus.external.theme.eea-business-domains</gcx:Anchor>
            </mcc:code>
          </mcc:MD_Identifier>
        </cit:identifier>
      </cit:CI_Citation>
    </mri:thesaurusName>
  </mri:MD_Keywords>
</mri:descriptiveKeywords>
```

**Position:** inside `mri:MD_DataIdentification`, among the other
`mri:descriptiveKeywords`, i.e. before `mri:resourceSpecificUsage`,
`mri:resourceConstraints` and `mri:associatedResource` (the ISO 19115-3 sequence).
GeoNetwork's `gn_add` puts it there automatically.

**Rules:**
- exactly one such block per record, holding exactly one keyword — a series that moves
  gets its block replaced, not a second one;
- the keyword is always a subdomain, never a domain (top concept) alone;
- all series in the current SDI are ISO 19115-3, so no ISO 19139 variant is needed for
  series. Should one be needed, it is the same structure with `gmd:`/`gmx:Anchor` elements.

### 1.3 Reference data and non-domain datasets

Besides the nine business domains, the thesaurus has two **non-business areas**, also as
top concepts. They mirror the Lakehouse level-1 folders of the same name and are encoded
exactly like a business domain (same block, same thesaurus, `notation` = folder name).

| Area | Subdomains | Active series | What goes there |
|---|---|--:|---|
| `reference_data` — Reference Data | `administrative_boundaries` (8), `basemaps` (4), `elevation` (2), `reference_grids` (4) | 18 | Data with **no business subject of its own** that every domain joins against: NUTS/LAU and other statistical units, functional urban areas and degree of urbanisation, basemaps, elevation models, the EEA and EMEP reference grids. |
| `non_domain_datasets` — Non-domain Datasets | `system` (0) | 0 | Records that describe **no environmental data** and exist only to run the platform. In the SDI this is one dataset, the ISO 19139 vector metadata template; no series. |

**Rule:** reference data that clearly belongs to a business subject stays in that
business domain even when other domains use it. Hydrography (EU-Hydro, Ecrins) stays in
`freshwater_water_management`; biogeographical regions stay in
`biodiversity_ecosystems`. `non_domain_datasets` is not a fallback for hard-to-place
data. Such data gets a business home and a `low` confidence flag.

Example keyword for a reference series (only the anchor differs from §1.2):

```xml
<mri:keyword>
  <gcx:Anchor xlink:href="https://sdi.eea.europa.eu/registry/business-domains/reference_data/administrative_boundaries">Administrative Boundaries</gcx:Anchor>
</mri:keyword>
```

### 1.4 Alternatives considered

| Option | Why not |
|---|---|
| Plain `gco:CharacterString` keywords with the folder names (what the curation engine wrote until 2026-10-15) | Not linked to a registered vocabulary, so GeoNetwork cannot validate, translate or facet on them; folder names are not user-facing labels. |
| Two blocks (one for domains, one for subdomains) | Two thesauri to maintain and nothing tying a subdomain to its domain in the record. |
| Domain + subdomain in one block (the first version of this document) | The editor limit (`maxtags`) counts keywords, so with two keywords it cannot stop an editor from adding a second subdomain. The domain is recoverable from the thesaurus hierarchy and the URI. |
| Local thesaurus (`local.theme.…`) | Editable in the admin panel, so the catalogue copy could drift from the Lakehouse folders. |
| `mri:topicCategory` | Fixed ISO code list; cannot carry the EEA structure. |

### 1.5 Limiting the editor to one subdomain (catalogue configuration)

The update script below always leaves exactly one subdomain. To stop editors from adding
a second one by hand, the limit has to be set in the GeoNetwork **editor configuration**.
This is not something the script can do: it is server configuration in the ISO 19115-3
schema plugin (`iso19115-3.2018/layout/config-editor.xml`), changed by the catalogue
administrators. In each editor view that lists thesauri, add the business domains with
`maxtags="1"`:

```xml
<thesaurusList defaultTransformation="to-iso19115-3.2018-keyword-with-anchor">
  <thesaurus key="external.theme.eea-business-domains" maxtags="1"/>
</thesaurusList>
```

`maxtags` is defined in GeoNetwork's `config-editor.xsd` for each `thesaurus` entry.
The anchor transformation writes the keyword as a `gcx:Anchor`, as in §1.2. The keyword
picker still lists the domains (top concepts) as well. Editors should pick a subdomain;
a re-run of the update script corrects a record where they did not.

---

## 2. What the GeoNetwork API offers (4.4.9)

Checked against the GeoNetwork 4.4.9 source (`BatchEditsApi.java`, `KeywordsApi.java`)
and the live catalogue. The catalogue's Swagger page requires a login, so the endpoint
details come from the source.

| Purpose | Call | Who may call it |
|---|---|---|
| Log in, get session + XSRF token | `GET /srv/api/me` with HTTP basic auth; the `XSRF-TOKEN` cookie must then be sent back as the `X-XSRF-TOKEN` header on every write | any user |
| Read a record | `GET /srv/api/records/{uuid}/formatters/xml` | public for published records |
| **Dry run of edits** | `POST /srv/api/records/batchediting/preview?uuids=…&diffType=diff` with body = list of edits; returns the diff, saves nothing | Editor |
| **Apply edits** | `PUT /srv/api/records/batchediting?uuids=…&updateDateStamp=false` with the same body; returns a JSON processing report | Editor, and allowed to edit each record |
| Register the thesaurus | `POST /srv/api/registries/vocabularies` (multipart: `file`, `type=external`, `dir=theme`) | Reviewer |

**How batch editing works.** The body is a JSON array of `{xpath, value, condition}`:
- **`xpath`** selects the target: the parent element for `gn_add`, the element itself for `gn_replace` and `gn_delete`.
- **`value`** wraps the change: `<gn_add>…</gn_add>`, `<gn_replace>…</gn_replace>` or `<gn_delete></gn_delete>`. `gn_add` inserts the XML fragment at the position the schema requires.
- **`condition`** is an optional XPath test evaluated on the record. The edit runs only if it is true. Because the edits apply in order, a later condition sees the result of earlier edits.

**What else the server does:**
- Every listed record gets the same edits, so the script sends one request per subdomain.
- After editing, GeoNetwork runs the schema's `update-fixed-info.xsl` and reindexes the record.
- The change date is only updated with `updateDateStamp=true`.
- A record the user cannot edit is skipped and counted in the report as not editable.

**Limits and risks:**
- Edits do not pass through validation (`validate=false` in the source). A wrong XPath
  can damage records, so always preview first.
- A catalogue setting can restrict batch editing to a higher profile than Editor.
- The writing user needs edit rights on every target record, normally through its group.
- I could not test a write against the live catalogue (no credentials). The client follows
  the documented login pattern. Anonymous calls did not receive an `XSRF-TOKEN` cookie,
  so confirm with a real account that the token is issued after login (the script stops
  with a clear message if it is not).

---

## 3. The update script — `sdi_push_domains.py`

Run it from this folder; it reads `series_domains_sdi.json` and `eea-business-domains.rdf`
next to itself and writes plan/preview files to `./output/`.

Dependency-free Python (standard library only). Credentials come from the environment:
`GN_USER`, `GN_PASSWORD`.

For each series it sends two guarded edits, which make re-runs safe:

1. **delete** the business-domain blocks if there is more than one, or if the block is not
   exactly the right subdomain (the series was moved, or an editor added a keyword);
2. **add** the block if the record has none.

A record that already has the right block is not touched. Tested offline on all 278
active series: the first run adds one block, a second run changes nothing, moving a
series replaces its block, and a duplicate block or an extra keyword is cleaned up.

```bash
python3 sdi_push_domains.py --plan                  # offline: write the 43 requests to ./output/
export GN_USER=… GN_PASSWORD=…
python3 sdi_push_domains.py --upload-thesaurus      # once, Reviewer (external thesaurus)
python3 sdi_push_domains.py --preview --uuid <one-uuid>     # server-side diff, nothing saved
python3 sdi_push_domains.py --apply   --uuid <one-uuid>     # one record first
python3 sdi_push_domains.py --preview               # all active series
python3 sdi_push_domains.py --apply                 # all active series
python3 sdi_push_domains.py --apply --status superseded,obsolete   # optional
```

Options:
- `--catalogue` points the script at a test instance;
- `--limit N` and `--uuid` (repeatable) narrow the run;
- `--update-datestamp` also bumps the record's metadata date.

## 4. Suggested rollout

1. Agree the concept-URI base and the labels (§5); if they change, re-run
   `export_sdi_domains.py` in the repository and ship the folder again.
2. On a test or staging GeoNetwork with a copy of the catalogue:
   - upload the thesaurus and set `maxtags="1"` in the editor configuration (§1.5);
   - preview and apply on a few series;
   - check them in the editor, in search, and in the XML;
   - check that the domain facet works from the subdomain keyword alone (§1.2).
3. On production:
   - upload the thesaurus and set the editor limit;
   - `--preview` everything and review the diffs;
   - `--apply` the active series;
   - spot-check them, then decide about superseded and obsolete series.
4. The curated build (`build_curated_xml.py`, class `domains`) writes this same block, so
   `xml-curated/` and the catalogue carry identical keywords.

## 5. Open points

- **Concept URI base.** `https://sdi.eea.europa.eu/registry/business-domains/…` is a
  proposal. It does not resolve yet. Changing it later means re-running the export and the
  update script (the update replaces the block, so this is safe).
- **New upstream series.** The latest re-read of the catalogue found 7 series that are not
  in `xml-original/`. They have no placement until the refresh is promoted and they are
  added to `series_domains.json`.
- **Low-confidence placements** are flagged with `"confidence": "low"` in the JSON:
  the population series in `reference_data/reference_grids`, the EGMS ground-motion
  series, support to developing countries (`mitigation_finance`), the Copernicus HR Water,
  Snow and Ice layers (`snow_ice`) and Share of Built-up (`urban_settlement_structure`).
- **New Lakehouse folders.** `air_quality` (replacing `air_pollution`),
  `air_pollutant_emissions`, `mitigation_finance`, `snow_ice` and
  `urban_settlement_structure` were agreed on 2026-10-15 and are not yet created in the
  Lakehouse. The thesaurus can be registered before that; the keys are final.
