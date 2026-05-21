// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_ink_2010_main.json
// @see DocumentFormat.OpenXml.Ink2010Main.SourceLink

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SourceLink Class.
 *
 * Element: `msink:sourceLink` */
export class SourceLink extends OpenXmlLeafElement {
  override readonly localName = "sourceLink" as const;
  override readonly prefix = "msink" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/ink/2010/main" as const;


  /** direction (:direction) */
  direction: StringValue | undefined;

  /** ref (:ref) */
  reference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "direction": this.direction = StringValue.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.direction !== undefined) out.push(["direction", this.direction.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    return out;
  }

}
