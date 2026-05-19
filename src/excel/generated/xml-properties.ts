// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.XmlProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Column XML Properties.
 *
 * Element: `x:xmlPr` */
export class XmlProperties extends OpenXmlCompositeElement {
  override readonly localName = "xmlPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** XML Map Id (:mapId) */
  mapId: UInt32Value | undefined;

  /** XPath (:xpath) */
  xPath: StringValue | undefined;

  /** XML Data Type (:xmlDataType) */
  xmlDataType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "mapId": this.mapId = UInt32Value.parse(value); return;
      case "xpath": this.xPath = StringValue.parse(value); return;
      case "xmlDataType": this.xmlDataType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.mapId !== undefined) out.push(["mapId", this.mapId.toString()]);
    if (this.xPath !== undefined) out.push(["xpath", this.xPath.toString()]);
    if (this.xmlDataType !== undefined) out.push(["xmlDataType", this.xmlDataType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.mapId, { attribute: ":mapId", elementClass: "XmlProperties" });
    assertRequired(this.xPath, { attribute: ":xpath", elementClass: "XmlProperties" });
    assertRequired(this.xmlDataType, { attribute: ":xmlDataType", elementClass: "XmlProperties" });
  }
}
