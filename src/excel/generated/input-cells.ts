// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.InputCells

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Input Cells.
 *
 * Element: `x:inputCells` */
export class InputCells extends OpenXmlLeafElement {
  override readonly localName = "inputCells" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Reference (:r) */
  cellReference: StringValue | undefined;

  /** Deleted (:deleted) */
  deleted: BooleanValue | undefined;

  /** Undone (:undone) */
  undone: BooleanValue | undefined;

  /** Value (:val) */
  val: StringValue | undefined;

  /** Number Format Id (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r": this.cellReference = StringValue.parse(value); return;
      case "deleted": this.deleted = BooleanValue.parse(value); return;
      case "undone": this.undone = BooleanValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
      case "numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cellReference !== undefined) out.push(["r", this.cellReference.toString()]);
    if (this.deleted !== undefined) out.push(["deleted", this.deleted.toString()]);
    if (this.undone !== undefined) out.push(["undone", this.undone.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.numberFormatId !== undefined) out.push(["numFmtId", this.numberFormatId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cellReference, { attribute: ":r", elementClass: "InputCells" });
    assertRequired(this.val, { attribute: ":val", elementClass: "InputCells" });
  }
}
