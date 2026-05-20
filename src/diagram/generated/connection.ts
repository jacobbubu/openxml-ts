// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.Connection

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Connection.
 *
 * Element: `dgm:cxn` */
export class Connection extends OpenXmlCompositeElement {
  override readonly localName = "cxn" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Model Identifier (:modelId) */
  modelId: StringValue | undefined;

  /** Point Type (:type) */
  type: StringValue | undefined;

  /** Source Identifier (:srcId) */
  sourceId: StringValue | undefined;

  /** Destination Identifier (:destId) */
  destinationId: StringValue | undefined;

  /** Source Position (:srcOrd) */
  sourcePosition: UInt32Value | undefined;

  /** Destination Position (:destOrd) */
  destinationPosition: UInt32Value | undefined;

  /** Parent Transition Identifier (:parTransId) */
  parentTransitionId: StringValue | undefined;

  /** Sibling Transition Identifier (:sibTransId) */
  siblingTransitionId: StringValue | undefined;

  /** Presentation Identifier (:presId) */
  presentationId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "modelId": this.modelId = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "srcId": this.sourceId = StringValue.parse(value); return;
      case "destId": this.destinationId = StringValue.parse(value); return;
      case "srcOrd": this.sourcePosition = UInt32Value.parse(value); return;
      case "destOrd": this.destinationPosition = UInt32Value.parse(value); return;
      case "parTransId": this.parentTransitionId = StringValue.parse(value); return;
      case "sibTransId": this.siblingTransitionId = StringValue.parse(value); return;
      case "presId": this.presentationId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.modelId !== undefined) out.push(["modelId", this.modelId.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.sourceId !== undefined) out.push(["srcId", this.sourceId.toString()]);
    if (this.destinationId !== undefined) out.push(["destId", this.destinationId.toString()]);
    if (this.sourcePosition !== undefined) out.push(["srcOrd", this.sourcePosition.toString()]);
    if (this.destinationPosition !== undefined) out.push(["destOrd", this.destinationPosition.toString()]);
    if (this.parentTransitionId !== undefined) out.push(["parTransId", this.parentTransitionId.toString()]);
    if (this.siblingTransitionId !== undefined) out.push(["sibTransId", this.siblingTransitionId.toString()]);
    if (this.presentationId !== undefined) out.push(["presId", this.presentationId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.modelId, { attribute: ":modelId", elementClass: "Connection" });
    assertRequired(this.sourceId, { attribute: ":srcId", elementClass: "Connection" });
    assertRequired(this.destinationId, { attribute: ":destId", elementClass: "Connection" });
    assertRequired(this.sourcePosition, { attribute: ":srcOrd", elementClass: "Connection" });
    assertRequired(this.destinationPosition, { attribute: ":destOrd", elementClass: "Connection" });
  }
}
