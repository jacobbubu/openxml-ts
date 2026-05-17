// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TableCellTextStyle

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Table Cell Text Style.
 *
 * Element: `a:tcTxStyle` */
export class TableCellTextStyle extends OpenXmlCompositeElement {
  override readonly localName = "tcTxStyle" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Bold (:b) */
  bold: StringValue | undefined;

  /** Italic (:i) */
  italic: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":b": this.bold = StringValue.parse(value); return;
      case ":i": this.italic = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.bold !== undefined) out.push([":b", this.bold.toString()]);
    if (this.italic !== undefined) out.push([":i", this.italic.toString()]);
    return out;
  }

}
