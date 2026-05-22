// Replica of examples/excel-add-image.ts
// Creates an xlsx with a 1x1 PNG anchored to B2:F10 using a TwoCellAnchor.

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using A = DocumentFormat.OpenXml.Drawing;
using XDR = DocumentFormat.OpenXml.Drawing.Spreadsheet;

namespace CrossSdkVerify.Replicas;

public static class ExcelAddImage
{
    private static readonly byte[] TinyPng =
    [
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
        0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x01, 0x00, 0x00,
        0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
        0x42, 0x60, 0x82,
    ];

    public static void Run(string outputPath)
    {
        using var doc = SpreadsheetDocument.Create(outputPath,
            DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook);

        var wbPart = doc.AddWorkbookPart();
        wbPart.Workbook = new Workbook();

        var wsPart = wbPart.AddNewPart<WorksheetPart>();
        var ws = new Worksheet(new SheetData());

        var sheets = wbPart.Workbook.AppendChild(new Sheets());
        sheets.Append(new Sheet
        {
            Id = wbPart.GetIdOfPart(wsPart),
            SheetId = 1,
            Name = "Sheet1"
        });

        // Add drawing part
        var drawingPart = wsPart.AddNewPart<DrawingsPart>();
        var drawingRelId = wsPart.GetIdOfPart(drawingPart);

        // Add image part to drawing part
        var imagePart = drawingPart.AddImagePart(ImagePartType.Png);
        using (var ms = new MemoryStream(TinyPng))
            imagePart.FeedData(ms);
        var imgRelId = drawingPart.GetIdOfPart(imagePart);

        // WorksheetDrawing
        drawingPart.WorksheetDrawing = new XDR.WorksheetDrawing(
            new XDR.TwoCellAnchor(
                new XDR.FromMarker(
                    new XDR.ColumnId("1"),         // col 1 = B (0-based)
                    new XDR.ColumnOffset("0"),
                    new XDR.RowId("1"),             // row 1 = 2 (0-based)
                    new XDR.RowOffset("0")),
                new XDR.ToMarker(
                    new XDR.ColumnId("5"),          // col 5 = F (0-based)
                    new XDR.ColumnOffset("0"),
                    new XDR.RowId("9"),             // row 9 = 10 (0-based)
                    new XDR.RowOffset("0")),
                new XDR.Picture(
                    new XDR.NonVisualPictureProperties(
                        new XDR.NonVisualDrawingProperties { Id = 1, Name = "Logo" },
                        new XDR.NonVisualPictureDrawingProperties()),
                    new XDR.BlipFill(
                        new A.Blip { Embed = imgRelId },
                        new A.Stretch(new A.FillRectangle())),
                    new XDR.ShapeProperties(
                        new A.Transform2D(
                            new A.Offset { X = 0, Y = 0 },
                            new A.Extents { Cx = 0, Cy = 0 }),
                        new A.PresetGeometry(new A.AdjustValueList())
                        { Preset = A.ShapeTypeValues.Rectangle })),
                new XDR.ClientData()
            )
        );

        // Link drawing to worksheet
        ws.Append(new Drawing { Id = drawingRelId });
        wsPart.Worksheet = ws;
        wbPart.Workbook.Save();
    }
}
