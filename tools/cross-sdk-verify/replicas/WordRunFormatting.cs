// Replica of examples/word-run-formatting.ts
// Creates a docx showcasing run-level formatting: bold, italic, underline, fontSize, color.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordRunFormatting
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Paragraph 1: "Plain text. " + "Bold."
        body.Append(MakePara(
            MakeRun("Plain text. "),
            MakeRun("Bold.", bold: true)
        ));

        // Paragraph 2: "Italic."
        body.Append(MakePara(MakeRun("Italic.", italic: true)));

        // Paragraph 3: "Underlined single."
        body.Append(MakePara(MakeRun("Underlined single.", underline: "single")));

        // Paragraph 4: "Underlined double."
        body.Append(MakePara(MakeRun("Underlined double.", underline: "double")));

        // Paragraph 5: "Big red." — 24pt (48 half-points), FF0000, bold
        body.Append(MakePara(MakeRun("Big red.", fontSizeHalfPt: 48, colorHex: "FF0000", bold: true)));

        // Paragraph 6: combo
        body.Append(MakePara(MakeRun(
            "Combo: bold italic underlined 14pt blue.",
            bold: true, italic: true, underline: "single",
            fontSizeHalfPt: 28, colorHex: "0000FF")));

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static Paragraph MakePara(params Run[] runs)
        => new Paragraph(runs);

    private static Run MakeRun(
        string text,
        bool? bold = null,
        bool? italic = null,
        string? underline = null,
        int? fontSizeHalfPt = null,
        string? colorHex = null)
    {
        var rPr = new RunProperties();
        if (bold == true) rPr.Append(new Bold());
        if (italic == true) rPr.Append(new Italic());
        if (underline != null)
        {
            var uv = underline == "single" ? UnderlineValues.Single : UnderlineValues.Double;
            rPr.Append(new Underline { Val = uv });
        }
        if (fontSizeHalfPt != null)
            rPr.Append(new FontSize { Val = fontSizeHalfPt.ToString() });
        if (colorHex != null)
            rPr.Append(new Color { Val = colorHex });

        var run = new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        if (rPr.HasChildren)
            run.PrependChild(rPr);
        return run;
    }
}
