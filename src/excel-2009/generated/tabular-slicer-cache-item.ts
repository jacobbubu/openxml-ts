// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.TabularSlicerCacheItem

import {
  BooleanValue,
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the TabularSlicerCacheItem Class.
 *
 * Element: `x14:i` */
export class TabularSlicerCacheItem extends OpenXmlLeafElement {
  override readonly localName = "i" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** x (:x) */
  atom: UInt32Value | undefined;

  /** s (:s) */
  isSelected: BooleanValue | undefined;

  /** nd (:nd) */
  nonDisplay: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x": this.atom = UInt32Value.parse(value); return;
      case "s": this.isSelected = BooleanValue.parse(value); return;
      case "nd": this.nonDisplay = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.atom !== undefined) out.push(["x", this.atom.toString()]);
    if (this.isSelected !== undefined) out.push(["s", this.isSelected.toString()]);
    if (this.nonDisplay !== undefined) out.push(["nd", this.nonDisplay.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.atom, { attribute: ":x", elementClass: "TabularSlicerCacheItem" });
  }
}
