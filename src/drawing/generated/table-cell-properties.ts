// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TableCellProperties

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Table Cell Properties.
 *
 * Element: `a:tcPr` */
export class TableCellProperties extends OpenXmlCompositeElement {
  override readonly localName = "tcPr" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Left Margin (:marL) */
  leftMargin: Int32Value | undefined;

  /** Right Margin (:marR) */
  rightMargin: Int32Value | undefined;

  /** Top Margin (:marT) */
  topMargin: Int32Value | undefined;

  /** Bottom Margin (:marB) */
  bottomMargin: Int32Value | undefined;

  /** Text Direction (:vert) */
  vertical: StringValue | undefined;

  /** Anchor (:anchor) */
  anchor: StringValue | undefined;

  /** Anchor Center (:anchorCtr) */
  anchorCenter: BooleanValue | undefined;

  /** Horizontal Overflow (:horzOverflow) */
  horizontalOverflow: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":marL": this.leftMargin = Int32Value.parse(value); return;
      case ":marR": this.rightMargin = Int32Value.parse(value); return;
      case ":marT": this.topMargin = Int32Value.parse(value); return;
      case ":marB": this.bottomMargin = Int32Value.parse(value); return;
      case ":vert": this.vertical = StringValue.parse(value); return;
      case ":anchor": this.anchor = StringValue.parse(value); return;
      case ":anchorCtr": this.anchorCenter = BooleanValue.parse(value); return;
      case ":horzOverflow": this.horizontalOverflow = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.leftMargin !== undefined) out.push([":marL", this.leftMargin.toString()]);
    if (this.rightMargin !== undefined) out.push([":marR", this.rightMargin.toString()]);
    if (this.topMargin !== undefined) out.push([":marT", this.topMargin.toString()]);
    if (this.bottomMargin !== undefined) out.push([":marB", this.bottomMargin.toString()]);
    if (this.vertical !== undefined) out.push([":vert", this.vertical.toString()]);
    if (this.anchor !== undefined) out.push([":anchor", this.anchor.toString()]);
    if (this.anchorCenter !== undefined) out.push([":anchorCtr", this.anchorCenter.toString()]);
    if (this.horizontalOverflow !== undefined) out.push([":horzOverflow", this.horizontalOverflow.toString()]);
    return out;
  }

}
