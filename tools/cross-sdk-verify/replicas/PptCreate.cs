// Replica of examples/ppt-create.ts
// Creates a pptx with 3 slides, each with a title text shape.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptCreate
{
    private static readonly string[] Titles =
    [
        "openxml-ts PowerPoint Demo",
        "Generated on {{date}}",
        "Slide 3 — concluding remarks",
    ];

    public static void Run(string outputPath)
    {
        using var doc = PresentationDocument.Create(outputPath,
            DocumentFormat.OpenXml.PresentationDocumentType.Presentation);

        var presPart = doc.AddPresentationPart();
        presPart.Presentation = new Presentation();

        // Create slide master + layout infrastructure
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

        // Add a theme part (required)
        var themePart = presPart.AddNewPart<ThemePart>("rIdTheme1");
        themePart.Theme = new A.Theme(
            new A.ThemeElements(
                new A.ColorScheme(
                    new A.Dark1Color(new A.SystemColor { LastColor = "000000", Val = A.SystemColorValues.WindowText }),
                    new A.Light1Color(new A.SystemColor { LastColor = "FFFFFF", Val = A.SystemColorValues.Window }),
                    new A.Dark2Color(new A.RgbColorModelHex { Val = "44546A" }),
                    new A.Light2Color(new A.RgbColorModelHex { Val = "E7E6E6" }),
                    new A.Accent1Color(new A.RgbColorModelHex { Val = "4472C4" }),
                    new A.Accent2Color(new A.RgbColorModelHex { Val = "ED7D31" }),
                    new A.Accent3Color(new A.RgbColorModelHex { Val = "A9D18E" }),
                    new A.Accent4Color(new A.RgbColorModelHex { Val = "FFC000" }),
                    new A.Accent5Color(new A.RgbColorModelHex { Val = "5B9BD5" }),
                    new A.Accent6Color(new A.RgbColorModelHex { Val = "70AD47" }),
                    new A.Hyperlink(new A.RgbColorModelHex { Val = "0563C1" }),
                    new A.FollowedHyperlinkColor(new A.RgbColorModelHex { Val = "954F72" })
                ) { Name = "Office Theme" },
                new A.FontScheme(
                    new A.MajorFont(new A.LatinFont { Typeface = "Calibri Light" }, new A.EastAsianFont { Typeface = "" }, new A.ComplexScriptFont { Typeface = "" }),
                    new A.MinorFont(new A.LatinFont { Typeface = "Calibri" }, new A.EastAsianFont { Typeface = "" }, new A.ComplexScriptFont { Typeface = "" })
                ) { Name = "Office Theme" },
                new A.FormatScheme(
                    new A.FillStyleList(
                        new A.NoFill(),
                        new A.SolidFill(new A.SchemeColor { Val = A.SchemeColorValues.PhColor }),
                        new A.SolidFill(new A.SchemeColor { Val = A.SchemeColorValues.PhColor })
                    ),
                    new A.LineStyleList(
                        new A.Outline(new A.SolidFill(new A.SchemeColor { Val = A.SchemeColorValues.PhColor })) { Width = 6350 },
                        new A.Outline(new A.SolidFill(new A.SchemeColor { Val = A.SchemeColorValues.PhColor })) { Width = 12700 },
                        new A.Outline(new A.SolidFill(new A.SchemeColor { Val = A.SchemeColorValues.PhColor })) { Width = 19050 }
                    ),
                    new A.EffectStyleList(
                        new A.EffectStyle(new A.EffectList()),
                        new A.EffectStyle(new A.EffectList()),
                        new A.EffectStyle(new A.EffectList())
                    ),
                    new A.BackgroundFillStyleList(
                        new A.NoFill(),
                        new A.NoFill(),
                        new A.SolidFill(new A.SchemeColor { Val = A.SchemeColorValues.PhColor })
                    )
                ) { Name = "Office Theme" }
            ),
            new A.ObjectDefaults(),
            new A.ExtraColorSchemeList()
        ) { Name = "Office Theme" };

        slideMasterPart.AddPart(themePart, "rIdTheme1");

        // Build slide ID list
        var slideIdList = new SlideIdList();
        presPart.Presentation.Append(
            new SlideMasterIdList(new SlideMasterId { Id = 2147483648, RelationshipId = "rIdSlideMaster1" }),
            slideIdList,
            new SlideSize { Cx = 9144000, Cy = 6858000, Type = SlideSizeValues.Screen4x3 },
            new NotesSize { Cx = 6858000, Cy = 9144000 },
            new DefaultTextStyle()
        );

        // Add 3 slides
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
                                    new A.RunProperties { Language = "en-US", Dirty = false },
                                    new A.Text(title)))))
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );
    }
}
