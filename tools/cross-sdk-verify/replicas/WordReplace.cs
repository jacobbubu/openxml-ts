// Replica of examples/word-replace.ts
// Creates a source docx with "{{client}}" placeholder, opens it, replaces it,
// and saves to outputPath — equivalent to running word-replace.ts on a generated input.
//
// Since word-replace.ts is a transform (read input, write output), we generate
// the source document inline and then apply the replacement, producing the same
// final output as: bun run word-replace.ts <input> <output> "Acme Corp"

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordReplace
{
    private const string Client = "Acme Corp";

    public static void Run(string outputPath)
    {
        // Step 1: build the "template" document in memory via a temp file
        var tempPath = Path.GetTempFileName() + ".docx";
        try
        {
            BuildTemplate(tempPath);
            ApplyReplace(tempPath, outputPath);
        }
        finally
        {
            if (File.Exists(tempPath)) File.Delete(tempPath);
        }
    }

    private static void BuildTemplate(string path)
    {
        using var doc = WordprocessingDocument.Create(path,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);
        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        body.Append(new Paragraph(new Run(new Text("Dear {{client}},"))));
        body.Append(new Paragraph(new Run(new Text("Thank you for your business, {{client}}."))));
        body.Append(new Paragraph(new Run(new Text("Sincerely,"))));
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static void ApplyReplace(string inputPath, string outputPath)
    {
        // Copy to output first (we open in-place)
        File.Copy(inputPath, outputPath, overwrite: true);

        using var doc = WordprocessingDocument.Open(outputPath, true);
        var body = doc.MainDocumentPart?.Document?.Body;
        if (body == null) return;

        foreach (var t in body.Descendants<Text>())
        {
            if (t.Text.Contains("{{client}}"))
                t.Text = t.Text.Replace("{{client}}", Client);
        }

        doc.MainDocumentPart!.Document.Save();
    }
}
