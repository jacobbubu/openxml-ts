// Replica of examples/excel-defined-names.ts
// Creates an xlsx with 4 defined names: Revenue, Expenses, Total (hidden), LocalRange (localSheetId=0).

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelDefinedNames
{
    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();
        wsPart.Worksheet = new Worksheet(new SheetData());

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Defined names
        var definedNames = new DefinedNames();

        // Revenue
        definedNames.Append(new DefinedName("Sheet1!$A$2:$A$10") { Name = "Revenue" });

        // Expenses
        definedNames.Append(new DefinedName("Sheet1!$B$2:$B$10") { Name = "Expenses" });

        // Total (hidden)
        definedNames.Append(new DefinedName("Revenue-Expenses") { Name = "Total", Hidden = true });

        // LocalRange (localSheetId=0)
        definedNames.Append(new DefinedName("Sheet1!$C$1") { Name = "LocalRange", LocalSheetId = 0 });

        wbPart.Workbook.Append(definedNames);
        wbPart.Workbook.Save();
    }
}
