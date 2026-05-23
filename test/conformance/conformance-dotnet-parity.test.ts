/**
 * Batch 6: Conformance 端到端（收尾）— .NET SDK 测试移植
 *
 * 本文件对应 .NET 测试套件中的 Batch 6 范围：
 *   - ConformanceTest/ 目录下 14 个子目录（~26 方法）
 *   - IsoStrictTest（2 Theory）
 *   - TestOffice2016（7 Theory）
 *   - DocxTests01 / XlsxTests01 / PptxTests01（精选可移植部分）
 *
 * 每条测试注明 .NET 来源（文件 + 方法名），分诊结论（PORTABLE / COVERED / N/A），
 * 以及跳过原因（当 N/A 时）。
 *
 * 资产策略：只引入本批次实际需要的 fixture，不整体搬运 .NET 的 707 个 asset。
 *
 * 来源：docs/dotnet-test-port-plan.md § Batch 6
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { Int32Value, StringValue } from "../../src/element/index.js";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { openAsync } from "../../src/index.js";
import { officePowerpoint2012Main, officeWord2012Wordml } from "../../src/office-ext/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONFORMANCE_DIR = join(HERE, "../fixtures/conformance");
const OF16_DIR = join(HERE, "../fixtures/office2016");
const SMOKE_DIR = join(HERE, "../fixtures/upstream-smoke");

async function readFixture(dir: string, name: string): Promise<Uint8Array> {
  return new Uint8Array(await readFile(join(dir, name)));
}

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/CommentEx — CommentExTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/CommentEx (源：CommentExTest.cs)", () => {
  /**
   * PORTABLE
   * 源：CommentExTest.CommentExInvalidFormat [Fact]
   * Office15TCM: OASys#283293: OOXML SDK: COMPS: Invalid format on CommentEx
   *
   * .NET 原意：打开含有 W15 CommentEx 的 docx，用 Office2013 validator 校验→0 错误。
   * openxml-ts 移植：验证 OPC 层能打开（不抛），结构完整（有 mainDocumentPart）。
   * validator.Validate(doc) 对应物：CommentsExPart 未集成入 Word 门面，只做 OPC smoke。
   */
  it("CommentExInvalidFormat — 含 W15 CommentEx 的 docx 可打开、OPC 层完整", async () => {
    const bytes = await readFixture(CONFORMANCE_DIR, "Invalid_Word15Comments.docx");
    const pkg = await openAsync(bytes);
    const parts = [...pkg.parts()];
    expect(parts.length).toBeGreaterThan(0);

    // typed layer: mainDocumentPart 可访问
    const doc = await WordprocessingDocument.openAsync(bytes);
    expect(doc.mainDocumentPart).toBeDefined();
  });

  /**
   * PORTABLE（部分）
   * 源：CommentExTest.CommentEx02VerifyEdit / CommentEx04VerifyDelete [Fact]
   *
   * .NET 原意：通过 GeneratedDocument.Generate(stream) 程序化创建多 Part 文档，
   * 验证 WordprocessingCommentsExPart / WordprocessingCommentsPart 可访问并编辑。
   * openxml-ts 移植：用已有 Invalid_Word15Comments.docx fixture（含 commentsExtended.xml）
   * 验证 mainDocumentPart.wordprocessingCommentsExPart 可导航，root 有内容。
   * C# GeneratedDocument 程序化生成路径无法直接移植，故只做访问器 smoke 验证。
   */
  it("CommentEx02VerifyEdit — Invalid_Word15Comments.docx 的 wordprocessingCommentsExPart 可访问", async () => {
    const bytes = await readFixture(CONFORMANCE_DIR, "Invalid_Word15Comments.docx");
    const doc = await WordprocessingDocument.openAsync(bytes);
    const main = doc.mainDocumentPart;
    expect(main).toBeDefined();
    const commentsExPart = main!.wordprocessingCommentsExPart;
    expect(commentsExPart).toBeDefined();
    // root 应是 commentsExtended 元素（实际加载后有子节点）
    expect(commentsExPart!.root).toBeDefined();
  });

  it("CommentEx04VerifyDelete — wordprocessingCommentsExPart 不存在时返 undefined（无此 Part 的文档）", async () => {
    // 使用没有 commentsExtended 的普通 docx
    const bytes = await readFixture(SMOKE_DIR, "HelloWorld.docx");
    const doc = await WordprocessingDocument.openAsync(bytes);
    const main = doc.mainDocumentPart;
    expect(main).toBeDefined();
    // HelloWorld.docx 不含 commentsExtended，应返 undefined
    const commentsExPart = main!.wordprocessingCommentsExPart;
    expect(commentsExPart).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/CommentExPeople — CommentExPeopleTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/CommentExPeople (源：CommentExPeopleTest.cs)", () => {
  /**
   * N/A — CommentExPeople01ReadElement / CommentExPeople02EditElement
   *
   * 依赖 GeneratedDocument.CreatePackage（C# 程序化生成含 WordprocessingPeoplePart 的 docx），
   * 无对应 fixture 文件可直接移植；且 W15.Person / W15.PresenceInfo 的 typed 访问需要
   * office-word-2010 命名空间 typed schema 支持（当前 root 是 OpenXmlUnknownElement 占位）。
   * WordprocessingPeoplePart 访问器本身已接入 MainDocumentPart（Epic-117），
   * 但无 fixture 进行端到端验证，保留 skip。
   */
  it.skip("CommentExPeople01ReadElement [N/A] — 无 W15 People fixture；GeneratedDocument 程序化生成无法移植", () => {});
  it.skip("CommentExPeople02EditElement [N/A] — 同上；W15.Person typed 访问依赖 office-word-2010 schema", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/ContentControl — ContentControlTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/ContentControl (源：ContentControlTest.cs)", () => {
  /**
   * COVERED + N/A（复杂操作链）
   * 源：ContentControl01EditElement / ContentControl03DeleteElement
   *
   * SDT 基础已有（test/word/content-types.test.ts）。
   * EditElement.EditContentControlElements 中的复杂 SdtProperties 设置器链依赖 .NET 特有路径 → N/A。
   */
  it.skip("ContentControl01EditElement [COVERED/N/A] — SDT 基础在 content-types.test.ts 已覆盖；复杂编辑链 N/A", () => {});
  it.skip("ContentControl03DeleteElement [COVERED/N/A] — SdtElement.Remove() 基础已有；整体链 N/A", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/FootnoteColumns — FootnoteColumnsTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/FootnoteColumns (源：FootnoteColumnsTest.cs)", () => {
  /**
   * PORTABLE
   * 源：FootnoteColumnsTest.FootnoteColumnsReadWriteTest [Fact]
   *
   * .NET 原意：创建含 W15.FootnoteColumns(val=4) 文档，改为 val=99，重读验证。
   * openxml-ts 移植：验证 W15.FootnoteColumns 元素可构造、typed val 属性可读写。
   * GeneratedDocument（C# 代码生成）无法直接移植，但核心元素语义可验。
   */
  it("FootnoteColumnsReadWriteTest — W15.FootnoteColumns 元素可构造、val 属性可读写", () => {
    const fc = new officeWord2012Wordml.FootnoteColumns();
    expect(fc.localName).toBe("footnoteColumns");
    expect(fc.namespaceUri).toBe("http://schemas.microsoft.com/office/word/2012/wordml");

    // val typed property (Int32Value): mirrors .NET OriginalValue=4 / ModifiedValue=99
    fc.val = new Int32Value(4);
    expect(fc.val?.value).toBe(4);

    fc.val = new Int32Value(99);
    expect(fc.val?.value).toBe(99);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/PresetTransition — PresetTransitionTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/PresetTransition (源：PresetTransitionTest.cs)", () => {
  /**
   * PORTABLE
   * 源：PresetTransitionTest.PresetTransitionReadWriteTest [Fact]
   *
   * .NET 原意：P15.PresetTransition 的 preset / invX / invY 属性读写。
   * openxml-ts 移植：PresetTransition 在 officePowerpoint2012Main（p15 前缀），
   * 验证元素可构造 + preset 属性可读写。
   */
  it("PresetTransitionReadWriteTest — P15(p15).PresetTransition 可构造，preset 属性可读写", () => {
    const el = new officePowerpoint2012Main.PresetTransition();
    expect(el.localName).toBe("prstTrans");
    expect(el.prefix).toBe("p15");
    expect(el.namespaceUri).toBe("http://schemas.microsoft.com/office/powerpoint/2012/main");

    // preset typed property: mirrors .NET OriginalPresetTransition = "pageCurlDouble"
    el.preset = new StringValue("pageCurlDouble");
    expect(el.preset?.value).toBe("pageCurlDouble");

    el.preset = new StringValue("pageCurlSingle");
    expect(el.preset?.value).toBe("pageCurlSingle");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/ChartTrackingRefBased — ChartTrackingRefBasedTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/ChartTrackingRefBased (源：ChartTrackingRefBasedTest.cs)", () => {
  /**
   * N/A — ChartTrackingRefBasedTest01 / ChartTrackingRefBasedTest03DeleteAddElement
   *
   * 依赖 pptx GeneratedDocument + PresentationPart → SlideParts → ChartTrackingRefBased，
   * openxml-ts PPT 门面暂未暴露此 typed Part 访问路径。
   */
  it.skip("ChartTrackingRefBasedTest01 [N/A] — pptx GeneratedDocument + ChartTrackingRefBased Part 访问路径未暴露", () => {});
  it.skip("ChartTrackingRefBasedTest03DeleteAddElement [N/A] — 同上", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/Guide — GuideTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/Guide (源：GuideTest.cs)", () => {
  /**
   * N/A — Guide01EditElement / Guide03DeleteAddElement
   *
   * 依赖 pptx GeneratedDocument + SlideMasterPart.SlideLayout.CommonSlideData.GuideList，
   * PPT 门面未暴露 SlideLayoutPart 的 Guide 集合访问器。
   */
  it.skip("Guide01EditElement [N/A] — SlideLayoutPart.GuideList 访问路径未暴露", () => {});
  it.skip("Guide03DeleteAddElement [N/A] — 同上", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/Pivot — PivotTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/Pivot (源：PivotTest.cs)", () => {
  /**
   * N/A — PivotConnection01EditElement / 03DeleteElement / 03AddElement
   *
   * 依赖 ConnectionGeneratedDocument.CreatePackage（C# 程序化生成含 ConnectionsPart 的 xlsx），
   * 无对应 fixture 文件。ConnectionsPart 已接入 WorkbookPart（Epic-117），
   * 但无 fixture 进行端到端验证；X15.Connection typed 访问依赖 excel-2010 schema。
   */
  it.skip("PivotConnection01EditElement [N/A] — 无 Connections fixture；GeneratedDocument 程序化生成无法移植", () => {});
  it.skip("PivotConnection03DeleteElement [N/A] — 同上", () => {});
  it.skip("PivotConnection03AddElement [N/A] — 同上", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/Slicer — SlicerTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/Slicer (源：SlicerTest.cs)", () => {
  /**
   * N/A — Slicer01EditElement
   *
   * 依赖 GeneratedDocument.CreatePackage（C# 程序化生成含 SlicerCachePart 的 xlsx），
   * 无对应 fixture 文件。SlicerCachePart 已接入 WorkbookPart.slicerCacheParts（Epic-117），
   * 但无 fixture 进行端到端验证；X14/X15 Slicer typed 访问依赖 excel-2009/2010 schema。
   */
  it.skip("Slicer01EditElement [N/A] — 无 SlicerCache fixture；GeneratedDocument 程序化生成无法移植", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/Theme — ThemeTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/Theme (源：ThemeTest.cs)", () => {
  /**
   * N/A — Theme01EditAttribute / Theme03DeleteAttribute
   *
   * 依赖 pptx GeneratedDocument + Thm15.ThemeId 属性（Thm15 命名空间），
   * TestEntities 链路涉及多步 .NET 特有 Part 关系遍历。
   * openxml-ts 已有 test/ppt/ 层 Theme 基础测试。
   */
  it.skip("Theme01EditAttribute [N/A] — Thm15.ThemeId 设置器链路依赖 .NET Part 遍历", () => {});
  it.skip("Theme03DeleteAttribute [N/A] — 同上", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/ThreadingInfo — ThreadingInfoTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/ThreadingInfo (源：ThreadingInfoTest.cs)", () => {
  /**
   * N/A — ThreadingInfo01EditElement / ThreadingInfo03DeleteAddElement
   *
   * 依赖 GeneratedDocument（C# 程序化生成含 CommentsExPart 的 docx）。
   * WordprocessingCommentsExPart 已接入 MainDocumentPart（Epic-117），
   * 但 W15.CommentEx.ThreadingInfo typed 访问依赖 office-word-2012 schema，
   * 且无对应 fixture 文件进行端到端验证。
   */
  it.skip("ThreadingInfo01EditElement [N/A] — 无 ThreadingInfo fixture；W15.ThreadingInfo typed 访问依赖 office-word-2012 schema", () => {});
  it.skip("ThreadingInfo03DeleteAddElement [N/A] — 同上", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/Timeline — TimeLineTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/Timeline (源：TimeLineTest.cs)", () => {
  /**
   * N/A — TimeLineEditAttributes
   *
   * 依赖 GeneratedDocument.CreatePackage（C# 程序化生成含 TimelineCachePart 的 xlsx），
   * 无对应 fixture 文件。TimeLineCachePart 已接入 WorkbookPart.timeLineCacheParts（Epic-117），
   * 但无 fixture 进行端到端验证；X15.Timeline typed 访问依赖 excel-2010 schema。
   */
  it.skip("TimeLineEditAttributes [N/A] — 无 TimelineCache fixture；GeneratedDocument 程序化生成无法移植", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/WebExtension — WebExtensionTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/WebExtension (源：WebExtensionTest.cs)", () => {
  /**
   * PORTABLE
   * 源：WebExtensionTest.WebExtensionAcceptance [Theory]
   * 参数：Bing.xlsx, Youtube.xlsx（O15Conformance/XL/WebExtension/）
   *
   * .NET 原意：打开 xlsx，验证 WebExtension 部分可读可写，validator 通过。
   * openxml-ts 移植：OPC 层打开 + SpreadsheetDocument typed layer 不抛。
   * WebExtensionPart typed 访问路径（WorksheetPart.DrawingsPart.WebExtensionParts）
   * 在 Excel 门面尚未暴露，因此只做 OPC smoke + typed document layer 验证。
   *
   * 来源资产：test/fixtures/conformance/Bing.xlsx, Youtube.xlsx
   */
  it("WebExtensionAcceptance — Bing.xlsx OPC 层可打开，SpreadsheetDocument 不抛", async () => {
    const bytes = await readFixture(CONFORMANCE_DIR, "Bing.xlsx");
    const pkg = await openAsync(bytes);
    expect([...pkg.parts()].length).toBeGreaterThan(0);

    const doc = await SpreadsheetDocument.openAsync(bytes);
    expect(doc.workbookPart).toBeDefined();
  });

  it("WebExtensionAcceptance — Youtube.xlsx OPC 层可打开，SpreadsheetDocument 不抛", async () => {
    const bytes = await readFixture(CONFORMANCE_DIR, "Youtube.xlsx");
    const pkg = await openAsync(bytes);
    expect([...pkg.parts()].length).toBeGreaterThan(0);

    const doc = await SpreadsheetDocument.openAsync(bytes);
    expect(doc.workbookPart).toBeDefined();
  });

  /**
   * N/A — WebExtensionTest.WebExtensionFullyFledgedValidation [Fact]
   *
   * 依赖 WebExtensionData.CreatePackage（程序化生成含 WebExtensionPart 的 xlsx）+
   * WorksheetPart.DrawingsPart.WebExtensionParts 遍历（Excel 门面未暴露）。
   */
  it.skip("WebExtensionFullyFledgedValidation [N/A] — WebExtensionPart 访问路径未集成到 Excel 门面", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// ConformanceTest/WorkbookPr — WorkBookPrTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("ConformanceTest/WorkbookPr (源：WorkBookPrTest.cs)", () => {
  /**
   * N/A — WorkBookPr01EditElement / WorkBookPr03DeleteElement
   *
   * 依赖 xlsx GeneratedDocument + X15.WorkbookProperties / X15ac.AbsolutePath，
   * MC 展开（ProcessAllParts/Office2013）后的 X15 访问路径在 Excel 门面未暴露。
   */
  it.skip("WorkBookPr01EditElement [N/A] — X15.WorkbookProperties 访问路径未集成到 Excel 门面", () => {});
  it.skip("WorkBookPr03DeleteElement [N/A] — 同上", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// IsoStrictTest — IsoStrictTest.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("IsoStrictTest (源：IsoStrictTest.cs)", () => {
  /**
   * N/A — TestISOStrictNamespace [Theory × 10] / ValidateISOStrictNamespace [Theory × 60+]
   *
   * openxml-ts N/A 原因：
   *   1. `StrictRelationshipFound` 属性尚未在 Word/Excel/PPT 门面上暴露
   *      （ISO Strict 命名空间转换内部状态已有，但门面未暴露）。
   *   2. O14ISOStrict 资产约 60+ 文件，按 asset 策略不整体搬运。
   * 已有覆盖：test/element/strict-namespace.test.ts 覆盖 ISO Strict 命名空间翻译逻辑。
   */
  it.skip("TestISOStrictNamespace [N/A] — StrictRelationshipFound 属性未暴露；O14ISOStrict fixture 未批量引入", () => {});
  it.skip("ValidateISOStrictNamespace [N/A] — 同上；O14ISOStrict fixture 未批量引入", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// TestOffice2016 — TestOffice2016.cs
// ─────────────────────────────────────────────────────────────────────────────

describe("TestOffice2016 (源：TestOffice2016.cs)", () => {
  /**
   * PORTABLE
   * 源：TestOffice2016.OF16_001_ValidateDocx_2016 / OF16_003_ValidateDocx_2013 [Theory × Of16-01..08]
   *
   * .NET 原意：对每个 Of16-*.docx 打开，OpenXmlValidator(Office2016) 校验 → 0 errors。
   * openxml-ts 移植：验证 openAsync + WordprocessingDocument typed layer 不抛、descendants 可遍历。
   * Office2016 特有 schema 检查在 openxml-ts 尚未实现，不做精确 0 errors 断言。
   *
   * 来源资产：test/fixtures/office2016/Of16-0{1..8}.docx
   */
  it.each([
    "Of16-01.docx",
    "Of16-02.docx",
    "Of16-03.docx",
    "Of16-04.docx",
    "Of16-05.docx",
    "Of16-06.docx",
    "Of16-07.docx",
    "Of16-08.docx",
  ])(
    "OF16_001/003_ValidateDocx — %s 可打开为 WordprocessingDocument，descendants 可遍历",
    async (filename) => {
      const bytes = await readFixture(OF16_DIR, filename);
      const doc = await WordprocessingDocument.openAsync(bytes);
      expect(doc.mainDocumentPart).toBeDefined();
      let count = 0;
      for (const _ of doc.mainDocumentPart!.document.descendants()) {
        count++;
        if (count > 20) break;
      }
      expect(count).toBeGreaterThan(0);
    },
  );

  /**
   * PORTABLE
   * 源：TestOffice2016.OF16_002_ValidatePptx_2016 / OF16_004_ValidatePptx_2013 [Theory × 3 pptx]
   *
   * openxml-ts 移植：Of16-0{1..3}.pptx 可打开为 PresentationDocument，presentationPart 存在。
   *
   * 来源资产：test/fixtures/office2016/Of16-0{1..3}.pptx
   */
  it.each(["Of16-01.pptx", "Of16-02.pptx", "Of16-03.pptx"])(
    "OF16_002/004_ValidatePptx — %s 可打开为 PresentationDocument",
    async (filename) => {
      const bytes = await readFixture(OF16_DIR, filename);
      const doc = await PresentationDocument.openAsync(bytes);
      expect(doc.presentationPart).toBeDefined();
    },
  );

  /**
   * PORTABLE
   * 源：TestOffice2016.OF16_007_SymEx [Theory × Of16-10-SymEx.docx]
   *
   * .NET 原意：打开 SymEx docx，Office2016 validator → 0 errors。
   * openxml-ts 移植：打开不抛，mainDocumentPart 存在。
   *
   * 来源资产：test/fixtures/office2016/Of16-10-SymEx.docx
   */
  it("OF16_007_SymEx — Of16-10-SymEx.docx 可打开，含 mainDocumentPart", async () => {
    const bytes = await readFixture(OF16_DIR, "Of16-10-SymEx.docx");
    const doc = await WordprocessingDocument.openAsync(bytes);
    expect(doc.mainDocumentPart).toBeDefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DocxTests01 — DocxTests01.cs（精选 PORTABLE 方法）
// ─────────────────────────────────────────────────────────────────────────────

describe("DocxTests01 (源：DocxTests01.cs，精选)", () => {
  /**
   * PORTABLE
   * 源：DocxTests01.W052_CreateElementFromOuterXml [Fact]
   *
   * .NET 原意：打开 UnknownElement.docx，统计 MainDocumentPart.Document.Descendants() 数量，
   * 然后 Office2013 validator → 1 个错误（含未知元素）。
   * openxml-ts 移植：打开不抛，descendants 可遍历。
   * unknown element 在 openxml-ts 中被包容（OpenXmlUnknownElement），不产生 Schema 错误。
   *
   * 来源资产：test/fixtures/upstream-smoke/UnknownElement.docx（已有）
   */
  it("W052 — UnknownElement.docx 可打开，Descendants 可遍历", async () => {
    const bytes = await readFixture(SMOKE_DIR, "UnknownElement.docx");
    const doc = await WordprocessingDocument.openAsync(bytes);
    const main = doc.mainDocumentPart;
    expect(main).toBeDefined();
    const count = [...main!.document.descendants()].length;
    expect(count).toBeGreaterThan(0);
  });

  /**
   * PORTABLE
   * 源：DocxTests01.W054_Load_Save_Strict [Fact]
   *
   * .NET 原意：打开 Strict01.docx（ISO Strict），StrictRelationshipFound==true，
   * 插入段落，校验 relationship types。
   * openxml-ts 移植：打开不抛，mainDocumentPart 可访问，Document root 存在。
   * StrictRelationshipFound → N/A（属性未暴露）。
   *
   * 来源资产：test/fixtures/upstream-smoke/Strict01.docx（已有）
   */
  it("W054 — Strict01.docx 可打开（ISO Strict），mainDocumentPart 可访问", async () => {
    const bytes = await readFixture(SMOKE_DIR, "Strict01.docx");
    const doc = await WordprocessingDocument.openAsync(bytes);
    expect(doc.mainDocumentPart).toBeDefined();
    const document = doc.mainDocumentPart!.document;
    expect(document).toBeDefined();
    expect(document.localName).toBe("document");
  });

  /**
   * PORTABLE
   * 源：DocxTests01.W055_Load_Save_Data_Bound_Content_Controls [Fact]
   *
   * .NET 原意：打开 DataBoundContentControls.docx，插入段落，Office2013 validator → 0 errors。
   * openxml-ts 移植：打开不抛，mainDocumentPart 存在，Descendants 可遍历。
   *
   * 来源资产：test/fixtures/upstream-smoke/Data-Bound-Content-Controls.docx（已有）
   */
  it("W055 — Data-Bound-Content-Controls.docx 可打开，Descendants 可遍历", async () => {
    const bytes = await readFixture(SMOKE_DIR, "Data-Bound-Content-Controls.docx");
    const doc = await WordprocessingDocument.openAsync(bytes);
    expect(doc.mainDocumentPart).toBeDefined();
    const count = [...doc.mainDocumentPart!.document.descendants()].length;
    expect(count).toBeGreaterThan(0);
  });

  /**
   * COVERED → SKIP
   * 源：DocxTests01.W039_ChangeDocumentType — test/word/change-document-type.test.ts 已覆盖。
   * 源：DocxTests01.W026_AddRemoveNamespaceDeclaration — test/element/namespace-declaration.test.ts 已覆盖。
   */
  it.skip("W039_ChangeDocumentType [COVERED] — test/word/change-document-type.test.ts 已覆盖", () => {});
  it.skip("W026_AddRemoveNamespaceDeclaration [COVERED] — test/element/namespace-declaration.test.ts 已覆盖", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// XlsxTests01 — XlsxTests01.cs（精选 PORTABLE 方法）
// ─────────────────────────────────────────────────────────────────────────────

describe("XlsxTests01 (源：XlsxTests01.cs，精选)", () => {
  /**
   * PORTABLE
   * 源：XlsxTests01.X007_SpreadsheetDocument_Open / X004_SpreadsheetDocument_Open [Fact]
   *
   * .NET 原意：打开 basicspreadsheet.xlsx，WorkbookPart 存在，WorksheetParts 数量正确。
   * openxml-ts 移植：打开，workbookPart 存在，worksheetParts 非空。
   *
   * 来源资产：test/fixtures/upstream-smoke/basicspreadsheet.xlsx（已有）
   */
  it("X007/X004 — basicspreadsheet.xlsx 可打开，workbookPart + worksheetParts 可访问", async () => {
    const bytes = await readFixture(SMOKE_DIR, "basicspreadsheet.xlsx");
    const doc = await SpreadsheetDocument.openAsync(bytes);
    expect(doc.workbookPart).toBeDefined();
    expect(doc.workbookPart!.worksheetParts.length).toBeGreaterThan(0);
  });

  /**
   * PORTABLE
   * 源：XlsxTests01.X002_XlsxCreation [Fact]
   *
   * .NET 原意：程序化创建 xlsx（SpreadsheetDocument.Create），添加 WorkbookPart + WorksheetPart，校验 → 0 errors。
   * openxml-ts 移植：SpreadsheetDocument.create() 返回文档，saveAsBytesAsync 不抛，可重新打开。
   */
  it("X002 — SpreadsheetDocument 程序化创建、saveAsBytesAsync、重新打开", async () => {
    const doc = SpreadsheetDocument.create();
    const bytes = await doc.saveAsBytesAsync();
    expect(bytes.byteLength).toBeGreaterThan(0);

    const reopened = await SpreadsheetDocument.openAsync(bytes);
    expect(reopened).toBeDefined();
  });

  /**
   * COVERED → SKIP
   * 源：XlsxTests01.X006_Xlsx_DeleteAdd_CoreExtendedProperties
   * test/excel/spreadsheet-document.test.ts + test/parts/core-properties.test.ts 已覆盖。
   */
  it.skip("X006_Xlsx_DeleteAdd_CoreExtendedProperties [COVERED] — spreadsheet-document.test.ts 已覆盖", () => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// PptxTests01 — PptxTests01.cs（精选 PORTABLE 方法）
// ─────────────────────────────────────────────────────────────────────────────

describe("PptxTests01 (源：PptxTests01.cs，精选)", () => {
  /**
   * PORTABLE
   * 源：PptxTests01.P006_PresentationDocument_Open / P004_SpreadsheetDocument_Open [Fact]
   *
   * .NET 原意：打开 animation.pptx，PresentationPart 存在，slideParts 可遍历。
   * openxml-ts 移植：打开，presentationPart 存在，slideParts 非空。
   *
   * 来源资产：test/fixtures/upstream-smoke/animation.pptx（已有）
   */
  it("P006/P004 — animation.pptx 可打开，presentationPart + slideParts 可访问", async () => {
    const bytes = await readFixture(SMOKE_DIR, "animation.pptx");
    const doc = await PresentationDocument.openAsync(bytes);
    expect(doc.presentationPart).toBeDefined();
    expect(doc.presentationPart!.slideParts.length).toBeGreaterThan(0);
  });

  /**
   * PORTABLE
   * 源：PptxTests01.P003_PptxCreation_Stream [Fact]
   *
   * .NET 原意：程序化创建 pptx（PresentationDocument.Create），校验 → 0 errors。
   * openxml-ts 移植：PresentationDocument.create() 返回文档，saveAsBytesAsync 不抛，可重新打开。
   */
  it("P003 — PresentationDocument 程序化创建、saveAsBytesAsync、重新打开", async () => {
    const doc = PresentationDocument.create();
    const bytes = await doc.saveAsBytesAsync();
    expect(bytes.byteLength).toBeGreaterThan(0);

    const reopened = await PresentationDocument.openAsync(bytes);
    expect(reopened).toBeDefined();
  });

  /**
   * COVERED → SKIP
   * 源：PptxTests01.P002_Pptx_DeleteAdd_CoreExtendedProperties
   * test/ppt/ + test/parts/core-properties.test.ts 已覆盖。
   */
  it.skip("P002_Pptx_DeleteAdd_CoreExtendedProperties [COVERED] — core-properties.test.ts 已覆盖", () => {});
});
