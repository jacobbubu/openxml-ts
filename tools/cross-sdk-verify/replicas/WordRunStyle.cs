// Replica of examples/word-run-style.ts
// Creates a docx with 3 paragraphs demonstrating run character style references.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordRunStyle
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Line 1: mixed run styles
        var p1 = new Paragraph();
        p1.Append(MakeRun(null, "Body text with a "));
        p1.Append(MakeRun("Strong", "Strong word"));
        p1.Append(MakeRun(null, " and an "));
        p1.Append(MakeRun("Emphasis", "emphasized phrase"));
        p1.Append(MakeRun(null, "."));
        body.Append(p1);

        // Line 2
        var p2 = new Paragraph();
        p2.Append(MakeRun("Hyperlink", "Hyperlink-styled run."));
        body.Append(p2);

        // Line 3
        var p3 = new Paragraph();
        p3.Append(MakeRun("Subtitle", "Subtitle style."));
        body.Append(p3);

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Run MakeRun(string? styleId, string text)
    {
        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        if (styleId != null)
        {
            var rPr = new RunProperties(new RunStyle { Val = styleId });
            run.PrependChild(rPr);
        }
        return run;
    }
}
