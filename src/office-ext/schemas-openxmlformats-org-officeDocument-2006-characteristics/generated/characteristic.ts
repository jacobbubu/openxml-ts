// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_characteristics.json
// @see DocumentFormat.OpenXml.OfficeDocument2006Characteristics.Characteristic

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Single Characteristic.
 *
 * Element: `ac:characteristic` */
export class Characteristic extends OpenXmlLeafElement {
  override readonly localName = "characteristic" as const;
  override readonly prefix = "ac" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/characteristics" as const;


  /** Name of Characteristic (:name) */
  name: StringValue | undefined;

  /** Relationship of Value to Name (:relation) */
  relation: StringValue | undefined;

  /** Characteristic Value (:val) */
  val: StringValue | undefined;

  /** Characteristic Grammar (:vocabulary) */
  vocabulary: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "relation": this.relation = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
      case "vocabulary": this.vocabulary = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.relation !== undefined) out.push(["relation", this.relation.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.vocabulary !== undefined) out.push(["vocabulary", this.vocabulary.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Characteristic" });
    assertRequired(this.relation, { attribute: ":relation", elementClass: "Characteristic" });
    assertRequired(this.val, { attribute: ":val", elementClass: "Characteristic" });
  }
}
