// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MdxMemberProp

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Member Property MDX Metadata.
 *
 * Element: `x:p` */
export class MdxMemberProp extends OpenXmlLeafElement {
  override readonly localName = "p" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Member Unique Name Index (:n) */
  nameIndex: UInt32Value | undefined;

  /** Property Name Index (:np) */
  propertyNameIndex: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.nameIndex = UInt32Value.parse(value); return;
      case "np": this.propertyNameIndex = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.nameIndex !== undefined) out.push(["n", this.nameIndex.toString()]);
    if (this.propertyNameIndex !== undefined) out.push(["np", this.propertyNameIndex.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.nameIndex, { attribute: ":n", elementClass: "MdxMemberProp" });
    assertRequired(this.propertyNameIndex, { attribute: ":np", elementClass: "MdxMemberProp" });
  }
}
