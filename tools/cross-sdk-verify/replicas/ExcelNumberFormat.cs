// Replica of examples/excel-number-format.ts
// Creates xlsx with 6 rows demonstrating built-in number formats.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelNumberFormat
{
    // Built-in number format IDs matching BuiltInNumberFormat in the TS lib:
    // INTEGER=1, DECIMAL_2=2, THOUSANDS_DECIMAL_2=4, PERCENT_DECIMAL_2=10, CURRENCY=44, DATE_SHORT=14
    private const uint FmtInteger = 1;
    private const uint FmtDecimal2 = 2;
    private const uint FmtThousandsDecimal2 = 4;
    private const uint FmtPercentDecimal2 = 10;
    private const uint FmtCurrency = 44;
    private const uint FmtDateShort = 14;

    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        // Stylesheet with cell formats referencing built-in number formats
        var stylesheet = BuildStylesheet();
        var stylePart = wbPart.AddNewPart<WorkbookStylesPart>();
        stylePart.Stylesheet = stylesheet;
        stylePart.Stylesheet.Save();

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

        // Row data: (label, raw value, style index)
        // Style indices match the order in BuildStylesheet CellFormats:
        // 0=default, 1=INTEGER, 2=DECIMAL_2, 3=THOUSANDS_DECIMAL_2,
        // 4=PERCENT_DECIMAL_2, 5=CURRENCY, 6=DATE_SHORT
        AddRow(sheetData, 1, "Integer:", "1234", 1);
        AddRow(sheetData, 2, "2 decimals:", "1234.5", 2);
        AddRow(sheetData, 3, "Thousands+2:", "1234567.89", 3);
        AddRow(sheetData, 4, "Percent:", "0.1234", 4);
        AddRow(sheetData, 5, "Currency:", "1234.5", 5);
        AddRow(sheetData, 6, "Date (serial):", "45431", 6);

        wbPart.Workbook.Save();
    }

    private static void AddRow(SheetData sd, int rowIdx, string label, string raw, uint styleIdx)
    {
        var row = new Row { RowIndex = (uint)rowIdx };

        // A: label (inline string)
        row.Append(new Cell
        {
            CellReference = $"A{rowIdx}",
            DataType = CellValues.String,
            CellValue = new CellValue(label)
        });

        // B: numeric value with number format style
        row.Append(new Cell
        {
            CellReference = $"B{rowIdx}",
            CellValue = new CellValue(raw),
            StyleIndex = styleIdx
        });

        sd.Append(row);
    }

    private static Stylesheet BuildStylesheet()
    {
        // We need one CellFormat per row (6 formats + 1 default = 7 total)
        var cellFormats = new CellFormats();
        cellFormats.Append(new CellFormat()); // 0: default
        cellFormats.Append(new CellFormat { NumberFormatId = FmtInteger, ApplyNumberFormat = true });       // 1
        cellFormats.Append(new CellFormat { NumberFormatId = FmtDecimal2, ApplyNumberFormat = true });      // 2
        cellFormats.Append(new CellFormat { NumberFormatId = FmtThousandsDecimal2, ApplyNumberFormat = true }); // 3
        cellFormats.Append(new CellFormat { NumberFormatId = FmtPercentDecimal2, ApplyNumberFormat = true }); // 4
        cellFormats.Append(new CellFormat { NumberFormatId = FmtCurrency, ApplyNumberFormat = true });     // 5
        cellFormats.Append(new CellFormat { NumberFormatId = FmtDateShort, ApplyNumberFormat = true });    // 6

        return new Stylesheet(
            new Fonts(new Font()),
            new Fills(new Fill(new PatternFill { PatternType = PatternValues.None })),
            new Borders(new Border()),
            cellFormats
        );
    }
}
