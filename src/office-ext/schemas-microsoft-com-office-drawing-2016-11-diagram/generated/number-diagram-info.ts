// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2016_11_diagram.json
// @see DocumentFormat.OpenXml.201611Diagram.NumberDiagramInfo

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the NumberDiagramInfo Class.
 *
 * Element: `dgm1611:autoBuNodeInfo` */
export class NumberDiagramInfo extends OpenXmlCompositeElement {
  override readonly localName = "autoBuNodeInfo" as const;
  override readonly prefix = "dgm1611" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2016/11/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** lvl (:lvl) */
  lvl: UInt32Value | undefined;

  /** ptType (:ptType) */
  ptType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "lvl": this.lvl = UInt32Value.parse(value); return;
      case "ptType": this.ptType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lvl !== undefined) out.push(["lvl", this.lvl.toString()]);
    if (this.ptType !== undefined) out.push(["ptType", this.ptType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.lvl, { attribute: ":lvl", elementClass: "NumberDiagramInfo" });
    assertRequired(this.ptType, { attribute: ":ptType", elementClass: "NumberDiagramInfo" });
  }
}
