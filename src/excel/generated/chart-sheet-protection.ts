// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ChartSheetProtection

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Chart Sheet Protection.
 *
 * Element: `x:sheetProtection` */
export class ChartSheetProtection extends OpenXmlLeafElement {
  override readonly localName = "sheetProtection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Password (:password) */
  password: HexBinaryValue | undefined;

  /** Cryptographic Algorithm Name (:algorithmName) */
  algorithmName: StringValue | undefined;

  /** Password Hash Value (:hashValue) */
  hashValue: StringValue | undefined;

  /** Salt Value for Password Verifier (:saltValue) */
  saltValue: StringValue | undefined;

  /** Iterations to Run Hashing Algorithm (:spinCount) */
  spinCount: UInt32Value | undefined;

  /** Contents (:content) */
  content: BooleanValue | undefined;

  /** Objects Locked (:objects) */
  objects: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "password": this.password = HexBinaryValue.parse(value); return;
      case "algorithmName": this.algorithmName = StringValue.parse(value); return;
      case "hashValue": this.hashValue = StringValue.parse(value); return;
      case "saltValue": this.saltValue = StringValue.parse(value); return;
      case "spinCount": this.spinCount = UInt32Value.parse(value); return;
      case "content": this.content = BooleanValue.parse(value); return;
      case "objects": this.objects = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.password !== undefined) out.push(["password", this.password.toString()]);
    if (this.algorithmName !== undefined) out.push(["algorithmName", this.algorithmName.toString()]);
    if (this.hashValue !== undefined) out.push(["hashValue", this.hashValue.toString()]);
    if (this.saltValue !== undefined) out.push(["saltValue", this.saltValue.toString()]);
    if (this.spinCount !== undefined) out.push(["spinCount", this.spinCount.toString()]);
    if (this.content !== undefined) out.push(["content", this.content.toString()]);
    if (this.objects !== undefined) out.push(["objects", this.objects.toString()]);
    return out;
  }

}
