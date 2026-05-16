// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.OlapProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the OlapProperties Class.
 *
 * Element: `x:olapPr` */
export class OlapProperties extends OpenXmlLeafElement {
  override readonly localName = "olapPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Local Cube (:local) */
  local: BooleanValue | undefined;

  /** Local Cube Connection (:localConnection) */
  localConnection: StringValue | undefined;

  /** Local Refresh (:localRefresh) */
  localRefresh: BooleanValue | undefined;

  /** Send Locale to OLAP (:sendLocale) */
  sendLocale: BooleanValue | undefined;

  /** Drill Through Count (:rowDrillCount) */
  rowDrillCount: UInt32Value | undefined;

  /** OLAP Fill Formatting (:serverFill) */
  serverFill: BooleanValue | undefined;

  /** OLAP Number Format (:serverNumberFormat) */
  serverNumberFormat: BooleanValue | undefined;

  /** OLAP Server Font (:serverFont) */
  serverFont: BooleanValue | undefined;

  /** OLAP Font Formatting (:serverFontColor) */
  serverFontColor: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":local": this.local = BooleanValue.parse(value); return;
      case ":localConnection": this.localConnection = StringValue.parse(value); return;
      case ":localRefresh": this.localRefresh = BooleanValue.parse(value); return;
      case ":sendLocale": this.sendLocale = BooleanValue.parse(value); return;
      case ":rowDrillCount": this.rowDrillCount = UInt32Value.parse(value); return;
      case ":serverFill": this.serverFill = BooleanValue.parse(value); return;
      case ":serverNumberFormat": this.serverNumberFormat = BooleanValue.parse(value); return;
      case ":serverFont": this.serverFont = BooleanValue.parse(value); return;
      case ":serverFontColor": this.serverFontColor = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.local !== undefined) out.push([":local", this.local.toString()]);
    if (this.localConnection !== undefined) out.push([":localConnection", this.localConnection.toString()]);
    if (this.localRefresh !== undefined) out.push([":localRefresh", this.localRefresh.toString()]);
    if (this.sendLocale !== undefined) out.push([":sendLocale", this.sendLocale.toString()]);
    if (this.rowDrillCount !== undefined) out.push([":rowDrillCount", this.rowDrillCount.toString()]);
    if (this.serverFill !== undefined) out.push([":serverFill", this.serverFill.toString()]);
    if (this.serverNumberFormat !== undefined) out.push([":serverNumberFormat", this.serverNumberFormat.toString()]);
    if (this.serverFont !== undefined) out.push([":serverFont", this.serverFont.toString()]);
    if (this.serverFontColor !== undefined) out.push([":serverFontColor", this.serverFontColor.toString()]);
    return out;
  }

}
