# Conformance Fixtures (Generated from Upstream .NET Tests)

These 9 OOXML files are **byte-faithful outputs** of the .NET Open-XML-SDK conformance test `GeneratedDocument.CreatePackage(Stream)` helpers. They are used by `test/conformance/conformance-dotnet-parity.test.ts` to drive end-to-end tests ported from `dotnet/Open-XML-SDK/test/DocumentFormat.OpenXml.Tests/ConformanceTest/`.

## Source map

| Fixture | Upstream file | Class FQN |
| --- | --- | --- |
| `Guide.pptx` | `ConformanceTest/Guide/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.GuideClass.GeneratedDocument` |
| `ChartTrackingRefBased.pptx` | `ConformanceTest/ChartTrackingRefBased/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.ChartTrackingRefBasedClass.GeneratedDocument` |
| `ThreadingInfo.pptx` | (same .pptx as ChartTrackingRefBased — ThreadingInfo test imports it) | `DocumentFormat.OpenXml.Tests.ChartTrackingRefBasedClass.GeneratedDocument` |
| `Theme.pptx` | `ConformanceTest/Theme/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.ThemeClass.GeneratedDocument` |
| `WorkbookPr.xlsx` | `ConformanceTest/WorkbookPr/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.WorkBookPrClass.GeneratedDocument` |
| `Slicer.xlsx` | `ConformanceTest/Slicer/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.SlicerClass.GeneratedDocument` |
| `PivotConnection.xlsx` | `ConformanceTest/Pivot/ConnectionGeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.PivotClass.ConnectionGeneratedDocument` |
| `Timeline.xlsx` | `ConformanceTest/Timeline/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.TimelineClass.GeneratedDocument` |
| `CommentExPeople.docx` | `ConformanceTest/CommentExPeople/GeneratedDocument.cs` | `DocumentFormat.OpenXml.Tests.CommentExPeopleClass.GeneratedDocument` (non-static `CreatePackage`) |

## Regeneration

A regeneration helper lives at `tools/cross-sdk-verify/replicas/ConformanceFixtures.cs`. To run it you must point the cross-sdk-verify csproj at a local clone of [Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK) by setting the `OpenXmlSdkTestPath` MSBuild property:

```bash
cd tools/cross-sdk-verify
dotnet run \
  -p:OpenXmlSdkTestPath=/path/to/Open-XML-SDK/test/DocumentFormat.OpenXml.Tests/ConformanceTest \
  -- generate-fixtures /abs/path/to/openxml-ts/test/fixtures/conformance/generated
```

When `OpenXmlSdkTestPath` is set, the csproj `<Compile Include>`s the upstream `GeneratedDocument.cs` files, and the `generate-fixtures` subcommand invokes each `*.GeneratedDocument.CreatePackage(stream)` to produce the .docx/.xlsx/.pptx in the output dir.

When `OpenXmlSdkTestPath` is not set, the conformance-fixture compilation unit is excluded so the project builds without the upstream dependency. CI builds without it.

## Licensing

Upstream Open-XML-SDK is MIT licensed. The fixtures here are derivative outputs (binary artefacts) of upstream test code; no upstream source is vendored into this repo. Regenerating from `OpenXmlSdkTestPath` reads — but does not copy — the upstream `.cs` files.
