// Replica of examples/word-add-bookmark.ts
// Creates a docx with:
//   1) A paragraph with bookmark "section1" wrapping the title text
//   2) A paragraph with "Jump to " + internal anchor hyperlink to "section1"

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddBookmark
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Paragraph 1: bookmark wrapping title text
        var titleP = new Paragraph();
        titleP.Append(new BookmarkStart { Id = "0", Name = "section1" });
        titleP.Append(new Run(new Text("Section 1 — Introduction")));
        titleP.Append(new BookmarkEnd { Id = "0" });
        body.Append(titleP);

        // Paragraph 2: "Jump to " + anchor hyperlink "Section 1"
        var linkP = new Paragraph();
        linkP.Append(new Run(new Text("Jump to ") { Space = SpaceProcessingModeValues.Preserve }));
        var hyperlink = new Hyperlink(
            new Run(
                new RunProperties(new RunStyle { Val = "Hyperlink" }),
                new Text("Section 1")))
        {
            Anchor = "section1"
        };
        linkP.Append(hyperlink);
        body.Append(linkP);

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }
}
