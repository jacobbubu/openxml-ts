// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ObjectLink

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the ObjectLink Class.
 *
 * Element: `w:objectLink` */
export class ObjectLink extends OpenXmlLeafElement {
  override readonly localName = "objectLink" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** updateMode (w:updateMode) */
  updateMode: StringValue | undefined;

  /** lockedField (w:lockedField) */
  lockedField: BooleanValue | undefined;

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
      case "w:updateMode": this.updateMode = StringValue.parse(value); return;
      case "w:lockedField": this.lockedField = BooleanValue.parse(value); return;
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
    if (this.updateMode !== undefined) out.push(["w:updateMode", this.updateMode.toString()]);
    if (this.lockedField !== undefined) out.push(["w:lockedField", this.lockedField.toString()]);
    if (this.drawAspect !== undefined) out.push(["w:drawAspect", this.drawAspect.toString()]);
    if (this.progId !== undefined) out.push(["w:progId", this.progId.toString()]);
    if (this.shapeId !== undefined) out.push(["w:shapeId", this.shapeId.toString()]);
    if (this.fieldCodes !== undefined) out.push(["w:fieldCodes", this.fieldCodes.toString()]);
    return out;
  }
}
