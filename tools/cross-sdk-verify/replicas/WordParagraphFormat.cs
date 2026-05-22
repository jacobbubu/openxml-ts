// Replica of examples/word-paragraph-format.ts
// Creates a docx with 6 paragraphs demonstrating alignment and indentation.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordParagraphFormat
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        body.Append(MakePara("Default left aligned."));
        body.Append(MakePara("This is centered.", align: "center"));
        body.Append(MakePara("This is right aligned.", align: "right"));
        body.Append(MakePara("Indented left 720 dxa (≈ 0.5 inch).", leftDxa: 720));
        body.Append(MakePara("First line indent 480 dxa.", firstLineDxa: 480));
        body.Append(MakePara("Hanging indent 360 dxa with left base 720 dxa.", leftDxa: 720, hangingDxa: 360));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Paragraph MakePara(
        string text,
        string? align = null,
        int? leftDxa = null,
        int? firstLineDxa = null,
        int? hangingDxa = null)
    {
        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        var para = new Paragraph(run);

        var pPr = new ParagraphProperties();
        bool hasPPr = false;

        if (align != null)
        {
            var jc = align == "center" ? JustificationValues.Center
                   : align == "right"  ? JustificationValues.Right
                   : JustificationValues.Left;
            pPr.Append(new Justification { Val = jc });
            hasPPr = true;
        }

        if (leftDxa != null || firstLineDxa != null || hangingDxa != null)
        {
            var indent = new Indentation();
            if (leftDxa != null) indent.Left = leftDxa.ToString();
            if (firstLineDxa != null) indent.FirstLine = firstLineDxa.ToString();
            if (hangingDxa != null) indent.Hanging = hangingDxa.ToString();
            pPr.Append(indent);
            hasPPr = true;
        }

        if (hasPPr)
            para.PrependChild(pPr);

        return para;
    }
}
