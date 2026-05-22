// Replica of examples/word-merge-cells.ts
// Creates a docx with a 3x3 table; first row 3 cells merged with "Quarter Stats" header.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordMergeCells
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
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Table CreateTable()
    {
        var table = new Table();

        // Table properties with borders
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

        // Row 0: merged header "Quarter Stats" (span 3 cols)
        var row0 = new TableRow();
        row0.Append(MakeCell("Quarter Stats", isFirstMerge: true));
        row0.Append(MakeCell("", isContinueMerge: true));
        row0.Append(MakeCell("", isContinueMerge: true));
        table.Append(row0);

        // Row 1: Product, Q1, Q2
        var row1 = new TableRow();
        row1.Append(MakeCell("Product"));
        row1.Append(MakeCell("Q1"));
        row1.Append(MakeCell("Q2"));
        table.Append(row1);

        // Row 2: data
        var row2 = new TableRow();
        row2.Append(MakeCell("Widgets"));
        row2.Append(MakeCell("$1,200"));
        row2.Append(MakeCell("$1,450"));
        table.Append(row2);

        return table;
    }

    private static TableCell MakeCell(string text, bool isFirstMerge = false, bool isContinueMerge = false)
    {
        var cell = new TableCell();
        var tcPr = new TableCellProperties(
            new TableCellWidth { Width = "3000", Type = TableWidthUnitValues.Dxa }
        );
        if (isFirstMerge)
            tcPr.Append(new HorizontalMerge { Val = MergedCellValues.Restart });
        else if (isContinueMerge)
            tcPr.Append(new HorizontalMerge());
        cell.Append(tcPr);
        cell.Append(new Paragraph(new Run(new Text(text))));
        return cell;
    }
}
