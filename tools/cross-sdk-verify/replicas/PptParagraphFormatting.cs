// Replica of examples/ppt-paragraph-formatting.ts
// Creates a pptx with 4 shapes showing paragraph alignment/margin/indent.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptParagraphFormatting
{
    public static void Run(string outputPath)
    {
        using var doc = PresentationDocument.Create(outputPath,
            DocumentFormat.OpenXml.PresentationDocumentType.Presentation);

        var presPart = doc.AddPresentationPart();
        presPart.Presentation = new Presentation();

        var slideMasterPart = presPart.AddNewPart<SlideMasterPart>("rIdSlideMaster1");
        var slideLayoutPart = slideMasterPart.AddNewPart<SlideLayoutPart>("rIdSlideLayout1");

        slideMasterPart.SlideMaster = new SlideMaster(
            new CommonSlideData(new ShapeTree(
                new NonVisualGroupShapeProperties(
                    new NonVisualDrawingProperties { Id = 1, Name = "" },
                    new NonVisualGroupShapeDrawingProperties(),
                    new ApplicationNonVisualDrawingProperties()),
                new GroupShapeProperties(new A.TransformGroup())
            )),
            new ColorMap
            {
                Background1 = A.ColorSchemeIndexValues.Light1,
                Text1 = A.ColorSchemeIndexValues.Dark1,
                Background2 = A.ColorSchemeIndexValues.Light2,
                Text2 = A.ColorSchemeIndexValues.Dark2,
                Accent1 = A.ColorSchemeIndexValues.Accent1,
                Accent2 = A.ColorSchemeIndexValues.Accent2,
                Accent3 = A.ColorSchemeIndexValues.Accent3,
                Accent4 = A.ColorSchemeIndexValues.Accent4,
                Accent5 = A.ColorSchemeIndexValues.Accent5,
                Accent6 = A.ColorSchemeIndexValues.Accent6,
                Hyperlink = A.ColorSchemeIndexValues.Hyperlink,
                FollowedHyperlink = A.ColorSchemeIndexValues.FollowedHyperlink
            }
        );

        slideLayoutPart.SlideLayout = new SlideLayout(
            new CommonSlideData(new ShapeTree(
                new NonVisualGroupShapeProperties(
                    new NonVisualDrawingProperties { Id = 1, Name = "" },
                    new NonVisualGroupShapeDrawingProperties(),
                    new ApplicationNonVisualDrawingProperties()),
                new GroupShapeProperties(new A.TransformGroup())
            )),
            new ColorMapOverride(new A.MasterColorMapping())
        );
        slideMasterPart.AddPart(slideLayoutPart, "rIdSlideLayout1");

        var slideIdList = new SlideIdList();
        presPart.Presentation.Append(
            new SlideMasterIdList(new SlideMasterId { Id = 2147483648, RelationshipId = "rIdSlideMaster1" }),
            slideIdList,
            new SlideSize { Cx = 9144000, Cy = 6858000, Type = SlideSizeValues.Screen4x3 },
            new NotesSize { Cx = 6858000, Cy = 9144000 },
            new DefaultTextStyle()
        );

        var slidePart = presPart.AddNewPart<SlidePart>("rIdSlide1");
        slidePart.AddPart(slideLayoutPart, "rIdSlideLayout1");

        // Build 4 shapes matching the TS example
        // shapeId starts at 1 in the spTree group props, then incremented per shape (starts at 2)
        var shapeTree = new ShapeTree(
            new NonVisualGroupShapeProperties(
                new NonVisualDrawingProperties { Id = 1, Name = "" },
                new NonVisualGroupShapeDrawingProperties(),
                new ApplicationNonVisualDrawingProperties()),
            new GroupShapeProperties(new A.TransformGroup()),
            BuildShape(2, "Shape 2", "Left aligned", A.TextAlignmentTypeValues.Left, null, null),
            BuildShape(3, "Shape 3", "Centered", A.TextAlignmentTypeValues.Center, null, null),
            BuildShape(4, "Shape 4", "Right aligned", A.TextAlignmentTypeValues.Right, null, null),
            BuildShape(5, "Shape 5", "Indented w/ hanging", A.TextAlignmentTypeValues.Left, 914400, -457200)
        );

        slidePart.Slide = new Slide(
            new CommonSlideData(shapeTree),
            new ColorMapOverride(new A.MasterColorMapping())
        );

        slideIdList.Append(new SlideId { Id = 256, RelationshipId = "rIdSlide1" });
        presPart.Presentation.Save();
    }

    private static Shape BuildShape(
        uint id,
        string name,
        string text,
        A.TextAlignmentTypeValues alignment,
        int? marL,
        int? indent)
    {
        var pPr = new A.ParagraphProperties { Alignment = alignment };
        if (marL.HasValue) pPr.LeftMargin = marL.Value;
        if (indent.HasValue) pPr.Indent = indent.Value;

        var para = new A.Paragraph(
            pPr,
            new A.Run(new A.Text(text)));

        return new Shape(
            new NonVisualShapeProperties(
                new NonVisualDrawingProperties { Id = id, Name = name },
                new NonVisualShapeDrawingProperties(),
                new ApplicationNonVisualDrawingProperties()),
            new ShapeProperties(),
            new TextBody(
                new A.BodyProperties(),
                new A.ListStyle(),
                para));
    }
}
