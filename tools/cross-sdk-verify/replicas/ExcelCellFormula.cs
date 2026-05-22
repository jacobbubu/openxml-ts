// Replica of examples/excel-cell-formula.ts
// Creates xlsx with data rows A1:A5 and formula rows for SUM/AVERAGE/MAX/MIN.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelCellFormula
{
    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();
        var sheetData = new SheetData();
        wsPart.Worksheet = new Worksheet(sheetData);

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Data rows A1:A5 = 10,20,30,40,50
        int[] dataValues = [10, 20, 30, 40, 50];
        for (int i = 0; i < dataValues.Length; i++)
        {
            var row = new Row { RowIndex = (uint)(i + 1) };
            var cell = new Cell
            {
                CellReference = $"A{i + 1}",
                CellValue = new CellValue(dataValues[i].ToString())
            };
            row.Append(cell);
            sheetData.Append(row);
        }

        // Row 7: SUM label + SUM formula
        var sumRow = new Row { RowIndex = 7 };
        sumRow.Append(MakeInlineStringCell("A7", "SUM"));
        sumRow.Append(MakeFormulaCell("B7", "SUM(A1:A5)", "150"));
        sheetData.Append(sumRow);

        // Row 8: AVERAGE
        var avgRow = new Row { RowIndex = 8 };
        avgRow.Append(MakeInlineStringCell("A8", "AVERAGE"));
        avgRow.Append(MakeFormulaCell("B8", "AVERAGE(A1:A5)", "30"));
        sheetData.Append(avgRow);

        // Row 9: MAX
        var maxRow = new Row { RowIndex = 9 };
        maxRow.Append(MakeInlineStringCell("A9", "MAX"));
        maxRow.Append(MakeFormulaCell("B9", "MAX(A1:A5)", "50"));
        sheetData.Append(maxRow);

        // Row 10: MIN
        var minRow = new Row { RowIndex = 10 };
        minRow.Append(MakeInlineStringCell("A10", "MIN"));
        minRow.Append(MakeFormulaCell("B10", "MIN(A1:A5)", "10"));
        sheetData.Append(minRow);

        wbPart.Workbook.Save();
    }

    private static Cell MakeInlineStringCell(string cellRef, string value) =>
        new Cell
        {
            CellReference = cellRef,
            DataType = CellValues.InlineString,
            InlineString = new InlineString(new Text(value))
        };

    private static Cell MakeFormulaCell(string cellRef, string formula, string cachedValue) =>
        new Cell
        {
            CellReference = cellRef,
            CellFormula = new CellFormula(formula),
            CellValue = new CellValue(cachedValue)
        };
}
