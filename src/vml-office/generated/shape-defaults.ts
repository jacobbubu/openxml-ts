// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.ShapeDefaults

import {
  IntegerValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  TrueFalseValue,
} from "../../element/index.js";

/** New Shape Defaults.
 *
 * Element: `o:shapedefaults` */
export class ShapeDefaults extends OpenXmlCompositeElement {
  override readonly localName = "shapedefaults" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Shape ID Optional Storage (:spidmax) */
  maxShapeId: IntegerValue | undefined;

  /** style (:style) */
  style: StringValue | undefined;

  /** Shape Fill Toggle (:fill) */
  beFilled: TrueFalseValue | undefined;

  /** Default Fill Color (:fillcolor) */
  fillColor: StringValue | undefined;

  /** Shape Stroke Toggle (:stroke) */
  isStroke: TrueFalseValue | undefined;

  /** Shape Stroke Color (:strokecolor) */
  strokeColor: StringValue | undefined;

  /** Allow in Table Cell (o:allowincell) */
  allowInCell: TrueFalseValue | undefined;

  /** allowoverlap (o:allowoverlap) */
  allowOverlap: TrueFalseValue | undefined;

  /** insetmode (o:insetmode) */
  insetMode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "spidmax": this.maxShapeId = IntegerValue.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
      case "fill": this.beFilled = TrueFalseValue.parse(value); return;
      case "fillcolor": this.fillColor = StringValue.parse(value); return;
      case "stroke": this.isStroke = TrueFalseValue.parse(value); return;
      case "strokecolor": this.strokeColor = StringValue.parse(value); return;
      case "o:allowincell": this.allowInCell = TrueFalseValue.parse(value); return;
      case "o:allowoverlap": this.allowOverlap = TrueFalseValue.parse(value); return;
      case "o:insetmode": this.insetMode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.maxShapeId !== undefined) out.push(["spidmax", this.maxShapeId.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.beFilled !== undefined) out.push(["fill", this.beFilled.toString()]);
    if (this.fillColor !== undefined) out.push(["fillcolor", this.fillColor.toString()]);
    if (this.isStroke !== undefined) out.push(["stroke", this.isStroke.toString()]);
    if (this.strokeColor !== undefined) out.push(["strokecolor", this.strokeColor.toString()]);
    if (this.allowInCell !== undefined) out.push(["o:allowincell", this.allowInCell.toString()]);
    if (this.allowOverlap !== undefined) out.push(["o:allowoverlap", this.allowOverlap.toString()]);
    if (this.insetMode !== undefined) out.push(["o:insetmode", this.insetMode.toString()]);
    return out;
  }

}
