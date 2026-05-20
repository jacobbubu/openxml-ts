// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_customXml.json
// @see DocumentFormat.OpenXml.CustomXml.DataStoreItem

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Custom XML Data Properties.
 *
 * Element: `ds:datastoreItem` */
export class DataStoreItem extends OpenXmlCompositeElement {
  override readonly localName = "datastoreItem" as const;
  override readonly prefix = "ds" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/customXml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Custom XML Data ID (ds:itemID) */
  itemId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ds:itemID": this.itemId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.itemId !== undefined) out.push(["ds:itemID", this.itemId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.itemId, { attribute: "ds:itemID", elementClass: "DataStoreItem" });
  }
}
