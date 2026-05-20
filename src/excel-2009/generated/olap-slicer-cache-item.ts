// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.OlapSlicerCacheItem

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the OlapSlicerCacheItem Class.
 *
 * Element: `x14:i` */
export class OlapSlicerCacheItem extends OpenXmlCompositeElement {
  override readonly localName = "i" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** n (:n) */
  name: StringValue | undefined;

  /** c (:c) */
  displayName: StringValue | undefined;

  /** nd (:nd) */
  nonDisplay: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.name = StringValue.parse(value); return;
      case "c": this.displayName = StringValue.parse(value); return;
      case "nd": this.nonDisplay = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["n", this.name.toString()]);
    if (this.displayName !== undefined) out.push(["c", this.displayName.toString()]);
    if (this.nonDisplay !== undefined) out.push(["nd", this.nonDisplay.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":n", elementClass: "OlapSlicerCacheItem" });
  }
}
