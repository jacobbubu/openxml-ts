// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Schema

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** XML Schema.
 *
 * Element: `x:Schema` */
export class Schema extends OpenXmlCompositeElement {
  override readonly localName = "Schema" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Schema ID (:ID) */
  id: StringValue | undefined;

  /** Schema Reference (:SchemaRef) */
  schemaReference: StringValue | undefined;

  /** Schema Root Namespace (:Namespace) */
  namespace: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ID": this.id = StringValue.parse(value); return;
      case "SchemaRef": this.schemaReference = StringValue.parse(value); return;
      case "Namespace": this.namespace = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["ID", this.id.toString()]);
    if (this.schemaReference !== undefined) out.push(["SchemaRef", this.schemaReference.toString()]);
    if (this.namespace !== undefined) out.push(["Namespace", this.namespace.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":ID", elementClass: "Schema" });
  }
}
