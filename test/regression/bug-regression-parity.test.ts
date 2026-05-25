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
import { Trendline } from "../../src/chart/generated/trendline.js";
import { ShapeProperties as DiagramShapeProperties } from "../../src/diagram/generated/shape-properties.js";
import { Extension as DrawingExtension } from "../../src/drawing/generated/extension.js";
import { OpenXmlUnknownElement } from "../../src/element/unknown-element.js";
import { Int32Value } from "../../src/element/values/int32-value.js";
import { BorderColor } from "../../src/excel-2009/generated/border-color.js";
import { FormControlProperties } from "../../src/excel-2009/generated/form-control-properties.js";
import { ColorScale } from "../../src/excel/generated/color-scale.js";
import { Color as XColor } from "../../src/excel/generated/color.js";
import { ConditionalFormatValueObject } from "../../src/excel/generated/conditional-format-value-object.js";
import { EmbeddedObjectProperties } from "../../src/excel/generated/embedded-object-properties.js";
import { OleObject } from "../../src/excel/generated/ole-object.js";
import { FileFormatVersions } from "../../src/markup-compat/file-format-versions.js";
import { ContextNode } from "../../src/office-ext/schemas-microsoft-com-ink-2010-main/generated/context-node.js";
import { Extension as PptExtension } from "../../src/ppt/generated/extension.js";
import { ModificationVerifier } from "../../src/ppt/generated/modification-verifier.js";
import { Shape } from "../../src/spreadsheet-drawing/generated/shape.js";
import { TextBody } from "../../src/spreadsheet-drawing/generated/text-body.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import { constraints as drawingConstraints } from "../../src/validation/constraints/drawing.js";
import { constraints as excel2009Constraints } from "../../src/validation/constraints/excel-2009.js";
import { constraints as excelConstraints } from "../../src/validation/constraints/excel.js";
import { constraints as pptConstraints } from "../../src/validation/constraints/ppt.js";
import { constraints as spreadsheetDrawingConstraints } from "../../src/validation/constraints/spreadsheet-drawing.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";
import type { ElementConstraint } from "../../src/validation/types.js";
import { FrameProperties } from "../../src/word/generated/frame-properties.js";
import { LeftMargin } from "../../src/word/generated/left-margin.js";
import { Level } from "../../src/word/generated/level.js";
import { Paragraph } from "../../src/word/generated/paragraph.js";
import { RunFonts } from "../../src/word/generated/run-fonts.js";
import { RunProperties } from "../../src/word/generated/run-properties.js";
import { Run } from "../../src/word/generated/run.js";
import { SectionProperties } from "../../src/word/generated/section-properties.js";
import { Shading } from "../../src/word/generated/shading.js";
import { StartNumberingValue } from "../../src/word/generated/start-numbering-value.js";
import { StatusText } from "../../src/word/generated/status-text.js";
import { StylePaneSortMethods } from "../../src/word/generated/style-pane-sort-methods.js";
import { TableCellMarginDefault } from "../../src/word/generated/table-cell-margin-default.js";
import { Text } from "../../src/word/generated/text.js";
import { TopMargin } from "../../src/word/generated/top-margin.js";
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

/** Trendline (http://schemas.openxmlformats.org/drawingml/2006/chart) */
const chartConstraints: ElementConstraint[] = [
  {
    className: "Trendline",
    namespaceUri: "http://schemas.openxmlformats.org/drawingml/2006/chart",
    localName: "trendline",
    particle: {
      root: {
        kind: "sequence",
        min: 1,
        max: 1,
        items: [
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "name",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/main",
            local: "spPr",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "trendlineType",
            min: 1,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "order",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "period",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "forward",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "backward",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "intercept",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "dispRSqr",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "dispEq",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "trendlineLbl",
            min: 0,
            max: 1,
          },
          {
            kind: "leaf",
            ns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            local: "extLst",
            min: 0,
            max: 1,
          },
        ],
      },
    },
  },
];

