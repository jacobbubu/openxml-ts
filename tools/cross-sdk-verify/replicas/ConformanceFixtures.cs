// Conformance fixture generator — wraps the .NET SDK test GeneratedDocument classes
// to produce real Office files for use in openxml-ts conformance tests.
//
// Usage: CrossSdkVerify generate-fixtures <output-dir>
//
// Generates the following fixtures in <output-dir>:
//   Guide.pptx
//   ChartTrackingRefBased.pptx
//   ThreadingInfo.pptx  (same document as ChartTrackingRefBased)
//   Theme.pptx
//   WorkbookPr.xlsx
//   Slicer.xlsx
//   PivotConnection.xlsx
//   Timeline.xlsx
//   CommentExPeople.docx

namespace CrossSdkVerify.Replicas;

public static class ConformanceFixtures
{
    public static void GenerateAll(string outputDir)
    {
        Directory.CreateDirectory(outputDir);

        Generate("Guide.pptx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.GuideClass.GeneratedDocument.CreatePackage(stream));

        // ChartTrackingRefBased test uses its own GeneratedDocument
        Generate("ChartTrackingRefBased.pptx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.ChartTrackingRefBasedClass.GeneratedDocument.CreatePackage(stream));

        // ThreadingInfoTest imports from ChartTrackingRefBasedClass — it uses the SAME
        // GeneratedDocument.CreatePackage(stream) as ChartTrackingRefBased.
        Generate("ThreadingInfo.pptx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.ChartTrackingRefBasedClass.GeneratedDocument.CreatePackage(stream));

        Generate("Theme.pptx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.ThemeClass.GeneratedDocument.CreatePackage(stream));

        Generate("WorkbookPr.xlsx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.WorkBookPrClass.GeneratedDocument.CreatePackage(stream));

        Generate("Slicer.xlsx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.SlicerClass.GeneratedDocument.CreatePackage(stream));

        Generate("PivotConnection.xlsx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.PivotClass.ConnectionGeneratedDocument.CreatePackage(stream));

        Generate("Timeline.xlsx", outputDir, stream =>
            DocumentFormat.OpenXml.Tests.TimelineClass.GeneratedDocument.CreatePackage(stream));

        // CommentExPeople has a non-static CreatePackage(Stream)
        Generate("CommentExPeople.docx", outputDir, stream =>
            new DocumentFormat.OpenXml.Tests.CommentExPeopleClass.GeneratedDocument().CreatePackage(stream));
    }

    private static void Generate(string fileName, string outputDir, Action<Stream> creator)
    {
        var path = Path.Combine(outputDir, fileName);
        using var stream = new FileStream(path, FileMode.Create, FileAccess.ReadWrite);
        creator(stream);
        Console.WriteLine($"  Generated: {fileName}");
    }
}
