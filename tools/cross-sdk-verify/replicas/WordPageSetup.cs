// Replica of examples/word-page-setup.ts
// Creates a docx with A4 landscape page size and custom margins.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordPageSetup
{
    // A4 in DXA (twips): 1 inch = 1440 DXA; 210mm ≈ 11906, 297mm ≈ 16838
    private const int A4_W = 11906;
    private const int A4_H = 16838;

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
                new Text("本文档使用 A4 横向纸张，上下边距各 20 mm，左右边距各 25 mm。")
                { Space = SpaceProcessingModeValues.Preserve })));

        // sectPr: landscape A4 — width/height swapped
        var sectPr = new SectionProperties();

        // Page size: landscape → width=A4_H, height=A4_W, orient=landscape
        sectPr.Append(new PageSize
        {
            Width = (uint)A4_H,
            Height = (uint)A4_W,
            Orient = PageOrientationValues.Landscape
        });

        // Page margins: top/bottom 20mm=1134dxa, left/right 25mm=1417dxa, header/footer 10mm=567dxa, gutter 0
        sectPr.Append(new PageMargin
        {
            Top = 1134,
            Bottom = 1134,
            Left = 1417,
            Right = 1417,
            Header = 567,
            Footer = 567,
            Gutter = 0
        });

        body.Append(sectPr);
        mainPart.Document.Save();
    }
}
