// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Shadow

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Shadow Class.
 *
 * Element: `v:shadow` */
export class Shadow extends OpenXmlLeafElement {
  override readonly localName = "shadow" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;


  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Shadow Toggle (:on) */
  on: StringValue | undefined;

  /** Shadow Type (:type) */
  type: StringValue | undefined;

  /** Shadow Transparency (:obscured) */
  obscured: StringValue | undefined;

  /** Shadow Primary Color (:color) */
  color: StringValue | undefined;

  /** Shadow Opacity (:opacity) */
  opacity: StringValue | undefined;

  /** Shadow Primary Offset (:offset) */
  offset: StringValue | undefined;

  /** Shadow Secondary Color (:color2) */
  color2: StringValue | undefined;

  /** Shadow Secondary Offset (:offset2) */
  offset2: StringValue | undefined;

  /** Shadow Origin (:origin) */
  origin: StringValue | undefined;

  /** Shadow Perspective Matrix (:matrix) */
  matrix: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "on": this.on = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "obscured": this.obscured = StringValue.parse(value); return;
      case "color": this.color = StringValue.parse(value); return;
      case "opacity": this.opacity = StringValue.parse(value); return;
      case "offset": this.offset = StringValue.parse(value); return;
      case "color2": this.color2 = StringValue.parse(value); return;
      case "offset2": this.offset2 = StringValue.parse(value); return;
      case "origin": this.origin = StringValue.parse(value); return;
      case "matrix": this.matrix = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.obscured !== undefined) out.push(["obscured", this.obscured.toString()]);
    if (this.color !== undefined) out.push(["color", this.color.toString()]);
    if (this.opacity !== undefined) out.push(["opacity", this.opacity.toString()]);
    if (this.offset !== undefined) out.push(["offset", this.offset.toString()]);
    if (this.color2 !== undefined) out.push(["color2", this.color2.toString()]);
    if (this.offset2 !== undefined) out.push(["offset2", this.offset2.toString()]);
    if (this.origin !== undefined) out.push(["origin", this.origin.toString()]);
    if (this.matrix !== undefined) out.push(["matrix", this.matrix.toString()]);
    return out;
  }

}
