// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.ModifyNonVisualGraphicFrameProps

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the ModifyNonVisualGraphicFrameProps Class.
 *
 * Element: `oac:cNvGraphicFramePr` */
export class ModifyNonVisualGraphicFrameProps extends OpenXmlLeafElement {
  override readonly localName = "cNvGraphicFramePr" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** noGrp (:noGrp) */
  noGrp: BooleanValue | undefined;

  /** noDrilldown (:noDrilldown) */
  noDrilldown: BooleanValue | undefined;

  /** noSelect (:noSelect) */
  noSelect: BooleanValue | undefined;

  /** noChangeAspect (:noChangeAspect) */
  noChangeAspect: BooleanValue | undefined;

  /** noMove (:noMove) */
  noMove: BooleanValue | undefined;

  /** noResize (:noResize) */
  noResize: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "noGrp": this.noGrp = BooleanValue.parse(value); return;
      case "noDrilldown": this.noDrilldown = BooleanValue.parse(value); return;
      case "noSelect": this.noSelect = BooleanValue.parse(value); return;
      case "noChangeAspect": this.noChangeAspect = BooleanValue.parse(value); return;
      case "noMove": this.noMove = BooleanValue.parse(value); return;
      case "noResize": this.noResize = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.noGrp !== undefined) out.push(["noGrp", this.noGrp.toString()]);
    if (this.noDrilldown !== undefined) out.push(["noDrilldown", this.noDrilldown.toString()]);
    if (this.noSelect !== undefined) out.push(["noSelect", this.noSelect.toString()]);
    if (this.noChangeAspect !== undefined) out.push(["noChangeAspect", this.noChangeAspect.toString()]);
    if (this.noMove !== undefined) out.push(["noMove", this.noMove.toString()]);
    if (this.noResize !== undefined) out.push(["noResize", this.noResize.toString()]);
    return out;
  }

}
