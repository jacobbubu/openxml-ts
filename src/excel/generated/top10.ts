// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Top10

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Top 10.
 *
 * Element: `x:top10` */
export class Top10 extends OpenXmlLeafElement {
  override readonly localName = "top10" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Top (:top) */
  top: BooleanValue | undefined;

  /** Filter by Percent (:percent) */
  percent: BooleanValue | undefined;

  /** Top or Bottom Value (:val) */
  val: StringValue | undefined;

  /** Filter Value (:filterVal) */
  filterValue: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "top": this.top = BooleanValue.parse(value); return;
      case "percent": this.percent = BooleanValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
      case "filterVal": this.filterValue = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.top !== undefined) out.push(["top", this.top.toString()]);
    if (this.percent !== undefined) out.push(["percent", this.percent.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.filterValue !== undefined) out.push(["filterVal", this.filterValue.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "Top10" });
  }
}
