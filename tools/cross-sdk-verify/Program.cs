// Cross-SDK Verify – entry point
//
// Commands:
//   extract <file>                → print semantic digest JSON to stdout
//   extract-core <file>           → print core-properties digest JSON to stdout
//   generate <name> <file>        → run the named C# replica and write to <file>
//   generate-prefix <name> <pfx>  → run set-core-properties replica writing <pfx>.docx/.xlsx/.pptx
//   run-stdout <name> [input]     → run the named stdout replica, print its output
//
// Example names (batch 1):
//   word-create  word-run-formatting  word-paragraph-format  word-add-table
//   excel-create  excel-cell-value  excel-cell-formula  excel-freeze-panes  excel-merge-cells
//   ppt-create  ppt-multi-slide  ppt-add-table  ppt-speaker-notes
//
// Example names (batch 2):
//   word-add-hyperlink  word-page-setup  word-add-header-footer  word-header-footer
//   word-paragraph-spacing  word-paragraph-flow  word-run-fonts
//   excel-column-row-sizing  excel-number-format  excel-sheet-metadata
//   ppt-add-notes  ppt-set-titles  ppt-paragraph-formatting  ppt-run-formatting
//
// Example names (batch 3):
//   word-paragraph-style  word-paragraph-numbering  word-run-style  word-styled-doc
//   word-add-list  word-add-bookmark  word-add-comment  word-add-revision
//   word-tab-stops  word-merge-cells  word-table-shading  word-footnotes
//   word-page-numbers  word-replace  word-add-image
//   excel-defined-names  excel-data-validations  excel-replace  excel-add-image
//   ppt-shape-xfrm  ppt-shape-rotation  ppt-hidden-slide  ppt-transitions
//   ppt-slide-backgrounds  ppt-merge-cells  ppt-picture-crop  ppt-shape-accessibility
//   ppt-replace  ppt-add-image
//
// Example names (batch 4 – stdout mode):
//   set-core-properties  word-text-extract  word-style-inspect  linq-tutorial

using CrossSdkVerify;
using CrossSdkVerify.Replicas;

