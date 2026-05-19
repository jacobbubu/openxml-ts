// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Filters

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Filter Criteria.
 *
 * Element: `x:filters` */
export class Filters extends OpenXmlCompositeElement {
  override readonly localName = "filters" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Filter by Blank (:blank) */
  blank: BooleanValue | undefined;

  /** Calendar Type (:calendarType) */
  calendarType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "blank": this.blank = BooleanValue.parse(value); return;
      case "calendarType": this.calendarType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blank !== undefined) out.push(["blank", this.blank.toString()]);
    if (this.calendarType !== undefined) out.push(["calendarType", this.calendarType.toString()]);
    return out;
  }

}
