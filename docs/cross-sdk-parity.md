# Cross-SDK Semantic Parity Verification

## Purpose

Verify that **openxml-ts** and the **.NET DocumentFormat.OpenXml SDK** (v3.5.1),
given the same operation, produce **semantically equivalent** OOXML documents.

Equivalence is **semantic**, not byte-identical.  The two implementations
legitimately differ in: XML whitespace, attribute order, namespace prefixes,
relationship ID names, default-value emission, and ZIP internal layout.
Those cosmetic differences are normalised away by the digest extractor;
only meaningful content differences are reported.

---

## Architecture

```
examples/<name>.ts  ──bun──►  file_ts.docx/xlsx/pptx
                                     │
                             DigestExtractor (C#)
                                     │
                              digest_ts.json ──►┐
                                               diff ──► PASS / FAIL
                              digest_net.json ──►┘
                                     │
                             DigestExtractor (C#)
                                     │
replicas/<Name>.cs  ─dotnet─►  file_net.docx/xlsx/pptx
```

### Components

| File | Role |
|------|------|
| `tools/cross-sdk-verify/DigestExtractor.cs` | Reads any `.docx/.xlsx/.pptx` and emits a deterministic JSON semantic digest |
| `tools/cross-sdk-verify/replicas/*.cs` | C# faithful replicas of each `examples/*.ts` |
| `tools/cross-sdk-verify/Program.cs` | CLI: `extract <file>` or `generate <name> <file>` |
| `tools/cross-sdk-verify/run-verify.sh` | Runner: builds the tool, generates both outputs, compares digests |

---

## Normalization Rules

The digest extractor normalises the following **cosmetic/variable** differences:

| Category | What is normalized |
|----------|-------------------|
| Timestamps | Core properties `created`/`modified` are never included in digest |
| Relationship IDs | Not captured in digest; structure is compared by position/content |
| Namespace prefixes | SDK reads through the typed DOM; prefix doesn't matter |
| Attribute order | Typed properties accessed by name |
| Arbitrary shape IDs | Not compared (only text content and relative position) |
| XML whitespace | Irrelevant when reading via SDK typed accessors |
| Boolean casing | Normalised: `"true"`/`"false"` lowercase in digest |
| Excel date serials | Both sides use epoch 1899-12-30 (standard Excel convention) |

What is **preserved** (genuine semantic content):

- Word: paragraph texts, run texts, bold/italic/underline/fontSize/color, alignment, indentation, table cell texts (row×col order)
- Excel: cell address → value/formula/type mapping, merged ranges, freeze pane position
- PPT: slide order, shape texts by name, speaker notes text, table cell texts

---

## Batch 1 Results (13 examples)

Run: `bash tools/cross-sdk-verify/run-verify.sh`

| # | Example | Subsystem | Operation | Result |
|---|---------|-----------|-----------|--------|
| 1 | `word-create` | Word | Minimal docx, 3 paragraphs | **PASS** |
| 2 | `word-run-formatting` | Word | Bold/italic/underline/fontSize/color runs | **PASS** |
| 3 | `word-paragraph-format` | Word | Alignment + indentation | **PASS** |
| 4 | `word-add-table` | Word | 3×3 table with borders | **PASS** |
| 5 | `excel-create` | Excel | 3×5 inline-string cells | **PASS** |
| 6 | `excel-cell-value` | Excel | number/string/boolean/Date typed values | **PASS** |
| 7 | `excel-cell-formula` | Excel | SUM/AVERAGE/MAX/MIN with cached values | **PASS** |
| 8 | `excel-freeze-panes` | Excel | Freeze rows=1, cols=1 | **PASS** |
| 9 | `excel-merge-cells` | Excel | Three merged regions A1:D1, A2:B2, C2:D2 | **PASS** |
| 10 | `ppt-create` | PPT | 3-slide deck with title text shapes | **PASS** |
| 11 | `ppt-multi-slide` | PPT | 4-slide deck | **PASS** |
| 12 | `ppt-add-table` | PPT | Slide with embedded 3×3 table | **PASS** |
| 13 | `ppt-speaker-notes` | PPT | Speaker notes on slide 0 | **PASS** |

**All 13 batch-1 examples: semantically equivalent. No divergences found.**

---

## Divergences Found

None in batch 1.

During development, two **cosmetic** differences were corrected in the C# replicas
(not bugs in openxml-ts):

1. **Boolean string display** (`excel-cell-value` C4/C5): C# `bool.ToString()` returns
   `"True"`/`"False"` (capitalised); the TS example uses JS `String(bool)` giving
   `"true"`/`"false"`. Fixed in the replica to match the TS behaviour.

