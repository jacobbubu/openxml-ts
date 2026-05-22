// Replica of examples/ppt-merge-cells.ts
// Creates a pptx with 1 slide containing a 3x3 table with the first row merged as header.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using A = DocumentFormat.OpenXml.Drawing;

namespace CrossSdkVerify.Replicas;

public static class PptMergeCells
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

        long xEmu = 914400L * 2;
        long yEmu = 914400L * 2;
        long cxEmu = 914400L * 6;
        long cyEmu = (long)(914400L * 1.5);

        var tbl = BuildMergedTable(cxEmu);

        var graphicFrame = new GraphicFrame(
            new NonVisualGraphicFrameProperties(
                new NonVisualDrawingProperties { Id = 2, Name = "Quarter" },
                new NonVisualGraphicFrameDrawingProperties(new A.GraphicFrameLocks { NoGrouping = true }),
                new ApplicationNonVisualDrawingProperties()),
            new Transform(
                new A.Offset { X = xEmu, Y = yEmu },
                new A.Extents { Cx = cxEmu, Cy = cyEmu }),
            new A.Graphic(
                new A.GraphicData(tbl) { Uri = "http://schemas.openxmlformats.org/drawingml/2006/table" })
        );

        slidePart.Slide = new Slide(
            new CommonSlideData(
                new ShapeTree(
                    new NonVisualGroupShapeProperties(
                        new NonVisualDrawingProperties { Id = 1, Name = "" },
                        new NonVisualGroupShapeDrawingProperties(),
                        new ApplicationNonVisualDrawingProperties()),
                    new GroupShapeProperties(new A.TransformGroup()),
                    graphicFrame
                )
            ),
            new ColorMapOverride(new A.MasterColorMapping())
        );

        slideIdList.Append(new SlideId { Id = 256, RelationshipId = "rIdSlide1" });
        presPart.Presentation.Save();
    }

    private static A.Table BuildMergedTable(long totalCxEmu)
    {
        long colWidth = totalCxEmu / 3;
        var tbl = new A.Table();
        tbl.Append(new A.TableProperties { FirstRow = true, BandRow = true });
        tbl.Append(new A.TableGrid(
            new A.GridColumn { Width = colWidth },
            new A.GridColumn { Width = colWidth },
            new A.GridColumn { Width = colWidth }
        ));

        // Row 0: merged header "Quarter Stats" spanning 3 cols
        var row0 = new A.TableRow { Height = 370840 };
        // First cell: gridSpan=3, text "Quarter Stats"
        row0.Append(MakeTableCell("Quarter Stats", gridSpan: 3));
        // Merged cells (hMerge)
        row0.Append(MakeTableCell("", hMerge: true));
        row0.Append(MakeTableCell("", hMerge: true));
        tbl.Append(row0);

        // Row 1: Product / Q1 / Q2
        var row1 = new A.TableRow { Height = 370840 };
        row1.Append(MakeTableCell("Product"));
        row1.Append(MakeTableCell("Q1"));
        row1.Append(MakeTableCell("Q2"));
        tbl.Append(row1);

        // Row 2: data
        var row2 = new A.TableRow { Height = 370840 };
        row2.Append(MakeTableCell("Widgets"));
        row2.Append(MakeTableCell("$1,200"));
        row2.Append(MakeTableCell("$1,450"));
        tbl.Append(row2);

        return tbl;
    }

    private static A.TableCell MakeTableCell(string text, int gridSpan = 1, bool hMerge = false)
    {
        var tc = new A.TableCell(
            new A.TextBody(
                new A.BodyProperties(),
                new A.ListStyle(),
                new A.Paragraph(new A.Run(new A.Text(text)))
            ),
            new A.TableCellProperties()
        );

        if (gridSpan > 1) tc.GridSpan = gridSpan;
        if (hMerge) tc.HorizontalMerge = true;

        return tc;
    }
}
