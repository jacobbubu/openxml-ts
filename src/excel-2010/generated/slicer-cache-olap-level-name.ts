// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.SlicerCacheOlapLevelName

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the SlicerCacheOlapLevelName Class.
 *
 * Element: `x15:slicerCacheOlapLevelName` */
export class SlicerCacheOlapLevelName extends OpenXmlLeafElement {
  override readonly localName = "slicerCacheOlapLevelName" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** uniqueName (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** count (:count) */
  count: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "count": this.count = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uniqueName, { attribute: ":uniqueName", elementClass: "SlicerCacheOlapLevelName" });
    assertRequired(this.count, { attribute: ":count", elementClass: "SlicerCacheOlapLevelName" });
  }
}
