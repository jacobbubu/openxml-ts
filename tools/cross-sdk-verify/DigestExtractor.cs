// DigestExtractor.cs
// Semantic digest extractor for OOXML documents.
// Produces a deterministic JSON digest capturing meaningful content,
// normalizing out: timestamps, relationship IDs, namespace prefixes,
// attribute order, arbitrary IDs, whitespace.
//
// Usage:
//   CrossSdkVerify extract <file.docx|xlsx|pptx>  → prints JSON to stdout

using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using A = DocumentFormat.OpenXml.Drawing;
using P = DocumentFormat.OpenXml.Presentation;

namespace CrossSdkVerify;

// ─── Data models ──────────────────────────────────────────────────────────────

public record WordDigest(
    [property: JsonPropertyName("paragraphs")] List<ParaDigest> Paragraphs,
    [property: JsonPropertyName("tables")] List<TableDigest> Tables
);

public record ParaDigest(
    [property: JsonPropertyName("text")] string Text,
    [property: JsonPropertyName("align")] string? Align,
    [property: JsonPropertyName("indentLeft")] int? IndentLeft,
    [property: JsonPropertyName("indentFirstLine")] int? IndentFirstLine,
    [property: JsonPropertyName("indentHanging")] int? IndentHanging,
    [property: JsonPropertyName("runs")] List<RunDigest> Runs
);

public record RunDigest(
    [property: JsonPropertyName("text")] string Text,
    [property: JsonPropertyName("bold")] bool? Bold,
    [property: JsonPropertyName("italic")] bool? Italic,
    [property: JsonPropertyName("underline")] string? Underline,
    [property: JsonPropertyName("fontSizeHalfPt")] int? FontSizeHalfPt,
    [property: JsonPropertyName("colorHex")] string? ColorHex
);

public record TableDigest(
    [property: JsonPropertyName("rows")] int Rows,
    [property: JsonPropertyName("cols")] int Cols,
    [property: JsonPropertyName("cells")] List<List<string>> Cells
);

public record ExcelDigest(
    [property: JsonPropertyName("sheets")] List<SheetDigest> Sheets
);

public record SheetDigest(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("cells")] Dictionary<string, CellDigest> Cells,
    [property: JsonPropertyName("mergedRanges")] List<string> MergedRanges,
    [property: JsonPropertyName("freezeRow")] int? FreezeRow,
    [property: JsonPropertyName("freezeCol")] int? FreezeCol
);

public record CellDigest(
    [property: JsonPropertyName("value")] string? Value,
    [property: JsonPropertyName("formula")] string? Formula,
    [property: JsonPropertyName("type")] string? Type
);

public record PptDigest(
    [property: JsonPropertyName("slides")] List<SlideDigest> Slides
);

public record SlideDigest(
    [property: JsonPropertyName("index")] int Index,
    [property: JsonPropertyName("shapes")] List<ShapeDigest> Shapes,
    [property: JsonPropertyName("notes")] string? Notes
);

public record ShapeDigest(
    [property: JsonPropertyName("name")] string? Name,
    [property: JsonPropertyName("text")] string? Text
);

// ─── Extractor ────────────────────────────────────────────────────────────────

public static class DigestExtractor
{
    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    public static string Extract(string filePath)
    {
        var ext = Path.GetExtension(filePath).ToLowerInvariant();
        return ext switch
        {
            ".docx" => ExtractWord(filePath),
            ".xlsx" => ExtractExcel(filePath),
            ".pptx" => ExtractPpt(filePath),
            _ => throw new ArgumentException($"Unsupported file extension: {ext}")
        };
    }

    // ─── Word ────────────────────────────────────────────────────────────

    private static string ExtractWord(string filePath)
    {
        using var doc = WordprocessingDocument.Open(filePath, false);
        var body = doc.MainDocumentPart?.Document?.Body;
        if (body == null) throw new InvalidOperationException("No body in document");

        var paragraphs = new List<ParaDigest>();
        var tables = new List<TableDigest>();

        foreach (var child in body.ChildElements)
        {
            if (child is DocumentFormat.OpenXml.Wordprocessing.Paragraph para)
            {
                paragraphs.Add(ExtractParagraph(para));
            }
            else if (child is DocumentFormat.OpenXml.Wordprocessing.Table table)
            {
                tables.Add(ExtractTable(table));
            }
        }

        var digest = new WordDigest(paragraphs, tables);
        return JsonSerializer.Serialize(new { type = "word", digest }, JsonOpts);
    }

