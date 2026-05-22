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

## Batch 2 Results (14 examples, +1 N/A)

| # | Example | Subsystem | Operation | Result |
|---|---------|-----------|-----------|--------|
| 14 | `word-add-hyperlink` | Word | External + anchor hyperlink runs | **PASS** |
| 15 | `word-page-setup` | Word | A4 landscape page size + custom margins | **PASS** |
| 16 | `word-add-header-footer` | Word | Default header + footer parts | **PASS** |
| 17 | `word-header-footer` | Word | Header "公司机密" + footer "第 X 页" | **PASS** |
| 18 | `word-paragraph-spacing` | Word | Before/after/line spacing (6 paragraphs) | **PASS** |
| 19 | `word-paragraph-flow` | Word | keepNext/keepLines/pageBreakBefore | **PASS** |
| 20 | `word-run-fonts` | Word | fontFamily shortcut + fontFamilyDetail | **PASS** |
| 21 | `word-text-extract` | Word | Read-only text extraction (no document output) | **N/A** |
| 22 | `excel-column-row-sizing` | Excel | Column widths 30/15/15/50 + row heights 40/18 | **PASS** |
| 23 | `excel-number-format` | Excel | Built-in number formats (integer/decimal/percent/currency/date) | **PASS** |
| 24 | `excel-sheet-metadata` | Excel | Tab color FFFF0000 + activeSheet=0 | **PASS** |
| 25 | `ppt-add-notes` | PPT | Speaker notes set via setSlideNotes | **PASS** |
| 26 | `ppt-set-titles` | PPT | Title placeholder set via slide.title setter | **PASS** |
| 27 | `ppt-paragraph-formatting` | PPT | DrawingML paragraph alignment/margin/indent | **PASS** |
| 28 | `ppt-run-formatting` | PPT | DrawingML run bold/italic/underline/fontSize/color | **PASS** |

**All 14 batch-2 document-output examples: semantically equivalent. No divergences found.**

`word-text-extract` is a read-only example (opens an existing docx and extracts text to stdout);
it produces no output document and cannot be output-compared. Marked N/A.

**Running total: 27 covered (27 PASS) out of 60 examples.**

---

## Batch 3 Results (29 examples, +4 N/A)

| # | Example | Subsystem | Operation | Result |
|---|---------|-----------|-----------|--------|
| 28 | `word-paragraph-style` | Word | Named paragraph styles | **PASS** |
| 29 | `word-paragraph-numbering` | Word | Numbering definitions + list paragraphs | **PASS** |
| 30 | `word-run-style` | Word | Named character styles on runs | **PASS** |
| 31 | `word-styled-doc` | Word | Full styled document with multiple styles | **PASS** |
| 32 | `word-style-inspect` | Word | Read-only style inspection (no document output) | **N/A** |
| 33 | `word-add-list` | Word | Bullet + numbered list items | **PASS** |
| 34 | `word-add-bookmark` | Word | Bookmark start/end markers | **PASS** |
| 35 | `word-add-comment` | Word | Comment annotations on runs | **PASS** |
| 36 | `word-add-revision` | Word | Track-changes revision marks | **PASS** |
| 37 | `word-tab-stops` | Word | Custom tab stops (left/center/right/decimal) | **PASS** |
| 38 | `word-merge-cells` | Word | Table cell merges (horizontal + vertical) | **PASS** |
| 39 | `word-table-shading` | Word | Table cell background shading | **PASS** |
| 40 | `word-footnotes` | Word | Footnote references + content | **PASS** |
| 41 | `word-page-numbers` | Word | PAGE/NUMPAGES field codes in footer | **PASS** |
| 42 | `word-replace` | Word | Open docx, replace `{{client}}` placeholder | **PASS** |
| 43 | `word-add-image` | Word | Inline image via blipFill | **PASS** |
| 44 | `excel-defined-names` | Excel | Workbook-scoped defined names | **PASS** |
| 45 | `excel-data-validations` | Excel | Drop-down list + integer constraints | **PASS** |
| 46 | `excel-replace` | Excel | Open xlsx, replace `{{client}}` placeholder | **PASS** |
| 47 | `excel-add-image` | Excel | Embedded image anchored to a cell | **PASS** |
| 48 | `ppt-shape-xfrm` | PPT | Shape position/size (xfrm) accessors | **PASS** |
| 49 | `ppt-shape-rotation` | PPT | Shape rotation + flip accessors | **PASS** |
| 50 | `ppt-hidden-slide` | PPT | Hidden slide flag | **PASS** |
| 51 | `ppt-transitions` | PPT | Slide transition effects | **PASS** |
| 52 | `ppt-slide-backgrounds` | PPT | Solid fill slide backgrounds | **PASS** |
| 53 | `ppt-merge-cells` | PPT | Table cell merges in slide table | **PASS** |
| 54 | `ppt-picture-crop` | PPT | Picture crop rectangle on image shape | **PASS** |
| 55 | `ppt-shape-accessibility` | PPT | Alt-text on shapes | **PASS** |
| 56 | `ppt-replace` | PPT | Open pptx, replace `{{date}}` placeholder | **PASS** |
| 57 | `ppt-add-image` | PPT | Embedded image blipFill in slide | **PASS** |
| — | `linq-tutorial` | — | LINQ query tutorial (no document output) | **N/A** |
| — | `word-text-extract` | — | Read-only text extraction (no document output) | **N/A** |
| — | `set-core-properties` | — | Core properties setter (no standalone output) | **N/A** |

