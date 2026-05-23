// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.ModifyTransformProps

import {
  BooleanValue,
  Int32Value,
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../../element/index.js";

/** Defines the ModifyTransformProps Class.
 *
 * Element: `oac:xfrm` */
export class ModifyTransformProps extends OpenXmlLeafElement {
  override readonly localName = "xfrm" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** x (:x) */
  x: Int64Value | undefined;

  /** y (:y) */
  y: Int64Value | undefined;

  /** cx (:cx) */
  cx: Int64Value | undefined;

  /** cy (:cy) */
  cy: Int64Value | undefined;

  /** rot (:rot) */
  rot: Int32Value | undefined;

  /** flipH (:flipH) */
  flipH: BooleanValue | undefined;

  /** flipV (:flipV) */
  flipV: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "ModifyTransformProps" }); return;
      case "y": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "ModifyTransformProps" }); return;
      case "cx": this.cx = Int64Value.parse(value); assertNumber(this.cx, { min: 0, max: 2147483647 }, { attribute: ":cx", elementClass: "ModifyTransformProps" }); return;
      case "cy": this.cy = Int64Value.parse(value); assertNumber(this.cy, { min: 0, max: 2147483647 }, { attribute: ":cy", elementClass: "ModifyTransformProps" }); return;
      case "rot": this.rot = Int32Value.parse(value); return;
      case "flipH": this.flipH = BooleanValue.parse(value); return;
      case "flipV": this.flipV = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.x !== undefined) out.push(["x", this.x.toString()]);
    if (this.y !== undefined) out.push(["y", this.y.toString()]);
    if (this.cx !== undefined) out.push(["cx", this.cx.toString()]);
    if (this.cy !== undefined) out.push(["cy", this.cy.toString()]);
    if (this.rot !== undefined) out.push(["rot", this.rot.toString()]);
    if (this.flipH !== undefined) out.push(["flipH", this.flipH.toString()]);
    if (this.flipV !== undefined) out.push(["flipV", this.flipV.toString()]);
    return out;
  }

}
