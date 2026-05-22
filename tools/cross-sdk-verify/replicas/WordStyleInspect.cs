// Replica of examples/word-style-inspect.ts
//
// Epic-108 fix: resolveEffectiveRunProperties now correctly reads typed fields
// (.val) instead of extendedAttributes.get("w:val"), so the full style chain is
// followed.
//
// resolveEffectiveRunProperties chain (in precedence order):
//   1. Direct run rPr
//   2. Char style rPr chain (rStyle → basedOn ancestors)
//   3. Para style rPr chain (pStyle → basedOn ancestors)
//   4. Doc defaults rPr
//
// Output format per non-empty run:
//   PPPP SSSSSSSSSSSSSSSS [BI CCCCCC] text
// where PPPP = paragraph index (4-char right-aligned),
//       S    = paragraph style id (padded to 16, or "—" if absent),
//       B    = "B" if effective rPr has <w:b>, else "-"
//       I    = "I" if effective rPr has <w:i>, else "-"
//       C    = color hex from effective rPr, or "auto"

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
            // Read pStyleId via the typed API
            var pStyleId = para.ParagraphProperties?.ParagraphStyleId?.Val?.Value;
            var pStyleLabel = pStyleId ?? "—";

            foreach (var run in para.Descendants<Run>())
            {
                var rPr = run.RunProperties;

                bool bold = false;
                bool italic = false;
                string color = "auto";

                bool boldFound = false, italicFound = false, colorFound = false;

                // Step 1: Direct run rPr
                if (rPr != null)
                {
                    ApplyRpr(rPr.Bold, rPr.Italic, rPr.Color,
                        ref bold, ref italic, ref color,
                        ref boldFound, ref italicFound, ref colorFound);
                }

                // Step 2: Char style rPr chain (rStyle → basedOn ancestors)
                if (!AllFound(boldFound, italicFound, colorFound) && rPr != null && styles != null)
                {
                    var charStyleId = rPr.RunStyle?.Val?.Value;
                    if (charStyleId != null)
                    {
                        CollectStyleRprChain(styles, charStyleId,
                            ref bold, ref italic, ref color,
                            ref boldFound, ref italicFound, ref colorFound);
                    }
                }

                // Step 3: Para style rPr chain (pStyle → basedOn ancestors)
                if (!AllFound(boldFound, italicFound, colorFound) && pStyleId != null && styles != null)
                {
                    CollectStyleRprChain(styles, pStyleId,
                        ref bold, ref italic, ref color,
                        ref boldFound, ref italicFound, ref colorFound);
                }

                // Step 4: Doc defaults rPr
                if (!AllFound(boldFound, italicFound, colorFound) && docDefaultRpr != null)
                {
                    ApplyRpr(docDefaultRpr.Bold, docDefaultRpr.Italic, docDefaultRpr.Color,
                        ref bold, ref italic, ref color,
                        ref boldFound, ref italicFound, ref colorFound);
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

    /// <summary>
    /// Walk the style chain starting at styleId (then basedOn ancestors, up to depth 8),
    /// collecting rPr properties in precedence order (first found wins).
    /// </summary>
    private static void CollectStyleRprChain(
        DocumentFormat.OpenXml.Wordprocessing.Styles styles,
        string startStyleId,
        ref bool bold, ref bool italic, ref string color,
        ref bool boldFound, ref bool italicFound, ref bool colorFound)
    {
        var visited = new HashSet<string>();
        string? currentId = startStyleId;
        int depth = 0;
        const int MaxDepth = 8;

        while (currentId != null && depth < MaxDepth)
        {
            if (!visited.Add(currentId)) break; // cycle guard
            depth++;

            var style = FindStyleById(styles, currentId);
            if (style == null) break;

            var styleRpr = style.StyleRunProperties;
            if (styleRpr != null)
            {
                ApplyRpr(styleRpr.Bold, styleRpr.Italic, styleRpr.Color,
                    ref bold, ref italic, ref color,
                    ref boldFound, ref italicFound, ref colorFound);
            }

            if (AllFound(boldFound, italicFound, colorFound)) break;

            currentId = style.BasedOn?.Val?.Value;
        }
    }

    private static Style? FindStyleById(
        DocumentFormat.OpenXml.Wordprocessing.Styles styles,
        string styleId)
    {
        foreach (var s in styles.Elements<Style>())
        {
            if (s.StyleId?.Value == styleId) return s;
        }
        return null;
    }

    private static void ApplyRpr(
        Bold? boldEl, Italic? italicEl, Color? colorEl,
        ref bool bold, ref bool italic, ref string color,
        ref bool boldFound, ref bool italicFound, ref bool colorFound)
    {
        if (!boldFound && boldEl != null)
        {
            bold = boldEl.Val?.Value != false;
            boldFound = true;
        }
        if (!italicFound && italicEl != null)
        {
            italic = italicEl.Val?.Value != false;
            italicFound = true;
        }
        if (!colorFound && colorEl?.Val?.HasValue == true)
        {
            var cv = colorEl.Val.Value;
            if (cv != null)
            {
                color = cv.ToUpperInvariant() == "AUTO" ? "auto" : cv.ToUpperInvariant();
                colorFound = true;
            }
        }
    }

    private static bool AllFound(bool boldFound, bool italicFound, bool colorFound)
        => boldFound && italicFound && colorFound;
}
