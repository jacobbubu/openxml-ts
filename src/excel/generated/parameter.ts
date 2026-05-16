// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Parameter

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Parameter Properties.
 *
 * Element: `x:parameter` */
export class Parameter extends OpenXmlLeafElement {
  override readonly localName = "parameter" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Parameter Name (:name) */
  name: StringValue | undefined;

  /** SQL Data Type (:sqlType) */
  sqlType: Int32Value | undefined;

  /** Parameter Type (:parameterType) */
  parameterType: StringValue | undefined;

  /** Refresh on Change (:refreshOnChange) */
  refreshOnChange: BooleanValue | undefined;

  /** Parameter Prompt String (:prompt) */
  prompt: StringValue | undefined;

  /** Boolean (:boolean) */
  boolean: BooleanValue | undefined;

  /** Double (:double) */
  double: StringValue | undefined;

  /** Integer (:integer) */
  integer: Int32Value | undefined;

  /** String (:string) */
  string: StringValue | undefined;

  /** Cell Reference (:cell) */
  cell: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":sqlType": this.sqlType = Int32Value.parse(value); return;
      case ":parameterType": this.parameterType = StringValue.parse(value); return;
      case ":refreshOnChange": this.refreshOnChange = BooleanValue.parse(value); return;
      case ":prompt": this.prompt = StringValue.parse(value); return;
      case ":boolean": this.boolean = BooleanValue.parse(value); return;
      case ":double": this.double = StringValue.parse(value); return;
      case ":integer": this.integer = Int32Value.parse(value); return;
      case ":string": this.string = StringValue.parse(value); return;
      case ":cell": this.cell = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.sqlType !== undefined) out.push([":sqlType", this.sqlType.toString()]);
    if (this.parameterType !== undefined) out.push([":parameterType", this.parameterType.toString()]);
    if (this.refreshOnChange !== undefined) out.push([":refreshOnChange", this.refreshOnChange.toString()]);
    if (this.prompt !== undefined) out.push([":prompt", this.prompt.toString()]);
    if (this.boolean !== undefined) out.push([":boolean", this.boolean.toString()]);
    if (this.double !== undefined) out.push([":double", this.double.toString()]);
    if (this.integer !== undefined) out.push([":integer", this.integer.toString()]);
    if (this.string !== undefined) out.push([":string", this.string.toString()]);
    if (this.cell !== undefined) out.push([":cell", this.cell.toString()]);
    return out;
  }

}
