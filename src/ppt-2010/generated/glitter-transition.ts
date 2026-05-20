// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.GlitterTransition

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the GlitterTransition Class.
 *
 * Element: `p14:glitter` */
export class GlitterTransition extends OpenXmlLeafElement {
  override readonly localName = "glitter" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** dir (:dir) */
  direction: StringValue | undefined;

  /** pattern (:pattern) */
  pattern: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dir": this.direction = StringValue.parse(value); return;
      case "pattern": this.pattern = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.direction !== undefined) out.push(["dir", this.direction.toString()]);
    if (this.pattern !== undefined) out.push(["pattern", this.pattern.toString()]);
    return out;
  }

}
