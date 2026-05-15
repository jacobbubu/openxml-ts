// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ObjectEmbed

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the ObjectEmbed Class.
 *
 * Element: `w:objectEmbed` */
export class ObjectEmbed extends OpenXmlLeafElement {
  override readonly localName = "objectEmbed" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** drawAspect (w:drawAspect) */
  drawAspect: StringValue | undefined;

  /** progId (w:progId) */
  progId: StringValue | undefined;

  /** shapeId (w:shapeId) */
  shapeId: StringValue | undefined;

  /** fieldCodes (w:fieldCodes) */
  fieldCodes: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:drawAspect": this.drawAspect = StringValue.parse(value); return;
      case "w:progId": this.progId = StringValue.parse(value); return;
      case "w:shapeId": this.shapeId = StringValue.parse(value); return;
      case "w:fieldCodes": this.fieldCodes = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.drawAspect !== undefined) out.push(["w:drawAspect", this.drawAspect.toString()]);
    if (this.progId !== undefined) out.push(["w:progId", this.progId.toString()]);
    if (this.shapeId !== undefined) out.push(["w:shapeId", this.shapeId.toString()]);
    if (this.fieldCodes !== undefined) out.push(["w:fieldCodes", this.fieldCodes.toString()]);
    return out;
  }

}