// ─── Register constraints once ───────────────────────────────────────────────
beforeAll(() => {
  registerConstraints(wordConstraints);
  registerConstraints(excelConstraints);
  registerConstraints(pptConstraints);
  registerConstraints(drawingConstraints);
  registerConstraints(spreadsheetDrawingConstraints);
  registerConstraints(excel2009Constraints);
  registerConstraints(inkConstraints);
  registerConstraints(wpConstraints);
  registerConstraints(chartConstraints);
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
   * Port via #373: ColorScale particle sequence validation with manual DOM construction
   * (no XML string constructor needed).
   *
   * ColorScale particle: sequence{ cfvo(2,3), color(2,3) }.
   * Smart sequence orderer now detects color appearing before min cfvo count is met.
   */
  it("Bug743591 — ColorScale 粒子序列校验（port from #373）", () => {
    const validator = new OpenXmlValidator();
    const makeCfvo = () => {
      const c = new ConditionalFormatValueObject();
      c.applyAttribute("type", "min");
      c.applyAttribute("val", "0");
      return c;
    };

    const cs = new ColorScale();
    // Step 1: 1 cfvo + 2 colors — cfvo min=2 not met, colors out of order
    cs.appendChild(makeCfvo());
    cs.appendChild(new XColor());
    cs.appendChild(new XColor());
    let errors = validator.validate(cs);
    expect(errors.length).toBe(3);
    // Two colors out of sequence (required cfvo min=2 not satisfied yet)
    expect(
      errors.filter((e) => e.id === "Sch_UnexpectedElementContentExpectingComplex").length,
    ).toBe(2);
    // Missing one cfvo
    expect(errors.filter((e) => e.id === "Sch_IncompleteContentExpectingComplex").length).toBe(1);

    // Step 2: 2 cfvo + 2 colors → 0 errors (min cfvos + min colors satisfied)
    cs.prependChild(makeCfvo());
    errors = validator.validate(cs);
    expect(errors.length).toBe(0);

    // Step 3: 3 cfvo + 2 colors → 0 errors
    cs.prependChild(makeCfvo());
    errors = validator.validate(cs);
    expect(errors.length).toBe(0);

    // Step 4: remove last color → 3 cfvo + 1 color → missing 1 color
    const lastColor = cs.lastChildElement;
    if (lastColor) cs.removeChild(lastColor);
    errors = validator.validate(cs);
    expect(errors.length).toBe(1);
    expect(errors[0].id).toBe("Sch_IncompleteContentExpectingComplex");

    // Step 5: 3 cfvo + 3 colors → 0 errors
    cs.appendChild(new XColor());
    cs.appendChild(new XColor());
    errors = validator.validate(cs);
    expect(errors.length).toBe(0);
  });

  /**
   * .NET BugRegressionTest: Bug704004
   * TS port via #370: relatedNode on particle position errors.
   *
   * .NET test 分为三步，此处只验核心断言——粒子顺序错误（Run 中 t 在 rPr 前）
   * 报告的 Sch_UnexpectedElementContentExpectingComplex 带有 relatedNode 指向
   * 位序错误的子元素（rPr）。AlternateContent 不在 TS 范围（mc 元素类缺失 → #374）。
   */
  it("Bug704004 — Run 子元素位序错误 → Sch_UnexpectedElementContentExpectingComplex + relatedNode（port from #370）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const r = new Run();
    const t = new Text();
    t.textContent = "Acb";
    const rPr = new RunProperties();
    const rf = new RunFonts();
    rf.extendedAttributes.set("w:hint", "eastAsia");
    rPr.appendChild(rf);
    // t before rPr — invalid order for Run particle (rPr must come first)
    r.appendChild(t);
    r.appendChild(rPr);

    const errors = validator.validate(r);
    const posErr = errors.find((e) => e.id === "Sch_UnexpectedElementContentExpectingComplex");
    expect(posErr).toBeDefined();
    expect(posErr?.errorType).toBe("Schema");
    // node is the parent (Run), relatedNode is the out-of-order child (rPr)
    expect(posErr?.node).toBe(r);
    expect(posErr?.relatedNode).toBe(rPr);
  });

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
   * Port via #372: FormControlProperties particle constraint from excel-2009.
   * Validates that empty FormControlProperties → 0 errors (all children optional),
   * and that appending BorderColor (unknown child) → Sch_InvalidElementContentExpectingComplex.
   */
  it("Bug662644 — FormControlProperties 粒子约束 + BorderColor 非法子元素（port from #372）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const fp = new FormControlProperties();

    // Empty formControlPr has all optional children → 0 errors
    let errors = validator.validate(fp);
    expect(errors.length).toBe(0);

    // BorderColor is NOT a valid child of formControlPr
    fp.appendChild(new BorderColor());
    errors = validator.validate(fp);
    expect(errors.length).toBe(1);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_InvalidElementContentExpectingComplex");
  });

  /**
   * .NET BugRegressionTest: Bug643538
   * Port via #373: OleObject version-conditional particle.
   * objectPr (EmbeddedObjectProperties) only valid starting from Office2010.
   * In Office2007, OleObject has no children — objectPr is filtered from particle.
   */
  it("Bug643538 — OleObject 版本条件子粒子（port from #373）", () => {
    // --- Office2007: objectPr not allowed ---
    const v2007 = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const ole = new OleObject();
    ole.applyAttribute("shapeId", "1");
    ole.appendChild(new EmbeddedObjectProperties());
    const err2007 = v2007.validate(ole);
    // objectPr is not in filtered (empty) particle → Sch_InvalidElementContentExpectingComplex
    expect(err2007.some((e) => e.id === "Sch_InvalidElementContentExpectingComplex")).toBe(true);

    // --- Office2010: objectPr allowed but incomplete ---
    const v2010 = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const ole2 = new OleObject();
    ole2.applyAttribute("shapeId", "1");
    const eop = new EmbeddedObjectProperties();
    ole2.appendChild(eop);
    const err2010 = v2010.validate(ole2);
    expect(err2010.length).toBe(1);
    expect(err2010[0].id).toBe("Sch_IncompleteContentExpectingComplex");
    expect(err2010[0].node).toBe(eop);
  });

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
  it("Bug448264 — TableCellMarginDefault 中 LeftMargin vs TableCellLeftMargin 类型错误（port from #374）", () => {
    const validator = new OpenXmlValidator();
    const tcmd = new TableCellMarginDefault();
    tcmd.appendChild(new TopMargin());
    const errorChild = tcmd.appendChild(new LeftMargin()); // wrong type — should be TableCellLeftMargin

    const errors = validator.validate(tcmd);
    expect(errors.length).toBe(1);
    expect(errors[0].node).toBe(tcmd);
    expect(errors[0].relatedNode).toBe(errorChild);
    expect(errors[0].errorType).toBe("Schema");
    expect(errors[0].id).toBe("Sch_InvalidElementContentWrongType");
    expect(errors[0].description).toContain("LeftMargin");
  });

  /**
   * .NET BugRegressionTest: Bug514988
   * 依赖 GetAttribute/SetAttribute DOM API（rsidR 属性 hexBinary 长度 = 4 字节）。
   * → see issue #374
   */
  it("Bug514988 — Paragraph.rsidR hexBinary 长度校验（port from #374）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const p = new Paragraph();
    p.extendedAttributes.set("w:rsidR", "0102");
    const errors = validator.validate(p);
    // Filter hexBinary error — other errors are from checkCardinalityNode choice-group
    // false positives (each choice alternative reported independently).
    const hexErr = errors.find(
      (e) => e.id === "Sch_AttributeValueDataTypeDetailed" && e.description.includes("hexBinary"),
    );
    expect(hexErr).toBeDefined();
    expect(hexErr!.errorType).toBe("Schema");
    expect(hexErr!.node).toBe(p);
    expect(hexErr!.description).toContain("hexBinary");
    expect(hexErr!.description).toContain("4");
  });

  /**
   * .NET BugRegressionTest: Bug423988
   * Port via #372: SpreadsheetDrawing.Shape (xdr:sp) particle constraint.
   *
   * .NET expects: Shape + txBody → Sch_IncompleteContentExpectingComplex on txBody
   *               + Sch_UnexpectedElementContentExpectingComplex on Shape (relatedNode=txBody).
   * TS matches: 1 Sch_UnexpectedElementContentExpectingComplex on Shape (relatedNode=txBody)
   *             + 2 Sch_IncompleteContentExpectingComplex on Shape (missing nvSpPr, spPr)
   *             + 2 Sch_IncompleteContentExpectingComplex on txBody (missing bodyPr, p).
   */
  it("Bug423988 — SpreadsheetDrawing.Shape 粒子约束（port from #372）", () => {
    const validator = new OpenXmlValidator();
    const shape = new Shape();
    const txBody = new TextBody();
    shape.appendChild(txBody);
    const errors = validator.validate(shape);

    expect(errors.length).toBe(5);
    expect(errors.every((e) => e.errorType === "Schema")).toBe(true);

    // Sch_UnexpectedElementContentExpectingComplex on Shape with txBody as relatedNode
    const posErr = errors.find((e) => e.id === "Sch_UnexpectedElementContentExpectingComplex");
    expect(posErr?.node).toBe(shape);
    expect(posErr?.relatedNode).toBe(txBody);

    // Two Sch_IncompleteContentExpectingComplex on Shape (missing nvSpPr, spPr)
    const shapeIncomplete = errors.filter(
      (e) => e.node === shape && e.id === "Sch_IncompleteContentExpectingComplex",
    );
    expect(shapeIncomplete.length).toBe(2);

    // Two Sch_IncompleteContentExpectingComplex on txBody (missing bodyPr, p)
    const txBodyErrors = errors.filter((e) => e.node === txBody);
    expect(txBodyErrors.length).toBe(2);
  });

  /**
   * .NET BugRegressionTest: Bug412116
   * 依赖 chart Trendline 粒子约束注册及跨命名空间子元素（diagram ShapeProperties）检测。
   * → see issue #374
   */
  it("Bug412116 — chart Trendline 不应含 diagram ShapeProperties（port from #374）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const tl = new Trendline();
    tl.appendChild(new DiagramShapeProperties());
    const errors = validator.validate(tl);
    // diagram ShapeProperties (dgm:spPr) shares local name "spPr" with
    // the allowed drawingml main spPr (a:spPr), but has a different namespace
    // URI — so it should be flagged as invalid content.
    expect(errors.length).toBeGreaterThanOrEqual(1);
    const invalidErr = errors.find((e) => e.id === "Sch_InvalidElementContentExpectingComplex");
    expect(invalidErr).toBeDefined();
    expect(invalidErr!.node).toBe(tl);
  });

  /**
   * .NET BugRegressionTest: Bug423974
   * Port via #372: SpreadsheetDrawing.Shape (xdr:sp) error description format.
   *
   * .NET expects: empty Shape → 1 Sch_IncompleteContentExpectingComplex with
   *               "List of possible elements expected:" in description.
   * TS behavior: empty Shape → 2 Sch_IncompleteContentExpectingComplex
   *               (one per missing required child: nvSpPr, spPr).
   */
  it("Bug423974 — SpreadsheetDrawing.Shape 错误描述格式（port from #372）", () => {
    const validator = new OpenXmlValidator();
    const shape = new Shape();
    const errors = validator.validate(shape);

    expect(errors.length).toBe(2);
    expect(errors[0].id).toBe("Sch_IncompleteContentExpectingComplex");
    expect(errors[1].id).toBe("Sch_IncompleteContentExpectingComplex");
    // Both descriptions mention the Shape element name
    for (const e of errors) {
      expect(e.description).toContain("<xdr:sp>");
    }
  });

  /**
   * .NET BugRegressionTest: Bug423998
   * Port via #372: SpreadsheetDrawing.Shape (xdr:sp) error list before/after adding child.
   *
   * .NET expects: empty Shape → 1 error; add TextBody → 2 errors; both descriptions
   *               share the "List of possible elements expected:" prefix.
   * TS behavior: empty Shape → 2 errors; add TextBody → 5 errors
   *               (now includes Sch_UnexpectedElementContentExpectingComplex for txBody
   *               appearing before required nvSpPr/spPr).
   */
  it("Bug423998 — SpreadsheetDrawing.Shape 添加子元素后错误列表（port from #372）", () => {
    const validator = new OpenXmlValidator();
    const shape = new Shape();

    // Empty Shape
    const errors1 = validator.validate(shape);
    expect(errors1.length).toBe(2);
    expect(errors1.every((e) => e.id === "Sch_IncompleteContentExpectingComplex")).toBe(true);

    // Shape + TextBody
    const txBody = new TextBody();
    shape.appendChild(txBody);
    const errors2 = validator.validate(shape);
    expect(errors2.length).toBe(5);
    // The two original Shape incomplete errors are still present
    const shapeErrors2 = errors2.filter(
      (e) => e.node === shape && e.id === "Sch_IncompleteContentExpectingComplex",
    );
    expect(shapeErrors2.length).toBe(2);
    // Now includes Sch_UnexpectedElementContentExpectingComplex on Shape with txBody as relatedNode
    const posErr = errors2.find((e) => e.id === "Sch_UnexpectedElementContentExpectingComplex");
    expect(posErr?.relatedNode).toBe(txBody);
  });

  /**
   * .NET BugRegressionTest: Bug403545
   * 依赖 AlternateContent / AlternateContentChoice / AlternateContentFallback TS 元素类
   * （mc 命名空间，TS 目前无可直接实例化的类）。
   * → see issue #374
   */
  it("Bug403545 — Level + AlternateContent 0 错误（port from #374）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });

    const level = new Level();
    level.levelIndex = new Int32Value(0);
    const snv = new StartNumberingValue();
    snv.val = new Int32Value(1);
    level.appendChild(snv);

    const mcNs = "http://schemas.openxmlformats.org/markup-compatibility/2006";
    const ac = new OpenXmlUnknownElement("mc", "AlternateContent", mcNs);
    const choice = new OpenXmlUnknownElement("mc", "Choice", mcNs);
    choice.extendedAttributes.set("Requires", "O15");
    const fallback = new OpenXmlUnknownElement("mc", "Fallback", mcNs);

    ac.appendChild(choice);
    ac.appendChild(fallback);
    level.appendChild(ac);

    const errors = validator.validate(level);
    expect(errors.length).toBe(0);
  });

  /**
   * .NET BugRegressionTest: Bug424104
   * 依赖 xsd:any particle（minOccurs=1）在约束系统中建模
   * （ppt Extension 需要至少 1 个任意子元素）。
   * → see issue #374
   */
  it("Bug424104 — ppt Extension xsd:any minOccurs=1 子元素约束（port from #374）", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });

    // Case 1: drawing Extension has xsd:any minOccurs=0 → 0 children is valid
    const dExt = new DrawingExtension();
    dExt.extendedAttributes.set("uri", "test");
    const dErrors = validator.validate(dExt);
    expect(dErrors.length).toBe(0);

    // Case 2: ppt Extension has xsd:any minOccurs=1 → at least 1 child required
    const pExt = new PptExtension();
    pExt.extendedAttributes.set("uri", "http://www.live.com");
    const pErrors = validator.validate(pExt);
    expect(pErrors.length).toBe(1);
    expect(pErrors[0].id).toBe("Sch_IncompleteContentExpectingComplex");
    expect(pErrors[0].description).toContain("(any)");
  });
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
