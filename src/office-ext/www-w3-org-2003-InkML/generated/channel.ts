// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Channel

import {
  DecimalValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Channel Class.
 *
 * Element: `inkml:channel` */
export class Channel extends OpenXmlCompositeElement {
  override readonly localName = "channel" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (xml:id) */
  id: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** default (:default) */
  default: StringValue | undefined;

  /** min (:min) */
  min: DecimalValue | undefined;

  /** max (:max) */
  max: DecimalValue | undefined;

  /** orientation (:orientation) */
  orientation: StringValue | undefined;

  /** respectTo (:respectTo) */
  respectTo: StringValue | undefined;

  /** units (:units) */
  units: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "default": this.default = StringValue.parse(value); return;
      case "min": this.min = DecimalValue.parse(value); return;
      case "max": this.max = DecimalValue.parse(value); return;
      case "orientation": this.orientation = StringValue.parse(value); return;
      case "respectTo": this.respectTo = StringValue.parse(value); return;
      case "units": this.units = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.default !== undefined) out.push(["default", this.default.toString()]);
    if (this.min !== undefined) out.push(["min", this.min.toString()]);
    if (this.max !== undefined) out.push(["max", this.max.toString()]);
    if (this.orientation !== undefined) out.push(["orientation", this.orientation.toString()]);
    if (this.respectTo !== undefined) out.push(["respectTo", this.respectTo.toString()]);
    if (this.units !== undefined) out.push(["units", this.units.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Channel" });
  }
}
