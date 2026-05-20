// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.Timeline

import {
  BooleanValue,
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the Timeline Class.
 *
 * Element: `x15:timeline` */
export class Timeline extends OpenXmlCompositeElement {
  override readonly localName = "timeline" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** cache (:cache) */
  cache: StringValue | undefined;

  /** caption (:caption) */
  caption: StringValue | undefined;

  /** showHeader (:showHeader) */
  showHeader: BooleanValue | undefined;

  /** showSelectionLabel (:showSelectionLabel) */
  showSelectionLabel: BooleanValue | undefined;

  /** showTimeLevel (:showTimeLevel) */
  showTimeLevel: BooleanValue | undefined;

  /** showHorizontalScrollbar (:showHorizontalScrollbar) */
  showHorizontalScrollbar: BooleanValue | undefined;

  /** level (:level) */
  level: UInt32Value | undefined;

  /** selectionLevel (:selectionLevel) */
  selectionLevel: UInt32Value | undefined;

  /** scrollPosition (:scrollPosition) */
  scrollPosition: DateTimeValue | undefined;

  /** style (:style) */
  style: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "cache": this.cache = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
      case "showHeader": this.showHeader = BooleanValue.parse(value); return;
      case "showSelectionLabel": this.showSelectionLabel = BooleanValue.parse(value); return;
      case "showTimeLevel": this.showTimeLevel = BooleanValue.parse(value); return;
      case "showHorizontalScrollbar": this.showHorizontalScrollbar = BooleanValue.parse(value); return;
      case "level": this.level = UInt32Value.parse(value); return;
      case "selectionLevel": this.selectionLevel = UInt32Value.parse(value); return;
      case "scrollPosition": this.scrollPosition = DateTimeValue.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.cache !== undefined) out.push(["cache", this.cache.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    if (this.showHeader !== undefined) out.push(["showHeader", this.showHeader.toString()]);
    if (this.showSelectionLabel !== undefined) out.push(["showSelectionLabel", this.showSelectionLabel.toString()]);
    if (this.showTimeLevel !== undefined) out.push(["showTimeLevel", this.showTimeLevel.toString()]);
    if (this.showHorizontalScrollbar !== undefined) out.push(["showHorizontalScrollbar", this.showHorizontalScrollbar.toString()]);
    if (this.level !== undefined) out.push(["level", this.level.toString()]);
    if (this.selectionLevel !== undefined) out.push(["selectionLevel", this.selectionLevel.toString()]);
    if (this.scrollPosition !== undefined) out.push(["scrollPosition", this.scrollPosition.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Timeline" });
    assertRequired(this.cache, { attribute: ":cache", elementClass: "Timeline" });
    assertRequired(this.level, { attribute: ":level", elementClass: "Timeline" });
    assertRequired(this.selectionLevel, { attribute: ":selectionLevel", elementClass: "Timeline" });
  }
}
