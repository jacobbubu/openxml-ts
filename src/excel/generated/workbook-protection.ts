// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WorkbookProtection

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the WorkbookProtection Class.
 *
 * Element: `x:workbookProtection` */
export class WorkbookProtection extends OpenXmlLeafElement {
  override readonly localName = "workbookProtection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Workbook Password (:workbookPassword) */
  workbookPassword: HexBinaryValue | undefined;

  /** Revisions Password (:revisionsPassword) */
  revisionsPassword: HexBinaryValue | undefined;

  /** Lock Structure (:lockStructure) */
  lockStructure: BooleanValue | undefined;

  /** Lock Windows (:lockWindows) */
  lockWindows: BooleanValue | undefined;

  /** Lock Revisions (:lockRevision) */
  lockRevision: BooleanValue | undefined;

  /** Cryptographic Algorithm Name (:revisionsAlgorithmName) */
  revisionsAlgorithmName: StringValue | undefined;

  /** Password Hash Value (:revisionsHashValue) */
  revisionsHashValue: StringValue | undefined;

  /** Salt Value for Password Verifier (:revisionsSaltValue) */
  revisionsSaltValue: StringValue | undefined;

  /** Iterations to Run Hashing Algorithm (:revisionsSpinCount) */
  revisionsSpinCount: UInt32Value | undefined;

  /** Cryptographic Algorithm Name (:workbookAlgorithmName) */
  workbookAlgorithmName: StringValue | undefined;

  /** Password Hash Value (:workbookHashValue) */
  workbookHashValue: StringValue | undefined;

  /** Salt Value for Password Verifier (:workbookSaltValue) */
  workbookSaltValue: StringValue | undefined;

  /** Iterations to Run Hashing Algorithm (:workbookSpinCount) */
  workbookSpinCount: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "workbookPassword": this.workbookPassword = HexBinaryValue.parse(value); return;
      case "revisionsPassword": this.revisionsPassword = HexBinaryValue.parse(value); return;
      case "lockStructure": this.lockStructure = BooleanValue.parse(value); return;
      case "lockWindows": this.lockWindows = BooleanValue.parse(value); return;
      case "lockRevision": this.lockRevision = BooleanValue.parse(value); return;
      case "revisionsAlgorithmName": this.revisionsAlgorithmName = StringValue.parse(value); return;
      case "revisionsHashValue": this.revisionsHashValue = StringValue.parse(value); return;
      case "revisionsSaltValue": this.revisionsSaltValue = StringValue.parse(value); return;
      case "revisionsSpinCount": this.revisionsSpinCount = UInt32Value.parse(value); return;
      case "workbookAlgorithmName": this.workbookAlgorithmName = StringValue.parse(value); return;
      case "workbookHashValue": this.workbookHashValue = StringValue.parse(value); return;
      case "workbookSaltValue": this.workbookSaltValue = StringValue.parse(value); return;
      case "workbookSpinCount": this.workbookSpinCount = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.workbookPassword !== undefined) out.push(["workbookPassword", this.workbookPassword.toString()]);
    if (this.revisionsPassword !== undefined) out.push(["revisionsPassword", this.revisionsPassword.toString()]);
    if (this.lockStructure !== undefined) out.push(["lockStructure", this.lockStructure.toString()]);
    if (this.lockWindows !== undefined) out.push(["lockWindows", this.lockWindows.toString()]);
    if (this.lockRevision !== undefined) out.push(["lockRevision", this.lockRevision.toString()]);
    if (this.revisionsAlgorithmName !== undefined) out.push(["revisionsAlgorithmName", this.revisionsAlgorithmName.toString()]);
    if (this.revisionsHashValue !== undefined) out.push(["revisionsHashValue", this.revisionsHashValue.toString()]);
    if (this.revisionsSaltValue !== undefined) out.push(["revisionsSaltValue", this.revisionsSaltValue.toString()]);
    if (this.revisionsSpinCount !== undefined) out.push(["revisionsSpinCount", this.revisionsSpinCount.toString()]);
    if (this.workbookAlgorithmName !== undefined) out.push(["workbookAlgorithmName", this.workbookAlgorithmName.toString()]);
    if (this.workbookHashValue !== undefined) out.push(["workbookHashValue", this.workbookHashValue.toString()]);
    if (this.workbookSaltValue !== undefined) out.push(["workbookSaltValue", this.workbookSaltValue.toString()]);
    if (this.workbookSpinCount !== undefined) out.push(["workbookSpinCount", this.workbookSpinCount.toString()]);
    return out;
  }

}
