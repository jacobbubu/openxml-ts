// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.AllocatedCommand

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the AllocatedCommand Class.
 *
 * Element: `wne:acd` */
export class AllocatedCommand extends OpenXmlLeafElement {
  override readonly localName = "acd" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;


  /** argValue (wne:argValue) */
  argumentValue: StringValue | undefined;

  /** fciBasedOn (wne:fciBasedOn) */
  commandBasedOn: StringValue | undefined;

  /** fciIndexBasedOn (wne:fciIndexBasedOn) */
  commandIndexBasedOn: HexBinaryValue | undefined;

  /** acdName (wne:acdName) */
  acceleratorName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:argValue": this.argumentValue = StringValue.parse(value); return;
      case "wne:fciBasedOn": this.commandBasedOn = StringValue.parse(value); return;
      case "wne:fciIndexBasedOn": this.commandIndexBasedOn = HexBinaryValue.parse(value); return;
      case "wne:acdName": this.acceleratorName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.argumentValue !== undefined) out.push(["wne:argValue", this.argumentValue.toString()]);
    if (this.commandBasedOn !== undefined) out.push(["wne:fciBasedOn", this.commandBasedOn.toString()]);
    if (this.commandIndexBasedOn !== undefined) out.push(["wne:fciIndexBasedOn", this.commandIndexBasedOn.toString()]);
    if (this.acceleratorName !== undefined) out.push(["wne:acdName", this.acceleratorName.toString()]);
    return out;
  }

}
