// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.RichFilter

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the RichFilter Class.
 *
 * Element: `xlrd2:filter` */
export class RichFilter extends OpenXmlLeafElement {
  override readonly localName = "filter" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** key (:key) */
  key: StringValue | undefined;

  /** val (:val) */
  val: StringValue | undefined;

  /** blank (:blank) */
  blank: BooleanValue | undefined;

  /** nodata (:nodata) */
  nodata: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "key": this.key = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
      case "blank": this.blank = BooleanValue.parse(value); return;
      case "nodata": this.nodata = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.key !== undefined) out.push(["key", this.key.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.blank !== undefined) out.push(["blank", this.blank.toString()]);
    if (this.nodata !== undefined) out.push(["nodata", this.nodata.toString()]);
    return out;
  }

}
