// Replica of examples/word-add-table.ts
// Creates a docx with a 3x3 Word table (borders), header + 2 data rows.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddTable
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // 3×3 table, total width 9000 dxa
        var table = CreateTable(3, 3, 9000);

        // Row 0: headers
        SetCell(table, 0, 0, "Product");
        SetCell(table, 0, 1, "Q1");
        SetCell(table, 0, 2, "Q2");

        // Row 1
        SetCell(table, 1, 0, "Widgets");
        SetCell(table, 1, 1, "$1,200");
        SetCell(table, 1, 2, "$1,450");

        // Row 2
        SetCell(table, 2, 0, "Gadgets");
        SetCell(table, 2, 1, "$800");
        SetCell(table, 2, 2, "$950");

        body.Append(table);
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Table CreateTable(int rows, int cols, int totalWidthDxa)
    {
        var table = new Table();

        // Table properties with borders
        var tblPr = new TableProperties(
            new TableWidth { Width = totalWidthDxa.ToString(), Type = TableWidthUnitValues.Dxa },
            new TableBorders(
                new TopBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new BottomBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new LeftBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new RightBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" },
                new InsideVerticalBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "000000" }
            )
        );
        table.AppendChild(tblPr);

        // Column width
        var tblGrid = new TableGrid();
        int colWidth = totalWidthDxa / cols;
        for (int c = 0; c < cols; c++)
            tblGrid.Append(new GridColumn { Width = colWidth.ToString() });
        table.AppendChild(tblGrid);

        for (int r = 0; r < rows; r++)
        {
            var row = new TableRow();
            for (int c = 0; c < cols; c++)
            {
                var cell = new TableCell();
                cell.Append(new TableCellProperties(
                    new TableCellWidth { Width = colWidth.ToString(), Type = TableWidthUnitValues.Dxa }
                ));
                cell.Append(new Paragraph(new Run(new Text(""))));
                row.Append(cell);
            }
            table.Append(row);
        }

        return table;
    }

    private static void SetCell(Table table, int row, int col, string text)
    {
        var rows = table.Elements<TableRow>().ToList();
        var cells = rows[row].Elements<TableCell>().ToList();
        var cell = cells[col];
        // Replace the paragraph content
        var para = cell.Elements<Paragraph>().First();
        foreach (var r in para.Elements<Run>().ToList())
            r.Remove();
        para.Append(new Run(new Text(text)));
    }
}
