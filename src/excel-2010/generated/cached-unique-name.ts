// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.CachedUniqueName

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the CachedUniqueName Class.
 *
 * Element: `x15:cachedUniqueName` */
export class CachedUniqueName extends OpenXmlLeafElement {
  override readonly localName = "cachedUniqueName" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** index (:index) */
  index: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "index": this.index = UInt32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push(["index", this.index.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":index", elementClass: "CachedUniqueName" });
    assertRequired(this.name, { attribute: ":name", elementClass: "CachedUniqueName" });
  }
}
