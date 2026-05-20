// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_custom-properties.json
// @see DocumentFormat.OpenXml.CustomProperties.CustomDocumentProperty

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Custom File Property.
 *
 * Element: `op:property` */
export class CustomDocumentProperty extends OpenXmlCompositeElement {
  override readonly localName = "property" as const;
  override readonly prefix = "op" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Format ID (:fmtid) */
  formatId: StringValue | undefined;

  /** Property ID (:pid) */
  propertyId: Int32Value | undefined;

  /** Custom File Property Name (:name) */
  name: StringValue | undefined;

  /** Bookmark Link Target (:linkTarget) */
  linkTarget: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fmtid": this.formatId = StringValue.parse(value); return;
      case "pid": this.propertyId = Int32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "linkTarget": this.linkTarget = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.formatId !== undefined) out.push(["fmtid", this.formatId.toString()]);
    if (this.propertyId !== undefined) out.push(["pid", this.propertyId.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.linkTarget !== undefined) out.push(["linkTarget", this.linkTarget.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.formatId, { attribute: ":fmtid", elementClass: "CustomDocumentProperty" });
    assertRequired(this.propertyId, { attribute: ":pid", elementClass: "CustomDocumentProperty" });
  }
}
