// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.SlicerStyleElement

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the SlicerStyleElement Class.
 *
 * Element: `x14:slicerStyleElement` */
export class SlicerStyleElement extends OpenXmlLeafElement {
  override readonly localName = "slicerStyleElement" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** type (:type) */
  type: StringValue | undefined;

  /** dxfId (:dxfId) */
  formatId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "dxfId": this.formatId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.formatId !== undefined) out.push(["dxfId", this.formatId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "SlicerStyleElement" });
  }
}
