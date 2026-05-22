// Replica of examples/ppt-replace.ts
// Creates a pptx template with "{{date}}" placeholder, replaces it with "2024-01-01", saves.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptReplace
{
    private const string Replacement = "2024-01-01";

    public static void Run(string outputPath)
    {
        var tempPath = Path.GetTempFileName() + ".pptx";
        try
        {
            BuildTemplate(tempPath);
            ApplyReplace(tempPath, outputPath);
        }
        finally
        {
            if (File.Exists(tempPath)) File.Delete(tempPath);
        }
    }

    private static void BuildTemplate(string path)
    {
        using var doc = PresentationDocument.Create(path,
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

        slidePart.Slide = new Slide(
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
                                    new A.Text("Date: {{date}}")))))
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );

        slideIdList.Append(new SlideId { Id = 256, RelationshipId = "rIdSlide1" });
        presPart.Presentation.Save();
    }

    private static void ApplyReplace(string inputPath, string outputPath)
    {
        File.Copy(inputPath, outputPath, overwrite: true);

        using var doc = PresentationDocument.Open(outputPath, true);
        var presPart = doc.PresentationPart;
        if (presPart == null) return;

        foreach (var slidePart in presPart.SlideParts)
        {
            foreach (var t in slidePart.Slide.Descendants<A.Text>())
            {
                if (t.Text?.Contains("{{date}}") == true)
                    t.Text = t.Text.Replace("{{date}}", Replacement);
            }
        }

        presPart.Presentation.Save();
    }
}
