// Replica of examples/excel-column-row-sizing.ts
// Creates xlsx with custom column widths and row heights.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelColumnRowSizing
{
    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();

        // Column widths: col1=30, col2-3=15, col4=50
        var cols = new Columns();
        cols.Append(new Column { Min = 1, Max = 1, Width = 30, CustomWidth = true });
        cols.Append(new Column { Min = 2, Max = 3, Width = 15, CustomWidth = true });
        cols.Append(new Column { Min = 4, Max = 4, Width = 50, CustomWidth = true });

        var sheetData = new SheetData();
        wsPart.Worksheet = new Worksheet();
        wsPart.Worksheet.Append(cols);
        wsPart.Worksheet.Append(sheetData);

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Header row (height 40)
        AddRow(sheetData, 1, 40, ["商品名称", "数量", "单价", "备注（最长一列）"]);

        // Data rows (height 18)
        for (int i = 2; i <= 5; i++)
        {
            AddRow(sheetData, i, 18, [
                $"商品-{i}",
                (i * 3).ToString(),
                "9.9",
                $"备注行 {i}：本行较长"
            ]);
        }

        wbPart.Workbook.Save();
    }

    private static void AddRow(SheetData sd, int rowIndex, double heightPt, string[] values)
    {
        var row = new Row
        {
            RowIndex = (uint)rowIndex,
            Height = heightPt,
            CustomHeight = true
        };

        for (int c = 0; c < values.Length; c++)
        {
            var colLetter = ((char)('A' + c)).ToString();
            var cellRef = $"{colLetter}{rowIndex}";
            row.Append(new Cell
            {
                CellReference = cellRef,
                DataType = CellValues.String,
                CellValue = new CellValue(values[c])
            });
        }
        sd.Append(row);
    }
}