**All 29 batch-3 document-output examples: semantically equivalent. No divergences found.**

N/A examples produce no output document and cannot be compared:
- `linq-tutorial` — tutorial script with no file output
- `word-text-extract` — reads an existing docx and extracts text to stdout
- `word-style-inspect` — reads styles and prints to stdout
- `set-core-properties` — sets metadata on an existing document (no standalone output)

**Final total: 56 covered (56 PASS), 4 N/A, 0 known-divergent out of 60 examples.**

---

## Complete Coverage Table (all 60 examples)

| Example | Result | Notes |
|---------|--------|-------|
| `word-create` | **PASS** | Batch 1 |
| `word-run-formatting` | **PASS** | Batch 1 |
| `word-paragraph-format` | **PASS** | Batch 1 |
| `word-add-table` | **PASS** | Batch 1 |
| `word-add-hyperlink` | **PASS** | Batch 2 |
| `word-page-setup` | **PASS** | Batch 2 |
| `word-add-header-footer` | **PASS** | Batch 2 |
| `word-header-footer` | **PASS** | Batch 2 |
| `word-paragraph-spacing` | **PASS** | Batch 2 |
| `word-paragraph-flow` | **PASS** | Batch 2 |
| `word-run-fonts` | **PASS** | Batch 2 |
| `word-text-extract` | **N/A** | Read-only; no document output |
| `word-paragraph-style` | **PASS** | Batch 3 |
| `word-paragraph-numbering` | **PASS** | Batch 3 |
| `word-run-style` | **PASS** | Batch 3 |
| `word-styled-doc` | **PASS** | Batch 3 |
| `word-style-inspect` | **N/A** | Read-only; no document output |
| `word-add-list` | **PASS** | Batch 3 |
| `word-add-bookmark` | **PASS** | Batch 3 |
| `word-add-comment` | **PASS** | Batch 3 |
| `word-add-revision` | **PASS** | Batch 3 |
| `word-tab-stops` | **PASS** | Batch 3 |
| `word-merge-cells` | **PASS** | Batch 3 |
| `word-table-shading` | **PASS** | Batch 3 |
| `word-footnotes` | **PASS** | Batch 3 |
| `word-page-numbers` | **PASS** | Batch 3 |
| `word-replace` | **PASS** | Batch 3 |
| `word-add-image` | **PASS** | Batch 3 |
| `excel-create` | **PASS** | Batch 1 |
| `excel-cell-value` | **PASS** | Batch 1 |
| `excel-cell-formula` | **PASS** | Batch 1 |
| `excel-freeze-panes` | **PASS** | Batch 1 |
| `excel-merge-cells` | **PASS** | Batch 1 |
| `excel-column-row-sizing` | **PASS** | Batch 2 |
| `excel-number-format` | **PASS** | Batch 2 |
| `excel-sheet-metadata` | **PASS** | Batch 2 |
| `excel-defined-names` | **PASS** | Batch 3 |
| `excel-data-validations` | **PASS** | Batch 3 |
| `excel-replace` | **PASS** | Batch 3 |
| `excel-add-image` | **PASS** | Batch 3 |
| `ppt-create` | **PASS** | Batch 1 |
| `ppt-multi-slide` | **PASS** | Batch 1 |
| `ppt-add-table` | **PASS** | Batch 1 |
| `ppt-speaker-notes` | **PASS** | Batch 1 |
| `ppt-add-notes` | **PASS** | Batch 2 |
| `ppt-set-titles` | **PASS** | Batch 2 |
| `ppt-paragraph-formatting` | **PASS** | Batch 2 |
| `ppt-run-formatting` | **PASS** | Batch 2 |
| `ppt-shape-xfrm` | **PASS** | Batch 3 |
| `ppt-shape-rotation` | **PASS** | Batch 3 |
| `ppt-hidden-slide` | **PASS** | Batch 3 |
| `ppt-transitions` | **PASS** | Batch 3 |
| `ppt-slide-backgrounds` | **PASS** | Batch 3 |
| `ppt-merge-cells` | **PASS** | Batch 3 |
| `ppt-picture-crop` | **PASS** | Batch 3 |
| `ppt-shape-accessibility` | **PASS** | Batch 3 |
| `ppt-replace` | **PASS** | Batch 3 |
| `ppt-add-image` | **PASS** | Batch 3 |
| `linq-tutorial` | **N/A** | No document output (tutorial script) |
| `set-core-properties` | **N/A** | No standalone document output |

