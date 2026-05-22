// Replica of examples/excel-merge-cells.ts
// Creates xlsx with merged cells: A1:D1, A2:B2, C2:D2.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelMergeCells
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

        // Row 1: title spanning A1:D1
        var titleRow = new Row { RowIndex = 1 };
        titleRow.Append(MakeStringCell("A1", "2024 年度销售报告"));
        sheetData.Append(titleRow);

        // Row 2: group headers A2:B2 = 一季度, C2:D2 = 二季度
        var groupRow = new Row { RowIndex = 2 };
        groupRow.Append(MakeStringCell("A2", "一季度"));
        groupRow.Append(MakeStringCell("C2", "二季度"));
        sheetData.Append(groupRow);

        // Row 3: column headers
        var headerRow = new Row { RowIndex = 3 };
        headerRow.Append(MakeStringCell("A3", "产品"));
        headerRow.Append(MakeStringCell("B3", "销量"));
        headerRow.Append(MakeStringCell("C3", "产品"));
        headerRow.Append(MakeStringCell("D3", "销量"));
        sheetData.Append(headerRow);

        // Data rows
        string[][] data =
        [
            ["手机", "1200", "平板", "800"],
            ["笔记本", "560", "显示器", "340"],
            ["耳机", "2100", "键盘", "970"],
        ];
        string[] cols = ["A", "B", "C", "D"];
        for (int i = 0; i < data.Length; i++)
        {
            int rowIdx = i + 4;
            var row = new Row { RowIndex = (uint)rowIdx };
            for (int c = 0; c < data[i].Length; c++)
                row.Append(MakeStringCell($"{cols[c]}{rowIdx}", data[i][c]));
            sheetData.Append(row);
        }

        // Merge cells
        var mergeCells = new MergeCells();
        mergeCells.Append(new MergeCell { Reference = "A1:D1" });
        mergeCells.Append(new MergeCell { Reference = "A2:B2" });
        mergeCells.Append(new MergeCell { Reference = "C2:D2" });
        wsPart.Worksheet.Append(mergeCells);

        wbPart.Workbook.Save();
    }

    private static Cell MakeStringCell(string cellRef, string value) =>
        new Cell
        {
            CellReference = cellRef,
            DataType = CellValues.String,
            CellValue = new CellValue(value)
        };
}
