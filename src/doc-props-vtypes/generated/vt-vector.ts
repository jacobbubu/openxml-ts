// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_docPropsVTypes.json
// @see DocumentFormat.OpenXml.DocPropsVTypes.VTVector

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Vector.
 *
 * Element: `vt:vector` */
export class VTVector extends OpenXmlCompositeElement {
  override readonly localName = "vector" as const;
  override readonly prefix = "vt" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Vector Base Type (:baseType) */
  baseType: StringValue | undefined;

  /** Vector Size (:size) */
  size: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "baseType": this.baseType = StringValue.parse(value); return;
      case "size": this.size = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.baseType !== undefined) out.push(["baseType", this.baseType.toString()]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.baseType, { attribute: ":baseType", elementClass: "VTVector" });
    assertRequired(this.size, { attribute: ":size", elementClass: "VTVector" });
  }
}
