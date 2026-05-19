// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.FileRecoveryProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the FileRecoveryProperties Class.
 *
 * Element: `x:fileRecoveryPr` */
export class FileRecoveryProperties extends OpenXmlLeafElement {
  override readonly localName = "fileRecoveryPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Auto Recover (:autoRecover) */
  autoRecover: BooleanValue | undefined;

  /** Crash Save (:crashSave) */
  crashSave: BooleanValue | undefined;

  /** Data Extract Load (:dataExtractLoad) */
  dataExtractLoad: BooleanValue | undefined;

  /** Repair Load (:repairLoad) */
  repairLoad: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "autoRecover": this.autoRecover = BooleanValue.parse(value); return;
      case "crashSave": this.crashSave = BooleanValue.parse(value); return;
      case "dataExtractLoad": this.dataExtractLoad = BooleanValue.parse(value); return;
      case "repairLoad": this.repairLoad = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.autoRecover !== undefined) out.push(["autoRecover", this.autoRecover.toString()]);
    if (this.crashSave !== undefined) out.push(["crashSave", this.crashSave.toString()]);
    if (this.dataExtractLoad !== undefined) out.push(["dataExtractLoad", this.dataExtractLoad.toString()]);
    if (this.repairLoad !== undefined) out.push(["repairLoad", this.repairLoad.toString()]);
    return out;
  }

}
