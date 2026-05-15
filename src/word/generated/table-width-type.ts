// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TableWidthType

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the TableWidthType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class TableWidthType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Table Width Value (w:w) */
  width: StringValue | undefined;

  /** Table Width Type (w:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:w": this.width = StringValue.parse(value); return;
      case "w:type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w:w", this.width.toString()]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    return out;
  }

}
