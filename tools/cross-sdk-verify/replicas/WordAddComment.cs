// Replica of examples/word-add-comment.ts
// Creates a docx with a paragraph: "Hello [world] — please review."
// where "world" is annotated with a comment by Alice.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CrossSdkVerify.Replicas;

public static class WordAddComment
{
    public static void Run(string outputPath)
    {
        using var doc = WordprocessingDocument.Create(outputPath,
            DocumentFormat.OpenXml.WordprocessingDocumentType.Document);

        var mainPart = doc.AddMainDocumentPart();
        mainPart.Document = new Document();
        var body = new Body();
        mainPart.Document.Append(body);

        // Create word comments part
        var commentsPart = mainPart.AddNewPart<WordprocessingCommentsPart>();
        commentsPart.Comments = new Comments();

        // Comment content
        var comment = new Comment(
            new Paragraph(new Run(new Text("This is an example comment."))))
        {
            Id = "1",
            Author = "Alice",
            Initials = "AW",
            Date = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
        };
        commentsPart.Comments.Append(comment);
        commentsPart.Comments.Save();

        // Main paragraph: "Hello " + rangeStart + "world" + rangeEnd + reference + " — please review."
        var p = new Paragraph();

        p.Append(new Run(new Text("Hello ") { Space = SpaceProcessingModeValues.Preserve }));
        p.Append(new CommentRangeStart { Id = "1" });
        p.Append(new Run(new Text("world")));
        p.Append(new CommentRangeEnd { Id = "1" });
        p.Append(new Run(new CommentReference { Id = "1" }));
        p.Append(new Run(new Text(" — please review.") { Space = SpaceProcessingModeValues.Preserve }));

        body.Append(p);
        body.Append(new SectionProperties());
        mainPart.Document.Save();
    }
}
