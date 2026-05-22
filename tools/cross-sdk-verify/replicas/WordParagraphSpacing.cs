// Replica of examples/word-paragraph-spacing.ts
// Creates a docx with 6 paragraphs demonstrating spacing: before/after/line.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordParagraphSpacing
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        body.Append(MakePara("Default spacing."));
        body.Append(MakePara("Extra space before (240 dxa).", beforeDxa: 240));
        body.Append(MakePara("Extra space after (480 dxa).", afterDxa: 480));
        body.Append(MakePara("Double line spacing (lineDxa=480, auto rule).",
            lineDxa: 480, lineRule: LineSpacingRuleValues.Auto));
        body.Append(MakePara("Tight line (lineDxa=200, exact rule).",
            lineDxa: 200, lineRule: LineSpacingRuleValues.Exact));
        body.Append(MakePara("Everything combined: before=120 after=120 line=360 auto.",
            beforeDxa: 120, afterDxa: 120, lineDxa: 360, lineRule: LineSpacingRuleValues.Auto));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Paragraph MakePara(
        string text,
        int? beforeDxa = null,
        int? afterDxa = null,
        int? lineDxa = null,
        LineSpacingRuleValues? lineRule = null)
    {
        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        var para = new Paragraph(run);

        if (beforeDxa != null || afterDxa != null || lineDxa != null)
        {
            var spacing = new SpacingBetweenLines();
            if (beforeDxa != null) spacing.Before = beforeDxa.ToString();
            if (afterDxa != null) spacing.After = afterDxa.ToString();
            if (lineDxa != null) spacing.Line = lineDxa.ToString();
            if (lineRule != null) spacing.LineRule = lineRule.Value;

            var pPr = new ParagraphProperties();
            pPr.Append(spacing);
            para.PrependChild(pPr);
        }

        return para;
    }
}
