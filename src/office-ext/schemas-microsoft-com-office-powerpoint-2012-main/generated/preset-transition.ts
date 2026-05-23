// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_main.json
// @see DocumentFormat.OpenXml.Powerpoint2012Main.PresetTransition

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the PresetTransition Class.
 *
 * Element: `p15:prstTrans` */
export class PresetTransition extends OpenXmlLeafElement {
  override readonly localName = "prstTrans" as const;
  override readonly prefix = "p15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2012/main" as const;


  /** prst (:prst) */
  preset: StringValue | undefined;

  /** invX (:invX) */
  invX: BooleanValue | undefined;

  /** invY (:invY) */
  invY: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "prst": this.preset = StringValue.parse(value); return;
      case "invX": this.invX = BooleanValue.parse(value); return;
      case "invY": this.invY = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.preset !== undefined) out.push(["prst", this.preset.toString()]);
    if (this.invX !== undefined) out.push(["invX", this.invX.toString()]);
    if (this.invY !== undefined) out.push(["invY", this.invY.toString()]);
    return out;
  }

}
