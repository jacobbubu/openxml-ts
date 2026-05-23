// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_03_main.json
// @see DocumentFormat.OpenXml.202203Main.Reaction

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Reaction Class.
 *
 * Element: `p223:rxn` */
export class Reaction extends OpenXmlCompositeElement {
  override readonly localName = "rxn" as const;
  override readonly prefix = "p223" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2022/03/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** type (:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "Reaction" });
  }
}
