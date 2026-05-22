// Replica of examples/word-text-extract.ts
// Opens a .docx and prints all paragraphs to stdout in the format:
//    NNN | <paragraph-text>
// where NNN is a 4-character right-padded index.
//
// Usage: called by the cross-SDK runner with a pre-generated input .docx

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordTextExtract
{
    public static void Run(string inputPath, System.IO.TextWriter? output = null)
    {
        output ??= Console.Out;

        using var doc = WordprocessingDocument.Open(inputPath, false);
        var body = doc.MainDocumentPart?.Document?.Body;
        if (body == null) throw new InvalidOperationException("No body in document");

        int count = 0;
        foreach (var para in body.Descendants<Paragraph>())
        {
            // Collect all text from all runs (same as TS `p.text` which joins all run texts)
            var sb = new System.Text.StringBuilder();
            foreach (var run in para.Descendants<Run>())
            {
                foreach (var t in run.Descendants<Text>())
                    sb.Append(t.Text);
            }
            var text = sb.ToString();
            output.Write($"{count.ToString().PadLeft(4, ' ')} | {text}\n");
            count++;
        }
    }
}