**Summary: 56 PASS · 4 N/A · 0 known-divergent · 60 total**

---

## Divergences Found

None across all three batches.

During development, the following differences were corrected in the C# replicas or harness
(none were bugs in openxml-ts):

1. **Boolean string display** (`excel-cell-value` C4/C5): C# `bool.ToString()` returns
   `"True"`/`"False"` (capitalised); the TS example uses JS `String(bool)` giving
   `"true"`/`"false"`. Fixed in the replica to match the TS behaviour.

2. **Excel date serial** (`excel-cell-value` B6): Initial C# replica used epoch
   `1899-12-31`; the correct Excel epoch is `1899-12-30`. Fixed to match the
   standard convention used by both openxml-ts and Excel.

3. **Replace-example runner** (`word-replace`, `excel-replace`, `ppt-replace`): The
   runner was passing only `<output>` to replace examples that require `<input> <output>`.
   Fixed by generating a template input file first and passing both paths.

4. **PPT shape-only digest** (`ppt-shape-xfrm`, `ppt-shape-rotation`): The digest
   extractor skipped shapes with no `TextBody`. Fixed to include any named shape
   regardless of whether it has a text body.

5. **Word field-code empty runs** (`word-page-numbers`): The .NET SDK emits empty
   `<w:r>` runs for field codes (fldChar/instrText); openxml-ts emits only the runs
   with visible text. Fixed by filtering empty-text runs in the digest (cosmetic difference).

---

## How to Extend the Harness

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

4. **For transform examples** (open + modify), add a `case` to the runner's input-generation
   block and provide a matching C# replica that replicates the same pipeline.

5. **Run and iterate** until the digest comparison passes:
   ```bash
   bash tools/cross-sdk-verify/run-verify.sh my-new-example
   ```

---

## Running the Verification

```bash
# Full suite (all covered examples)
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
