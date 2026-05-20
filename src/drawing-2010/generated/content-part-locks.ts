// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ContentPartLocks

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the ContentPartLocks Class.
 *
 * Element: `a14:cpLocks` */
export class ContentPartLocks extends OpenXmlCompositeElement {
  override readonly localName = "cpLocks" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Disallow Shape Grouping (:noGrp) */
  noGrouping: BooleanValue | undefined;

  /** Disallow Shape Selection (:noSelect) */
  noSelection: BooleanValue | undefined;

  /** Disallow Shape Rotation (:noRot) */
  noRotation: BooleanValue | undefined;

  /** Disallow Aspect Ratio Change (:noChangeAspect) */
  noChangeAspect: BooleanValue | undefined;

  /** Disallow Shape Movement (:noMove) */
  noMove: BooleanValue | undefined;

  /** Disallow Shape Resize (:noResize) */
  noResize: BooleanValue | undefined;

  /** Disallow Shape Point Editing (:noEditPoints) */
  noEditPoints: BooleanValue | undefined;

  /** Disallow Showing Adjust Handles (:noAdjustHandles) */
  noAdjustHandles: BooleanValue | undefined;

  /** Disallow Arrowhead Changes (:noChangeArrowheads) */
  noChangeArrowheads: BooleanValue | undefined;

  /** Disallow Shape Type Change (:noChangeShapeType) */
  noChangeShapeType: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "noGrp": this.noGrouping = BooleanValue.parse(value); return;
      case "noSelect": this.noSelection = BooleanValue.parse(value); return;
      case "noRot": this.noRotation = BooleanValue.parse(value); return;
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

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.noGrouping !== undefined) out.push(["noGrp", this.noGrouping.toString()]);
    if (this.noSelection !== undefined) out.push(["noSelect", this.noSelection.toString()]);
    if (this.noRotation !== undefined) out.push(["noRot", this.noRotation.toString()]);
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
