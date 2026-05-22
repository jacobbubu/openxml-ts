// Replica of examples/word-paragraph-flow.ts
// Creates a docx with 4 paragraphs demonstrating keepNext/keepLines/pageBreakBefore.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordParagraphFlow
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        body.Append(MakePara("Chapter 1 (heading)", keepNext: true, keepLines: true));
        body.Append(MakePara("First paragraph of chapter 1 body..."));
        body.Append(MakePara("Chapter 2 (page-break-before)",
            pageBreakBefore: true, keepNext: true, keepLines: true));
        body.Append(MakePara("First paragraph of chapter 2 body..."));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Paragraph MakePara(
        string text,
        bool keepNext = false,
        bool keepLines = false,
        bool pageBreakBefore = false)
    {
        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        var para = new Paragraph(run);

        if (keepNext || keepLines || pageBreakBefore)
        {
            var pPr = new ParagraphProperties();
            if (keepNext) pPr.Append(new KeepNext());
            if (keepLines) pPr.Append(new KeepLines());
            if (pageBreakBefore) pPr.Append(new PageBreakBefore());
            para.PrependChild(pPr);
        }

        return para;
    }
}
