// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.ProtectedRange

import {
  Base64BinaryValue,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the ProtectedRange Class.
 *
 * Element: `x14:protectedRange` */
export class ProtectedRange extends OpenXmlCompositeElement {
  override readonly localName = "protectedRange" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** password (:password) */
  password: HexBinaryValue | undefined;

  /** algorithmName (:algorithmName) */
  algorithmName: StringValue | undefined;

  /** hashValue (:hashValue) */
  hashValue: Base64BinaryValue | undefined;

  /** saltValue (:saltValue) */
  saltValue: Base64BinaryValue | undefined;

  /** spinCount (:spinCount) */
  spinCount: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** securityDescriptor (:securityDescriptor) */
  securityDescriptor: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "password": this.password = HexBinaryValue.parse(value); return;
      case "algorithmName": this.algorithmName = StringValue.parse(value); return;
      case "hashValue": this.hashValue = Base64BinaryValue.parse(value); return;
      case "saltValue": this.saltValue = Base64BinaryValue.parse(value); return;
      case "spinCount": this.spinCount = UInt32Value.parse(value); return;
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
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.securityDescriptor !== undefined) out.push(["securityDescriptor", this.securityDescriptor.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "ProtectedRange" });
  }
}