2. **Excel date serial** (`excel-cell-value` B6): Initial C# replica used epoch
   `1899-12-31`; the correct Excel epoch is `1899-12-30`. Fixed to match the
   standard convention used by both openxml-ts and Excel.

Neither issue was a bug in the openxml-ts library itself.

---

## How to Extend to All 60 Examples

The harness is structured for mechanical batch extension:

### Steps to add a new example

1. **Write the C# replica** in `tools/cross-sdk-verify/replicas/<PascalName>.cs`
   following the pattern of existing replicas.

2. **Register the replica** in `tools/cross-sdk-verify/Program.cs` generate switch:
   ```csharp
   case "my-new-example":
       MyNewExample.Run(outputPath);
       break;
   ```

3. **Add to the runner** in `tools/cross-sdk-verify/run-verify.sh` `ALL_EXAMPLES` array:
   ```bash
   ALL_EXAMPLES=(
     ...
     my-new-example   # ← add here
   )
   ```

4. **Run and iterate** until the digest comparison passes:
   ```bash
   bash tools/cross-sdk-verify/run-verify.sh my-new-example
   ```

### Remaining examples by category

The table below shows all 60 examples and their batch assignment.
Batch 1 (13) is complete; batches 2–4 are planned.

**Word (21 remaining)**

| Example | Complexity | Planned batch |
|---------|-----------|---------------|
| word-add-hyperlink | medium | 2 |
| word-page-setup | medium | 2 |
| word-add-header-footer | medium | 2 |
| word-header-footer | medium | 2 |
| word-paragraph-spacing | low | 2 |
| word-paragraph-style | medium | 3 |
| word-paragraph-numbering | medium | 3 |
| word-paragraph-flow | low | 2 |
| word-run-fonts | low | 2 |
| word-run-style | medium | 3 |
| word-styled-doc | medium | 3 |
| word-style-inspect | medium | 3 |
| word-add-list | medium | 3 |
| word-add-bookmark | medium | 3 |
| word-add-comment | high | 4 |
| word-add-revision | high | 4 |
| word-tab-stops | medium | 3 |
| word-merge-cells | medium | 3 |
| word-table-shading | medium | 3 |
| word-footnotes | medium | 3 |
| word-page-numbers | medium | 3 |
| word-text-extract | low | 2 |
| word-replace | medium | 3 |
| word-add-image | high | 4 |

**Excel (7 remaining)**

| Example | Complexity | Planned batch |
|---------|-----------|---------------|
| excel-column-row-sizing | low | 2 |
| excel-number-format | medium | 2 |
| excel-sheet-metadata | medium | 2 |
| excel-defined-names | medium | 3 |
| excel-data-validations | medium | 3 |
| excel-replace | medium | 3 |
| excel-add-image | high | 4 |

**PPT (remaining)**

| Example | Complexity | Planned batch |
|---------|-----------|---------------|
| ppt-add-notes | medium | 2 |
| ppt-set-titles | low | 2 |
| ppt-paragraph-formatting | medium | 2 |
| ppt-run-formatting | medium | 2 |
| ppt-shape-xfrm | medium | 3 |
| ppt-shape-rotation | medium | 3 |
| ppt-hidden-slide | medium | 3 |
| ppt-transitions | medium | 3 |
| ppt-slide-backgrounds | high | 4 |
| ppt-merge-cells | medium | 3 |
| ppt-picture-crop | high | 4 |
| ppt-shape-accessibility | medium | 3 |
| ppt-replace | medium | 3 |
| ppt-add-image | high | 4 |

### Digest extractor extensions needed for later batches

- **Header/footer text**: parse `HeaderPart`/`FooterPart` paragraphs
- **Hyperlink targets**: normalise rel IDs → sort by target URL
- **Images**: compare dimensions + content hash (not binary-exact)
- **Styles**: normalise style names, ignore auto-generated IDs
- **Comments/revisions**: not in scope for batch 1

---

## Running the Verification

```bash
# Full batch 1
bash tools/cross-sdk-verify/run-verify.sh

# Single example
bash tools/cross-sdk-verify/run-verify.sh word-create

# Multiple examples
bash tools/cross-sdk-verify/run-verify.sh excel-create excel-cell-value ppt-create
```

Requirements:
- `.NET SDK 8` at `~/.dotnet/dotnet`
- `bun` on PATH
- Run from repo root or from any directory (script resolves paths absolutely)
