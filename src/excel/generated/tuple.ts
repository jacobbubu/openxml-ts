// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Tuple

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Tuple.
 *
 * Element: `x:tpl` */
export class Tuple extends OpenXmlLeafElement {
  override readonly localName = "tpl" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Field Index (:fld) */
  field: UInt32Value | undefined;

  /** Hierarchy Index (:hier) */
  hierarchy: UInt32Value | undefined;

  /** Item Index (:item) */
  item: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fld": this.field = UInt32Value.parse(value); return;
      case "hier": this.hierarchy = UInt32Value.parse(value); return;
      case "item": this.item = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.field !== undefined) out.push(["fld", this.field.toString()]);
    if (this.hierarchy !== undefined) out.push(["hier", this.hierarchy.toString()]);
    if (this.item !== undefined) out.push(["item", this.item.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.item, { attribute: ":item", elementClass: "Tuple" });
  }
}
