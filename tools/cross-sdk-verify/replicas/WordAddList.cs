// Replica of examples/word-add-list.ts
// Creates a docx with a header paragraph, a decimal numbered list (3 items),
// and a bullet list (3 items).

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddList
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Numbering part
        var numberingPart = mainPart.AddNewPart<NumberingDefinitionsPart>();
        numberingPart.Numbering = new Numbering();

        // Abstract num 1: decimal
        var abs1 = CreateAbstractNum(1, "decimal");
        numberingPart.Numbering.Append(abs1);
        // Abstract num 2: bullet
        var abs2 = CreateAbstractNum(2, "bullet");
        numberingPart.Numbering.Append(abs2);

        numberingPart.Numbering.Append(new NumberingInstance(new AbstractNumId { Val = 1 }) { NumberID = 1 });
        numberingPart.Numbering.Append(new NumberingInstance(new AbstractNumId { Val = 2 }) { NumberID = 2 });
        numberingPart.Numbering.Save();

        // Header paragraph
        body.Append(new Paragraph(new Run(new Text("Task list:"))));

        // Numbered list (decimal numId=1)
        foreach (var text in new[] { "Draft proposal", "Review with team", "Submit by Friday" })
            body.Append(MakeListItem(text, 1, 0));

        // Bullet list (numId=2)
        foreach (var text in new[] { "TypeScript", "OOXML", "Open source" })
            body.Append(MakeListItem(text, 2, 0));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static AbstractNum CreateAbstractNum(int id, string type)
    {
        var abs = new AbstractNum { AbstractNumberId = id };
        abs.Append(new MultiLevelType { Val = MultiLevelValues.HybridMultilevel });
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
                new Indentation { Left = ((lvl + 1) * 720).ToString(), Hanging = "360" }));
            abs.Append(level);
        }
        return abs;
    }

    private static Paragraph MakeListItem(string text, int numId, int level)
    {
        var pPr = new ParagraphProperties(
            new NumberingProperties(
                new NumberingLevelReference { Val = level },
                new NumberingId { Val = numId }
            )
        );
        return new Paragraph(pPr, new Run(new Text(text)));
    }
}
