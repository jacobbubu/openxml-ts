// Replica of examples/word-table-shading.ts
// Creates a docx with 5x3 table:
//   Row 0 (header): yellow fill FFFF00, headers Name/Amount/Status
//   Rows 1,3 (odd): light gray EEEEEE
//   Rows 2,4 (even): no fill
//   Cell text: R{r}C{c+1}

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordTableShading
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        var table = CreateTable();
        body.Append(table);

        body.Append(new Paragraph(new Run(new Text("Table with shaded header and zebra rows."))));
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Table CreateTable()
    {
        var table = new Table();
        table.Append(new TableProperties(
            new TableWidth { Width = "9000", Type = TableWidthUnitValues.Dxa },
            new TableBorders(
                new TopBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new BottomBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new LeftBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new RightBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new InsideVerticalBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" }
            )
        ));
        table.Append(new TableGrid(
            new GridColumn { Width = "3000" },
            new GridColumn { Width = "3000" },
            new GridColumn { Width = "3000" }
        ));

        // Header row (row 0): yellow FFFF00
        var headers = new[] { "Name", "Amount", "Status" };
        var headerRow = new TableRow();
        foreach (var h in headers)
            headerRow.Append(MakeCell(h, "FFFF00"));
        table.Append(headerRow);

        // Data rows 1-4: odd rows get EEEEEE, even rows no fill
        for (int r = 1; r < 5; r++)
        {
            string? fill = r % 2 == 1 ? "EEEEEE" : null;
            var row = new TableRow();
            for (int c = 0; c < 3; c++)
                row.Append(MakeCell($"R{r}C{c + 1}", fill));
            table.Append(row);
        }

        return table;
    }

    private static TableCell MakeCell(string text, string? fillHex = null)
    {
        var cell = new TableCell();
        var tcPr = new TableCellProperties(
            new TableCellWidth { Width = "3000", Type = TableWidthUnitValues.Dxa }
        );
        if (fillHex != null)
            tcPr.Append(new Shading { Val = ShadingPatternValues.Clear, Fill = fillHex, Color = "auto" });
        cell.Append(tcPr);
        cell.Append(new Paragraph(new Run(new Text(text))));
        return cell;
    }
}
