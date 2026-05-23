// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2020_richdatawebimage.json
// @see DocumentFormat.OpenXml.Spreadsheetml2020Richdatawebimage.AddressWebImageSupportingRichDataRelationship

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the AddressWebImageSupportingRichDataRelationship Class.
 *
 * Element: `xlrdwi:address` */
export class AddressWebImageSupportingRichDataRelationship extends OpenXmlLeafElement {
  override readonly localName = "address" as const;
  override readonly prefix = "xlrdwi" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage" as const;


  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "AddressWebImageSupportingRichDataRelationship" });
  }
}
