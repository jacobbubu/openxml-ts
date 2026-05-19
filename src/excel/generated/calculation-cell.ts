// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CalculationCell

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Cell.
 *
 * Element: `x:c` */
export class CalculationCell extends OpenXmlLeafElement {
  override readonly localName = "c" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Cell Reference (:r) */
  cellReference: StringValue | undefined;

  /** Sheet Id (:i) */
  sheetId: Int32Value | undefined;

  /** Child Chain (:s) */
  inChildChain: BooleanValue | undefined;

  /** New Dependency Level (:l) */
  newLevel: BooleanValue | undefined;

  /** New Thread (:t) */
  newThread: BooleanValue | undefined;

  /** Array (:a) */
  array: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r": this.cellReference = StringValue.parse(value); return;
      case "i": this.sheetId = Int32Value.parse(value); return;
      case "s": this.inChildChain = BooleanValue.parse(value); return;
      case "l": this.newLevel = BooleanValue.parse(value); return;
      case "t": this.newThread = BooleanValue.parse(value); return;
      case "a": this.array = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cellReference !== undefined) out.push(["r", this.cellReference.toString()]);
    if (this.sheetId !== undefined) out.push(["i", this.sheetId.toString()]);
    if (this.inChildChain !== undefined) out.push(["s", this.inChildChain.toString()]);
    if (this.newLevel !== undefined) out.push(["l", this.newLevel.toString()]);
    if (this.newThread !== undefined) out.push(["t", this.newThread.toString()]);
    if (this.array !== undefined) out.push(["a", this.array.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cellReference, { attribute: ":r", elementClass: "CalculationCell" });
  }
}
