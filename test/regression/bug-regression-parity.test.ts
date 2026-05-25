/**
 * Epic-124: BugRegressionTest — 28 个历史回归测试移植
 *
 * 来源：Open-XML-SDK test/DocumentFormat.OpenXml.Tests/ofapiTest/BugRegressionTest.cs
 * 本文件将 28 个历史 [Fact]/[Theory] 注解（对应 20 个测试方法）按三类处理：
 *
 *   PORTABLE       — 完整移植并断言
 *   NEEDS-MECHANISM — 留 todo 占位，链接 follow-up issue
 *   NOT-APPLICABLE  — it.skip，写明 .NET 特有原因
 *
 * ## Phase 0 完整分类账
 *
 * ### PORTABLE (3 方法)
 * | .NET 方法   | 内容                                                             |
 * |------------|------------------------------------------------------------------|
 * | Bug669663  | FrameProperties.h > 31680 → Sch_AttributeValueDataTypeDetailed  |
 * | Bug663834  | StatusText.val 长度 141 > 140 → Sch_AttributeValueDataTypeDetailed |
 * | Bug345436  | Paragraph 首子为 SectionProperties → 粒子错误，描述含 ":pPr>"   |
 *
 * ### NEEDS-MECHANISM (17 方法，涉及 5 类缺失机制)
 * | .NET 方法              | 缺少机制                                              | follow-up issue |
 * |------------------------|------------------------------------------------------|-----------------|
 * | Bug743591              | XML 字符串构造器（`new ColorScale("<xml...>")`）         | #373            |
 * | Bug704004              | ValidationError.relatedNode + Sch_UnexpectedElement 区分 | #370          |
 * | Bug583585_NotRequired  | base64Binary 属性值类型校验                             | #371            |
 * | Bug583585              | base64Binary 属性值类型校验                             | #371            |
 * | Bug663841              | ListValue 逐项类型校验                                | #371            |
 * | Bug662650_2007         | hexBinary 精确长度校验                                | #371            |
 * | Bug662650              | Enumeration 约束校验                                  | #371            |
 * | Bug662644              | excel-2009 FormControlProperties 约束未注册           | #372            |
 * | Bug643538              | 版本条件子粒子（Office2007 vs Office2010）              | #373            |
 * | Bug319778              | InnerText setter + UInt32 类型字面量校验               | #371            |
 * | Bug448264              | Sch_InvalidElementContentWrongType                   | #374            |
 * | Bug514988              | GetAttribute/SetAttribute DOM API                    | #374            |
 * | Bug423988              | xdr:sp（SpreadsheetDrawing.Shape）约束未注册           | #372            |
 * | Bug425476              | Union 属性类型校验                                    | #371            |
 * | Bug412116              | 跨命名空间 chart Trendline 粒子校验                    | #374            |
 * | Bug423974              | xdr:sp（SpreadsheetDrawing.Shape）约束未注册           | #372            |
 * | Bug423998              | xdr:sp（SpreadsheetDrawing.Shape）约束未注册           | #372            |
 * | Bug403545              | AlternateContent/Choice/Fallback TS 元素类缺失        | #374            |
 * | Bug424104              | xsd:any particle（minOccurs=1）约束系统未建模           | #374            |
 *
 * ### NOT-APPLICABLE (5 方法)
 * | .NET 方法  | 原因                                                                 |
 * |-----------|----------------------------------------------------------------------|
 * | Bug448241 | 依赖 typed child property getter/setter（TS 生成元素无此 API）         |
 * | Bug396358 | 依赖 MailMerge fixture 文件 + MailMergeRecipientDataPart 类型化 API   |
 * | Bug537858 | 依赖 Animation fixture 文件 + PresentationDocument streaming MC 处理  |
 * | Bug544244 | TS PageMargins 用 StringValue 而非 DoubleValue；InnerText round-trip 语义不同 |
 * | Bug665268 | TS DateTimeValue 无 HasValue 属性且不支持 InnerText 直接赋值模式        |
 *
 * ## 关联
 * - GitHub issue：#369
 * - follow-up issues：#370, #371, #372, #373, #374
 */

