// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PermEnd

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the PermEnd Class.
 *
 * Element: `w:permEnd` */
export class PermEnd extends OpenXmlLeafElement {
  override readonly localName = "permEnd" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Annotation ID (w:id) */
  id: Int32Value | undefined;

  /** Annotation Displaced By Custom XML Markup (w:displacedByCustomXml) */
  displacedByCustomXml: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:id": this.id = Int32Value.parse(value); return;
      case "w:displacedByCustomXml": this.displacedByCustomXml = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    if (this.displacedByCustomXml !== undefined) out.push(["w:displacedByCustomXml", this.displacedByCustomXml.toString()]);
    return out;
  }
}
