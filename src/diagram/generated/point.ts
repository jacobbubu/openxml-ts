// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.Point

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Point.
 *
 * Element: `dgm:pt` */
export class Point extends OpenXmlCompositeElement {
  override readonly localName = "pt" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Model Identifier (:modelId) */
  modelId: StringValue | undefined;

  /** Point Type (:type) */
  type: StringValue | undefined;

  /** Connection Identifier (:cxnId) */
  connectionId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "modelId": this.modelId = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "cxnId": this.connectionId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.modelId !== undefined) out.push(["modelId", this.modelId.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.connectionId !== undefined) out.push(["cxnId", this.connectionId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.modelId, { attribute: ":modelId", elementClass: "Point" });
  }
}
