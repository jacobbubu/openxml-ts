// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DdeLink

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** DDE Connection.
 *
 * Element: `x:ddeLink` */
export class DdeLink extends OpenXmlCompositeElement {
  override readonly localName = "ddeLink" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Service name (:ddeService) */
  ddeService: StringValue | undefined;

  /** Topic for DDE server (:ddeTopic) */
  ddeTopic: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ddeService": this.ddeService = StringValue.parse(value); return;
      case "ddeTopic": this.ddeTopic = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.ddeService !== undefined) out.push(["ddeService", this.ddeService.toString()]);
    if (this.ddeTopic !== undefined) out.push(["ddeTopic", this.ddeTopic.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.ddeService, { attribute: ":ddeService", elementClass: "DdeLink" });
    assertRequired(this.ddeTopic, { attribute: ":ddeTopic", elementClass: "DdeLink" });
  }
}
