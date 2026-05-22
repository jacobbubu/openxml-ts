// Replica of examples/ppt-multi-slide.ts
// Creates a pptx with 4 slides, each with a title text shape.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptMultiSlide
{
    private static readonly string[] Titles =
    [
        "openxml-ts Multi-Slide Demo",
        "第二张：架构概览",
        "第三张：代码示例",
        "第四张：总结与展望",
    ];

    public static void Run(string outputPath)
    {
        // Reuse PptCreate infrastructure to build a similar deck with 4 slides
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

        // Add 4 slides
        for (int i = 0; i < Titles.Length; i++)
        {
            var rId = $"rIdSlide{i + 1}";
            var slidePart = presPart.AddNewPart<SlidePart>(rId);
            slidePart.AddPart(slideLayoutPart, "rIdSlideLayout1");
            slidePart.Slide = BuildSlide(Titles[i]);
            slideIdList.Append(new SlideId { Id = (uint)(256 + i), RelationshipId = rId });
        }

        presPart.Presentation.Save();
    }

    private static Slide BuildSlide(string title)
    {
        return new Slide(
            new CommonSlideData(
                new ShapeTree(
                    new NonVisualGroupShapeProperties(
                        new NonVisualDrawingProperties { Id = 1, Name = "" },
                        new NonVisualGroupShapeDrawingProperties(),
                        new ApplicationNonVisualDrawingProperties()),
                    new GroupShapeProperties(new A.TransformGroup()),
                    new Shape(
                        new NonVisualShapeProperties(
                            new NonVisualDrawingProperties { Id = 2, Name = "Title" },
                            new NonVisualShapeDrawingProperties { TextBox = true },
                            new ApplicationNonVisualDrawingProperties()),
                        new ShapeProperties(
                            new A.Transform2D(
                                new A.Offset { X = 838200, Y = 838200 },
                                new A.Extents { Cx = 7467600, Cy = 1143000 }),
                            new A.PresetGeometry(new A.AdjustValueList()) { Preset = A.ShapeTypeValues.Rectangle },
                            new A.NoFill()),
                        new TextBody(
                            new A.BodyProperties { Wrap = A.TextWrappingValues.Square, RightToLeftColumns = false },
                            new A.ListStyle(),
                            new A.Paragraph(
                                new A.Run(
                                    new A.RunProperties { Language = "zh-CN", Dirty = false },
                                    new A.Text(title)))))
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );
    }
}
