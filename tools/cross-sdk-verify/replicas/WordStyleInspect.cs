// Replica of examples/word-style-inspect.ts
//
// The TS example reads pStyleId via the typed ParagraphStyleId.val field (corrected
// from extendedAttributes.get) — so pStyleId is now real.
//
// resolveEffectiveRunProperties builds its chain as:
//   1. Direct run rPr
//   2. Char style rPr chain (via RunStyle.val) — BUT RunStyle.val is a typed field,
//      and in effective-resolver.ts the lookup still uses
//      extendedAttributes.get("w:val") which always returns undefined for typed
//      elements. So char style chain is NEVER followed.
//   3. Para style rPr chain (via ParagraphStyleId.val) — same issue:
//      extendedAttributes.get("w:val") returns undefined → NEVER followed.
//   4. Doc defaults rPr.
//
// Effective result: bold/italic/color come from direct run rPr OR doc defaults only.
// pStyleId is correct (read from ParagraphStyleId.val in the example directly).
//
// This replica faithfully mirrors that behavior.
//
// Output format per non-empty run:
//   PPPP SSSSSSSSSSSSSSSS [BI CCCCCC] text
// where PPPP = paragraph index (4-char right-aligned),
//       S    = paragraph style id (padded to 16, or "—" if absent),
//       B    = "B" if direct rPr or doc-default has <w:b>, else "-"
//       I    = "I" if direct rPr or doc-default has <w:i>, else "-"
//       C    = color hex from direct rPr or doc-default, or "auto"

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

        var stylesPart = doc.MainDocumentPart?.StyleDefinitionsPart;
        var styles = stylesPart?.Styles;

        // Collect doc-default run properties (step 4 of the TS resolver chain)
        var docDefaultRpr = styles
            ?.Elements<DocDefaults>().FirstOrDefault()
            ?.RunPropertiesDefault
            ?.RunPropertiesBaseStyle;

        int pIdx = 0;
        foreach (var para in body.Descendants<Paragraph>())
        {
            // Read pStyleId via the typed API (matches fixed example: ParagraphStyleId.val)
            var pStyleId = para.ParagraphProperties?.ParagraphStyleId?.Val?.Value;
            var pStyleLabel = pStyleId ?? "—";

            foreach (var run in para.Descendants<Run>())
            {
                var rPr = run.RunProperties;

                // Step 1: direct run rPr
                // Step 2: char style — SKIPPED (mirrors broken resolver extendedAttributes lookup)
                // Step 3: para style rPr — SKIPPED (mirrors broken resolver extendedAttributes lookup)
                // Step 4: doc defaults rPr

                bool bold = false;
                bool italic = false;
                string color = "auto";

                bool boldFound = false, italicFound = false, colorFound = false;

                // Direct run rPr
                if (rPr != null)
                {
                    if (!boldFound && rPr.Bold != null)
                    {
                        bold = rPr.Bold.Val?.Value != false;
                        boldFound = true;
                    }
                    if (!italicFound && rPr.Italic != null)
                    {
                        italic = rPr.Italic.Val?.Value != false;
                        italicFound = true;
                    }
                    if (!colorFound && rPr.Color?.Val?.HasValue == true)
                    {
                        var cv = rPr.Color.Val.Value;
                        if (cv != null)
                        {
                            color = cv.ToUpperInvariant() == "AUTO" ? "auto" : cv.ToUpperInvariant();
                            colorFound = true;
                        }
                    }
                }

                // Doc defaults rPr (step 4)
                if (docDefaultRpr != null)
                {
                    if (!boldFound && docDefaultRpr.Bold != null)
                    {
                        bold = docDefaultRpr.Bold.Val?.Value != false;
                        boldFound = true;
                    }
                    if (!italicFound && docDefaultRpr.Italic != null)
                    {
                        italic = docDefaultRpr.Italic.Val?.Value != false;
                        italicFound = true;
                    }
                    if (!colorFound && docDefaultRpr.Color?.Val?.HasValue == true)
                    {
                        var cv = docDefaultRpr.Color.Val.Value;
                        if (cv != null)
                        {
                            color = cv.ToUpperInvariant() == "AUTO" ? "auto" : cv.ToUpperInvariant();
                            colorFound = true;
                        }
                    }
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
