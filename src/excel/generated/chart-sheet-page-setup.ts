// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ChartSheetPageSetup

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Chart Sheet Page Setup.
 *
 * Element: `x:pageSetup` */
export class ChartSheetPageSetup extends OpenXmlLeafElement {
  override readonly localName = "pageSetup" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Paper Size (:paperSize) */
  paperSize: UInt32Value | undefined;

  /** First Page Number (:firstPageNumber) */
  firstPageNumber: UInt32Value | undefined;

  /** Orientation (:orientation) */
  orientation: StringValue | undefined;

  /** Use Printer Defaults (:usePrinterDefaults) */
  usePrinterDefaults: BooleanValue | undefined;

  /** Black And White (:blackAndWhite) */
  blackAndWhite: BooleanValue | undefined;

  /** Draft (:draft) */
  draft: BooleanValue | undefined;

  /** Use First Page Number (:useFirstPageNumber) */
  useFirstPageNumber: BooleanValue | undefined;

  /** Horizontal DPI (:horizontalDpi) */
  horizontalDpi: UInt32Value | undefined;

  /** Vertical DPI (:verticalDpi) */
  verticalDpi: UInt32Value | undefined;

  /** Number Of Copies (:copies) */
  copies: UInt32Value | undefined;

  /** Id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "paperSize": this.paperSize = UInt32Value.parse(value); return;
      case "firstPageNumber": this.firstPageNumber = UInt32Value.parse(value); return;
      case "orientation": this.orientation = StringValue.parse(value); return;
      case "usePrinterDefaults": this.usePrinterDefaults = BooleanValue.parse(value); return;
      case "blackAndWhite": this.blackAndWhite = BooleanValue.parse(value); return;
      case "draft": this.draft = BooleanValue.parse(value); return;
      case "useFirstPageNumber": this.useFirstPageNumber = BooleanValue.parse(value); return;
      case "horizontalDpi": this.horizontalDpi = UInt32Value.parse(value); return;
      case "verticalDpi": this.verticalDpi = UInt32Value.parse(value); return;
      case "copies": this.copies = UInt32Value.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.paperSize !== undefined) out.push(["paperSize", this.paperSize.toString()]);
    if (this.firstPageNumber !== undefined) out.push(["firstPageNumber", this.firstPageNumber.toString()]);
    if (this.orientation !== undefined) out.push(["orientation", this.orientation.toString()]);
    if (this.usePrinterDefaults !== undefined) out.push(["usePrinterDefaults", this.usePrinterDefaults.toString()]);
    if (this.blackAndWhite !== undefined) out.push(["blackAndWhite", this.blackAndWhite.toString()]);
    if (this.draft !== undefined) out.push(["draft", this.draft.toString()]);
    if (this.useFirstPageNumber !== undefined) out.push(["useFirstPageNumber", this.useFirstPageNumber.toString()]);
    if (this.horizontalDpi !== undefined) out.push(["horizontalDpi", this.horizontalDpi.toString()]);
    if (this.verticalDpi !== undefined) out.push(["verticalDpi", this.verticalDpi.toString()]);
    if (this.copies !== undefined) out.push(["copies", this.copies.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

}
