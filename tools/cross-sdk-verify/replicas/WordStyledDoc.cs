// Replica of examples/word-styled-doc.ts
// Creates a docx with custom paragraph styles (Heading1, Body) and character style (Emphasis),
// then references them in content.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordStyledDoc
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Create styles part
        var stylesPart = mainPart.AddNewPart<StyleDefinitionsPart>();
        stylesPart.Styles = new Styles();

        // Paragraph style: Heading1 — bold 16pt center, next=Body
        stylesPart.Styles.Append(new Style(
            new StyleName { Val = "heading 1" },
            new NextParagraphStyle { Val = "Body" },
            new StyleRunProperties(
                new Bold(),
                new FontSize { Val = "32" },
                new Justification { Val = JustificationValues.Center }
            )
        )
        {
            Type = StyleValues.Paragraph,
            StyleId = "Heading1"
        });

        // Paragraph style: Body — 12pt
        stylesPart.Styles.Append(new Style(
            new StyleName { Val = "body text" },
            new StyleRunProperties(
                new FontSize { Val = "24" }
            )
        )
        {
            Type = StyleValues.Paragraph,
            StyleId = "Body"
        });

        // Character style: Emphasis — italic red
        stylesPart.Styles.Append(new Style(
            new StyleName { Val = "emphasis" },
            new StyleRunProperties(
                new Italic(),
                new Color { Val = "C00000" }
            )
        )
        {
            Type = StyleValues.Character,
            StyleId = "Emphasis"
        });

        stylesPart.Styles.Save();

        // Content
        AddStyledParagraph(body, "Heading1", "Chapter 1: Custom Styles");
        AddStyledParagraph(body, "Body", "This paragraph uses the Body style (12pt).");
        AddMixedParagraph(body, "Normal text with ", "emphasized red italic", " inline character style.");
        AddStyledParagraph(body, "Heading1", "Chapter 2: More Content");
        AddStyledParagraph(body, "Body", "Another body paragraph under the second heading.");

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static void AddStyledParagraph(Body body, string styleId, string text)
    {
        var para = new Paragraph(
            new ParagraphProperties(new ParagraphStyleId { Val = styleId }),
            new Run(new Text(text))
        );
        body.Append(para);
    }

    private static void AddMixedParagraph(Body body, string plain, string emphasized, string trailing)
    {
        var para = new Paragraph(
            new ParagraphProperties(new ParagraphStyleId { Val = "Body" })
        );
        para.Append(new Run(new Text(plain) { Space = SpaceProcessingModeValues.Preserve }));
        var empRun = new Run(new Text(emphasized));
        empRun.PrependChild(new RunProperties(new RunStyle { Val = "Emphasis" }));
        para.Append(empRun);
        para.Append(new Run(new Text(trailing) { Space = SpaceProcessingModeValues.Preserve }));
        body.Append(para);
    }
}
