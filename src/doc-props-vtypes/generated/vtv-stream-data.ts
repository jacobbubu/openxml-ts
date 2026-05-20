// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_docPropsVTypes.json
// @see DocumentFormat.OpenXml.DocPropsVTypes.VTVStreamData

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Binary Versioned Stream.
 *
 * Element: `vt:vstream` */
export class VTVStreamData extends OpenXmlLeafElement {
  override readonly localName = "vstream" as const;
  override readonly prefix = "vt" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" as const;


  /** VSTREAM Version Attribute (:version) */
  version: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "version": this.version = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.version !== undefined) out.push(["version", this.version.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.version, { attribute: ":version", elementClass: "VTVStreamData" });
  }
}
