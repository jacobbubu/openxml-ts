// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.OlapSlicerCacheRange

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the OlapSlicerCacheRange Class.
 *
 * Element: `x14:range` */
export class OlapSlicerCacheRange extends OpenXmlCompositeElement {
  override readonly localName = "range" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** startItem (:startItem) */
  startItem: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "startItem": this.startItem = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.startItem !== undefined) out.push(["startItem", this.startItem.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.startItem, { attribute: ":startItem", elementClass: "OlapSlicerCacheRange" });
  }
}
