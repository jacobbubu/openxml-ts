// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Path

import {
  BooleanValue,
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Shape Path.
 *
 * Element: `a:path` */
export class Path extends OpenXmlCompositeElement {
  override readonly localName = "path" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Path Width (:w) */
  width: Int64Value | undefined;

  /** Path Height (:h) */
  height: Int64Value | undefined;

  /** Path Fill (:fill) */
  fill: StringValue | undefined;

  /** Path Stroke (:stroke) */
  stroke: BooleanValue | undefined;

  /** 3D Extrusion Allowed (:extrusionOk) */
  extrusionOk: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":w": this.width = Int64Value.parse(value); assertNumber(this.width, { min: 0, max: 2147483647 }, { attribute: ":w", elementClass: "Path" }); return;
      case ":h": this.height = Int64Value.parse(value); assertNumber(this.height, { min: 0, max: 2147483647 }, { attribute: ":h", elementClass: "Path" }); return;
      case ":fill": this.fill = StringValue.parse(value); return;
      case ":stroke": this.stroke = BooleanValue.parse(value); return;
      case ":extrusionOk": this.extrusionOk = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push([":w", this.width.toString()]);
    if (this.height !== undefined) out.push([":h", this.height.toString()]);
    if (this.fill !== undefined) out.push([":fill", this.fill.toString()]);
    if (this.stroke !== undefined) out.push([":stroke", this.stroke.toString()]);
    if (this.extrusionOk !== undefined) out.push([":extrusionOk", this.extrusionOk.toString()]);
    return out;
  }

}
