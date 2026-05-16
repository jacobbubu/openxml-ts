// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Scenarios

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the Scenarios Class.
 *
 * Element: `x:scenarios` */
export class Scenarios extends OpenXmlCompositeElement {
  override readonly localName = "scenarios" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Current Scenario (:current) */
  current: UInt32Value | undefined;

  /** Last Shown Scenario (:show) */
  show: UInt32Value | undefined;

  /** Sequence of References (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":current": this.current = UInt32Value.parse(value); return;
      case ":show": this.show = UInt32Value.parse(value); return;
      case ":sqref": this.sequenceOfReferences = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.current !== undefined) out.push([":current", this.current.toString()]);
    if (this.show !== undefined) out.push([":show", this.show.toString()]);
    if (this.sequenceOfReferences !== undefined) out.push([":sqref", this.sequenceOfReferences.toString()]);
    return out;
  }

}
