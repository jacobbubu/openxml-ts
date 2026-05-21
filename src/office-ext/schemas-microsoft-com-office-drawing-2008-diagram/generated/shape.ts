// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2008_diagram.json
// @see DocumentFormat.OpenXml.Drawing2008Diagram.Shape

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Shape Class.
 *
 * Element: `dsp:sp` */
export class Shape extends OpenXmlCompositeElement {
  override readonly localName = "sp" as const;
  override readonly prefix = "dsp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2008/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** modelId (:modelId) */
  modelId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "modelId": this.modelId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.modelId !== undefined) out.push(["modelId", this.modelId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.modelId, { attribute: ":modelId", elementClass: "Shape" });
  }
}
