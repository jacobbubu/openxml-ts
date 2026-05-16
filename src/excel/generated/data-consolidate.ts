// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DataConsolidate

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Data Consolidation.
 *
 * Element: `x:dataConsolidate` */
export class DataConsolidate extends OpenXmlCompositeElement {
  override readonly localName = "dataConsolidate" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Function Index (:function) */
  function: StringValue | undefined;

  /** Use Left Column Labels (:leftLabels) */
  leftLabels: BooleanValue | undefined;

  /** startLabels (:startLabels) */
  startLabels: BooleanValue | undefined;

  /** Labels In Top Row (:topLabels) */
  topLabels: BooleanValue | undefined;

  /** Link (:link) */
  link: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":function": this.function = StringValue.parse(value); return;
      case ":leftLabels": this.leftLabels = BooleanValue.parse(value); return;
      case ":startLabels": this.startLabels = BooleanValue.parse(value); return;
      case ":topLabels": this.topLabels = BooleanValue.parse(value); return;
      case ":link": this.link = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.function !== undefined) out.push([":function", this.function.toString()]);
    if (this.leftLabels !== undefined) out.push([":leftLabels", this.leftLabels.toString()]);
    if (this.startLabels !== undefined) out.push([":startLabels", this.startLabels.toString()]);
    if (this.topLabels !== undefined) out.push([":topLabels", this.topLabels.toString()]);
    if (this.link !== undefined) out.push([":link", this.link.toString()]);
    return out;
  }

}
