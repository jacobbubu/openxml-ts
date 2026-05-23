// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2006_main.json
// @see DocumentFormat.OpenXml.Excel2006Main.SortMapItemType

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the SortMapItemType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class SortMapItemType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** New Value (:newVal) */
  newVal: UInt32Value | undefined;

  /** Old Value (:oldVal) */
  oldVal: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "newVal": this.newVal = UInt32Value.parse(value); return;
      case "oldVal": this.oldVal = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.newVal !== undefined) out.push(["newVal", this.newVal.toString()]);
    if (this.oldVal !== undefined) out.push(["oldVal", this.oldVal.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.newVal, { attribute: ":newVal", elementClass: "SortMapItemType" });
    assertRequired(this.oldVal, { attribute: ":oldVal", elementClass: "SortMapItemType" });
  }
}
