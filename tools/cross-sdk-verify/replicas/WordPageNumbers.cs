// Replica of examples/word-page-numbers.ts
// Creates a docx with 2 plain paragraphs + a paragraph with PAGE and NUMPAGES fields.
// Uses the fldChar sequence (begin / instrText / separate / end) matching the TS
// createPageNumberRun / createTotalPagesRun helpers.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordPageNumbers
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        body.Append(new Paragraph(new Run(new Text("This document demonstrates PAGE and NUMPAGES fields."))));
        body.Append(new Paragraph(new Run(new Text("Open in Word and the next paragraph should show the live values."))));

        // Paragraph: "第 " + PAGE field + " 页 / 共 " + NUMPAGES field + " 页"
        var p = new Paragraph();

        p.Append(new Run(new Text("第 ") { Space = SpaceProcessingModeValues.Preserve }));

        // PAGE field
        AppendField(p, "PAGE");

        p.Append(new Run(new Text(" 页 / 共 ") { Space = SpaceProcessingModeValues.Preserve }));

        // NUMPAGES field
        AppendField(p, "NUMPAGES");

        p.Append(new Run(new Text(" 页") { Space = SpaceProcessingModeValues.Preserve }));

        body.Append(p);
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static void AppendField(Paragraph p, string fieldName)
    {
        // Run 1: fldChar begin
        p.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.Begin }));
        // Run 2: instrText
        p.Append(new Run(new FieldCode($" {fieldName} ") { Space = SpaceProcessingModeValues.Preserve }));
        // Run 3: fldChar separate
        p.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.Separate }));
        // Run 4: fldChar end
        p.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.End }));
    }
}
