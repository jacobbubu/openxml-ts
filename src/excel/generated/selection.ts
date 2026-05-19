// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Selection

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Selection.
 *
 * Element: `x:selection` */
export class Selection extends OpenXmlLeafElement {
  override readonly localName = "selection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Pane (:pane) */
  pane: StringValue | undefined;

  /** Active Cell Location (:activeCell) */
  activeCell: StringValue | undefined;

  /** Active Cell Index (:activeCellId) */
  activeCellId: UInt32Value | undefined;

  /** Sequence of References (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "pane": this.pane = StringValue.parse(value); return;
      case "activeCell": this.activeCell = StringValue.parse(value); return;
      case "activeCellId": this.activeCellId = UInt32Value.parse(value); return;
      case "sqref": this.sequenceOfReferences = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pane !== undefined) out.push(["pane", this.pane.toString()]);
    if (this.activeCell !== undefined) out.push(["activeCell", this.activeCell.toString()]);
    if (this.activeCellId !== undefined) out.push(["activeCellId", this.activeCellId.toString()]);
    if (this.sequenceOfReferences !== undefined) out.push(["sqref", this.sequenceOfReferences.toString()]);
    return out;
  }

}
