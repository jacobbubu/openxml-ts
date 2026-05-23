// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json
// @see DocumentFormat.OpenXml.200304Emma.EndPoint

import {
  IntegerValue,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the EndPoint Class.
 *
 * Element: `emma:endpoint` */
export class EndPoint extends OpenXmlCompositeElement {
  override readonly localName = "endpoint" as const;
  override readonly prefix = "emma" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/04/emma" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** endpoint-role (emma:endpoint-role) */
  endpointRole: StringValue | undefined;

  /** endpoint-address (emma:endpoint-address) */
  endPointAddress: StringValue | undefined;

  /** message-id (emma:message-id) */
  messageId: StringValue | undefined;

  /** port-num (emma:port-num) */
  portNumber: IntegerValue | undefined;

  /** port-type (emma:port-type) */
  portType: StringValue | undefined;

  /** endpoint-pair-ref (emma:endpoint-pair-ref) */
  endpointPairRef: StringValue | undefined;

  /** service-name (emma:service-name) */
  serviceName: StringValue | undefined;

  /** media-type (emma:media-type) */
  mediaType: StringValue | undefined;

  /** medium (emma:medium) */
  medium: StringValue | undefined;

  /** mode (emma:mode) */
  mode: ListValue<StringValue> | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "emma:endpoint-role": this.endpointRole = StringValue.parse(value); return;
      case "emma:endpoint-address": this.endPointAddress = StringValue.parse(value); return;
      case "emma:message-id": this.messageId = StringValue.parse(value); return;
      case "emma:port-num": this.portNumber = IntegerValue.parse(value); return;
      case "emma:port-type": this.portType = StringValue.parse(value); return;
      case "emma:endpoint-pair-ref": this.endpointPairRef = StringValue.parse(value); return;
      case "emma:service-name": this.serviceName = StringValue.parse(value); return;
      case "emma:media-type": this.mediaType = StringValue.parse(value); return;
      case "emma:medium": this.medium = StringValue.parse(value); return;
      case "emma:mode": this.mode = ListValue.parse(value, StringValue.parse); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.endpointRole !== undefined) out.push(["emma:endpoint-role", this.endpointRole.toString()]);
    if (this.endPointAddress !== undefined) out.push(["emma:endpoint-address", this.endPointAddress.toString()]);
    if (this.messageId !== undefined) out.push(["emma:message-id", this.messageId.toString()]);
    if (this.portNumber !== undefined) out.push(["emma:port-num", this.portNumber.toString()]);
    if (this.portType !== undefined) out.push(["emma:port-type", this.portType.toString()]);
    if (this.endpointPairRef !== undefined) out.push(["emma:endpoint-pair-ref", this.endpointPairRef.toString()]);
    if (this.serviceName !== undefined) out.push(["emma:service-name", this.serviceName.toString()]);
    if (this.mediaType !== undefined) out.push(["emma:media-type", this.mediaType.toString()]);
    if (this.medium !== undefined) out.push(["emma:medium", this.medium.toString()]);
    if (this.mode !== undefined) out.push(["emma:mode", this.mode.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "EndPoint" });
  }
}
