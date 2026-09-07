#!/bin/bash
#
# Downloads a pg_dump of a GeoNetwork postgres database running in a
# Kubernetes pod, using kubectl exec (no port-forward, no DB credentials
# needed on this end).
#
# Everything about where it connects is overridable via env vars so this
# isn't tied to any one cluster/namespace/pod layout - see the Environment
# section in --help. Defaults assume the sdi-catalogue chart's naming
# (StatefulSet "postgres-geonetwork", database "geonetwork5"), but none
# of that is hardcoded as required.
#
# The database's owning role is looked up at runtime rather than trusted
# from the pod's own POSTGRES_USER/POSTGRES_DB env vars: those reflect
# whatever database the container originally bootstrapped with, which on
# an instance hosting multiple databases (e.g. after a manual migration)
# is not necessarily the one you actually want to dump. pg_hba.conf's
# default "local all all trust" (the official postgres image's own
# out-of-the-box behaviour) means no password is needed for any of this
# when connecting from inside the pod.
#
# A dump can take longer than a single kubectl exec connection survives
# in practice - on at least one network path, streaming stalled out after
# roughly a minute regardless of whether the payload was raw binary or
# base64, so it isn't about the bytes, the connection just doesn't
# survive that long. So pg_dump runs detached inside the pod, writing to
# a directory on its persistent storage (default matches this project's
# existing manual-backup convention); this script only polls for
# completion and then streams the finished file back in small chunks,
# each its own short-lived kubectl exec call so no single connection
# needs to survive the whole transfer. The dump is left in that directory
# afterwards - it isn't scratch data, it can accumulate there like any
# other backup.
#
# Usage: ./downloadDbDump.sh <namespace> [output-file]
#
# The resulting custom-format dump can be dropped into
# geonetwork5-eea/docker/docker-entrypoint-initdb.d/dump to seed a local
# dev environment (see that repo's docker/README.md).

set -euo pipefail

usage() {
  cat <<EOF
Usage: $0 <namespace> [output-file]

Downloads a pg_dump of a GeoNetwork postgres database from a Kubernetes
pod, running the dump detached inside the pod so it isn't tied to the
lifetime of any one kubectl connection.

Arguments:
  namespace               Kubernetes namespace to dump from (required).
  output-file             Where to write the dump locally (default:
                          <db-name>-<namespace>-<timestamp>.backup).

Environment (all optional):
  KUBE_CONTEXT            kubectl context to use (default: current context).
  DB_NAME                 Database to dump (default: geonetwork5).
  POSTGRES_POD            Pod running postgres (default: postgres-geonetwork-0).
  POSTGRES_CONTAINER      Container within that pod (default: postgres-geonetwork).
  BACKUP_DIR              Directory on the pod's persistent storage to
                          write the dump to (default:
                          /var/lib/postgresql/data/backups).
  CHUNK_MB                Size in MB of each download chunk (default: 20).

Options:
  -h, --help              Show this help and exit.

Notes:
  pg_dump runs detached inside the pod (this connection doesn't survive
  a dump that long) and its output is left behind in BACKUP_DIR on the
  pod - it is not cleaned up after downloading.
EOF
}