    private static ParaDigest ExtractParagraph(DocumentFormat.OpenXml.Wordprocessing.Paragraph para)
    {
        var pPr = para.ParagraphProperties;
        string? align = null;
        int? indentLeft = null;
        int? indentFirstLine = null;
        int? indentHanging = null;

        if (pPr != null)
        {
            if (pPr.Justification?.Val != null)
                align = pPr.Justification.Val.Value.ToString().ToLowerInvariant();

            var indent = pPr.Indentation;
            if (indent != null)
            {
                if (indent.Left?.HasValue == true)
                    indentLeft = int.TryParse(indent.Left.Value, out var lv) ? lv : null;
                if (indent.FirstLine?.HasValue == true)
                    indentFirstLine = int.TryParse(indent.FirstLine.Value, out var fv) ? fv : null;
                if (indent.Hanging?.HasValue == true)
                    indentHanging = int.TryParse(indent.Hanging.Value, out var hv) ? hv : null;
            }
        }

        var runs = new List<RunDigest>();
        var fullText = new StringBuilder();

        foreach (var child in para.ChildElements)
        {
            if (child is DocumentFormat.OpenXml.Wordprocessing.Run run)
            {
                var rd = ExtractRun(run);
                // Skip empty-text runs (e.g. field-code runs emitted by .NET that TS omits)
                if (rd.Text.Length > 0)
                    runs.Add(rd);
                fullText.Append(rd.Text);
            }
        }

        // Normalize alignment: "both" → null (default), clean up
        if (align == "both") align = null;

        return new ParaDigest(
            fullText.ToString(),
            align,
            indentLeft,
            indentFirstLine,
            indentHanging,
            runs
        );
    }

    private static RunDigest ExtractRun(DocumentFormat.OpenXml.Wordprocessing.Run run)
    {
        var sb = new StringBuilder();
        foreach (var child in run.ChildElements)
        {
            if (child is DocumentFormat.OpenXml.Wordprocessing.Text t)
                sb.Append(t.Text);
        }

        var rPr = run.RunProperties;
        bool? bold = null;
        bool? italic = null;
        string? underline = null;
        int? fontSizeHalfPt = null;
        string? colorHex = null;

        if (rPr != null)
        {
            // Bold: present means true (unless Val explicitly false)
            if (rPr.Bold != null)
                bold = rPr.Bold.Val?.Value != false;
            if (rPr.Italic != null)
                italic = rPr.Italic.Val?.Value != false;
            if (rPr.Underline?.Val != null)
            {
                var uval = rPr.Underline.Val.Value.ToString().ToLowerInvariant();
                if (uval != "none") underline = uval;
            }
            if (rPr.FontSize?.Val?.HasValue == true)
                fontSizeHalfPt = int.TryParse(rPr.FontSize.Val.Value, out var sv) ? sv : null;
            if (rPr.Color?.Val?.HasValue == true)
            {
                var cv = rPr.Color.Val.Value;
                if (cv != null && cv.ToUpperInvariant() != "AUTO")
                    colorHex = cv.ToUpperInvariant();
            }
        }

        return new RunDigest(sb.ToString(), bold, italic, underline, fontSizeHalfPt, colorHex);
    }

