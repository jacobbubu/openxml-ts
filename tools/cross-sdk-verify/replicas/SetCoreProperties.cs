// Replica of examples/set-core-properties.ts
// Creates docx/xlsx/pptx with the same core properties:
//   Word:  title="Q4 Report", creator="Alice", lastModifiedBy="Alice",
//          subject="Quarterly business review", keywords="quarterly,report,Q4", revision="1"
//   Excel: title="Q4 Numbers", creator="Bob"
//   PPT:   title="Q4 Deck", creator="Charlie"
//
// Call: SetCoreProperties.Run(prefix)  → writes <prefix>.docx / .xlsx / .pptx

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class SetCoreProperties
{
    public static void Run(string outputPrefix)
    {
        RunWord(outputPrefix + ".docx");
        RunExcel(outputPrefix + ".xlsx");
        RunPpt(outputPrefix + ".pptx");
    }

    private static void RunWord(string path)
    {
        using var doc = WordprocessingDocument.Create(path,
            WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document(new Body(new SectionProperties()));
        mainPart.Document.Save();

        var cp = doc.AddCoreFilePropertiesPart();
        using var writer = new System.IO.StreamWriter(cp.GetStream(
            System.IO.FileMode.Create, System.IO.FileAccess.Write));
        writer.Write(BuildCoreXml(
            title: "Q4 Report",
            creator: "Alice",
            lastModifiedBy: "Alice",
            subject: "Quarterly business review",
            keywords: "quarterly,report,Q4",
            revision: "1"
        ));
    }

    private static void RunExcel(string path)
    {
        using var doc = SpreadsheetDocument.Create(path,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new DocumentFormat.OpenXml.Spreadsheet.Workbook(
            new DocumentFormat.OpenXml.Spreadsheet.Sheets());
        wbPart.Workbook.Save();

        var cp = doc.AddCoreFilePropertiesPart();
        using var writer = new System.IO.StreamWriter(cp.GetStream(
            System.IO.FileMode.Create, System.IO.FileAccess.Write));
        writer.Write(BuildCoreXml(
            title: "Q4 Numbers",
            creator: "Bob"
        ));
    }

    private static void RunPpt(string path)
    {
        using var doc = PresentationDocument.Create(path,
            DocumentFormat.OpenXml.PresentationDocumentType.Presentation);

        var presPart = doc.AddPresentationPart();
        presPart.Presentation = new DocumentFormat.OpenXml.Presentation.Presentation(
            new DocumentFormat.OpenXml.Presentation.SlideIdList(),
            new DocumentFormat.OpenXml.Presentation.SlideSize { Cx = 9144000, Cy = 6858000 },
            new DocumentFormat.OpenXml.Presentation.NotesSize { Cx = 6858000, Cy = 9144000 }
        );
        presPart.Presentation.Save();

        var cp = doc.AddCoreFilePropertiesPart();
        using var writer = new System.IO.StreamWriter(cp.GetStream(
            System.IO.FileMode.Create, System.IO.FileAccess.Write));
        writer.Write(BuildCoreXml(
            title: "Q4 Deck",
            creator: "Charlie"
        ));
    }

    private static string BuildCoreXml(
        string? title = null,
        string? creator = null,
        string? lastModifiedBy = null,
        string? subject = null,
        string? keywords = null,
        string? revision = null)
    {
        var sb = new System.Text.StringBuilder();
        sb.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
        sb.AppendLine("<cp:coreProperties");
        sb.AppendLine("  xmlns:cp=\"http://schemas.openxmlformats.org/package/2006/metadata/core-properties\"");
        sb.AppendLine("  xmlns:dc=\"http://purl.org/dc/elements/1.1/\"");
        sb.AppendLine("  xmlns:dcterms=\"http://purl.org/dc/terms/\"");
        sb.AppendLine("  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
        if (title != null)          sb.AppendLine($"  <dc:title>{Escape(title)}</dc:title>");
        if (creator != null)        sb.AppendLine($"  <dc:creator>{Escape(creator)}</dc:creator>");
        if (lastModifiedBy != null) sb.AppendLine($"  <cp:lastModifiedBy>{Escape(lastModifiedBy)}</cp:lastModifiedBy>");
        if (subject != null)        sb.AppendLine($"  <dc:subject>{Escape(subject)}</dc:subject>");
        if (keywords != null)       sb.AppendLine($"  <cp:keywords>{Escape(keywords)}</cp:keywords>");
        if (revision != null)       sb.AppendLine($"  <cp:revision>{Escape(revision)}</cp:revision>");
        sb.AppendLine("</cp:coreProperties>");
        return sb.ToString();
    }

    private static string Escape(string s) =>
        s.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;");
}
