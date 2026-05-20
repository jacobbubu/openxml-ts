// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.LightRig

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the LightRig Class.
 *
 * Element: `w14:lightRig` */
export class LightRig extends OpenXmlCompositeElement {
  override readonly localName = "lightRig" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** rig (w14:rig) */
  lightRigType: StringValue | undefined;

  /** dir (w14:dir) */
  lightDirectionType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:rig": this.lightRigType = StringValue.parse(value); return;
      case "w14:dir": this.lightDirectionType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lightRigType !== undefined) out.push(["w14:rig", this.lightRigType.toString()]);
    if (this.lightDirectionType !== undefined) out.push(["w14:dir", this.lightDirectionType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.lightRigType, { attribute: "w14:rig", elementClass: "LightRig" });
    assertRequired(this.lightDirectionType, { attribute: "w14:dir", elementClass: "LightRig" });
  }
}
