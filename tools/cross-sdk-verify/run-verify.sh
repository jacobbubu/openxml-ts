#!/usr/bin/env bash
# Cross-SDK semantic equivalence verification runner.
#
# Usage: ./run-verify.sh [example-name...]
#   No args → run all batch-1 examples
#   With args → run only the named examples
#
# Exits 0 if all covered examples are semantically equivalent.
# Exits 1 if any semantic divergence is found.
#
# How to add more examples (batches 2..N):
#   1. Add a TS example to examples/<name>.ts (already exists for all 60).
#   2. Add a C# replica to tools/cross-sdk-verify/replicas/<Name>.cs.
#   3. Add the case to Program.cs generate switch.
#   4. Add the name to EXAMPLES array below.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TOOL_DIR="$REPO_ROOT/tools/cross-sdk-verify"
TMP_DIR="${TMPDIR:-/tmp}/cross-sdk-verify-$$"
mkdir -p "$TMP_DIR"

DOTNET="$HOME/.dotnet/dotnet"
export PATH="$HOME/.dotnet:$PATH"

# Wrapper: run the CrossSdkVerify DLL via dotnet
csverify() {
  local DLL="$TOOL_DIR/bin/Release/net8.0/CrossSdkVerify.dll"
  "$DOTNET" "$DLL" "$@"
}

# --- Batch 1 examples (13 total) ---
ALL_EXAMPLES=(
  word-create
  word-run-formatting
  word-paragraph-format
  word-add-table
  excel-create
  excel-cell-value
  excel-cell-formula
  excel-freeze-panes
  excel-merge-cells
  ppt-create
  ppt-multi-slide
  ppt-add-table
  ppt-speaker-notes
)

# If specific examples passed, use those; otherwise run all
if [[ $# -gt 0 ]]; then
  EXAMPLES=("$@")
else
  EXAMPLES=("${ALL_EXAMPLES[@]}")
fi

# --- Build the C# tool ---
echo "=== Building C# digest extractor & replicas ==="
cd "$TOOL_DIR"
"$DOTNET" build -c Release --nologo

echo ""
echo "=== Running cross-SDK verification ==="
echo ""

PASS=0
FAIL=0
DIVERGE=()

for NAME in "${EXAMPLES[@]}"; do
  # Determine file extension
  case "$NAME" in
    word-*) EXT="docx" ;;
    excel-*) EXT="xlsx" ;;
    ppt-*) EXT="pptx" ;;
    *) EXT="bin" ;;
  esac

  FILE_TS="$TMP_DIR/${NAME}_ts.$EXT"
  FILE_NET="$TMP_DIR/${NAME}_net.$EXT"
  DIGEST_TS="$TMP_DIR/${NAME}_ts.json"
  DIGEST_NET="$TMP_DIR/${NAME}_net.json"

  echo "--- $NAME ---"

  # 1. Generate TS output
  TS_OK=true
  if ! bun run "$REPO_ROOT/examples/${NAME}.ts" "$FILE_TS" > "$TMP_DIR/${NAME}_ts.log" 2>&1; then
    echo "  [ERROR] TS example failed:"
    cat "$TMP_DIR/${NAME}_ts.log"
    TS_OK=false
  fi

  # 2. Generate .NET output
  NET_OK=true
  if ! csverify generate "$NAME" "$FILE_NET" > "$TMP_DIR/${NAME}_net.log" 2>&1; then
    echo "  [ERROR] .NET replica failed:"
    cat "$TMP_DIR/${NAME}_net.log"
    NET_OK=false
  fi

  if [[ "$TS_OK" == "false" || "$NET_OK" == "false" ]]; then
    echo "  [SKIP] Skipping comparison due to generation error"
    FAIL=$((FAIL + 1))
    DIVERGE+=("$NAME (generation error)")
    echo ""
    continue
  fi

  # 3. Extract digests
  if ! csverify extract "$FILE_TS" > "$DIGEST_TS" 2>&1; then
    echo "  [ERROR] Failed to extract TS digest"
    FAIL=$((FAIL + 1))
    DIVERGE+=("$NAME (TS extract error)")
    echo ""
    continue
  fi

  if ! csverify extract "$FILE_NET" > "$DIGEST_NET" 2>&1; then
    echo "  [ERROR] Failed to extract .NET digest"
    FAIL=$((FAIL + 1))
    DIVERGE+=("$NAME (NET extract error)")
    echo ""
    continue
  fi

  # 4. Compare digests
  if diff -q "$DIGEST_TS" "$DIGEST_NET" > /dev/null 2>&1; then
    echo "  [PASS] Semantically equivalent"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] Semantic divergence detected!"
    echo ""
    echo "  === TS digest ==="
    cat "$DIGEST_TS"
    echo ""
    echo "  === NET digest ==="
    cat "$DIGEST_NET"
    echo ""
    echo "  === diff (TS vs NET) ==="
    diff "$DIGEST_TS" "$DIGEST_NET" || true
    FAIL=$((FAIL + 1))
    DIVERGE+=("$NAME")
  fi
  echo ""
done

echo "=================================="
echo "Results: $PASS passed, $FAIL failed"
echo "=================================="

if [[ ${#DIVERGE[@]} -gt 0 ]]; then
  echo ""
  echo "Divergent examples:"
  for d in "${DIVERGE[@]}"; do
    echo "  - $d"
  done
  echo ""
  echo "Files saved in: $TMP_DIR"
  exit 1
fi

echo "All ${PASS} examples semantically equivalent."
echo "Files saved in: $TMP_DIR"
exit 0
