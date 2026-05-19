// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ErrorItem

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Error Value.
 *
 * Element: `x:e` */
export class ErrorItem extends OpenXmlCompositeElement {
  override readonly localName = "e" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Value (:v) */
  val: StringValue | undefined;

  /** Unused Item (:u) */
  unused: BooleanValue | undefined;

  /** Calculated Item (:f) */
  calculated: BooleanValue | undefined;

  /** Item Caption (:c) */
  caption: StringValue | undefined;

  /** Member Property Count (:cp) */
  propertyCount: UInt32Value | undefined;

  /** Format Index (:in) */
  formatIndex: UInt32Value | undefined;

  /** background Color (:bc) */
  backgroundColor: HexBinaryValue | undefined;

  /** Foreground Color (:fc) */
  foregroundColor: HexBinaryValue | undefined;

  /** Italic (:i) */
  italic: BooleanValue | undefined;

  /** Underline (:un) */
  underline: BooleanValue | undefined;

  /** Strikethrough (:st) */
  strikethrough: BooleanValue | undefined;

  /** Bold (:b) */
  bold: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v": this.val = StringValue.parse(value); return;
      case "u": this.unused = BooleanValue.parse(value); return;
      case "f": this.calculated = BooleanValue.parse(value); return;
      case "c": this.caption = StringValue.parse(value); return;
      case "cp": this.propertyCount = UInt32Value.parse(value); return;
      case "in": this.formatIndex = UInt32Value.parse(value); return;
      case "bc": this.backgroundColor = HexBinaryValue.parse(value); return;
      case "fc": this.foregroundColor = HexBinaryValue.parse(value); return;
      case "i": this.italic = BooleanValue.parse(value); return;
      case "un": this.underline = BooleanValue.parse(value); return;
      case "st": this.strikethrough = BooleanValue.parse(value); return;
      case "b": this.bold = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["v", this.val.toString()]);
    if (this.unused !== undefined) out.push(["u", this.unused.toString()]);
    if (this.calculated !== undefined) out.push(["f", this.calculated.toString()]);
    if (this.caption !== undefined) out.push(["c", this.caption.toString()]);
    if (this.propertyCount !== undefined) out.push(["cp", this.propertyCount.toString()]);
    if (this.formatIndex !== undefined) out.push(["in", this.formatIndex.toString()]);
    if (this.backgroundColor !== undefined) out.push(["bc", this.backgroundColor.toString()]);
    if (this.foregroundColor !== undefined) out.push(["fc", this.foregroundColor.toString()]);
    if (this.italic !== undefined) out.push(["i", this.italic.toString()]);
    if (this.underline !== undefined) out.push(["un", this.underline.toString()]);
    if (this.strikethrough !== undefined) out.push(["st", this.strikethrough.toString()]);
    if (this.bold !== undefined) out.push(["b", this.bold.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":v", elementClass: "ErrorItem" });
  }
}
