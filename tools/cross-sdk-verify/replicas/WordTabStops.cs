// Replica of examples/word-tab-stops.ts
// Creates a docx with 5 TOC-style paragraphs:
// title (left) + tab + page (right-aligned dot-leader at 8640 dxa).

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordTabStops
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        TocEntry(body, "Chapter 1 · Introduction", "1");
        TocEntry(body, "Chapter 2 · Background", "12");
        TocEntry(body, "Chapter 3 · Method", "27");
        TocEntry(body, "Chapter 4 · Results", "44");
        TocEntry(body, "Chapter 5 · Conclusion", "58");

        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }

    private static void TocEntry(Body body, string title, string page)
    {
        // Tab stop: right-aligned at 8640 dxa with dot leader
        var tabs = new Tabs(
            new TabStop
            {
                Val = TabStopValues.Right,
                Leader = TabStopLeaderCharValues.Dot,
                Position = 8640
            }
        );
        var pPr = new ParagraphProperties(tabs);

        var para = new Paragraph(pPr);
        // Title run
        para.Append(new Run(new Text(title)));
        // Tab character run
        para.Append(new Run(new TabChar()));
        // Page number run
        para.Append(new Run(new Text(page)));
        body.Append(para);
    }
}
