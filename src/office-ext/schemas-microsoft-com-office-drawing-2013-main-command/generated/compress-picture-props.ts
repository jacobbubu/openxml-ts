// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.CompressPictureProps

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the CompressPictureProps Class.
 *
 * Element: `oac:compressPicPr` */
export class CompressPictureProps extends OpenXmlLeafElement {
  override readonly localName = "compressPicPr" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** removeCrop (:removeCrop) */
  removeCrop: BooleanValue | undefined;

  /** useLocalDpi (:useLocalDpi) */
  useLocalDpi: BooleanValue | undefined;

  /** cstate (:cstate) */
  cstate: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "removeCrop": this.removeCrop = BooleanValue.parse(value); return;
      case "useLocalDpi": this.useLocalDpi = BooleanValue.parse(value); return;
      case "cstate": this.cstate = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.removeCrop !== undefined) out.push(["removeCrop", this.removeCrop.toString()]);
    if (this.useLocalDpi !== undefined) out.push(["useLocalDpi", this.useLocalDpi.toString()]);
    if (this.cstate !== undefined) out.push(["cstate", this.cstate.toString()]);
    return out;
  }

}
