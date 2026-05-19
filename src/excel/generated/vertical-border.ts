// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.VerticalBorder

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Vertical Inner Border.
 *
 * Element: `x:vertical` */
export class VerticalBorder extends OpenXmlCompositeElement {
  override readonly localName = "vertical" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Line Style (:style) */
  style: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "style": this.style = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    return out;
  }

}
