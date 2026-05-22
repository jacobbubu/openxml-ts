// Replica of examples/ppt-shape-rotation.ts
// Creates a pptx with 5 shapes demonstrating rotation/flip.
// Final state after set/clear operations:
//   Shape "Rotated90"   (id=2): rot=undefined (cleared), flipH=false, flipV=false
//   Shape "Rotated45"   (id=3): rot=45
//   Shape "FlipH"       (id=4): flipH=undefined (cleared), flipV=false
//   Shape "FlipV"       (id=5): flipV=true
//   Shape "Rot180FlipH" (id=6): rot=180, flipH=true
// Digest extractor reads shapes by name/text — rotation/flip metadata not in digest.
// So we produce the shapes with their final geometry transforms.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptShapeRotation
{
    private const long INCH = 914400L;

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

        // Final state of each shape after the TS example runs:
        // sp1 "Rotated90": rotation cleared → no rot attr; x=INCH, y=INCH
        // sp2 "Rotated45": rot=45 degrees → 45*60000 = 2700000 (in 1/60000 degree units); x=3*INCH, y=INCH
        // sp3 "FlipH": flipH cleared → no flipH attr; x=INCH, y=2*INCH
        // sp4 "FlipV": flipV=true; x=3*INCH, y=2*INCH
        // sp5 "Rot180FlipH": rot=180, flipH=true; x=5*INCH, y=INCH

        slidePart.Slide = new Slide(
            new CommonSlideData(
                new ShapeTree(
                    new NonVisualGroupShapeProperties(
                        new NonVisualDrawingProperties { Id = 1, Name = "" },
                        new NonVisualGroupShapeDrawingProperties(),
                        new ApplicationNonVisualDrawingProperties()),
                    new GroupShapeProperties(new A.TransformGroup()),
                    // sp1: no rotation (cleared)
                    MakeShape(2, "Rotated90", INCH, INCH, rotation: null, flipH: null, flipV: null),
                    // sp2: rot=45 degrees
                    MakeShape(3, "Rotated45", INCH * 3, INCH, rotation: 45 * 60000, flipH: null, flipV: null),
                    // sp3: flipH cleared
                    MakeShape(4, "FlipH", INCH, INCH * 2, rotation: null, flipH: null, flipV: null),
                    // sp4: flipV=true
                    MakeShape(5, "FlipV", INCH * 3, INCH * 2, rotation: null, flipH: null, flipV: true),
                    // sp5: rot=180, flipH=true
                    MakeShape(6, "Rot180FlipH", INCH * 5, INCH, rotation: 180 * 60000, flipH: true, flipV: null)
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );

        slideIdList.Append(new SlideId { Id = 256, RelationshipId = "rIdSlide1" });
        presPart.Presentation.Save();
    }

    private static Shape MakeShape(uint id, string name, long x, long y,
        int? rotation, bool? flipH, bool? flipV)
    {
        var xfrm = new A.Transform2D(
            new A.Offset { X = x, Y = y },
            new A.Extents { Cx = INCH, Cy = INCH / 2 });

        if (rotation.HasValue) xfrm.Rotation = rotation.Value;
        if (flipH.HasValue) xfrm.HorizontalFlip = flipH.Value;
        if (flipV.HasValue) xfrm.VerticalFlip = flipV.Value;

        return new Shape(
            new NonVisualShapeProperties(
                new NonVisualDrawingProperties { Id = id, Name = name },
                new NonVisualShapeDrawingProperties(),
                new ApplicationNonVisualDrawingProperties()),
            new ShapeProperties(
                xfrm,
                new A.PresetGeometry(new A.AdjustValueList()) { Preset = A.ShapeTypeValues.Rectangle }),
            new TextBody(
                new A.BodyProperties(),
                new A.ListStyle(),
                new A.Paragraph())
        );
    }
}
