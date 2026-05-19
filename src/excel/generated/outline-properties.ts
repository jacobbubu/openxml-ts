// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.OutlineProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Outline Properties.
 *
 * Element: `x:outlinePr` */
export class OutlineProperties extends OpenXmlLeafElement {
  override readonly localName = "outlinePr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Apply Styles in Outline (:applyStyles) */
  applyStyles: BooleanValue | undefined;

  /** Summary Below (:summaryBelow) */
  summaryBelow: BooleanValue | undefined;

  /** Summary Right (:summaryRight) */
  summaryRight: BooleanValue | undefined;

  /** Show Outline Symbols (:showOutlineSymbols) */
  showOutlineSymbols: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "applyStyles": this.applyStyles = BooleanValue.parse(value); return;
      case "summaryBelow": this.summaryBelow = BooleanValue.parse(value); return;
      case "summaryRight": this.summaryRight = BooleanValue.parse(value); return;
      case "showOutlineSymbols": this.showOutlineSymbols = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.applyStyles !== undefined) out.push(["applyStyles", this.applyStyles.toString()]);
    if (this.summaryBelow !== undefined) out.push(["summaryBelow", this.summaryBelow.toString()]);
    if (this.summaryRight !== undefined) out.push(["summaryRight", this.summaryRight.toString()]);
    if (this.showOutlineSymbols !== undefined) out.push(["showOutlineSymbols", this.showOutlineSymbols.toString()]);
    return out;
  }

}
