// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Rule

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Rule.
 *
 * Element: `o:r` */
export class Rule extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Rule ID (:id) */
  id: StringValue | undefined;

  /** Rule Type (:type) */
  type: StringValue | undefined;

  /** Alignment Rule Type (:how) */
  how: StringValue | undefined;

  /** Rule Shape Reference (:idref) */
  shapeReference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "how": this.how = StringValue.parse(value); return;
      case "idref": this.shapeReference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.how !== undefined) out.push(["how", this.how.toString()]);
    if (this.shapeReference !== undefined) out.push(["idref", this.shapeReference.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Rule" });
  }
}
