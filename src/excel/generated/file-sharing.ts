// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.FileSharing

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the FileSharing Class.
 *
 * Element: `x:fileSharing` */
export class FileSharing extends OpenXmlLeafElement {
  override readonly localName = "fileSharing" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Read Only Recommended (:readOnlyRecommended) */
  readOnlyRecommended: BooleanValue | undefined;

  /** User Name (:userName) */
  userName: StringValue | undefined;

  /** Write Reservation Password (:reservationPassword) */
  reservationPassword: HexBinaryValue | undefined;

  /** Password hash algorithm (:algorithmName) */
  algorithmName: StringValue | undefined;

  /** Password hash (:hashValue) */
  hashValue: StringValue | undefined;

  /** Salt for password hash (:saltValue) */
  saltValue: StringValue | undefined;

  /** Spin count for password hash (:spinCount) */
  spinCount: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":readOnlyRecommended": this.readOnlyRecommended = BooleanValue.parse(value); return;
      case ":userName": this.userName = StringValue.parse(value); return;
      case ":reservationPassword": this.reservationPassword = HexBinaryValue.parse(value); return;
      case ":algorithmName": this.algorithmName = StringValue.parse(value); return;
      case ":hashValue": this.hashValue = StringValue.parse(value); return;
      case ":saltValue": this.saltValue = StringValue.parse(value); return;
      case ":spinCount": this.spinCount = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.readOnlyRecommended !== undefined) out.push([":readOnlyRecommended", this.readOnlyRecommended.toString()]);
    if (this.userName !== undefined) out.push([":userName", this.userName.toString()]);
    if (this.reservationPassword !== undefined) out.push([":reservationPassword", this.reservationPassword.toString()]);
    if (this.algorithmName !== undefined) out.push([":algorithmName", this.algorithmName.toString()]);
    if (this.hashValue !== undefined) out.push([":hashValue", this.hashValue.toString()]);
    if (this.saltValue !== undefined) out.push([":saltValue", this.saltValue.toString()]);
    if (this.spinCount !== undefined) out.push([":spinCount", this.spinCount.toString()]);
    return out;
  }

}
