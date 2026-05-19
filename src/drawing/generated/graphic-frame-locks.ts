// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.GraphicFrameLocks

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Graphic Frame Locks.
 *
 * Element: `a:graphicFrameLocks` */
export class GraphicFrameLocks extends OpenXmlCompositeElement {
  override readonly localName = "graphicFrameLocks" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Disallow Shape Grouping (:noGrp) */
  noGrouping: BooleanValue | undefined;

  /** Disallow Selection of Child Shapes (:noDrilldown) */
  noDrilldown: BooleanValue | undefined;

  /** Disallow Shape Selection (:noSelect) */
  noSelection: BooleanValue | undefined;

  /** Disallow Aspect Ratio Change (:noChangeAspect) */
  noChangeAspect: BooleanValue | undefined;

  /** Disallow Shape Movement (:noMove) */
  noMove: BooleanValue | undefined;

  /** Disallow Shape Resize (:noResize) */
  noResize: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "noGrp": this.noGrouping = BooleanValue.parse(value); return;
      case "noDrilldown": this.noDrilldown = BooleanValue.parse(value); return;
      case "noSelect": this.noSelection = BooleanValue.parse(value); return;
      case "noChangeAspect": this.noChangeAspect = BooleanValue.parse(value); return;
      case "noMove": this.noMove = BooleanValue.parse(value); return;
      case "noResize": this.noResize = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.noGrouping !== undefined) out.push(["noGrp", this.noGrouping.toString()]);
    if (this.noDrilldown !== undefined) out.push(["noDrilldown", this.noDrilldown.toString()]);
    if (this.noSelection !== undefined) out.push(["noSelect", this.noSelection.toString()]);
    if (this.noChangeAspect !== undefined) out.push(["noChangeAspect", this.noChangeAspect.toString()]);
    if (this.noMove !== undefined) out.push(["noMove", this.noMove.toString()]);
    if (this.noResize !== undefined) out.push(["noResize", this.noResize.toString()]);
    return out;
  }

}