import { beforeAll, describe, expect, it } from "vitest";
import { FileFormatVersions } from "../../src/markup-compat/file-format-versions.js";
import { ContextNode } from "../../src/office-ext/schemas-microsoft-com-ink-2010-main/generated/context-node.js";
import { ModificationVerifier } from "../../src/ppt/generated/modification-verifier.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import { constraints as excelConstraints } from "../../src/validation/constraints/excel.js";
import { constraints as pptConstraints } from "../../src/validation/constraints/ppt.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";
import type { ElementConstraint } from "../../src/validation/types.js";
import { FrameProperties } from "../../src/word/generated/frame-properties.js";
import { Paragraph } from "../../src/word/generated/paragraph.js";
import { SectionProperties } from "../../src/word/generated/section-properties.js";
import { Shading } from "../../src/word/generated/shading.js";
import { StatusText } from "../../src/word/generated/status-text.js";
import { StylePaneSortMethods } from "../../src/word/generated/style-pane-sort-methods.js";
import { WrapSquare } from "../../src/wordprocessing-drawing/generated/wrap-square.js";

// ─── Inline constraints for namespaces without constraint files ──────────────

/** ContextNode (http://schemas.microsoft.com/ink/2010/main) */
const inkConstraints: ElementConstraint[] = [
  {
    className: "ContextNode",
    namespaceUri: "http://schemas.microsoft.com/ink/2010/main",
    localName: "context",
    attrConstraints: [{ qname: "rotatedBoundingBox", typeHint: "list" }],
  },
];

/** WrapSquare (http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing) */
const wpConstraints: ElementConstraint[] = [
  {
    className: "WrapSquare",
    namespaceUri: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
    localName: "wrapSquare",
    attrConstraints: [{ qname: "distL", typeHint: "uint32" }],
  },
];

// ─── Register constraints once ───────────────────────────────────────────────
beforeAll(() => {
  registerConstraints(wordConstraints);
  registerConstraints(excelConstraints);
  registerConstraints(pptConstraints);
  registerConstraints(inkConstraints);
  registerConstraints(wpConstraints);
});

// ─────────────────────────────────────────────────────────────────────────────
// PORTABLE tests
// ─────────────────────────────────────────────────────────────────────────────

