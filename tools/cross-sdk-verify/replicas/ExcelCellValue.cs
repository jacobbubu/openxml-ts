// Replica of examples/excel-cell-value.ts
// Creates xlsx demonstrating number/string/boolean/Date typed cell values.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelCellValue
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

        // Row 1: headers (inline strings)
        var headerRow = new Row { RowIndex = 1 };
        headerRow.Append(MakeInlineStringCell("A1", "Type"));
        headerRow.Append(MakeInlineStringCell("B1", "Value (set)"));
        headerRow.Append(MakeInlineStringCell("C1", "Value (read back)"));
        sheetData.Append(headerRow);

        // Row 2: number (Math.PI)
        var row2 = new Row { RowIndex = 2 };
        row2.Append(MakeInlineStringCell("A2", "number"));
        row2.Append(MakeNumberCell("B2", Math.PI));
        row2.Append(MakeNumberCell("C2", Math.PI));
        sheetData.Append(row2);

        // Row 3: string
        var row3 = new Row { RowIndex = 3 };
        row3.Append(MakeInlineStringCell("A3", "string"));
        row3.Append(MakeInlineStringCell("B3", "Hello, Excel!"));
        row3.Append(MakeInlineStringCell("C3", "Hello, Excel!"));
        sheetData.Append(row3);

        // Row 4: boolean true
        var row4 = new Row { RowIndex = 4 };
        row4.Append(MakeInlineStringCell("A4", "boolean (true)"));
        row4.Append(MakeBoolCell("B4", true));
        row4.Append(MakeInlineStringCell("C4", "true"));
        sheetData.Append(row4);

        // Row 5: boolean false
        var row5 = new Row { RowIndex = 5 };
        row5.Append(MakeInlineStringCell("A5", "boolean (false)"));
        row5.Append(MakeBoolCell("B5", false));
        row5.Append(MakeInlineStringCell("C5", "false"));
        sheetData.Append(row5);

        // Row 6: Date 2024-06-15 → Excel serial 45458
        // Excel serial = days since 1900-01-01 (with 1900 leap year bug)
        var row6 = new Row { RowIndex = 6 };
        row6.Append(MakeInlineStringCell("A6", "Date (2024-06-15)"));
        double dateSerial = DateToExcelSerial(new DateTime(2024, 6, 15, 0, 0, 0, DateTimeKind.Utc));
        row6.Append(MakeNumberCell("B6", dateSerial));
        row6.Append(MakeInlineStringCell("C6", $"serial={dateSerial}"));
        sheetData.Append(row6);

        // Row 7: undefined (clear) → B7 empty
        var row7 = new Row { RowIndex = 7 };
        row7.Append(MakeInlineStringCell("A7", "undefined (clear)"));
        // B7: empty cell (value was set then cleared)
        var emptyCell = new Cell { CellReference = "B7" };
        row7.Append(emptyCell);
        row7.Append(MakeInlineStringCell("C7", "undefined"));
        sheetData.Append(row7);

        wbPart.Workbook.Save();
    }

    private static Cell MakeInlineStringCell(string cellRef, string value) =>
        new Cell
        {
            CellReference = cellRef,
            DataType = CellValues.InlineString,
            InlineString = new InlineString(new Text(value))
        };

    private static Cell MakeNumberCell(string cellRef, double value) =>
        new Cell
        {
            CellReference = cellRef,
            CellValue = new CellValue(value.ToString("R", System.Globalization.CultureInfo.InvariantCulture))
        };

    private static Cell MakeBoolCell(string cellRef, bool value) =>
        new Cell
        {
            CellReference = cellRef,
            DataType = CellValues.Boolean,
            CellValue = new CellValue(value ? "1" : "0")
        };

    private static double DateToExcelSerial(DateTime date)
    {
        // Excel epoch: 1899-12-30 (serial 0), so 1900-01-01 = serial 1.
        // The standard offset used by all modern spreadsheet apps.
        var epoch = new DateTime(1899, 12, 30, 0, 0, 0, DateTimeKind.Utc);
        return (date - epoch).TotalDays;
    }
}
