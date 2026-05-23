// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordml.json
// @see DocumentFormat.OpenXml.Word2012Wordml.DataBinding

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the DataBinding Class.
 *
 * Element: `w15:dataBinding` */
export class DataBinding extends OpenXmlLeafElement {
  override readonly localName = "dataBinding" as const;
  override readonly prefix = "w15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2012/wordml" as const;


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

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
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
