// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TableFormulaType

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the TableFormulaType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class TableFormulaType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Array (:array) */
  array: BooleanValue | undefined;

  /** space (xml:space) */
  space: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "array": this.array = BooleanValue.parse(value); return;
      case "xml:space": this.space = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.array !== undefined) out.push(["array", this.array.toString()]);
    if (this.space !== undefined) out.push(["xml:space", this.space.toString()]);
    return out;
  }

}