    private static TableDigest ExtractTable(DocumentFormat.OpenXml.Wordprocessing.Table table)
    {
        var rowsData = new List<List<string>>();
        foreach (var child in table.ChildElements)
        {
            if (child is TableRow row)
            {
                var rowCells = new List<string>();
                foreach (var cellChild in row.ChildElements)
                {
                    if (cellChild is TableCell cell)
                    {
                        var cellText = new StringBuilder();
                        foreach (var para in cell.Descendants<DocumentFormat.OpenXml.Wordprocessing.Paragraph>())
                        {
                            foreach (var run in para.Descendants<DocumentFormat.OpenXml.Wordprocessing.Run>())
                            {
                                foreach (var t in run.Descendants<DocumentFormat.OpenXml.Wordprocessing.Text>())
                                    cellText.Append(t.Text);
                            }
                        }
                        rowCells.Add(cellText.ToString());
                    }
                }
                if (rowCells.Count > 0)
                    rowsData.Add(rowCells);
            }
        }

        int rows = rowsData.Count;
        int cols = rows > 0 ? rowsData.Max(r => r.Count) : 0;
        // Pad short rows
        foreach (var r in rowsData)
            while (r.Count < cols) r.Add("");

        return new TableDigest(rows, cols, rowsData);
    }

    // ─── Excel ───────────────────────────────────────────────────────────

    private static string ExtractExcel(string filePath)
    {
        using var doc = SpreadsheetDocument.Open(filePath, false);
        var wb = doc.WorkbookPart;
        if (wb == null) throw new InvalidOperationException("No workbook part");

        var sheets = new List<SheetDigest>();
        var sharedStrings = wb.SharedStringTablePart?.SharedStringTable;

        foreach (var sheet in wb.Workbook.Descendants<Sheet>())
        {
            var sheetName = sheet.Name?.Value ?? "";
            var wsId = sheet.Id?.Value;
            if (wsId == null) continue;

            var wsPart = (WorksheetPart)wb.GetPartById(wsId);
            var ws = wsPart.Worksheet;

            var cells = new Dictionary<string, CellDigest>();
            foreach (var cell in ws.Descendants<DocumentFormat.OpenXml.Spreadsheet.Cell>())
            {
                var cellRef = cell.CellReference?.Value;
                if (cellRef == null) continue;

                var dataType = cell.DataType?.Value;
                string? rawValue = cell.CellValue?.Text;
                string? formula = cell.CellFormula?.Text;

                // Resolve shared string
                string? value = rawValue;
                string? typeStr = null;
                if (dataType == CellValues.SharedString && rawValue != null)
                {
                    if (int.TryParse(rawValue, out var idx) && sharedStrings != null)
                    {
                        var items = sharedStrings.Descendants<SharedStringItem>().ToList();
                        value = idx < items.Count ? items[idx].InnerText : rawValue;
                    }
                    typeStr = "string";
                }
                else if (dataType == CellValues.InlineString)
                {
                    value = cell.InlineString?.Text?.Text ?? cell.InlineString?.InnerText ?? rawValue;
                    typeStr = "string";
                }
                else if (dataType == CellValues.Boolean)
                {
                    value = rawValue == "1" ? "true" : "false";
                    typeStr = "boolean";
                }
                else if (dataType == CellValues.String)
                {
                    typeStr = "string";
                }
                else if (formula != null)
                {
                    typeStr = "formula";
                }
                else if (rawValue != null)
                {
                    typeStr = "number";
                }

                // Skip completely empty cells
                if (value == null && formula == null) continue;

                cells[cellRef] = new CellDigest(value, formula, typeStr);
            }

            // Sort cells by address for determinism
            var sortedCells = cells
                .OrderBy(kv => ParseCellRef(kv.Key))
                .ToDictionary(kv => kv.Key, kv => kv.Value);

            // Merged ranges
            var mergedRanges = ws.Descendants<MergeCell>()
                .Select(mc => mc.Reference?.Value ?? "")
                .Where(r => r != "")
                .OrderBy(r => r)
                .ToList();

            // Freeze panes
            int? freezeRow = null;
            int? freezeCol = null;
            var pane = ws.SheetViews?.Descendants<Pane>().FirstOrDefault()
                ?? ws.Descendants<SheetView>().FirstOrDefault()?.Descendants<Pane>().FirstOrDefault();
            if (pane?.State?.Value == PaneStateValues.Frozen)
            {
                freezeRow = pane.VerticalSplit?.HasValue == true ? (int)(double)pane.VerticalSplit.Value! : null;
                freezeCol = pane.HorizontalSplit?.HasValue == true ? (int)(double)pane.HorizontalSplit.Value! : null;
            }

            sheets.Add(new SheetDigest(sheetName, sortedCells, mergedRanges, freezeRow, freezeCol));
        }

        var digest = new ExcelDigest(sheets);
        return JsonSerializer.Serialize(new { type = "excel", digest }, JsonOpts);
    }

