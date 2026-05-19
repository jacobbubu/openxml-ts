// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ProtectedRange

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Protected Range.
 *
 * Element: `x:protectedRange` */
export class ProtectedRange extends OpenXmlLeafElement {
  override readonly localName = "protectedRange" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** password (:password) */
  password: HexBinaryValue | undefined;

  /** algorithmName (:algorithmName) */
  algorithmName: StringValue | undefined;

  /** hashValue (:hashValue) */
  hashValue: StringValue | undefined;

  /** saltValue (:saltValue) */
  saltValue: StringValue | undefined;

  /** spinCount (:spinCount) */
  spinCount: UInt32Value | undefined;

  /** sqref (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** securityDescriptor (:securityDescriptor) */
  securityDescriptor: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "password": this.password = HexBinaryValue.parse(value); return;
      case "algorithmName": this.algorithmName = StringValue.parse(value); return;
      case "hashValue": this.hashValue = StringValue.parse(value); return;
      case "saltValue": this.saltValue = StringValue.parse(value); return;
      case "spinCount": this.spinCount = UInt32Value.parse(value); return;
      case "sqref": this.sequenceOfReferences = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "securityDescriptor": this.securityDescriptor = StringValue.parse(value); return;
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
    if (this.sequenceOfReferences !== undefined) out.push(["sqref", this.sequenceOfReferences.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.securityDescriptor !== undefined) out.push(["securityDescriptor", this.securityDescriptor.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sequenceOfReferences, { attribute: ":sqref", elementClass: "ProtectedRange" });
    assertRequired(this.name, { attribute: ":name", elementClass: "ProtectedRange" });
  }
}
