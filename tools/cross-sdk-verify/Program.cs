// Cross-SDK Verify – entry point
//
// Commands:
//   extract <file>          → print semantic digest JSON to stdout
//   generate <name> <file>  → run the named C# replica and write to <file>
//
// Example names (batch 1):
//   word-create  word-run-formatting  word-paragraph-format  word-add-table
//   excel-create  excel-cell-value  excel-cell-formula  excel-freeze-panes  excel-merge-cells
//   ppt-create  ppt-multi-slide  ppt-add-table  ppt-speaker-notes

using CrossSdkVerify;
using CrossSdkVerify.Replicas;

if (args.Length < 2)
{
    Console.Error.WriteLine("Usage: CrossSdkVerify <extract|generate> <args...>");
    return 1;
}

var command = args[0];

if (command == "extract")
{
    var filePath = args[1];
    if (!File.Exists(filePath))
    {
        Console.Error.WriteLine($"File not found: {filePath}");
        return 1;
    }
    Console.WriteLine(DigestExtractor.Extract(filePath));
    return 0;
}

if (command == "generate")
{
    if (args.Length < 3)
    {
        Console.Error.WriteLine("Usage: CrossSdkVerify generate <name> <output-file>");
        return 1;
    }
    var name = args[1];
    var outputPath = args[2];

    try
    {
        switch (name)
        {
            case "word-create":
                WordCreate.Run(outputPath);
                break;
            case "word-run-formatting":
                WordRunFormatting.Run(outputPath);
                break;
            case "word-paragraph-format":
                WordParagraphFormat.Run(outputPath);
                break;
            case "word-add-table":
                WordAddTable.Run(outputPath);
                break;
            case "excel-create":
                ExcelCreate.Run(outputPath);
                break;
            case "excel-cell-value":
                ExcelCellValue.Run(outputPath);
                break;
            case "excel-cell-formula":
                ExcelCellFormula.Run(outputPath);
                break;
            case "excel-freeze-panes":
                ExcelFreezePanes.Run(outputPath);
                break;
            case "excel-merge-cells":
                ExcelMergeCells.Run(outputPath);
                break;
            case "ppt-create":
                PptCreate.Run(outputPath);
                break;
            case "ppt-multi-slide":
                PptMultiSlide.Run(outputPath);
                break;
            case "ppt-add-table":
                PptAddTable.Run(outputPath);
                break;
            case "ppt-speaker-notes":
                PptSpeakerNotes.Run(outputPath);
                break;
            default:
                Console.Error.WriteLine($"Unknown example name: {name}");
                Console.Error.WriteLine("Known names: word-create, word-run-formatting, word-paragraph-format, word-add-table, excel-create, excel-cell-value, excel-cell-formula, excel-freeze-panes, excel-merge-cells, ppt-create, ppt-multi-slide, ppt-add-table, ppt-speaker-notes");
                return 1;
        }
        Console.WriteLine($"Generated: {outputPath}");
        return 0;
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error generating {name}: {ex}");
        return 1;
    }
}

Console.Error.WriteLine($"Unknown command: {command}");
return 1;
