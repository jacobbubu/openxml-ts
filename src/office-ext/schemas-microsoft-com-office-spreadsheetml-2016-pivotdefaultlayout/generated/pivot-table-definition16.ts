// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2016_pivotdefaultlayout.json
// @see DocumentFormat.OpenXml.Spreadsheetml2016Pivotdefaultlayout.PivotTableDefinition16

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the PivotTableDefinition16 Class.
 *
 * Element: `xpdl:pivotTableDefinition16` */
export class PivotTableDefinition16 extends OpenXmlLeafElement {
  override readonly localName = "pivotTableDefinition16" as const;
  override readonly prefix = "xpdl" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2016/pivotdefaultlayout" as const;


  /** EnabledSubtotalsDefault (:EnabledSubtotalsDefault) */
  enabledSubtotalsDefault: BooleanValue | undefined;

  /** SubtotalsOnTopDefault (:SubtotalsOnTopDefault) */
  subtotalsOnTopDefault: BooleanValue | undefined;

  /** InsertBlankRowDefault (:InsertBlankRowDefault) */
  insertBlankRowDefault: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "EnabledSubtotalsDefault": this.enabledSubtotalsDefault = BooleanValue.parse(value); return;
      case "SubtotalsOnTopDefault": this.subtotalsOnTopDefault = BooleanValue.parse(value); return;
      case "InsertBlankRowDefault": this.insertBlankRowDefault = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.enabledSubtotalsDefault !== undefined) out.push(["EnabledSubtotalsDefault", this.enabledSubtotalsDefault.toString()]);
    if (this.subtotalsOnTopDefault !== undefined) out.push(["SubtotalsOnTopDefault", this.subtotalsOnTopDefault.toString()]);
    if (this.insertBlankRowDefault !== undefined) out.push(["InsertBlankRowDefault", this.insertBlankRowDefault.toString()]);
    return out;
  }

}
