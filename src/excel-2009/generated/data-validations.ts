// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.DataValidations

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Defines the DataValidations Class.
 *
 * Element: `x14:dataValidations` */
export class DataValidations extends OpenXmlCompositeElement {
  override readonly localName = "dataValidations" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** disablePrompts (:disablePrompts) */
  disablePrompts: BooleanValue | undefined;

  /** xWindow (:xWindow) */
  xWindow: UInt32Value | undefined;

  /** yWindow (:yWindow) */
  yWindow: UInt32Value | undefined;

  /** count (:count) */
  count: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "disablePrompts": this.disablePrompts = BooleanValue.parse(value); return;
      case "xWindow": this.xWindow = UInt32Value.parse(value); return;
      case "yWindow": this.yWindow = UInt32Value.parse(value); return;
      case "count": this.count = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.disablePrompts !== undefined) out.push(["disablePrompts", this.disablePrompts.toString()]);
    if (this.xWindow !== undefined) out.push(["xWindow", this.xWindow.toString()]);
    if (this.yWindow !== undefined) out.push(["yWindow", this.yWindow.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    return out;
  }

}
