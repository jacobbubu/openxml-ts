// Replica of examples/word-add-hyperlink.ts
// Creates a docx with 2 paragraphs: one with an external hyperlink run,
// one with an internal anchor hyperlink run.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddHyperlink
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Paragraph 1: "Check out " + external hyperlink "openxml-ts on GitHub"
        var extRelId = mainPart.AddHyperlinkRelationship(
            new Uri("https://github.com/jacobbubu/openxml-ts"), true).Id;

        var p1 = new Paragraph();
        // Lead run
        p1.Append(new Run(new Text("Check out ") { Space = SpaceProcessingModeValues.Preserve }));

        // Hyperlink run
        var hyperlink1 = new Hyperlink(
            MakeHyperlinkRun("openxml-ts on GitHub"))
        {
            Id = extRelId,
            Tooltip = "Source repo"
        };
        p1.Append(hyperlink1);
        body.Append(p1);

        // Paragraph 2: "Jump to: " + anchor hyperlink "Section 1"
        var p2 = new Paragraph();
        p2.Append(new Run(new Text("Jump to: ") { Space = SpaceProcessingModeValues.Preserve }));

        var hyperlink2 = new Hyperlink(
            MakeHyperlinkRun("Section 1"))
        {
            Anchor = "section1"
        };
        p2.Append(hyperlink2);
        body.Append(p2);

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Run MakeHyperlinkRun(string text)
    {
        var rPr = new RunProperties();
        rPr.Append(new RunStyle { Val = "Hyperlink" });
        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        run.PrependChild(rPr);
        return run;
    }
}
