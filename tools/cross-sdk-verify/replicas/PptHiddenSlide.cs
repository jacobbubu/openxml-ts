// Replica of examples/ppt-hidden-slide.ts
// Creates a pptx with 3 slides: slide 1 visible, slide 2 hidden, slide 3 visible.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptHiddenSlide
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

        // Slide 1: visible (no Show attribute or Show=true)
        AddSlide(presPart, slideLayoutPart, slideIdList, 1, show: null);
        // Slide 2: hidden (Show=false)
        AddSlide(presPart, slideLayoutPart, slideIdList, 2, show: false);
        // Slide 3: visible
        AddSlide(presPart, slideLayoutPart, slideIdList, 3, show: null);

        presPart.Presentation.Save();
    }

    private static void AddSlide(PresentationPart presPart, SlideLayoutPart slideLayoutPart,
        SlideIdList slideIdList, int index, bool? show)
    {
        var rId = $"rIdSlide{index}";
        var slidePart = presPart.AddNewPart<SlidePart>(rId);
        slidePart.AddPart(slideLayoutPart, "rIdSlideLayout1");

        var slide = new Slide(
            new CommonSlideData(
                new ShapeTree(
                    new NonVisualGroupShapeProperties(
                        new NonVisualDrawingProperties { Id = 1, Name = "" },
                        new NonVisualGroupShapeDrawingProperties(),
                        new ApplicationNonVisualDrawingProperties()),
                    new GroupShapeProperties(new A.TransformGroup())
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );

        if (show.HasValue)
            slide.Show = show.Value;

        slidePart.Slide = slide;
        slideIdList.Append(new SlideId { Id = (uint)(255 + index), RelationshipId = rId });
    }
}
