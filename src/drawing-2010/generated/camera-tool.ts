// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.CameraTool

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the CameraTool Class.
 *
 * Element: `a14:cameraTool` */
export class CameraTool extends OpenXmlLeafElement {
  override readonly localName = "cameraTool" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** cellRange (:cellRange) */
  cellRange: StringValue | undefined;

  /** spid (:spid) */
  shapeId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "cellRange": this.cellRange = StringValue.parse(value); return;
      case "spid": this.shapeId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cellRange !== undefined) out.push(["cellRange", this.cellRange.toString()]);
    if (this.shapeId !== undefined) out.push(["spid", this.shapeId.toString()]);
    return out;
  }

}
