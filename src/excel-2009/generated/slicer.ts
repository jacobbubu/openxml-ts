// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.Slicer

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the Slicer Class.
 *
 * Element: `x14:slicer` */
export class Slicer extends OpenXmlCompositeElement {
  override readonly localName = "slicer" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** cache (:cache) */
  cache: StringValue | undefined;

  /** caption (:caption) */
  caption: StringValue | undefined;

  /** startItem (:startItem) */
  startItem: UInt32Value | undefined;

  /** columnCount (:columnCount) */
  columnCount: UInt32Value | undefined;

  /** showCaption (:showCaption) */
  showCaption: BooleanValue | undefined;

  /** level (:level) */
  level: UInt32Value | undefined;

  /** style (:style) */
  style: StringValue | undefined;

  /** lockedPosition (:lockedPosition) */
  lockedPosition: BooleanValue | undefined;

  /** rowHeight (:rowHeight) */
  rowHeight: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "cache": this.cache = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
      case "startItem": this.startItem = UInt32Value.parse(value); return;
      case "columnCount": this.columnCount = UInt32Value.parse(value); return;
      case "showCaption": this.showCaption = BooleanValue.parse(value); return;
      case "level": this.level = UInt32Value.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
      case "lockedPosition": this.lockedPosition = BooleanValue.parse(value); return;
      case "rowHeight": this.rowHeight = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.cache !== undefined) out.push(["cache", this.cache.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    if (this.startItem !== undefined) out.push(["startItem", this.startItem.toString()]);
    if (this.columnCount !== undefined) out.push(["columnCount", this.columnCount.toString()]);
    if (this.showCaption !== undefined) out.push(["showCaption", this.showCaption.toString()]);
    if (this.level !== undefined) out.push(["level", this.level.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.lockedPosition !== undefined) out.push(["lockedPosition", this.lockedPosition.toString()]);
    if (this.rowHeight !== undefined) out.push(["rowHeight", this.rowHeight.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Slicer" });
    assertRequired(this.cache, { attribute: ":cache", elementClass: "Slicer" });
    assertRequired(this.rowHeight, { attribute: ":rowHeight", elementClass: "Slicer" });
  }
}
