// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.EffectRefStyleMatrixReference

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the EffectRefStyleMatrixReference Class.
 *
 * Element: `oac:effectRef` */
export class EffectRefStyleMatrixReference extends OpenXmlCompositeElement {
  override readonly localName = "effectRef" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Style Matrix Index (:idx) */
  index: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idx": this.index = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":idx", elementClass: "EffectRefStyleMatrixReference" });
  }
}