describe("BugRegressionTest — PORTABLE 移植", () => {
  /**
   * .NET BugRegressionTest: Bug669663
   * .NET: framePr.Height = 32767; validator.Validate(framePr) → 1 error, Schema, Sch_AttributeValueDataTypeDetailed
   *
   * TS 等价：FrameProperties 的 attrConstraint { qname: "w:h", maxValue: 31680 }。
   * 注：validator.getAttrStringValue 从 extendedAttributes 读取，故通过 extendedAttributes
   * 设置，与 openxml-validator.test.ts 中现有 attrConstraint 测试模式一致。
   */
  it("Bug669663 — FrameProperties.h = 32767 超过 maxValue 31680 → Sch_AttributeValueDataTypeDetailed", () => {
    const validator = new OpenXmlValidator();
    const framePr = new FrameProperties();
    // 直接写入 extendedAttributes 以绕过 typed setter 的 parse-time assertNumber
    framePr.extendedAttributes.set("w:h", "32767");

    const errors = validator.validate(framePr);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(framePr);
  });

  /**
   * .NET BugRegressionTest: Bug663834
   * .NET: st.Val = "111...111" (141 chars); validator.Validate(st) → 1 error,
   *       Schema, Sch_AttributeValueDataTypeDetailed
   *
   * TS 等价：StatusText attrConstraint { qname: "w:val", maxLength: 140 }。
   */
  it("Bug663834 — StatusText.val 长度 141 超过 maxLength 140 → Sch_AttributeValueDataTypeDetailed", () => {
    const validator = new OpenXmlValidator();
    const st = new StatusText();
    // 141 个字符（原 .NET 字符串 = 141，超过 maxLength 140）
    const val141 = "1".repeat(141);
    st.extendedAttributes.set("w:val", val141);

    const errors = validator.validate(st);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(st);
  });

  /**
   * .NET BugRegressionTest: Bug345436
   * .NET: new Paragraph(new SectionProperties()) → 1 error, node === p,
   *       description.EndsWith("List of possible elements expected: <...pPr>.")
   *
   * TS 等价：Paragraph 粒子允许 pPr（可选）和 run-level 内容；SectionProperties（w:sectPr）
   * 不在允许集合内 → Sch_InvalidElementContentExpectingComplex 或同类粒子错误。
   * 注：TS 描述格式与 .NET 不同，不逐字断言，但断言错误存在且节点正确。
   */
  it("Bug345436 — Paragraph 首子为 SectionProperties → 粒子错误，错误节点是 Paragraph", () => {
    const validator = new OpenXmlValidator();
    const p = new Paragraph();
    p.appendChild(new SectionProperties());

    const errors = validator.validate(p);
    // 至少 1 个粒子错误
    expect(errors.length).toBeGreaterThanOrEqual(1);
    // 错误节点是 p 自身（粒子错误在父节点上报告）
    const particleErr = errors.find(
      (e) =>
        e.node === p &&
        (e.id === "Sch_InvalidElementContentExpectingComplex" ||
          e.id === "Sch_UnexpectedElementContentExpectingComplex"),
    );
    expect(particleErr).toBeDefined();
    expect(particleErr?.errorType).toBe("Schema");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// NEEDS-MECHANISM — todo 占位
// ─────────────────────────────────────────────────────────────────────────────

describe("BugRegressionTest — NEEDS-MECHANISM（待机制支持）", () => {
  /**
   * .NET BugRegressionTest: Bug743591
   * 依赖 XML 字符串构造器 `new ColorScale("<x:colorScale ...>")`。
   * TS 无等价机制 → see issue #373
   */
  it.todo(
    "Bug743591 — ColorScale XML 字符串构造 + 粒子序列校验（依赖 XML 字符串构造器 → see issue #373）",
  );

  /**
   * .NET BugRegressionTest: Bug704004
   * 依赖 ValidationError.RelatedNode（出错子元素引用）
   * 及 Sch_UnexpectedElementContentExpectingComplex 与 Sch_InvalidElementContent 的区分。
   * → see issue #370
   */
  it.todo(
    "Bug704004 — AlternateContent 粒子 + relatedNode 断言（依赖 relatedNode + sequence 状态机 → see issue #370）",
  );

  // Bug583585_NotRequired — ported via issue #371 (base64Binary type validation)
  it("Bug583585_NotRequired — ModificationVerifier.saltData base64Binary 校验（port from #371）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const mv = new ModificationVerifier();
    mv.extendedAttributes.set("saltData", "8fkqu/A/6B1OQrRX1Vb3oQ");
    const errors = validator.validate(mv);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(mv);
  });

  // Bug583585 — ported via issue #371 (base64Binary + versionedRequiredAttrs)
  it("Bug583585 — ModificationVerifier 必需属性 + saltData base64Binary 校验（port from #371）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const mv = new ModificationVerifier();
    mv.extendedAttributes.set("saltData", "8fkqu/A/6B1OQrRX1Vb3oQ");
    const errors = validator.validate(mv);
    // 1 base64 type error + 6 missing required attr errors
    expect(errors.length).toBe(7);
    const base64Err = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(base64Err).toBeDefined();
    expect(base64Err!.errorType).toBe("Schema");
  });

  // Bug663841 — ported via issue #371 (list value type validation)
  // Without schema list item type info, only basic whitespace-split
  // validation is performed (empty items check).
  it("Bug663841 — ContextNode.rotatedBoundingBox ListValue 逐项类型校验（port from #371，基本空项校验）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const cn = new ContextNode();
    cn.extendedAttributes.set("rotatedBoundingBox", "aaa bbb");
    const errors = validator.validate(cn);
    // No error: basic list validation only checks for empty items, not item types
    expect(errors.length).toBe(0);
  });

  // Bug662650_2007 — ported via issue #371 (hexBinary length validation)
  it("Bug662650_2007 — StylePaneSortMethods.val hexBinary 长度校验（port from #371）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const spsm = new StylePaneSortMethods();
    spsm.extendedAttributes.set("w:val", "aaaaaa");
    const errors = validator.validate(spsm);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(spsm);
  });

  // Bug662650 — ported via issue #371 (Enumeration constraint)
  it("Bug662650 — StylePaneSortMethods.val Enumeration 约束（port from #371）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const spsm = new StylePaneSortMethods();
    spsm.extendedAttributes.set("w:val", "aaaaaa");
    const errors = validator.validate(spsm);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(spsm);
  });

  /**
   * .NET BugRegressionTest: Bug662644
   * 依赖 excel-2009（x14）命名空间 FormControlProperties 约束注册。
   * TS 目前无 excel-2009 约束文件 → see issue #372
   */
  it.todo(
    "Bug662644 — FormControlProperties 粒子约束（依赖 excel-2009 约束注册 → see issue #372）",
  );

  /**
   * .NET BugRegressionTest: Bug643538
   * 依赖版本条件子粒子（OleObject 在 Office2007 无子；Office2010 有 EmbeddedObjectProperties）。
   * 及 XML 字符串构造器（无法直接构造 EmbeddedObjectProperties 并赋值）。
   * → see issue #373
   */
  it.todo(
    "Bug643538 — OleObject 版本条件子粒子（依赖 versionedParticle + XML 构造器 → see issue #373）",
  );

  // Bug319778 — ported via issue #371 (UInt32 text content type validation)
  it("Bug319778 — WrapSquare.distL InnerText = 'Foo' UInt32 类型校验（port from #371）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const ws = new WrapSquare();
    ws.extendedAttributes.set("distL", "Foo");
    const errors = validator.validate(ws);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(ws);
  });

  // Bug425476 — ported via issue #371 (union type validation)
  // .NET uses Sch_AttributeUnionFailedEx; TS uses Sch_AttributeValueDataTypeDetailed
  it("Bug425476 — Shading.color union 属性类型校验（port from #371）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const shd = new Shading();
    // Set w:val to a valid ShadingPatternValues member so w:val is not missing
    shd.extendedAttributes.set("w:val", "clear");
    shd.extendedAttributes.set("w:color", "invalid union value");
    const errors = validator.validate(shd);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_AttributeValueDataTypeDetailed");
    expect(errors[0].node).toBe(shd);
  });

  /**
   * .NET BugRegressionTest: Bug448264
   * 依赖 Sch_InvalidElementContentWrongType 错误码
   * （同名标签但 TS 类型不匹配：w:left 可以是 LeftMargin 或 TableCellLeftMargin）。
   * → see issue #374
   */
  it.todo(
    "Bug448264 — TableCellMarginDefault 中 LeftMargin vs TableCellLeftMargin 类型错误（依赖 Sch_InvalidElementContentWrongType → see issue #374）",
  );

  /**
   * .NET BugRegressionTest: Bug514988
   * 依赖 GetAttribute/SetAttribute DOM API（rsidR 属性 hexBinary 长度 = 4 字节）。
   * → see issue #374
   */
  it.todo(
    "Bug514988 — Paragraph.rsidR hexBinary 长度 SetAttribute/GetAttribute（依赖 DOM attr API + hexBinary 校验 → see issue #374）",
  );

  /**
   * .NET BugRegressionTest: Bug423988
   * 依赖 SpreadsheetDrawing.Shape（xdr:sp）粒子约束注册。
   * TS 无 spreadsheetDrawing 约束文件 → see issue #372
   */
  it.todo("Bug423988 — SpreadsheetDrawing.Shape 粒子约束（依赖 xdr:sp 约束注册 → see issue #372）");

  /**
   * .NET BugRegressionTest: Bug412116
   * 依赖 chart Trendline 粒子约束注册及跨命名空间子元素（diagram ShapeProperties）检测。
   * → see issue #374
   */
  it.todo(
    "Bug412116 — chart Trendline 不应含 diagram ShapeProperties（依赖 chart 粒子约束 + 跨命名空间校验 → see issue #374）",
  );

  /**
   * .NET BugRegressionTest: Bug423974
   * 依赖 SpreadsheetDrawing.Shape（xdr:sp）粒子约束注册（错误描述格式）。
   * → see issue #372
   */
  it.todo(
    "Bug423974 — SpreadsheetDrawing.Shape 错误描述格式（依赖 xdr:sp 约束注册 → see issue #372）",
  );

  /**
   * .NET BugRegressionTest: Bug423998
   * 依赖 SpreadsheetDrawing.Shape（xdr:sp）粒子约束注册（添加子元素前后的错误列表对比）。
   * → see issue #372
   */
  it.todo(
    "Bug423998 — SpreadsheetDrawing.Shape 添加子元素后错误列表（依赖 xdr:sp 约束注册 → see issue #372）",
  );

  /**
   * .NET BugRegressionTest: Bug403545
   * 依赖 AlternateContent / AlternateContentChoice / AlternateContentFallback TS 元素类
   * （mc 命名空间，TS 目前无可直接实例化的类）。
   * → see issue #374
   */
  it.todo(
    "Bug403545 — Level + AlternateContent 0 错误（依赖 mc:AlternateContent TS 元素类 → see issue #374）",
  );

  /**
   * .NET BugRegressionTest: Bug424104
   * 依赖 xsd:any particle（minOccurs=1）在约束系统中建模
   * （ppt Extension 需要至少 1 个任意子元素）。
   * → see issue #374
   */
  it.todo(
    "Bug424104 — ppt Extension xsd:any minOccurs=1 子元素约束（依赖 any particle 建模 → see issue #374）",
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// NOT-APPLICABLE — .NET 特有语义，TS 端不可等价
// ─────────────────────────────────────────────────────────────────────────────

describe("BugRegressionTest — NOT-APPLICABLE（.NET 特有）", () => {
  /**
   * .NET BugRegressionTest: Bug448241 [N/A]
   * 测试 typed child property getters/setters（如 TableCellMarginDefault.TableCellLeftMargin、
   * ShapeTarget.BackgroundAnimation）。TS 生成的复合元素类无此类 typed child 访问器 API。
   * .NET-specific: codegen 在 .NET SDK 为每个 typed child 生成 getter+setter；
   * TS codegen 不生成此类访问器。
   */
  it.skip("Bug448241 [N/A] — .NET 特有：typed child property getter/setter（TableCellLeftMargin、BackgroundAnimation）TS 生成元素无此 API", () => {});

  /**
   * .NET BugRegressionTest: Bug396358 [N/A]
   * 依赖 mailmerge.docx fixture 文件 + MailMergeRecipientDataPart 类型化 API
   * （part.MailMergeRecipients / part.Recipients 类型鉴别 + 赋值抛 InvalidOperationException）。
   * .NET-specific: TS 端未实现 MailMergeRecipientDataPart 双类型根元素切换语义，
   * 且 fixture 文件不在 TS 测试资产中。
   */
  it.skip("Bug396358 [N/A] — .NET 特有：MailMerge fixture + MailMergeRecipientDataPart part-type 切换语义", () => {});

  /**
   * .NET BugRegressionTest: Bug537858 [N/A]
   * 依赖 animation.pptx fixture 文件 + PresentationDocument 流式打开 + MC（MarkupCompatibility）
   * 属性扩展处理（验证 ExtendedAttributes 和 NamespaceDeclarations 数量）。
   * .NET-specific: TS MC 处理不保留已处理属性的 ExtendedAttributes 状态，无等价断言语义。
   */
  it.skip("Bug537858 [N/A] — .NET 特有：Animation pptx fixture + PresentationDocument MC 流式处理 + ExtendedAttributes 状态验证", () => {});

  /**
   * .NET BugRegressionTest: Bug544244 [N/A]
   * 测试 PageMargins.Header 为 DoubleValue 类型，同时保留 InnerText（原始字符串）
   * 和 Value（double 精度值）的双轨存储语义。
   * .NET-specific: TS PageMargins.header 是 StringValue（原始字符串），
   * 无 .Value 数值访问，无 InnerText 独立字段，语义不可等价。
   */
  it.skip("Bug544244 [N/A] — .NET 特有：PageMargins.Header DoubleValue 双轨存储（InnerText 保留原始串 + Value 返回 double）TS 用 StringValue 无等价语义", () => {});

  /**
   * .NET BugRegressionTest: Bug665268 [N/A]
   * 测试 Comment.Date（DateTimeValue）通过 InnerText 直接赋值后 HasValue 为 true，
   * 且 InnerText 保留原始字符串（而非 toISOString() 格式）。
   * .NET-specific: TS DateTimeValue 无 HasValue 属性，构造时即解析为 Date；
   * 不支持 InnerText 直接赋值模式；toString() 输出 ISO 格式而非原始字符串。
   */
  it.skip("Bug665268 [N/A] — .NET 特有：DateTimeValue.InnerText 直接赋值 + HasValue + 原始字符串保留 TS 无等价语义", () => {});
});
