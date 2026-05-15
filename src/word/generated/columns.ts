// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Columns

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Columns Class.
 *
 * Element: `w:cols` */
export class Columns extends OpenXmlCompositeElement {
  override readonly localName = "cols" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Equal Column Widths (w:equalWidth) */
  equalWidth: BooleanValue | undefined;

  /** Spacing Between Equal Width Columns (w:space) */
  space: StringValue | undefined;

  /** Number of Equal Width Columns (w:num) */
  columnCount: StringValue | undefined;

  /** Draw Line Between Columns (w:sep) */
  separator: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:equalWidth": this.equalWidth = BooleanValue.parse(value); return;
      case "w:space": this.space = StringValue.parse(value); return;
      case "w:num": this.columnCount = StringValue.parse(value); return;
      case "w:sep": this.separator = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.equalWidth !== undefined) out.push(["w:equalWidth", this.equalWidth.toString()]);
    if (this.space !== undefined) out.push(["w:space", this.space.toString()]);
    if (this.columnCount !== undefined) out.push(["w:num", this.columnCount.toString()]);
    if (this.separator !== undefined) out.push(["w:sep", this.separator.toString()]);
    return out;
  }

}