if (args.Length < 2)
{
    Console.Error.WriteLine("Usage: CrossSdkVerify <extract|extract-core|generate|generate-prefix|run-stdout> <args...>");
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

if (command == "extract-core")
{
    var filePath = args[1];
    if (!File.Exists(filePath))
    {
        Console.Error.WriteLine($"File not found: {filePath}");
        return 1;
    }
    Console.WriteLine(CorePropertiesExtractor.Extract(filePath));
    return 0;
}

if (command == "run-stdout")
{
    if (args.Length < 2)
    {
        Console.Error.WriteLine("Usage: CrossSdkVerify run-stdout <name> [input-file]");
        return 1;
    }
    var name = args[1];
    var inputArg = args.Length >= 3 ? args[2] : null;

    try
    {
        switch (name)
        {
            case "word-text-extract":
                if (inputArg == null) { Console.Error.WriteLine("word-text-extract requires an input file"); return 1; }
                WordTextExtract.Run(inputArg);
                break;
            case "word-style-inspect":
                if (inputArg == null) { Console.Error.WriteLine("word-style-inspect requires an input file"); return 1; }
                WordStyleInspect.Run(inputArg);
                break;
            case "linq-tutorial":
                LinqTutorial.Run();
                break;
            default:
                Console.Error.WriteLine($"Unknown stdout example: {name}");
                return 1;
        }
        return 0;
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error running {name}: {ex}");
        return 1;
    }
}

if (command == "generate-prefix")
{
    if (args.Length < 3)
    {
        Console.Error.WriteLine("Usage: CrossSdkVerify generate-prefix <name> <output-prefix>");
        return 1;
    }
    var name = args[1];
    var outputPrefix = args[2];

    try
    {
        switch (name)
        {
            case "set-core-properties":
                SetCoreProperties.Run(outputPrefix);
                break;
            default:
                Console.Error.WriteLine($"Unknown prefix example: {name}");
                return 1;
        }
        Console.WriteLine($"Generated: {outputPrefix}.docx/.xlsx/.pptx");
        return 0;
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error generating {name}: {ex}");
        return 1;
    }
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
            // Batch 2
            case "word-add-hyperlink":
                WordAddHyperlink.Run(outputPath);
                break;
            case "word-page-setup":
                WordPageSetup.Run(outputPath);
                break;
            case "word-add-header-footer":
                WordAddHeaderFooter.Run(outputPath);
                break;
            case "word-header-footer":
                WordHeaderFooter.Run(outputPath);
                break;
            case "word-paragraph-spacing":
                WordParagraphSpacing.Run(outputPath);
                break;
            case "word-paragraph-flow":
                WordParagraphFlow.Run(outputPath);
                break;
            case "word-run-fonts":
                WordRunFonts.Run(outputPath);
                break;
            case "excel-column-row-sizing":
                ExcelColumnRowSizing.Run(outputPath);
                break;
            case "excel-number-format":
                ExcelNumberFormat.Run(outputPath);
                break;
            case "excel-sheet-metadata":
                ExcelSheetMetadata.Run(outputPath);
                break;
            case "ppt-add-notes":
                PptAddNotes.Run(outputPath);
                break;
            case "ppt-set-titles":
                PptSetTitles.Run(outputPath);
                break;
            case "ppt-paragraph-formatting":
                PptParagraphFormatting.Run(outputPath);
                break;
            case "ppt-run-formatting":
                PptRunFormatting.Run(outputPath);
                break;
            // Batch 3
            case "word-paragraph-style":
                WordParagraphStyle.Run(outputPath);
                break;
            case "word-paragraph-numbering":
                WordParagraphNumbering.Run(outputPath);
                break;
            case "word-run-style":
                WordRunStyle.Run(outputPath);
                break;
            case "word-styled-doc":
                WordStyledDoc.Run(outputPath);
                break;
            case "word-add-list":
                WordAddList.Run(outputPath);
                break;
            case "word-add-bookmark":
                WordAddBookmark.Run(outputPath);
                break;
            case "word-add-comment":
                WordAddComment.Run(outputPath);
                break;
            case "word-add-revision":
                WordAddRevision.Run(outputPath);
                break;
            case "word-tab-stops":
                WordTabStops.Run(outputPath);
                break;
            case "word-merge-cells":
                WordMergeCells.Run(outputPath);
                break;
            case "word-table-shading":
                WordTableShading.Run(outputPath);
                break;
            case "word-footnotes":
                WordFootnotes.Run(outputPath);
                break;
            case "word-page-numbers":
                WordPageNumbers.Run(outputPath);
                break;
            case "word-replace":
                WordReplace.Run(outputPath);
                break;
            case "word-add-image":
                WordAddImage.Run(outputPath);
                break;
            case "excel-defined-names":
                ExcelDefinedNames.Run(outputPath);
                break;
            case "excel-data-validations":
                ExcelDataValidations.Run(outputPath);
                break;
            case "excel-replace":
                ExcelReplace.Run(outputPath);
                break;
            case "excel-add-image":
                ExcelAddImage.Run(outputPath);
                break;
            case "ppt-shape-xfrm":
                PptShapeXfrm.Run(outputPath);
                break;
            case "ppt-shape-rotation":
                PptShapeRotation.Run(outputPath);
                break;
            case "ppt-hidden-slide":
                PptHiddenSlide.Run(outputPath);
                break;
            case "ppt-transitions":
                PptTransitions.Run(outputPath);
                break;
            case "ppt-slide-backgrounds":
                PptSlideBackgrounds.Run(outputPath);
                break;
            case "ppt-merge-cells":
                PptMergeCells.Run(outputPath);
                break;
            case "ppt-picture-crop":
                PptPictureCrop.Run(outputPath);
                break;
            case "ppt-shape-accessibility":
                PptShapeAccessibility.Run(outputPath);
                break;
            case "ppt-replace":
                PptReplace.Run(outputPath);
                break;
            case "ppt-add-image":
                PptAddImage.Run(outputPath);
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
