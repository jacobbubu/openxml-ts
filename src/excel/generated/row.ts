// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Row

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Row.
 *
 * Element: `x:row` */
export class Row extends OpenXmlCompositeElement {
  override readonly localName = "row" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Row Index (:r) */
  rowIndex: UInt32Value | undefined;

  /** Spans (:spans) */
  spans: StringValue | undefined;

  /** Style Index (:s) */
  styleIndex: UInt32Value | undefined;

  /** Custom Format (:customFormat) */
  customFormat: BooleanValue | undefined;

  /** Row Height (:ht) */
  height: StringValue | undefined;

  /** Hidden (:hidden) */
  hidden: BooleanValue | undefined;

  /** Custom Height (:customHeight) */
  customHeight: BooleanValue | undefined;

  /** Outline Level (:outlineLevel) */
  outlineLevel: StringValue | undefined;

  /** Collapsed (:collapsed) */
  collapsed: BooleanValue | undefined;

  /** Thick Top Border (:thickTop) */
  thickTop: BooleanValue | undefined;

  /** Thick Bottom (:thickBot) */
  thickBot: BooleanValue | undefined;

  /** Show Phonetic (:ph) */
  showPhonetic: BooleanValue | undefined;

  /** dyDescent (x14ac:dyDescent) */
  dyDescent: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":r": this.rowIndex = UInt32Value.parse(value); return;
      case ":spans": this.spans = StringValue.parse(value); return;
      case ":s": this.styleIndex = UInt32Value.parse(value); return;
      case ":customFormat": this.customFormat = BooleanValue.parse(value); return;
      case ":ht": this.height = StringValue.parse(value); return;
      case ":hidden": this.hidden = BooleanValue.parse(value); return;
      case ":customHeight": this.customHeight = BooleanValue.parse(value); return;
      case ":outlineLevel": this.outlineLevel = StringValue.parse(value); return;
      case ":collapsed": this.collapsed = BooleanValue.parse(value); return;
      case ":thickTop": this.thickTop = BooleanValue.parse(value); return;
      case ":thickBot": this.thickBot = BooleanValue.parse(value); return;
      case ":ph": this.showPhonetic = BooleanValue.parse(value); return;
      case "x14ac:dyDescent": this.dyDescent = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rowIndex !== undefined) out.push([":r", this.rowIndex.toString()]);
    if (this.spans !== undefined) out.push([":spans", this.spans.toString()]);
    if (this.styleIndex !== undefined) out.push([":s", this.styleIndex.toString()]);
    if (this.customFormat !== undefined) out.push([":customFormat", this.customFormat.toString()]);
    if (this.height !== undefined) out.push([":ht", this.height.toString()]);
    if (this.hidden !== undefined) out.push([":hidden", this.hidden.toString()]);
    if (this.customHeight !== undefined) out.push([":customHeight", this.customHeight.toString()]);
    if (this.outlineLevel !== undefined) out.push([":outlineLevel", this.outlineLevel.toString()]);
    if (this.collapsed !== undefined) out.push([":collapsed", this.collapsed.toString()]);
    if (this.thickTop !== undefined) out.push([":thickTop", this.thickTop.toString()]);
    if (this.thickBot !== undefined) out.push([":thickBot", this.thickBot.toString()]);
    if (this.showPhonetic !== undefined) out.push([":ph", this.showPhonetic.toString()]);
    if (this.dyDescent !== undefined) out.push(["x14ac:dyDescent", this.dyDescent.toString()]);
    return out;
  }

}
