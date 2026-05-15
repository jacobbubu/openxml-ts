// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Control

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Control Class.
 *
 * Element: `w:control` */
export class Control extends OpenXmlLeafElement {
  override readonly localName = "control" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Unique Name for Embedded Control (w:name) */
  name: StringValue | undefined;

  /** Associated VML Data Reference (w:shapeid) */
  shapeId: StringValue | undefined;

  /** Embedded Control Properties Relationship Reference (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:name": this.name = StringValue.parse(value); return;
      case "w:shapeid": this.shapeId = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.shapeId !== undefined) out.push(["w:shapeid", this.shapeId.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }
}
