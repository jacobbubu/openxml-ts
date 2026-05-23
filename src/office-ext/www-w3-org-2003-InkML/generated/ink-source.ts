// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.InkSource

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the InkSource Class.
 *
 * Element: `inkml:inkSource` */
export class InkSource extends OpenXmlCompositeElement {
  override readonly localName = "inkSource" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  /** manufacturer (:manufacturer) */
  manufacturer: StringValue | undefined;

  /** model (:model) */
  model: StringValue | undefined;

  /** serialNo (:serialNo) */
  serialNo: StringValue | undefined;

  /** specificationRef (:specificationRef) */
  specificationRef: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "manufacturer": this.manufacturer = StringValue.parse(value); return;
      case "model": this.model = StringValue.parse(value); return;
      case "serialNo": this.serialNo = StringValue.parse(value); return;
      case "specificationRef": this.specificationRef = StringValue.parse(value); return;
      case "description": this.description = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.manufacturer !== undefined) out.push(["manufacturer", this.manufacturer.toString()]);
    if (this.model !== undefined) out.push(["model", this.model.toString()]);
    if (this.serialNo !== undefined) out.push(["serialNo", this.serialNo.toString()]);
    if (this.specificationRef !== undefined) out.push(["specificationRef", this.specificationRef.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "xml:id", elementClass: "InkSource" });
  }
}
