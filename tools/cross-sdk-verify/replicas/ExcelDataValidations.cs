// Replica of examples/excel-data-validations.ts
// Creates an xlsx with header row + 10 data rows, 3 data validations:
//   A2:A11 - list (fruits)
//   B2:B11 - whole number range 1-1000
//   C2:C11 - decimal range 0.01-9999.99

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelDataValidations
{
    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();
        var sheetData = new SheetData();
        var ws = new Worksheet(sheetData);

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Header row
        var headerRow = new Row { RowIndex = 1 };
        headerRow.Append(MakeStrCell("A1", "水果选择（A 列）"));
        headerRow.Append(MakeStrCell("B1", "数量（B 列）"));
        headerRow.Append(MakeStrCell("C1", "价格（C 列，小数）"));
        sheetData.Append(headerRow);

        // Empty data rows 2-11
        for (uint i = 2; i <= 11; i++)
            sheetData.Append(new Row { RowIndex = i });

        // Data validations
        var dvList = new DataValidations();

        // A2:A11 - list validation
        dvList.Append(new DataValidation
        {
            Type = DataValidationValues.List,
            SequenceOfReferences = new ListValue<StringValue> { InnerText = "A2:A11" },
            Formula1 = new Formula1("\"苹果,香蕉,樱桃,橙子,西瓜\""),
            ShowInputMessage = true,
            ShowErrorMessage = true,
            PromptTitle = new StringValue("请选择水果"),
            Prompt = new StringValue("从下拉列表中选择一种水果"),
            ErrorTitle = new StringValue("无效输入"),
            Error = new StringValue("请从列表中选择水果"),
        });

        // B2:B11 - whole number 1-1000
        dvList.Append(new DataValidation
        {
            Type = DataValidationValues.Whole,
            Operator = DataValidationOperatorValues.Between,
            SequenceOfReferences = new ListValue<StringValue> { InnerText = "B2:B11" },
            Formula1 = new Formula1("1"),
            Formula2 = new Formula2("1000"),
            ShowInputMessage = true,
            ShowErrorMessage = true,
            PromptTitle = new StringValue("请输入数量"),
            Prompt = new StringValue("请输入 1 到 1000 之间的整数"),
            ErrorTitle = new StringValue("无效数量"),
            Error = new StringValue("数量必须是 1 到 1000 之间的整数"),
        });

        // C2:C11 - decimal 0.01-9999.99
        dvList.Append(new DataValidation
        {
            Type = DataValidationValues.Decimal,
            Operator = DataValidationOperatorValues.Between,
            SequenceOfReferences = new ListValue<StringValue> { InnerText = "C2:C11" },
            Formula1 = new Formula1("0.01"),
            Formula2 = new Formula2("9999.99"),
            ShowInputMessage = true,
            ShowErrorMessage = true,
            PromptTitle = new StringValue("请输入价格"),
            Prompt = new StringValue("请输入 0.01 到 9999.99 之间的价格"),
        });

        ws.Append(dvList);
        wsPart.Worksheet = ws;
        wbPart.Workbook.Save();
    }

    private static Cell MakeStrCell(string cellRef, string value) =>
        new Cell
        {
            CellReference = cellRef,
            DataType = CellValues.String,
            CellValue = new CellValue(value)
        };
}
