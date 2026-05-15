// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.SaveThroughXslt

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Custom XSL Transform To Use When Saving As XML File.
 *
 * Element: `w:saveThroughXslt` */
export class SaveThroughXslt extends OpenXmlLeafElement {
  override readonly localName = "saveThroughXslt" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** XSL Transformation Location (r:id) */
  id: StringValue | undefined;

  /** Local Identifier for XSL Transform (w:solutionID) */
  solutionId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
      case "w:solutionID": this.solutionId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.solutionId !== undefined) out.push(["w:solutionID", this.solutionId.toString()]);
    return out;
  }
}
