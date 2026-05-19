// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TableCell

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Table Cell.
 *
 * Element: `a:tc` */
export class TableCell extends OpenXmlCompositeElement {
  override readonly localName = "tc" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Row Span (:rowSpan) */
  rowSpan: Int32Value | undefined;

  /** Grid Span (:gridSpan) */
  gridSpan: Int32Value | undefined;

  /** Horizontal Merge (:hMerge) */
  horizontalMerge: BooleanValue | undefined;

  /** Vertical Merge (:vMerge) */
  verticalMerge: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rowSpan": this.rowSpan = Int32Value.parse(value); return;
      case "gridSpan": this.gridSpan = Int32Value.parse(value); return;
      case "hMerge": this.horizontalMerge = BooleanValue.parse(value); return;
      case "vMerge": this.verticalMerge = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rowSpan !== undefined) out.push(["rowSpan", this.rowSpan.toString()]);
    if (this.gridSpan !== undefined) out.push(["gridSpan", this.gridSpan.toString()]);
    if (this.horizontalMerge !== undefined) out.push(["hMerge", this.horizontalMerge.toString()]);
    if (this.verticalMerge !== undefined) out.push(["vMerge", this.verticalMerge.toString()]);
    return out;
  }

}
