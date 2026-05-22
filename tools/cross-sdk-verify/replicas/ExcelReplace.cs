// Replica of examples/excel-replace.ts
// Creates an xlsx template with "{{client}}" placeholder, opens it, replaces with "Acme Corp".

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelReplace
{
    private const string Client = "Acme Corp";

    public static void Run(string outputPath)
    {
        var tempPath = Path.GetTempFileName() + ".xlsx";
        try
        {
            BuildTemplate(tempPath);
            ApplyReplace(tempPath, outputPath);
        }
        finally
        {
            if (File.Exists(tempPath)) File.Delete(tempPath);
        }
    }

    private static void BuildTemplate(string path)
    {
        using var doc = SpreadsheetDocument.Create(path,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();
        var sheetData = new SheetData();
        wsPart.Worksheet = new Worksheet(sheetData);

        wbPart.Workbook.AppendChild(new Sheets()).Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Two rows with {{client}} placeholder
        var r1 = new Row { RowIndex = 1 };
        r1.Append(MakeStrCell("A1", "Dear {{client}},"));
        sheetData.Append(r1);

        var r2 = new Row { RowIndex = 2 };
        r2.Append(MakeStrCell("A2", "Thank you, {{client}}."));
        sheetData.Append(r2);

        wbPart.Workbook.Save();
    }

    private static void ApplyReplace(string inputPath, string outputPath)
    {
        File.Copy(inputPath, outputPath, overwrite: true);

        using var doc = SpreadsheetDocument.Open(outputPath, true);
        var wb = doc.WorkbookPart;
        if (wb == null) return;

        foreach (var wsp in wb.WorksheetParts)
        {
            foreach (var cell in wsp.Worksheet.Descendants<Cell>())
            {
                var v = cell.CellValue;
                if (v?.Text?.Contains("{{client}}") == true)
                    v.Text = v.Text.Replace("{{client}}", Client);
            }
        }

        wb.Workbook.Save();
    }

    private static Cell MakeStrCell(string cellRef, string value) =>
        new Cell
        {
            CellReference = cellRef,
            DataType = CellValues.String,
            CellValue = new CellValue(value)
        };
}
