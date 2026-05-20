// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.ClientData

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Client Data.
 *
 * Element: `xdr:clientData` */
export class ClientData extends OpenXmlLeafElement {
  override readonly localName = "clientData" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;


  /** Locks With Sheet Flag (:fLocksWithSheet) */
  lockWithSheet: BooleanValue | undefined;

  /** Prints With Sheet Flag (:fPrintsWithSheet) */
  printWithSheet: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fLocksWithSheet": this.lockWithSheet = BooleanValue.parse(value); return;
      case "fPrintsWithSheet": this.printWithSheet = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lockWithSheet !== undefined) out.push(["fLocksWithSheet", this.lockWithSheet.toString()]);
    if (this.printWithSheet !== undefined) out.push(["fPrintsWithSheet", this.printWithSheet.toString()]);
    return out;
  }

}
