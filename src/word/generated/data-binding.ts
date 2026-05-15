// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.DataBinding

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the DataBinding Class.
 *
 * Element: `w:dataBinding` */
export class DataBinding extends OpenXmlLeafElement {
  override readonly localName = "dataBinding" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** XML Namespace Prefix Mappings (w:prefixMappings) */
  prefixMappings: StringValue | undefined;

  /** XPath (w:xpath) */
  xPath: StringValue | undefined;

  /** Custom XML Data Storage ID (w:storeItemID) */
  storeItemId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:prefixMappings": this.prefixMappings = StringValue.parse(value); return;
      case "w:xpath": this.xPath = StringValue.parse(value); return;
      case "w:storeItemID": this.storeItemId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.prefixMappings !== undefined) out.push(["w:prefixMappings", this.prefixMappings.toString()]);
    if (this.xPath !== undefined) out.push(["w:xpath", this.xPath.toString()]);
    if (this.storeItemId !== undefined) out.push(["w:storeItemID", this.storeItemId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.xPath, { attribute: "w:xpath", elementClass: "DataBinding" });
    assertRequired(this.storeItemId, { attribute: "w:storeItemID", elementClass: "DataBinding" });
  }
}
