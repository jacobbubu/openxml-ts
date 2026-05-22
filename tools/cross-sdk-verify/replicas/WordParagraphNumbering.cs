// Replica of examples/word-paragraph-numbering.ts
// Creates a docx with a decimal numbered list (2 levels) and a bullet list
// using p.numbering accessor (addNumberingDefinition).

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordParagraphNumbering
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Create numbering part
        var numberingPart = mainPart.AddNewPart<NumberingDefinitionsPart>();
        numberingPart.Numbering = new Numbering();

        // Abstract num 1: decimal (multi-level)
        var abstractNum1 = CreateAbstractNum(1, "decimal");
        numberingPart.Numbering.Append(abstractNum1);

        // Abstract num 2: bullet
        var abstractNum2 = CreateAbstractNum(2, "bullet");
        numberingPart.Numbering.Append(abstractNum2);

        // Numbering instances
        numberingPart.Numbering.Append(new NumberingInstance(
            new AbstractNumId { Val = 1 }) { NumberID = 1 });
        numberingPart.Numbering.Append(new NumberingInstance(
            new AbstractNumId { Val = 2 }) { NumberID = 2 });

        numberingPart.Numbering.Save();

        // Title paragraph
        body.Append(new Paragraph(new Run(new Text("Epic-54 示例：Paragraph.numbering 访问器"))));

        // Decimal list
        body.Append(MakeListItem("第一项", 1, 0));
        body.Append(MakeListItem("第一项子项 A", 1, 1));
        body.Append(MakeListItem("第一项子项 B", 1, 1));
        body.Append(MakeListItem("第二项", 1, 0));
        body.Append(MakeListItem("第三项", 1, 0));

        // Bullet list
        body.Append(MakeListItem("TypeScript", 2, 0));
        body.Append(MakeListItem("OOXML", 2, 0));
        body.Append(MakeListItem("Open source", 2, 0));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static AbstractNum CreateAbstractNum(int abstractNumId, string type)
    {
        var abstractNum = new AbstractNum { AbstractNumberId = abstractNumId };
        abstractNum.Append(new MultiLevelType { Val = MultiLevelValues.HybridMultilevel });

        // Create 9 levels
        for (int lvl = 0; lvl < 9; lvl++)
        {
            var level = new Level { LevelIndex = lvl };
            level.Append(new StartNumberingValue { Val = 1 });

            if (type == "decimal")
            {
                level.Append(new NumberingFormat { Val = NumberFormatValues.Decimal });
                level.Append(new LevelText { Val = $"%{lvl + 1}." });
            }
            else
            {
                level.Append(new NumberingFormat { Val = NumberFormatValues.Bullet });
                level.Append(new LevelText { Val = "•" });
            }

            level.Append(new LevelJustification { Val = LevelJustificationValues.Left });
            level.Append(new PreviousParagraphProperties(
                new Indentation
                {
                    Left = ((lvl + 1) * 720).ToString(),
                    Hanging = "360"
                }
            ));
            abstractNum.Append(level);
        }

        return abstractNum;
    }

    private static Paragraph MakeListItem(string text, int numId, int level)
    {
        var numPr = new NumberingProperties(
            new NumberingLevelReference { Val = level },
            new NumberingId { Val = numId }
        );
        var pPr = new ParagraphProperties(numPr);
        return new Paragraph(pPr, new Run(new Text(text)));
    }
}
