// Replica of examples/word-header-footer.ts
// Creates a docx with body paragraph, default header "公司机密", default footer "第 X 页".

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordHeaderFooter
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Body paragraph
        body.Append(new Paragraph(
            new Run(
                new Text("本文档包含页眉「公司机密」和页脚页码字段。")
                { Space = SpaceProcessingModeValues.Preserve })));

        // Header part
        var headerPart = mainPart.AddNewPart<HeaderPart>();
        headerPart.Header = new Header(
            new Paragraph(
                new Run(
                    new Text("公司机密")
                    { Space = SpaceProcessingModeValues.Preserve })));
        headerPart.Header.Save();

        // Footer part
        var footerPart = mainPart.AddNewPart<FooterPart>();
        footerPart.Footer = new Footer(
            new Paragraph(
                new Run(
                    new Text("第 X 页")
                    { Space = SpaceProcessingModeValues.Preserve })));
        footerPart.Footer.Save();

        // sectPr references
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
