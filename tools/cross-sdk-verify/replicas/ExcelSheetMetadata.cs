// Replica of examples/excel-sheet-metadata.ts
// Creates xlsx demonstrating tab color set to FFFF0000 (red), sheet visible, activeSheet=0.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelSheetMetadata
{
    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();

        // SheetView with workbookViewId=0 (sets activeTab via BookView)
        var sheetViews = new SheetViews(
            new SheetView { TabSelected = true, WorkbookViewId = 0 });

        // Tab color: FFFF0000 (the TS example ends with red after clear+set)
        var sheetPr = new SheetProperties(
            new TabColor { Rgb = "FFFF0000" });

        var sheetData = new SheetData();
        wsPart.Worksheet = new Worksheet();
        wsPart.Worksheet.Append(sheetPr);
        wsPart.Worksheet.Append(sheetViews);
        wsPart.Worksheet.Append(sheetData);

        // Write the single demo cell A1
        var row = new Row { RowIndex = 1 };
        row.Append(new Cell
        {
            CellReference = "A1",
            DataType = CellValues.String,
            CellValue = new CellValue("Epic-62 Sheet 视觉元数据演示")
        });
        sheetData.Append(row);

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
            // State omitted → visible (default)
        });

        // BookView: activeTab=0
        wbPart.Workbook.PrependChild(new BookViews(
            new WorkbookView { ActiveTab = 0 }));

        wbPart.Workbook.Save();
    }
}
