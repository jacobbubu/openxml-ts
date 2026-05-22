// Replica of examples/word-footnotes.ts
// Creates a docx with 2 paragraphs containing 3 footnote references.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordFootnotes
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Create footnotes part
        var footnotesPart = mainPart.AddNewPart<FootnotesPart>();
        footnotesPart.Footnotes = new Footnotes();

        // Footnote 1
        footnotesPart.Footnotes.Append(MakeFootnote(1, "Oxford English Dictionary, 3rd ed., 2010."));
        // Footnote 2
        footnotesPart.Footnotes.Append(MakeFootnote(2, "See also ISO/IEC 29500-1:2016 section 17.11."));
        // Footnote 3
        footnotesPart.Footnotes.Append(MakeFootnote(3, "Footnote auto-id assignment starts at 1 per .NET SDK convention."));
        footnotesPart.Footnotes.Save();

        // Paragraph 1: two footnote references
        var p1 = new Paragraph();
        p1.Append(new Run(new Text("The term \"document\"")));
        p1.Append(MakeFootnoteRef(1));
        p1.Append(new Run(new Text(" is defined in the OOXML specification") { Space = SpaceProcessingModeValues.Preserve }));
        p1.Append(MakeFootnoteRef(2));
        p1.Append(new Run(new Text(" as a collection of parts.") { Space = SpaceProcessingModeValues.Preserve }));
        body.Append(p1);

        // Paragraph 2: one footnote reference
        var p2 = new Paragraph();
        p2.Append(new Run(new Text("Footnote ids are assigned automatically")));
        p2.Append(MakeFootnoteRef(3));
        p2.Append(new Run(new Text(", starting at 1.") { Space = SpaceProcessingModeValues.Preserve }));
        body.Append(p2);

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Footnote MakeFootnote(int id, string text)
    {
        return new Footnote(
            new Paragraph(
                new Run(
                    new FootnoteReferenceMark()),
                new Run(
                    new Text(" " + text) { Space = SpaceProcessingModeValues.Preserve })))
        {
            Id = id
        };
    }

    private static Run MakeFootnoteRef(int id)
    {
        var rPr = new RunProperties(new VerticalTextAlignment { Val = VerticalPositionValues.Superscript });
        return new Run(rPr, new FootnoteReference { Id = id });
    }
}