    private static (int row, int col) ParseCellRef(string cellRef)
    {
        int col = 0;
        int i = 0;
        while (i < cellRef.Length && char.IsLetter(cellRef[i]))
        {
            col = col * 26 + (cellRef[i] - 'A' + 1);
            i++;
        }
        int row = int.TryParse(cellRef[i..], out var r) ? r : 0;
        return (row, col);
    }

    // ─── PPT ─────────────────────────────────────────────────────────────

    private static string ExtractPpt(string filePath)
    {
        using var doc = PresentationDocument.Open(filePath, false);
        var presPart = doc.PresentationPart;
        if (presPart == null) throw new InvalidOperationException("No presentation part");

        var slides = new List<SlideDigest>();
        var slideIdList = presPart.Presentation.SlideIdList;
        if (slideIdList == null) return JsonSerializer.Serialize(new { type = "ppt", digest = new PptDigest([]) }, JsonOpts);

        int idx = 0;
        foreach (var slideId in slideIdList.Descendants<SlideId>())
        {
            var rId = slideId.RelationshipId?.Value;
            if (rId == null) continue;

            var slidePart = (SlidePart)presPart.GetPartById(rId);
            var slide = slidePart.Slide;

            var shapes = new List<ShapeDigest>();

            // Extract shapes from spTree
            foreach (var sp in slide.Descendants<P.Shape>())
            {
                var nvSpPr = sp.NonVisualShapeProperties;
                var cNvPr = nvSpPr?.NonVisualDrawingProperties;
                var name = cNvPr?.Name?.Value;

                string? text = null;
                var txBody = sp.TextBody;
                if (txBody != null)
                {
                    var sb = new StringBuilder();
                    foreach (var para in txBody.Descendants<A.Paragraph>())
                    {
                        if (sb.Length > 0) sb.Append('\n');
                        foreach (var run in para.Descendants<A.Run>())
                        {
                            sb.Append(run.Text?.Text ?? "");
                        }
                    }
                    var t = sb.ToString().Trim();
                    if (t.Length > 0) text = t;
                }

                if (text != null || name != null)
                    shapes.Add(new ShapeDigest(name, text));
            }

            // Extract tables from graphicFrame
            foreach (var tbl in slide.Descendants<A.Table>())
            {
                var sb = new StringBuilder();
                sb.Append("[table]");
                foreach (var row in tbl.Descendants<A.TableRow>())
                {
                    var cells = row.Descendants<A.TableCell>()
                        .Select(tc => tc.InnerText.Trim())
                        .ToList();
                    sb.Append('|').Append(string.Join("|", cells)).Append('|');
                }
                shapes.Add(new ShapeDigest("table", sb.ToString()));
            }

            // Speaker notes
            string? notes = null;
            var notesPart = slidePart.NotesSlidePart;
            if (notesPart != null)
            {
                var notesSlide = notesPart.NotesSlide;
                var nb = new StringBuilder();
                // The notes body placeholder (type=body) contains the actual notes
                foreach (var sp in notesSlide.Descendants<P.Shape>())
                {
                    var ph = sp.NonVisualShapeProperties?.ApplicationNonVisualDrawingProperties?
                        .Descendants<PlaceholderShape>().FirstOrDefault();
                    if (ph?.Type?.Value == PlaceholderValues.Body)
                    {
                        foreach (var para in sp.Descendants<A.Paragraph>())
                        {
                            foreach (var run in para.Descendants<A.Run>())
                                nb.Append(run.Text?.Text ?? "");
                        }
                    }
                }
                var notesText = nb.ToString().Trim();
                if (notesText.Length > 0) notes = notesText;
            }

            slides.Add(new SlideDigest(idx, shapes, notes));
            idx++;
        }

        var digest = new PptDigest(slides);
        return JsonSerializer.Serialize(new { type = "ppt", digest }, JsonOpts);
    }
}
