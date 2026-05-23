// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Bind

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Bind Class.
 *
 * Element: `inkml:bind` */
export class Bind extends OpenXmlLeafElement {
  override readonly localName = "bind" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** source (:source) */
  source: StringValue | undefined;

  /** target (:target) */
  target: StringValue | undefined;

  /** column (:column) */
  column: StringValue | undefined;

  /** variable (:variable) */
  variable: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "source": this.source = StringValue.parse(value); return;
      case "target": this.target = StringValue.parse(value); return;
      case "column": this.column = StringValue.parse(value); return;
      case "variable": this.variable = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.source !== undefined) out.push(["source", this.source.toString()]);
    if (this.target !== undefined) out.push(["target", this.target.toString()]);
    if (this.column !== undefined) out.push(["column", this.column.toString()]);
    if (this.variable !== undefined) out.push(["variable", this.variable.toString()]);
    return out;
  }

}
