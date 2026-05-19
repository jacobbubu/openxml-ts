// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.BuildParagraph

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Build Paragraph.
 *
 * Element: `p:bldP` */
export class BuildParagraph extends OpenXmlCompositeElement {
  override readonly localName = "bldP" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Shape ID (:spid) */
  shapeId: StringValue | undefined;

  /** Group ID (:grpId) */
  groupId: UInt32Value | undefined;

  /** Expand UI (:uiExpand) */
  uiExpand: BooleanValue | undefined;

  /** Build Types (:build) */
  build: StringValue | undefined;

  /** Build Level (:bldLvl) */
  buildLevel: UInt32Value | undefined;

  /** Animate Background (:animBg) */
  animateBackground: BooleanValue | undefined;

  /** Auto Update Animation Background (:autoUpdateAnimBg) */
  autoAnimateBackground: BooleanValue | undefined;

  /** Reverse (:rev) */
  reverse: BooleanValue | undefined;

  /** Auto Advance Time (:advAuto) */
  autoAdvance: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "spid": this.shapeId = StringValue.parse(value); return;
      case "grpId": this.groupId = UInt32Value.parse(value); return;
      case "uiExpand": this.uiExpand = BooleanValue.parse(value); return;
      case "build": this.build = StringValue.parse(value); return;
      case "bldLvl": this.buildLevel = UInt32Value.parse(value); return;
      case "animBg": this.animateBackground = BooleanValue.parse(value); return;
      case "autoUpdateAnimBg": this.autoAnimateBackground = BooleanValue.parse(value); return;
      case "rev": this.reverse = BooleanValue.parse(value); return;
      case "advAuto": this.autoAdvance = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push(["spid", this.shapeId.toString()]);
    if (this.groupId !== undefined) out.push(["grpId", this.groupId.toString()]);
    if (this.uiExpand !== undefined) out.push(["uiExpand", this.uiExpand.toString()]);
    if (this.build !== undefined) out.push(["build", this.build.toString()]);
    if (this.buildLevel !== undefined) out.push(["bldLvl", this.buildLevel.toString()]);
    if (this.animateBackground !== undefined) out.push(["animBg", this.animateBackground.toString()]);
    if (this.autoAnimateBackground !== undefined) out.push(["autoUpdateAnimBg", this.autoAnimateBackground.toString()]);
    if (this.reverse !== undefined) out.push(["rev", this.reverse.toString()]);
    if (this.autoAdvance !== undefined) out.push(["advAuto", this.autoAdvance.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":spid", elementClass: "BuildParagraph" });
    assertRequired(this.groupId, { attribute: ":grpId", elementClass: "BuildParagraph" });
  }
}
