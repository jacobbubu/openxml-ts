// Replica of examples/word-run-fonts.ts
// Creates a docx with 4 paragraphs demonstrating run font settings.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordRunFonts
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Line 1: fontFamily = "Calibri" (sets ascii/eastAsia/hAnsi/cs all to Calibri)
        body.Append(MakePara(
            "Calibri 字体（fontFamily 快捷写入，所有四个字段）",
            ascii: "Calibri", eastAsia: "Calibri", hAnsi: "Calibri", cs: "Calibri"));

        // Line 2: fontFamily = "Arial"
        body.Append(MakePara(
            "Arial 字体",
            ascii: "Arial", eastAsia: "Arial", hAnsi: "Arial", cs: "Arial"));

        // Line 3: fontFamilyDetail — ascii: Calibri, eastAsia: 宋体, hAnsi: Calibri, cs: Arial
        body.Append(MakePara(
            "细粒度：西文 Calibri，东亚宋体，复杂脚本 Arial",
            ascii: "Calibri", eastAsia: "宋体", hAnsi: "Calibri", cs: "Arial"));

        // Line 4: Times New Roman + bold
        body.Append(MakePara(
            "Times New Roman 加粗",
            ascii: "Times New Roman", eastAsia: "Times New Roman",
            hAnsi: "Times New Roman", cs: "Times New Roman",
            bold: true));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Paragraph MakePara(
        string text,
        string? ascii = null,
        string? eastAsia = null,
        string? hAnsi = null,
        string? cs = null,
        bool bold = false)
    {
        var rPr = new RunProperties();
        if (ascii != null || eastAsia != null || hAnsi != null || cs != null)
        {
            var fonts = new RunFonts();
            if (ascii != null) fonts.Ascii = ascii;
            if (eastAsia != null) fonts.EastAsia = eastAsia;
            if (hAnsi != null) fonts.HighAnsi = hAnsi;
            if (cs != null) fonts.ComplexScript = cs;
            rPr.Append(fonts);
        }
        if (bold) rPr.Append(new Bold());

        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        if (rPr.HasChildren) run.PrependChild(rPr);

        return new Paragraph(run);
    }
}
