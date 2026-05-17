// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.BuildDiagram

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Build Diagram.
 *
 * Element: `p:bldDgm` */
export class BuildDiagram extends OpenXmlLeafElement {
  override readonly localName = "bldDgm" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Shape ID (:spid) */
  shapeId: StringValue | undefined;

  /** Group ID (:grpId) */
  groupId: UInt32Value | undefined;

  /** Expand UI (:uiExpand) */
  uiExpand: BooleanValue | undefined;

  /** Diagram Build Types (:bld) */
  build: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":spid": this.shapeId = StringValue.parse(value); return;
      case ":grpId": this.groupId = UInt32Value.parse(value); return;
      case ":uiExpand": this.uiExpand = BooleanValue.parse(value); return;
      case ":bld": this.build = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push([":spid", this.shapeId.toString()]);
    if (this.groupId !== undefined) out.push([":grpId", this.groupId.toString()]);
    if (this.uiExpand !== undefined) out.push([":uiExpand", this.uiExpand.toString()]);
    if (this.build !== undefined) out.push([":bld", this.build.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":spid", elementClass: "BuildDiagram" });
    assertRequired(this.groupId, { attribute: ":grpId", elementClass: "BuildDiagram" });
  }
}
