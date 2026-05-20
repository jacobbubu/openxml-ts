// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_customXml.json
// @see DocumentFormat.OpenXml.CustomXml.SchemaReference

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Associated XML Schema.
 *
 * Element: `ds:schemaRef` */
export class SchemaReference extends OpenXmlLeafElement {
  override readonly localName = "schemaRef" as const;
  override readonly prefix = "ds" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/customXml" as const;


  /** Target Namespace of Associated XML Schema (ds:uri) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ds:uri": this.uri = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["ds:uri", this.uri.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uri, { attribute: "ds:uri", elementClass: "SchemaReference" });
  }
}
