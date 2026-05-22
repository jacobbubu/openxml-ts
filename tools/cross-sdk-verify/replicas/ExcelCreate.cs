// Replica of examples/excel-create.ts
// Creates an xlsx with 3 rows × 5 cols of inline string cells.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelCreate
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

        string[][] data =
        [
            ["Hello", "from", "openxml-ts", "(.NET", "port)"],
            ["row", "2", "with", "5", "cells"],
            ["row", "3", "more", "demo", "data"],
        ];

        for (int rowIdx = 0; rowIdx < data.Length; rowIdx++)
        {
            var row = new Row { RowIndex = (uint)(rowIdx + 1) };
            for (int colIdx = 0; colIdx < data[rowIdx].Length; colIdx++)
            {
                var cellRef = $"{(char)('A' + colIdx)}{rowIdx + 1}";
                var cell = new Cell
                {
                    CellReference = cellRef,
                    DataType = CellValues.InlineString,
                    InlineString = new InlineString(new Text(data[rowIdx][colIdx]))
                };
                row.Append(cell);
            }
            sheetData.Append(row);
        }

        wbPart.Workbook.Save();
    }
}
