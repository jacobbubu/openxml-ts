// Replica of examples/word-paragraph-style.ts
// Creates a docx with 5 paragraphs referencing paragraph style IDs:
// Heading1, (plain), Heading2, Quote, (plain)

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordParagraphStyle
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        AddStyled(body, "Heading1", "Section 1 (Heading1 style)");
        AddStyled(body, null, "Plain body text.");
        AddStyled(body, "Heading2", "Subsection (Heading2 style)");
        AddStyled(body, "Quote", "An inspirational quote (Quote style).");
        AddStyled(body, null, "Another body paragraph.");

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static void AddStyled(Body body, string? styleId, string text)
    {
        var para = new Paragraph();
        if (styleId != null)
        {
            var pPr = new ParagraphProperties(
                new ParagraphStyleId { Val = styleId }
            );
            para.Append(pPr);
        }
        para.Append(new Run(new Text(text)));
        body.Append(para);
    }
}
