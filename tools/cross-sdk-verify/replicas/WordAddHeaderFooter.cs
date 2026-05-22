// Replica of examples/word-add-header-footer.ts
// Creates a docx with a default header and a default footer.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddHeaderFooter
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Add header part
        var headerPart = mainPart.AddNewPart<HeaderPart>();
        headerPart.Header = new Header(
            new Paragraph(
                new Run(
                    new Text("Document Title — Confidential")
                    { Space = SpaceProcessingModeValues.Preserve })));
        headerPart.Header.Save();

        // Add footer part
        var footerPart = mainPart.AddNewPart<FooterPart>();
        footerPart.Footer = new Footer(
            new Paragraph(
                new Run(
                    new Text("Page footer · 2026 openxml-ts")
                    { Space = SpaceProcessingModeValues.Preserve })));
        footerPart.Footer.Save();

        // Wire header and footer references into sectPr
        var sectPr = new SectionProperties();
        sectPr.Append(new HeaderReference
        {
            Type = HeaderFooterValues.Default,
            Id = mainPart.GetIdOfPart(headerPart)
        });
        sectPr.Append(new FooterReference
        {
            Type = HeaderFooterValues.Default,
            Id = mainPart.GetIdOfPart(footerPart)
        });
        body.Append(sectPr);

        mainPart.Document.Save();
    }
}
