#!/usr/bin/env bash
# Cross-SDK semantic equivalence verification runner.
#
# Usage: ./run-verify.sh [example-name...]
#   No args → run all examples (60 total as of batch 4)
#   With args → run only the named examples
#
# Exits 0 if all covered examples are semantically equivalent.
# Exits 1 if any semantic divergence is found.
#
# Comparison modes:
#   digest   — default; generate files → extract semantic digest → diff JSON
#   core     — set-core-properties; generate 3 files (prefix) → extract core-props digest per file
#   stdout   — read-only/tutorial examples; run TS (capture stdout) + run C# replica (capture stdout)
#              normalize both → diff

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

# Normalize stdout for comparison:
#   - Strip trailing whitespace on each line
#   - Normalize the space after full-width colon (Chinese ：) before a value
#     Bun adds a space: "名字： [" — C# omits it: "名字：[" → unify to no-space
#   - Normalize "},   {" → "}, {" (whitespace in multi-line GroupBy formatting)
#   - Normalize CRLF → LF
normalize_stdout() {
  sed 's/[[:space:]]*$//' \
    | sed 's/：[[:space:]]*/：/g' \
    | sed 's/},[[:space:]]*{/}, {/g' \
    | tr -d '\r'
}

# --- Batch 1 examples (13 total) ---
# --- Batch 2 examples (+14 = 27 total) ---
# --- Batch 3 examples (+29 = 56 document-producing total) ---
# --- Batch 4 examples (+4 = 60 total; stdout + core-props modes) ---
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
  word-add-hyperlink
  word-page-setup
  word-add-header-footer
  word-header-footer
  word-paragraph-spacing
  word-paragraph-flow
  word-run-fonts
  excel-column-row-sizing
  excel-number-format
  excel-sheet-metadata
  ppt-add-notes
  ppt-set-titles
  ppt-paragraph-formatting
  ppt-run-formatting
  word-paragraph-style
  word-paragraph-numbering
  word-run-style
  word-styled-doc
  word-add-list
  word-add-bookmark
  word-add-comment
  word-add-revision
  word-tab-stops
  word-merge-cells
  word-table-shading
  word-footnotes
  word-page-numbers
  word-replace
  word-add-image
  excel-defined-names
  excel-data-validations
  excel-replace
  excel-add-image
  ppt-shape-xfrm
  ppt-shape-rotation
  ppt-hidden-slide
  ppt-transitions
  ppt-slide-backgrounds
  ppt-merge-cells
  ppt-picture-crop
  ppt-shape-accessibility
  ppt-replace
  ppt-add-image
  set-core-properties
  word-text-extract
  word-style-inspect
  linq-tutorial
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
  echo "--- $NAME ---"

  # ── set-core-properties: core-props digest mode ──────────────────────────────
  if [[ "$NAME" == "set-core-properties" ]]; then
    PREFIX_TS="$TMP_DIR/set-core-props_ts"
    PREFIX_NET="$TMP_DIR/set-core-props_net"

    # 1. Run TS example → 3 files
    TS_OK=true
    if ! bun run "$REPO_ROOT/examples/set-core-properties.ts" "$PREFIX_TS" \
         > "$TMP_DIR/${NAME}_ts.log" 2>&1; then
      echo "  [ERROR] TS example failed:"
      cat "$TMP_DIR/${NAME}_ts.log"
      TS_OK=false
    fi

    # 2. Run C# replica → 3 files
    NET_OK=true
    if ! csverify generate-prefix set-core-properties "$PREFIX_NET" \
         > "$TMP_DIR/${NAME}_net.log" 2>&1; then
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

    # 3. For each of the 3 file types, extract core-props digest and compare
    OVERALL_OK=true
    for EXT in docx xlsx pptx; do
      FILE_TS="${PREFIX_TS}.${EXT}"
      FILE_NET="${PREFIX_NET}.${EXT}"
      DIGEST_TS="$TMP_DIR/${NAME}_ts_${EXT}.json"
      DIGEST_NET="$TMP_DIR/${NAME}_net_${EXT}.json"

      if ! csverify extract-core "$FILE_TS" > "$DIGEST_TS" 2>&1; then
        echo "  [ERROR] Failed to extract TS core-props for .$EXT"
        OVERALL_OK=false; continue
      fi
      if ! csverify extract-core "$FILE_NET" > "$DIGEST_NET" 2>&1; then
        echo "  [ERROR] Failed to extract .NET core-props for .$EXT"
        OVERALL_OK=false; continue
      fi

      if ! diff -q "$DIGEST_TS" "$DIGEST_NET" > /dev/null 2>&1; then
        echo "  [FAIL] Core-props divergence detected for .$EXT!"
        echo "  === TS digest ==="
        cat "$DIGEST_TS"
        echo "  === NET digest ==="
        cat "$DIGEST_NET"
        echo "  === diff ==="
        diff "$DIGEST_TS" "$DIGEST_NET" || true
        OVERALL_OK=false
      fi
    done

    if [[ "$OVERALL_OK" == "true" ]]; then
      echo "  [PASS] Core properties semantically equivalent (docx + xlsx + pptx)"
      PASS=$((PASS + 1))
    else
      FAIL=$((FAIL + 1))
      DIVERGE+=("$NAME")
    fi
    echo ""
    continue
  fi

  # ── stdout-comparison mode: word-text-extract, word-style-inspect, linq-tutorial ──
  if [[ "$NAME" == "word-text-extract" || "$NAME" == "word-style-inspect" || "$NAME" == "linq-tutorial" ]]; then
    STDOUT_TS="$TMP_DIR/${NAME}_ts.txt"
    STDOUT_NET="$TMP_DIR/${NAME}_net.txt"
    NORM_TS="$TMP_DIR/${NAME}_ts_norm.txt"
    NORM_NET="$TMP_DIR/${NAME}_net_norm.txt"

    TS_OK=true
    NET_OK=true

    case "$NAME" in
      word-text-extract|word-style-inspect)
        # Need an input docx — use word-styled-doc as input (rich enough to exercise styles)
        INPUT_DOCX="$TMP_DIR/styled-doc-input.docx"
        if [[ ! -f "$INPUT_DOCX" ]]; then
          if ! bun run "$REPO_ROOT/examples/word-styled-doc.ts" "$INPUT_DOCX" \
               > "$TMP_DIR/styled-doc-input.log" 2>&1; then
            echo "  [ERROR] Failed to generate input docx (word-styled-doc):"
            cat "$TMP_DIR/styled-doc-input.log"
            TS_OK=false
          fi
        fi
        if [[ "$TS_OK" == "true" ]]; then
          if ! bun run "$REPO_ROOT/examples/${NAME}.ts" "$INPUT_DOCX" \
               > "$STDOUT_TS" 2>"$TMP_DIR/${NAME}_ts_err.log"; then
            echo "  [ERROR] TS example failed:"
            cat "$TMP_DIR/${NAME}_ts_err.log"
            TS_OK=false
          fi
          if ! csverify run-stdout "$NAME" "$INPUT_DOCX" \
               > "$STDOUT_NET" 2>"$TMP_DIR/${NAME}_net_err.log"; then
            echo "  [ERROR] .NET replica failed:"
            cat "$TMP_DIR/${NAME}_net_err.log"
            NET_OK=false
          fi
        fi
        ;;
      linq-tutorial)
        if ! bun run "$REPO_ROOT/examples/linq-tutorial.ts" \
             > "$STDOUT_TS" 2>"$TMP_DIR/${NAME}_ts_err.log"; then
          echo "  [ERROR] TS example failed:"
          cat "$TMP_DIR/${NAME}_ts_err.log"
          TS_OK=false
        fi
        if ! csverify run-stdout linq-tutorial \
             > "$STDOUT_NET" 2>"$TMP_DIR/${NAME}_net_err.log"; then
          echo "  [ERROR] .NET replica failed:"
          cat "$TMP_DIR/${NAME}_net_err.log"
          NET_OK=false
        fi
        ;;
    esac

    if [[ "$TS_OK" == "false" || "$NET_OK" == "false" ]]; then
      echo "  [SKIP] Skipping comparison due to generation error"
      FAIL=$((FAIL + 1))
      DIVERGE+=("$NAME (generation error)")
      echo ""
      continue
    fi

    # Normalize both outputs and compare
    normalize_stdout < "$STDOUT_TS" > "$NORM_TS"
    normalize_stdout < "$STDOUT_NET" > "$NORM_NET"

    if diff -q "$NORM_TS" "$NORM_NET" > /dev/null 2>&1; then
      echo "  [PASS] stdout output semantically equivalent"
      PASS=$((PASS + 1))
    else
      echo "  [FAIL] stdout divergence detected!"
      echo ""
      echo "  === TS stdout (normalized) ==="
      cat "$NORM_TS"
      echo ""
      echo "  === NET stdout (normalized) ==="
      cat "$NORM_NET"
      echo ""
      echo "  === diff (TS vs NET, normalized) ==="
      diff "$NORM_TS" "$NORM_NET" || true
      FAIL=$((FAIL + 1))
      DIVERGE+=("$NAME")
    fi
    echo ""
    continue
  fi

  # ── Default digest mode ───────────────────────────────────────────────────────

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

  # 1. Generate TS output
  TS_OK=true
  # Replace examples need an input file generated first
  case "$NAME" in
    word-replace)
      # Generate a template with {{client}} placeholders, then apply the replace
      INPUT_FILE="$TMP_DIR/${NAME}_input.$EXT"
      if ! bun run "$TOOL_DIR/make-word-replace-input.ts" "$INPUT_FILE" > "$TMP_DIR/${NAME}_input.log" 2>&1; then
        echo "  [ERROR] TS template generation (word-replace input) failed:"
        cat "$TMP_DIR/${NAME}_input.log"
        TS_OK=false
      else
        if ! bun run "$REPO_ROOT/examples/${NAME}.ts" "$INPUT_FILE" "$FILE_TS" "Acme Corp" > "$TMP_DIR/${NAME}_ts.log" 2>&1; then
          echo "  [ERROR] TS example failed:"
          cat "$TMP_DIR/${NAME}_ts.log"
          TS_OK=false
        fi
      fi
      ;;
    excel-replace)
      # Generate a template with {{client}} placeholders, then apply the replace
      INPUT_FILE="$TMP_DIR/${NAME}_input.$EXT"
      if ! bun run "$TOOL_DIR/make-excel-replace-input.ts" "$INPUT_FILE" > "$TMP_DIR/${NAME}_input.log" 2>&1; then
        echo "  [ERROR] TS template generation (excel-replace input) failed:"
        cat "$TMP_DIR/${NAME}_input.log"
        TS_OK=false
      else
        if ! bun run "$REPO_ROOT/examples/${NAME}.ts" "$INPUT_FILE" "$FILE_TS" "Acme Corp" > "$TMP_DIR/${NAME}_ts.log" 2>&1; then
          echo "  [ERROR] TS example failed:"
          cat "$TMP_DIR/${NAME}_ts.log"
          TS_OK=false
        fi
      fi
      ;;
    ppt-replace)
      # ppt-create slide 2 title contains "{{date}}" — use that as input
      INPUT_FILE="$TMP_DIR/${NAME}_input.$EXT"
      if ! bun run "$REPO_ROOT/examples/ppt-create.ts" "$INPUT_FILE" > "$TMP_DIR/${NAME}_input.log" 2>&1; then
        echo "  [ERROR] TS ppt-create (for ppt-replace input) failed:"
        cat "$TMP_DIR/${NAME}_input.log"
        TS_OK=false
      else
        if ! bun run "$REPO_ROOT/examples/${NAME}.ts" "$INPUT_FILE" "$FILE_TS" "2024-01-01" > "$TMP_DIR/${NAME}_ts.log" 2>&1; then
          echo "  [ERROR] TS example failed:"
          cat "$TMP_DIR/${NAME}_ts.log"
          TS_OK=false
        fi
      fi
      ;;
    *)
      if ! bun run "$REPO_ROOT/examples/${NAME}.ts" "$FILE_TS" > "$TMP_DIR/${NAME}_ts.log" 2>&1; then
        echo "  [ERROR] TS example failed:"
        cat "$TMP_DIR/${NAME}_ts.log"
        TS_OK=false
      fi
      ;;
  esac

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
