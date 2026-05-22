// Replica of examples/ppt-replace.ts
// The TS runner generates a ppt-create output (3 slides, slide 2 has "Generated on {{date}}")
// then calls ppt-replace.ts with replacement "2024-01-01".
// This replica replicates that pipeline: build the 3-slide ppt-create template, then
// replace every "{{date}}" occurrence with "2024-01-01".

using DocumentFormat.OpenXml.Packaging;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptReplace
{
    private const string Replacement = "2024-01-01";

    public static void Run(string outputPath)
    {
        // Step 1: build the ppt-create 3-slide template into a temp file
        var tempPath = Path.GetTempFileName() + ".pptx";
        try
        {
            PptCreate.Run(tempPath);
            ApplyReplace(tempPath, outputPath);
        }
        finally
        {
            if (File.Exists(tempPath)) File.Delete(tempPath);
        }
    }

    private static void ApplyReplace(string inputPath, string outputPath)
    {
        File.Copy(inputPath, outputPath, overwrite: true);

        using var doc = PresentationDocument.Open(outputPath, true);
        var presPart = doc.PresentationPart;
        if (presPart == null) return;

        foreach (var slidePart in presPart.SlideParts)
        {
            foreach (var t in slidePart.Slide.Descendants<A.Text>())
            {
                if (t.Text?.Contains("{{date}}") == true)
                    t.Text = t.Text.Replace("{{date}}", Replacement);
            }
        }

        presPart.Presentation.Save();
    }
}
