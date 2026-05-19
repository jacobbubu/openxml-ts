// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.HyperlinkSound

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Sound to play..
 *
 * Element: `a:snd` */
export class HyperlinkSound extends OpenXmlLeafElement {
  override readonly localName = "snd" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Embedded Audio File Relationship ID (r:embed) */
  embed: StringValue | undefined;

  /** Sound Name (:name) */
  name: StringValue | undefined;

  /** Recognized Built-In Sound (:builtIn) */
  builtIn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:embed": this.embed = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "builtIn": this.builtIn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.embed !== undefined) out.push(["r:embed", this.embed.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.builtIn !== undefined) out.push(["builtIn", this.builtIn.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.embed, { attribute: "r:embed", elementClass: "HyperlinkSound" });
  }
}
