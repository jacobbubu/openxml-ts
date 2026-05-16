// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Undo

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Undo.
 *
 * Element: `x:undo` */
export class Undo extends OpenXmlLeafElement {
  override readonly localName = "undo" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Index (:index) */
  index: UInt32Value | undefined;

  /** Expression (:exp) */
  expression: StringValue | undefined;

  /** Reference 3D (:ref3D) */
  reference3D: BooleanValue | undefined;

  /** Array Entered (:array) */
  array: BooleanValue | undefined;

  /** Value Needed (:v) */
  val: BooleanValue | undefined;

  /** Defined Name Formula (:nf) */
  definedNameFormula: BooleanValue | undefined;

  /** Cross Sheet Move (:cs) */
  crossSheetMove: BooleanValue | undefined;

  /** Range (:dr) */
  deletedRange: StringValue | undefined;

  /** Defined Name (:dn) */
  definedName: StringValue | undefined;

  /** Cell Reference (:r) */
  cellReference: StringValue | undefined;

  /** Sheet Id (:sId) */
  sheetId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":index": this.index = UInt32Value.parse(value); return;
      case ":exp": this.expression = StringValue.parse(value); return;
      case ":ref3D": this.reference3D = BooleanValue.parse(value); return;
      case ":array": this.array = BooleanValue.parse(value); return;
      case ":v": this.val = BooleanValue.parse(value); return;
      case ":nf": this.definedNameFormula = BooleanValue.parse(value); return;
      case ":cs": this.crossSheetMove = BooleanValue.parse(value); return;
      case ":dr": this.deletedRange = StringValue.parse(value); return;
      case ":dn": this.definedName = StringValue.parse(value); return;
      case ":r": this.cellReference = StringValue.parse(value); return;
      case ":sId": this.sheetId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push([":index", this.index.toString()]);
    if (this.expression !== undefined) out.push([":exp", this.expression.toString()]);
    if (this.reference3D !== undefined) out.push([":ref3D", this.reference3D.toString()]);
    if (this.array !== undefined) out.push([":array", this.array.toString()]);
    if (this.val !== undefined) out.push([":v", this.val.toString()]);
    if (this.definedNameFormula !== undefined) out.push([":nf", this.definedNameFormula.toString()]);
    if (this.crossSheetMove !== undefined) out.push([":cs", this.crossSheetMove.toString()]);
    if (this.deletedRange !== undefined) out.push([":dr", this.deletedRange.toString()]);
    if (this.definedName !== undefined) out.push([":dn", this.definedName.toString()]);
    if (this.cellReference !== undefined) out.push([":r", this.cellReference.toString()]);
    if (this.sheetId !== undefined) out.push([":sId", this.sheetId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":index", elementClass: "Undo" });
    assertRequired(this.expression, { attribute: ":exp", elementClass: "Undo" });
    assertRequired(this.deletedRange, { attribute: ":dr", elementClass: "Undo" });
  }
}
