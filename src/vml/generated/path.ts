// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Path

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Path Class.
 *
 * Element: `v:path` */
export class Path extends OpenXmlLeafElement {
  override readonly localName = "path" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;


  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Path Definition (:v) */
  value: StringValue | undefined;

  /** Limo Stretch Point (:limo) */
  limo: StringValue | undefined;

  /** Text Box Bounding Box (:textboxrect) */
  textboxRectangle: StringValue | undefined;

  /** Shape Fill Toggle (:fillok) */
  allowFill: StringValue | undefined;

  /** Stroke Toggle (:strokeok) */
  allowStroke: StringValue | undefined;

  /** Shadow Toggle (:shadowok) */
  allowShading: StringValue | undefined;

  /** Arrowhead Display Toggle (:arrowok) */
  showArrowhead: StringValue | undefined;

  /** Gradient Shape Toggle (:gradientshapeok) */
  allowGradientShape: StringValue | undefined;

  /** Text Path Toggle (:textpathok) */
  allowTextPath: StringValue | undefined;

  /** Inset Stroke From Path Flag (:insetpenok) */
  allowInsetPen: StringValue | undefined;

  /** Connection Point Type (o:connecttype) */
  connectionPointType: StringValue | undefined;

  /** Connection Points (o:connectlocs) */
  connectionPoints: StringValue | undefined;

  /** Connection Point Connect Angles (o:connectangles) */
  connectAngles: StringValue | undefined;

  /** Extrusion Toggle (o:extrusionok) */
  allowExtrusion: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "v": this.value = StringValue.parse(value); return;
      case "limo": this.limo = StringValue.parse(value); return;
      case "textboxrect": this.textboxRectangle = StringValue.parse(value); return;
      case "fillok": this.allowFill = StringValue.parse(value); return;
      case "strokeok": this.allowStroke = StringValue.parse(value); return;
      case "shadowok": this.allowShading = StringValue.parse(value); return;
      case "arrowok": this.showArrowhead = StringValue.parse(value); return;
      case "gradientshapeok": this.allowGradientShape = StringValue.parse(value); return;
      case "textpathok": this.allowTextPath = StringValue.parse(value); return;
      case "insetpenok": this.allowInsetPen = StringValue.parse(value); return;
      case "o:connecttype": this.connectionPointType = StringValue.parse(value); return;
      case "o:connectlocs": this.connectionPoints = StringValue.parse(value); return;
      case "o:connectangles": this.connectAngles = StringValue.parse(value); return;
      case "o:extrusionok": this.allowExtrusion = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.value !== undefined) out.push(["v", this.value.toString()]);
    if (this.limo !== undefined) out.push(["limo", this.limo.toString()]);
    if (this.textboxRectangle !== undefined) out.push(["textboxrect", this.textboxRectangle.toString()]);
    if (this.allowFill !== undefined) out.push(["fillok", this.allowFill.toString()]);
    if (this.allowStroke !== undefined) out.push(["strokeok", this.allowStroke.toString()]);
    if (this.allowShading !== undefined) out.push(["shadowok", this.allowShading.toString()]);
    if (this.showArrowhead !== undefined) out.push(["arrowok", this.showArrowhead.toString()]);
    if (this.allowGradientShape !== undefined) out.push(["gradientshapeok", this.allowGradientShape.toString()]);
    if (this.allowTextPath !== undefined) out.push(["textpathok", this.allowTextPath.toString()]);
    if (this.allowInsetPen !== undefined) out.push(["insetpenok", this.allowInsetPen.toString()]);
    if (this.connectionPointType !== undefined) out.push(["o:connecttype", this.connectionPointType.toString()]);
    if (this.connectionPoints !== undefined) out.push(["o:connectlocs", this.connectionPoints.toString()]);
    if (this.connectAngles !== undefined) out.push(["o:connectangles", this.connectAngles.toString()]);
    if (this.allowExtrusion !== undefined) out.push(["o:extrusionok", this.allowExtrusion.toString()]);
    return out;
  }

}
