// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_docPropsVTypes.json
// @see DocumentFormat.OpenXml.DocPropsVTypes.VTArray

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Array.
 *
 * Element: `vt:array` */
export class VTArray extends OpenXmlCompositeElement {
  override readonly localName = "array" as const;
  override readonly prefix = "vt" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Array Lower Bounds Attribute (:lBound) */
  lowerBounds: Int32Value | undefined;

  /** Array Upper Bounds Attribute (:uBound) */
  upperBounds: Int32Value | undefined;

  /** Array Base Type (:baseType) */
  baseType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "lBound": this.lowerBounds = Int32Value.parse(value); return;
      case "uBound": this.upperBounds = Int32Value.parse(value); return;
      case "baseType": this.baseType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lowerBounds !== undefined) out.push(["lBound", this.lowerBounds.toString()]);
    if (this.upperBounds !== undefined) out.push(["uBound", this.upperBounds.toString()]);
    if (this.baseType !== undefined) out.push(["baseType", this.baseType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.lowerBounds, { attribute: ":lBound", elementClass: "VTArray" });
    assertRequired(this.upperBounds, { attribute: ":uBound", elementClass: "VTArray" });
    assertRequired(this.baseType, { attribute: ":baseType", elementClass: "VTArray" });
  }
}
