// Replica of examples/excel-freeze-panes.ts
// Creates xlsx with 12 rows × 4 cols and freeze panes (rows=1, cols=1).

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelFreezePanes
{
    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();
        var sheetData = new SheetData();

        // SheetViews with freeze pane
        var sheetViews = new SheetViews();
        var sheetView = new SheetView { TabSelected = true, WorkbookViewId = 0 };
        // Freeze rows=1, cols=1 → xSplit=1, ySplit=1, topLeftCell=B2
        sheetView.Append(new Pane
        {
            HorizontalSplit = 1,
            VerticalSplit = 1,
            TopLeftCell = "B2",
            ActivePane = PaneValues.BottomRight,
            State = PaneStateValues.Frozen
        });
        sheetView.Append(new Selection { Pane = PaneValues.TopRight });
        sheetView.Append(new Selection { Pane = PaneValues.BottomLeft });
        sheetView.Append(new Selection { Pane = PaneValues.BottomRight, ActiveCell = "B2", SequenceOfReferences = new ListValue<StringValue> { InnerText = "B2" } });
        sheetViews.Append(sheetView);

        wsPart.Worksheet = new Worksheet();
        wsPart.Worksheet.Append(sheetViews);
        wsPart.Worksheet.Append(sheetData);

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Row 1: headers
        AddRow(sheetData, 1, ["Header A", "Header B", "Header C", "Header D"]);

        // Rows 2-12: data
        for (int i = 2; i <= 12; i++)
            AddRow(sheetData, i, [$"row{i}", $"B{i}", $"C{i}", $"D{i}"]);

        wbPart.Workbook.Save();
    }

    private static void AddRow(SheetData sd, int rowIndex, string[] values)
    {
        var row = new Row { RowIndex = (uint)rowIndex };
        string[] cols = ["A", "B", "C", "D"];
        for (int c = 0; c < values.Length; c++)
        {
            row.Append(new Cell
            {
                CellReference = $"{cols[c]}{rowIndex}",
                DataType = CellValues.String,
                CellValue = new CellValue(values[c])
            });
        }
        sd.Append(row);
    }
}
