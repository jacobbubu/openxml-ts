// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PageSetupProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Page Setup Properties.
 *
 * Element: `x:pageSetUpPr` */
export class PageSetupProperties extends OpenXmlLeafElement {
  override readonly localName = "pageSetUpPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Show Auto Page Breaks (:autoPageBreaks) */
  autoPageBreaks: BooleanValue | undefined;

  /** Fit To Page (:fitToPage) */
  fitToPage: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":autoPageBreaks": this.autoPageBreaks = BooleanValue.parse(value); return;
      case ":fitToPage": this.fitToPage = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.autoPageBreaks !== undefined) out.push([":autoPageBreaks", this.autoPageBreaks.toString()]);
    if (this.fitToPage !== undefined) out.push([":fitToPage", this.fitToPage.toString()]);
    return out;
  }

}