if [[ $# -eq 0 || "$1" == "-h" || "$1" == "--help" ]]; then
  usage
  [[ $# -eq 0 ]] && exit 1
  exit 0
fi

NAMESPACE="$1"
if [[ -z "$NAMESPACE" || "$NAMESPACE" == -* ]]; then
  usage
  exit 1
fi

CONTEXT="${KUBE_CONTEXT:-$(kubectl config current-context)}"
POD="${POSTGRES_POD:-postgres-geonetwork-0}"
CONTAINER="${POSTGRES_CONTAINER:-postgres-geonetwork}"
DB_NAME="${DB_NAME:-geonetwork5}"
REMOTE_BACKUP_DIR="${BACKUP_DIR:-/var/lib/postgresql/data/backups}"
CHUNK_MB="${CHUNK_MB:-20}"
REMOTE_CONTROL_DIR="/tmp/downloadDbDump.$$"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT="${2:-${DB_NAME}-${NAMESPACE}-${TIMESTAMP}.backup}"
REMOTE_DUMP="${REMOTE_BACKUP_DIR}/${DB_NAME}.${TIMESTAMP}.backup"
REMOTE_DONE="${REMOTE_CONTROL_DIR}/DONE"
REMOTE_EXIT="${REMOTE_CONTROL_DIR}/exit_code"
REMOTE_LOG="${REMOTE_CONTROL_DIR}/pg_dump.log"

kexec() {
  kubectl --context "$CONTEXT" -n "$NAMESPACE" exec "$POD" -c "$CONTAINER" -- "$@"
}

# Retries a handful of times on transient connection failures. Meant for
# short commands whose own exit code reflects a real error, not "not
# ready yet" - callers that need to distinguish those encode state in
# stdout instead (see poll_status below).
kexec_retry() {
  local tries=5 i
  for ((i = 1; i <= tries; i++)); do
    if kexec "$@"; then
      return 0
    fi
    echo "  (transient connection issue, retry $i/$tries)" >&2
    sleep 3
  done
  return 1
}

human_size() {
  awk -v b="$1" 'BEGIN{
    split("B KB MB GB TB", u, " "); i = 1
    while (b >= 1024 && i < 5) { b /= 1024; i++ }
    printf "%.1f%s", b, u[i]
  }'
}

human_time() {
  local s=$1
  printf '%02d:%02d:%02d' $((s / 3600)) $(((s % 3600) / 60)) $((s % 60))
}

# md5sum is GNU/Linux; macOS ships md5 instead (-q for just the hash).
local_md5() {
  if command -v md5sum >/dev/null 2>&1; then
    md5sum "$1" | awk '{print $1}'
  else
    md5 -q "$1"
  fi
}

# Prints one progress line (no trailing newline) to stderr: percentage
# against an estimated total, running size, elapsed time, and a rough
# ETA extrapolated from the current average rate. The estimate is only
# ever a guide - pg_dump's actual output size doesn't equal DB size, and
# is unknown until the dump finishes.
print_progress() {
  local current=$1 total=$2 elapsed=$3 pct eta
  pct=$(awk -v c="$current" -v t="$total" 'BEGIN{
    if (t <= 0) { print 0; exit }
    p = c / t * 100; if (p > 99) p = 99; if (p < 0) p = 0
    printf "%.0f", p
  }')
  if [[ "$current" -gt 1048576 && "$elapsed" -gt 2 ]]; then
    eta=$(awk -v c="$current" -v t="$total" -v e="$elapsed" 'BEGIN{
      rate = c / e; if (rate <= 0) { print "?"; exit }
      remain = t - c; if (remain < 0) remain = 0
      printf "%d", remain / rate
    }')
  else
    eta="?"
  fi
  printf '\r  %3s%%  %s / ~%s   elapsed %s   ETA ~%s   ' \
    "$pct" "$(human_size "$current")" "$(human_size "$total")" \
    "$(human_time "$elapsed")" "$([[ "$eta" == "?" ]] && echo '?' || human_time "$eta")" >&2
}

cleanup_remote_control() {
  kexec sh -c "rm -rf '$REMOTE_CONTROL_DIR'" >/dev/null 2>&1 || true
}
trap cleanup_remote_control EXIT

echo "Looking up the $DB_NAME database owner in $POD (namespace $NAMESPACE, context $CONTEXT)..." >&2
BOOTSTRAP_USER=$(kexec_retry printenv POSTGRES_USER)
DB_USER=$(kexec_retry psql -U "$BOOTSTRAP_USER" -d postgres -tAc \
  "select pg_get_userbyid(datdba) from pg_database where datname = '${DB_NAME}';")

if [[ -z "$DB_USER" ]]; then
  echo "Could not find a database named '$DB_NAME' in namespace $NAMESPACE." >&2
  exit 1
fi

DB_SIZE_BYTES=$(kexec_retry psql -U "$DB_USER" -d "$DB_NAME" -tAc \
  "select pg_database_size('${DB_NAME}');" | tr -d '[:space:]')
[[ "$DB_SIZE_BYTES" =~ ^[0-9]+$ ]] || DB_SIZE_BYTES=0

echo "Starting pg_dump of '$DB_NAME' (user '$DB_USER', ~$(human_size "$DB_SIZE_BYTES") on disk) as $REMOTE_DUMP..." >&2

# Build the remote runner script client-side (so $DB_USER etc. are
# substituted here) and ship it over stdin - kubectl exec with -i is
# itself a short-lived connection, this just writes a small text file.
read -r -d '' REMOTE_SCRIPT <<EOF || true
#!/bin/sh
mkdir -p "$REMOTE_CONTROL_DIR" "$REMOTE_BACKUP_DIR"
pg_dump -U "$DB_USER" -d "$DB_NAME" --no-owner -Fc -f "$REMOTE_DUMP"
echo \$? > "$REMOTE_EXIT"
touch "$REMOTE_DONE"
EOF

printf '%s\n' "$REMOTE_SCRIPT" | kubectl --context "$CONTEXT" -n "$NAMESPACE" exec -i "$POD" -c "$CONTAINER" -- \
  sh -c "mkdir -p '$REMOTE_CONTROL_DIR' && cat > '$REMOTE_CONTROL_DIR/run.sh' && chmod +x '$REMOTE_CONTROL_DIR/run.sh'"

# Detached: redirecting all three FDs away from the exec pipes lets this
# call return as soon as the shell backgrounds the job, instead of
# waiting on it - which is the whole point, since it can run for
# longer than this connection tolerates.
kexec_retry sh -c "nohup '$REMOTE_CONTROL_DIR/run.sh' >'$REMOTE_LOG' 2>&1 </dev/null &"

poll_status() {
  local tries=5 i out
  for ((i = 1; i <= tries; i++)); do
    if out=$(kexec sh -c \
      "if [ -f '$REMOTE_DONE' ]; then echo DONE; else echo RUNNING; fi; stat -c%s '$REMOTE_DUMP' 2>/dev/null || echo 0" 2>/dev/null); then
      printf '%s' "$out"
      return 0
    fi
    sleep 3
  done
  return 1
}

START=$(date +%s)
while true; do
  if ! STATUS_OUT=$(poll_status); then
    echo "  (transient connection issue while polling, retrying...)" >&2
    sleep 5
    continue
  fi
  STATE=$(printf '%s\n' "$STATUS_OUT" | sed -n '1p')
  SIZE_NOW=$(printf '%s\n' "$STATUS_OUT" | sed -n '2p')
  [[ "$SIZE_NOW" =~ ^[0-9]+$ ]] || SIZE_NOW=0
  ELAPSED=$(($(date +%s) - START))
  print_progress "$SIZE_NOW" "$DB_SIZE_BYTES" "$ELAPSED"
  [[ "$STATE" == "DONE" ]] && break
  sleep 5
done
echo "" >&2

EXIT_CODE=$(kexec_retry sh -c "cat '$REMOTE_EXIT' 2>/dev/null || echo 1")
if [[ "$EXIT_CODE" != "0" ]]; then
  echo "pg_dump failed inside the pod (exit $EXIT_CODE). Log:" >&2
  kexec_retry sh -c "cat '$REMOTE_LOG'" >&2 || true
  exit 1
fi

FINAL_SIZE=$(kexec_retry stat -c%s "$REMOTE_DUMP")
echo "Dump complete: $(human_size "$FINAL_SIZE") at $REMOTE_DUMP (kept there). Downloading..." >&2

CHUNK_BYTES=$((CHUNK_MB * 1024 * 1024))
TOTAL_CHUNKS=$(((FINAL_SIZE + CHUNK_BYTES - 1) / CHUNK_BYTES))
[[ $TOTAL_CHUNKS -lt 1 ]] && TOTAL_CHUNKS=1

CHUNK_TMP=$(mktemp)
trap 'rm -f "$CHUNK_TMP"; cleanup_remote_control' EXIT
: >"$OUTPUT"

DL_START=$(date +%s)
for ((i = 0; i < TOTAL_CHUNKS; i++)); do
  fetched=0
  for attempt in 1 2 3 4 5; do
    : >"$CHUNK_TMP"
    if kubectl --context "$CONTEXT" -n "$NAMESPACE" exec "$POD" -c "$CONTAINER" -- \
      sh -c "dd if='$REMOTE_DUMP' bs=${CHUNK_MB}M skip=$i count=1 2>/dev/null | base64 -w0" 2>/dev/null \
      | base64 -d >"$CHUNK_TMP"; then
      cat "$CHUNK_TMP" >>"$OUTPUT"
      fetched=1
      break
    fi
    echo "  (chunk $((i + 1))/$TOTAL_CHUNKS failed, retry $attempt/5)" >&2
    sleep 3
  done
  if [[ $fetched -ne 1 ]]; then
    echo "Failed to download chunk $((i + 1))/$TOTAL_CHUNKS after retries. The full dump is still at $REMOTE_DUMP on the pod." >&2
    exit 1
  fi
  DOWNLOADED=$(((i + 1) * CHUNK_BYTES))
  [[ $DOWNLOADED -gt $FINAL_SIZE ]] && DOWNLOADED=$FINAL_SIZE
  ELAPSED=$(($(date +%s) - DL_START))
  print_progress "$DOWNLOADED" "$FINAL_SIZE" "$ELAPSED"
done
echo "" >&2

echo "Verifying integrity (md5)..." >&2
REMOTE_MD5_LINE=$(kexec_retry sh -c "md5sum '$REMOTE_DUMP'") || {
  echo "Could not compute remote md5 after retries; downloaded file left unverified." >&2
  exit 1
}
REMOTE_MD5=$(printf '%s\n' "$REMOTE_MD5_LINE" | awk '{print $1}')
LOCAL_MD5=$(local_md5 "$OUTPUT")

if [[ "$REMOTE_MD5" != "$LOCAL_MD5" ]]; then
  echo "MD5 MISMATCH: remote=$REMOTE_MD5 local=$LOCAL_MD5. $OUTPUT is corrupt, do not use it. The pod's copy at $REMOTE_DUMP is still intact." >&2
  exit 1
fi

echo "MD5 verified: $LOCAL_MD5" >&2
echo "Done: $OUTPUT ($(human_size "$(wc -c <"$OUTPUT")"))" >&2
