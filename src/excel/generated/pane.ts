// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Pane

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** View Pane.
 *
 * Element: `x:pane` */
export class Pane extends OpenXmlLeafElement {
  override readonly localName = "pane" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Horizontal Split Position (:xSplit) */
  horizontalSplit: StringValue | undefined;

  /** Vertical Split Position (:ySplit) */
  verticalSplit: StringValue | undefined;

  /** Top Left Visible Cell (:topLeftCell) */
  topLeftCell: StringValue | undefined;

  /** Active Pane (:activePane) */
  activePane: StringValue | undefined;

  /** Split State (:state) */
  state: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xSplit": this.horizontalSplit = StringValue.parse(value); return;
      case "ySplit": this.verticalSplit = StringValue.parse(value); return;
      case "topLeftCell": this.topLeftCell = StringValue.parse(value); return;
      case "activePane": this.activePane = StringValue.parse(value); return;
      case "state": this.state = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.horizontalSplit !== undefined) out.push(["xSplit", this.horizontalSplit.toString()]);
    if (this.verticalSplit !== undefined) out.push(["ySplit", this.verticalSplit.toString()]);
    if (this.topLeftCell !== undefined) out.push(["topLeftCell", this.topLeftCell.toString()]);
    if (this.activePane !== undefined) out.push(["activePane", this.activePane.toString()]);
    if (this.state !== undefined) out.push(["state", this.state.toString()]);
    return out;
  }

}
