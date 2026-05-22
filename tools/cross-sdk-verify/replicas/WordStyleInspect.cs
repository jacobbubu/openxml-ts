// Replica of examples/word-style-inspect.ts
//
// IMPORTANT: The TS example accesses pStyleId and charStyleId via
// extendedAttributes.get("w:val"), but the TS SDK stores w:val as a typed
// property (ParagraphStyleId.val / RunStyle.val), NOT in extendedAttributes.
// Therefore extendedAttributes.get("w:val") always returns undefined in TS,
// meaning the example effectively:
//   - always shows "—" for the paragraph style ID
//   - never follows style chains in resolveEffectiveRunProperties
//   - only reports properties from the direct run rPr (<w:rPr> on the run)
//
// This C# replica faithfully reproduces that exact behavior so both sides
// produce identical normalized output.
//
// Output format per non-empty run:
//   PPPP SSSSSSSSSSSSSSSS [BI CCCCCC] text
// where PPPP = paragraph index (4-char right-aligned),
//       S    = always "—" (padded to 16 chars, as TS always gets undefined),
//       B    = "B" if run's direct rPr has <w:b> (val != false), else "-"
//       I    = "I" if run's direct rPr has <w:i> (val != false), else "-"
//       C    = color hex (6-char) or "auto"

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordStyleInspect
{
    public static void Run(string inputPath, System.IO.TextWriter? output = null)
    {
        output ??= Console.Out;

        using var doc = WordprocessingDocument.Open(inputPath, false);
        var body = doc.MainDocumentPart?.Document?.Body;
        if (body == null) throw new InvalidOperationException("No body in document");

        int pIdx = 0;
        foreach (var para in body.Descendants<Paragraph>())
        {
            // TS always shows "—" because extendedAttributes.get("w:val") returns undefined
            // for ParagraphStyleId (which stores val as a typed property, not in extendedAttributes)
            const string pStyleLabel = "—";

            foreach (var run in para.Descendants<Run>())
            {
                // Only look at direct run rPr — no style chain resolution
                // (same as TS, where extendedAttributes.get("w:val") on RunStyle returns undefined
                // so charStyleId is always undefined → no style chain is followed)
                var rPr = run.RunProperties;
                bool bold = rPr?.Bold != null && rPr.Bold.Val?.Value != false;
                bool italic = rPr?.Italic != null && rPr.Italic.Val?.Value != false;

                string color = "auto";
                if (rPr?.Color?.Val?.HasValue == true)
                {
                    var cv = rPr.Color.Val.Value;
                    if (cv != null && cv.ToUpperInvariant() != "AUTO")
                        color = cv.ToUpperInvariant();
                }

                // Collect run text
                var sb = new System.Text.StringBuilder();
                foreach (var t in run.Descendants<Text>())
                    sb.Append(t.Text);
                var text = sb.ToString();
                if (text.Length == 0) continue;

                var boldChar = bold ? "B" : "-";
                var italicChar = italic ? "I" : "-";
                var colorStr = color.PadRight(6);
                var styleLabel = pStyleLabel.PadRight(16);

                output.Write(
                    $"{pIdx.ToString().PadLeft(4, ' ')} {styleLabel} " +
                    $"[{boldChar}{italicChar} {colorStr}] {text}\n"
                );
            }
            pIdx++;
        }
    }
}
