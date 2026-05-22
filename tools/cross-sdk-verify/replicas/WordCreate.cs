// Replica of examples/word-create.ts
// Creates a minimal docx with 3 paragraphs: "Hello", "from", "openxml-ts"

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordCreate
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        foreach (var line in new[] { "Hello", "from", "openxml-ts" })
        {
            var para = new Paragraph(new Run(new Text(line)));
            body.Append(para);
        }

        // Required sectPr to make Word happy
        body.Append(new SectionProperties());

        mainPart.Document.Save();
    }
}
