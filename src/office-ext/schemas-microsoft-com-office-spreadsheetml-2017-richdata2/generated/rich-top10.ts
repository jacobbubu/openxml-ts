// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.RichTop10

import {
  BooleanValue,
  DoubleValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RichTop10 Class.
 *
 * Element: `xlrd2:top10` */
export class RichTop10 extends OpenXmlLeafElement {
  override readonly localName = "top10" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** key (:key) */
  key: StringValue | undefined;

  /** Top (:top) */
  top: BooleanValue | undefined;

  /** Filter by Percent (:percent) */
  percent: BooleanValue | undefined;

  /** Top or Bottom Value (:val) */
  val: DoubleValue | undefined;

  /** Filter Value (:filterVal) */
  filterValue: DoubleValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "key": this.key = StringValue.parse(value); return;
      case "top": this.top = BooleanValue.parse(value); return;
      case "percent": this.percent = BooleanValue.parse(value); return;
      case "val": this.val = DoubleValue.parse(value); return;
      case "filterVal": this.filterValue = DoubleValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.key !== undefined) out.push(["key", this.key.toString()]);
    if (this.top !== undefined) out.push(["top", this.top.toString()]);
    if (this.percent !== undefined) out.push(["percent", this.percent.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.filterValue !== undefined) out.push(["filterVal", this.filterValue.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "RichTop10" });
  }
}
