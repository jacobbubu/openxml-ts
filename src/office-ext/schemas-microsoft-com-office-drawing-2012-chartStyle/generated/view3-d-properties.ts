// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.View3DProperties

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the View3DProperties Class.
 *
 * Element: `cs:view3D` */
export class View3DProperties extends OpenXmlLeafElement {
  override readonly localName = "view3D" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** rotX (:rotX) */
  rotX: StringValue | undefined;

  /** rotY (:rotY) */
  rotY: StringValue | undefined;

  /** rAngAx (:rAngAx) */
  rightAngleAxes: StringValue | undefined;

  /** perspective (:perspective) */
  perspective: StringValue | undefined;

  /** heightPercent (:heightPercent) */
  heightPercent: StringValue | undefined;

  /** depthPercent (:depthPercent) */
  depthPercent: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rotX": this.rotX = StringValue.parse(value); return;
      case "rotY": this.rotY = StringValue.parse(value); return;
      case "rAngAx": this.rightAngleAxes = StringValue.parse(value); return;
      case "perspective": this.perspective = StringValue.parse(value); return;
      case "heightPercent": this.heightPercent = StringValue.parse(value); return;
      case "depthPercent": this.depthPercent = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rotX !== undefined) out.push(["rotX", this.rotX.toString()]);
    if (this.rotY !== undefined) out.push(["rotY", this.rotY.toString()]);
    if (this.rightAngleAxes !== undefined) out.push(["rAngAx", this.rightAngleAxes.toString()]);
    if (this.perspective !== undefined) out.push(["perspective", this.perspective.toString()]);
    if (this.heightPercent !== undefined) out.push(["heightPercent", this.heightPercent.toString()]);
    if (this.depthPercent !== undefined) out.push(["depthPercent", this.depthPercent.toString()]);
    return out;
  }

}
