// Replica of examples/word-add-revision.ts
// Creates a docx with revision tracking:
//   "Hello " + deleted "old " + inserted "kind " + "world"
// Author: Alice

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddRevision
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Fixed date for reproducibility
        var date = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        const string author = "Alice";

        var p = new Paragraph();

        // "Hello "
        p.Append(new Run(new Text("Hello ") { Space = SpaceProcessingModeValues.Preserve }));

        // Deleted "old "
        var del = new DeletedRun(
            new RunProperties(),
            new DeletedText("old ") { Space = SpaceProcessingModeValues.Preserve })
        {
            Id = "1",
            Author = author,
            Date = date
        };
        p.Append(del);

        // Inserted "kind "
        var ins = new InsertedRun(
            new Run(new Text("kind ") { Space = SpaceProcessingModeValues.Preserve }))
        {
            Id = "2",
            Author = author,
            Date = date
        };
        p.Append(ins);

        // "world"
        p.Append(new Run(new Text("world")));

        body.Append(p);
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }
}
