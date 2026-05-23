// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.ModifyNonVisualDrawingProps

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ModifyNonVisualDrawingProps Class.
 *
 * Element: `oac:cNvPr` */
export class ModifyNonVisualDrawingProps extends OpenXmlLeafElement {
  override readonly localName = "cNvPr" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** name (:name) */
  name: StringValue | undefined;

  /** descr (:descr) */
  descr: StringValue | undefined;

  /** hidden (:hidden) */
  hidden: BooleanValue | undefined;

  /** title (:title) */
  title: StringValue | undefined;

  /** decor (:decor) */
  decor: BooleanValue | undefined;

  /** scriptLink (:scriptLink) */
  scriptLink: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "descr": this.descr = StringValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
      case "title": this.title = StringValue.parse(value); return;
      case "decor": this.decor = BooleanValue.parse(value); return;
      case "scriptLink": this.scriptLink = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.descr !== undefined) out.push(["descr", this.descr.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    if (this.decor !== undefined) out.push(["decor", this.decor.toString()]);
    if (this.scriptLink !== undefined) out.push(["scriptLink", this.scriptLink.toString()]);
    return out;
  }

}
