// Shared helper for PPT replica tests — builds the minimal presentation infrastructure
// (SlideMaster + SlideLayout) that all PPT replicas need.

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

internal static class PptHelper
{
    /// <summary>
    /// Creates the PresentationPart with SlideMaster + SlideLayout infrastructure.
    /// Returns (presPart, slideLayoutPart) for use by the caller.
    /// </summary>
    internal static (PresentationPart presPart, SlideLayoutPart slideLayoutPart)
        BuildPresInfrastructure(PresentationDocument doc)
    {
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

        return (presPart, slideLayoutPart);
    }

    /// <summary>Builds a minimal empty slide with a title text shape.</summary>
    internal static Slide BuildTitleSlide(string title, string lang = "en-US")
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
                                    new A.RunProperties { Language = lang, Dirty = false },
                                    new A.Text(title)))))
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );
    }

    /// <summary>Builds a minimal empty slide with no shapes (for adding shapes manually).</summary>
    internal static Slide BuildEmptySlide()
    {
        return new Slide(
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
    }
}
