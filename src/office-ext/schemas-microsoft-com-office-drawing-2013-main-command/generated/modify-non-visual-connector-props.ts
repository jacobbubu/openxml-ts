// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.ModifyNonVisualConnectorProps

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the ModifyNonVisualConnectorProps Class.
 *
 * Element: `oac:cNvCxnSpPr` */
export class ModifyNonVisualConnectorProps extends OpenXmlCompositeElement {
  override readonly localName = "cNvCxnSpPr" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** noGrp (:noGrp) */
  noGrp: BooleanValue | undefined;

  /** noSelect (:noSelect) */
  noSelect: BooleanValue | undefined;

  /** noRot (:noRot) */
  noRot: BooleanValue | undefined;

  /** noChangeAspect (:noChangeAspect) */
  noChangeAspect: BooleanValue | undefined;

  /** noMove (:noMove) */
  noMove: BooleanValue | undefined;

  /** noResize (:noResize) */
  noResize: BooleanValue | undefined;

  /** noEditPoints (:noEditPoints) */
  noEditPoints: BooleanValue | undefined;

  /** noAdjustHandles (:noAdjustHandles) */
  noAdjustHandles: BooleanValue | undefined;

  /** noChangeArrowheads (:noChangeArrowheads) */
  noChangeArrowheads: BooleanValue | undefined;

  /** noChangeShapeType (:noChangeShapeType) */
  noChangeShapeType: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "noGrp": this.noGrp = BooleanValue.parse(value); return;
      case "noSelect": this.noSelect = BooleanValue.parse(value); return;
      case "noRot": this.noRot = BooleanValue.parse(value); return;
      case "noChangeAspect": this.noChangeAspect = BooleanValue.parse(value); return;
      case "noMove": this.noMove = BooleanValue.parse(value); return;
      case "noResize": this.noResize = BooleanValue.parse(value); return;
      case "noEditPoints": this.noEditPoints = BooleanValue.parse(value); return;
      case "noAdjustHandles": this.noAdjustHandles = BooleanValue.parse(value); return;
      case "noChangeArrowheads": this.noChangeArrowheads = BooleanValue.parse(value); return;
      case "noChangeShapeType": this.noChangeShapeType = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.noGrp !== undefined) out.push(["noGrp", this.noGrp.toString()]);
    if (this.noSelect !== undefined) out.push(["noSelect", this.noSelect.toString()]);
    if (this.noRot !== undefined) out.push(["noRot", this.noRot.toString()]);
    if (this.noChangeAspect !== undefined) out.push(["noChangeAspect", this.noChangeAspect.toString()]);
    if (this.noMove !== undefined) out.push(["noMove", this.noMove.toString()]);
    if (this.noResize !== undefined) out.push(["noResize", this.noResize.toString()]);
    if (this.noEditPoints !== undefined) out.push(["noEditPoints", this.noEditPoints.toString()]);
    if (this.noAdjustHandles !== undefined) out.push(["noAdjustHandles", this.noAdjustHandles.toString()]);
    if (this.noChangeArrowheads !== undefined) out.push(["noChangeArrowheads", this.noChangeArrowheads.toString()]);
    if (this.noChangeShapeType !== undefined) out.push(["noChangeShapeType", this.noChangeShapeType.toString()]);
    return out;
  }

}
