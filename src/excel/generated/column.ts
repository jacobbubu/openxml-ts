// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Column

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Column Width and Formatting.
 *
 * Element: `x:col` */
export class Column extends OpenXmlLeafElement {
  override readonly localName = "col" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Minimum Column (:min) */
  min: UInt32Value | undefined;

  /** Maximum Column (:max) */
  max: UInt32Value | undefined;

  /** Column Width (:width) */
  width: StringValue | undefined;

  /** Style (:style) */
  style: UInt32Value | undefined;

  /** Hidden Columns (:hidden) */
  hidden: BooleanValue | undefined;

  /** Best Fit Column Width (:bestFit) */
  bestFit: BooleanValue | undefined;

  /** Custom Width (:customWidth) */
  customWidth: BooleanValue | undefined;

  /** Show Phonetic Information (:phonetic) */
  phonetic: BooleanValue | undefined;

  /** Outline Level (:outlineLevel) */
  outlineLevel: StringValue | undefined;

  /** Collapsed (:collapsed) */
  collapsed: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":min": this.min = UInt32Value.parse(value); return;
      case ":max": this.max = UInt32Value.parse(value); return;
      case ":width": this.width = StringValue.parse(value); return;
      case ":style": this.style = UInt32Value.parse(value); return;
      case ":hidden": this.hidden = BooleanValue.parse(value); return;
      case ":bestFit": this.bestFit = BooleanValue.parse(value); return;
      case ":customWidth": this.customWidth = BooleanValue.parse(value); return;
      case ":phonetic": this.phonetic = BooleanValue.parse(value); return;
      case ":outlineLevel": this.outlineLevel = StringValue.parse(value); return;
      case ":collapsed": this.collapsed = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.min !== undefined) out.push([":min", this.min.toString()]);
    if (this.max !== undefined) out.push([":max", this.max.toString()]);
    if (this.width !== undefined) out.push([":width", this.width.toString()]);
    if (this.style !== undefined) out.push([":style", this.style.toString()]);
    if (this.hidden !== undefined) out.push([":hidden", this.hidden.toString()]);
    if (this.bestFit !== undefined) out.push([":bestFit", this.bestFit.toString()]);
    if (this.customWidth !== undefined) out.push([":customWidth", this.customWidth.toString()]);
    if (this.phonetic !== undefined) out.push([":phonetic", this.phonetic.toString()]);
    if (this.outlineLevel !== undefined) out.push([":outlineLevel", this.outlineLevel.toString()]);
    if (this.collapsed !== undefined) out.push([":collapsed", this.collapsed.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.min, { attribute: ":min", elementClass: "Column" });
    assertRequired(this.max, { attribute: ":max", elementClass: "Column" });
  }
}
