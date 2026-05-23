// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2020_richvaluerefresh.json
// @see DocumentFormat.OpenXml.Spreadsheetml2020Richvaluerefresh.RichValueRefreshInterval

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RichValueRefreshInterval Class.
 *
 * Element: `xlrvr:refreshInterval` */
export class RichValueRefreshInterval extends OpenXmlLeafElement {
  override readonly localName = "refreshInterval" as const;
  override readonly prefix = "xlrvr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2020/richvaluerefresh" as const;


  /** resourceIdInt (:resourceIdInt) */
  resourceIdInt: Int32Value | undefined;

  /** resourceIdStr (:resourceIdStr) */
  resourceIdStr: StringValue | undefined;

  /** interval (:interval) */
  interval: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "resourceIdInt": this.resourceIdInt = Int32Value.parse(value); return;
      case "resourceIdStr": this.resourceIdStr = StringValue.parse(value); return;
      case "interval": this.interval = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.resourceIdInt !== undefined) out.push(["resourceIdInt", this.resourceIdInt.toString()]);
    if (this.resourceIdStr !== undefined) out.push(["resourceIdStr", this.resourceIdStr.toString()]);
    if (this.interval !== undefined) out.push(["interval", this.interval.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.interval, { attribute: ":interval", elementClass: "RichValueRefreshInterval" });
  }
}
