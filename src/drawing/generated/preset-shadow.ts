// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.PresetShadow

import {
  Int32Value,
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Preset Shadow.
 *
 * Element: `a:prstShdw` */
export class PresetShadow extends OpenXmlCompositeElement {
  override readonly localName = "prstShdw" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Preset Shadow (:prst) */
  preset: StringValue | undefined;

  /** Distance (:dist) */
  distance: Int64Value | undefined;

  /** Direction (:dir) */
  direction: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "prst": this.preset = StringValue.parse(value); return;
      case "dist": this.distance = Int64Value.parse(value); assertNumber(this.distance, { min: 0, max: 2147483647 }, { attribute: ":dist", elementClass: "PresetShadow" }); return;
      case "dir": this.direction = Int32Value.parse(value); assertNumber(this.direction, { min: 0 }, { attribute: ":dir", elementClass: "PresetShadow" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.preset !== undefined) out.push(["prst", this.preset.toString()]);
    if (this.distance !== undefined) out.push(["dist", this.distance.toString()]);
    if (this.direction !== undefined) out.push(["dir", this.direction.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.preset, { attribute: ":prst", elementClass: "PresetShadow" });
  }
}
