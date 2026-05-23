// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_featurepropertybag.json
// @see DocumentFormat.OpenXml.Spreadsheetml2022Featurepropertybag.FeaturePropertyBag

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the FeaturePropertyBag Class.
 *
 * Element: `xfpb:bag` */
export class FeaturePropertyBag extends OpenXmlCompositeElement {
  override readonly localName = "bag" as const;
  override readonly prefix = "xfpb" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** type (:type) */
  type: StringValue | undefined;

  /** extRef (:extRef) */
  extRef: StringValue | undefined;

  /** bagExtId (:bagExtId) */
  bagExtId: UInt32Value | undefined;

  /** att (:att) */
  att: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "extRef": this.extRef = StringValue.parse(value); return;
      case "bagExtId": this.bagExtId = UInt32Value.parse(value); return;
      case "att": this.att = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.extRef !== undefined) out.push(["extRef", this.extRef.toString()]);
    if (this.bagExtId !== undefined) out.push(["bagExtId", this.bagExtId.toString()]);
    if (this.att !== undefined) out.push(["att", this.att.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "FeaturePropertyBag" });
  }
}
