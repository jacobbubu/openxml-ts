// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MapInfo

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** XML Mapping.
 *
 * Element: `x:MapInfo` */
export class MapInfo extends OpenXmlCompositeElement {
  override readonly localName = "MapInfo" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Prefix Mappings for XPath Expressions (:SelectionNamespaces) */
  selectionNamespaces: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "SelectionNamespaces": this.selectionNamespaces = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.selectionNamespaces !== undefined) out.push(["SelectionNamespaces", this.selectionNamespaces.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.selectionNamespaces, { attribute: ":SelectionNamespaces", elementClass: "MapInfo" });
  }
}
