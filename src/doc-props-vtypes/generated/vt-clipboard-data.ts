// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_docPropsVTypes.json
// @see DocumentFormat.OpenXml.DocPropsVTypes.VTClipboardData

import {
  Int32Value,
  OpenXmlElementList,
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Clipboard Data.
 *
 * Element: `vt:cf` */
export class VTClipboardData extends OpenXmlLeafElement {
  override readonly localName = "cf" as const;
  override readonly prefix = "vt" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" as const;


  /** Format Attribute (:format) */
  format: Int32Value | undefined;

  /** size (:size) */
  size: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "format": this.format = Int32Value.parse(value); assertNumber(this.format, { min: -3 }, { attribute: ":format", elementClass: "VTClipboardData" }); return;
      case "size": this.size = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.format !== undefined) out.push(["format", this.format.toString()]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.size, { attribute: ":size", elementClass: "VTClipboardData" });
  }
}
