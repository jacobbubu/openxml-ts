// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.BuildGraphics

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Build Graphics.
 *
 * Element: `p:bldGraphic` */
export class BuildGraphics extends OpenXmlCompositeElement {
  override readonly localName = "bldGraphic" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Shape ID (:spid) */
  shapeId: StringValue | undefined;

  /** Group ID (:grpId) */
  groupId: UInt32Value | undefined;

  /** Expand UI (:uiExpand) */
  uiExpand: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "spid": this.shapeId = StringValue.parse(value); return;
      case "grpId": this.groupId = UInt32Value.parse(value); return;
      case "uiExpand": this.uiExpand = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push(["spid", this.shapeId.toString()]);
    if (this.groupId !== undefined) out.push(["grpId", this.groupId.toString()]);
    if (this.uiExpand !== undefined) out.push(["uiExpand", this.uiExpand.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":spid", elementClass: "BuildGraphics" });
    assertRequired(this.groupId, { attribute: ":grpId", elementClass: "BuildGraphics" });
  }
}
