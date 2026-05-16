// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ConditionalFormatting

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Conditional Formatting.
 *
 * Element: `x:conditionalFormatting` */
export class ConditionalFormatting extends OpenXmlCompositeElement {
  override readonly localName = "conditionalFormatting" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** PivotTable Conditional Formatting (:pivot) */
  pivot: BooleanValue | undefined;

  /** Sequence of References (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":pivot": this.pivot = BooleanValue.parse(value); return;
      case ":sqref": this.sequenceOfReferences = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pivot !== undefined) out.push([":pivot", this.pivot.toString()]);
    if (this.sequenceOfReferences !== undefined) out.push([":sqref", this.sequenceOfReferences.toString()]);
    return out;
  }

}
