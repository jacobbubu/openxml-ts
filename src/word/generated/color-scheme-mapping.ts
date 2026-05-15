// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ColorSchemeMapping

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Theme Color Mappings.
 *
 * Element: `w:clrSchemeMapping` */
export class ColorSchemeMapping extends OpenXmlLeafElement {
  override readonly localName = "clrSchemeMapping" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Background 1 Theme Color Mapping (w:bg1) */
  background1: StringValue | undefined;

  /** Text 1 Theme Color Mapping (w:t1) */
  text1: StringValue | undefined;

  /** Background 2 Theme Color Mapping (w:bg2) */
  background2: StringValue | undefined;

  /** Text 2 Theme Color Mapping (w:t2) */
  text2: StringValue | undefined;

  /** Accent 1 Theme Color Mapping (w:accent1) */
  accent1: StringValue | undefined;

  /** Accent 2 Theme Color Mapping (w:accent2) */
  accent2: StringValue | undefined;

  /** Accent3 Theme Color Mapping (w:accent3) */
  accent3: StringValue | undefined;

  /** Accent4 Theme Color Mapping (w:accent4) */
  accent4: StringValue | undefined;

  /** Accent5 Theme Color Mapping (w:accent5) */
  accent5: StringValue | undefined;

  /** Accent6 Theme Color Mapping (w:accent6) */
  accent6: StringValue | undefined;

  /** Hyperlink Theme Color Mapping (w:hyperlink) */
  hyperlink: StringValue | undefined;

  /** Followed Hyperlink Theme Color Mapping (w:followedHyperlink) */
  followedHyperlink: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:bg1": this.background1 = StringValue.parse(value); return;
      case "w:t1": this.text1 = StringValue.parse(value); return;
      case "w:bg2": this.background2 = StringValue.parse(value); return;
      case "w:t2": this.text2 = StringValue.parse(value); return;
      case "w:accent1": this.accent1 = StringValue.parse(value); return;
      case "w:accent2": this.accent2 = StringValue.parse(value); return;
      case "w:accent3": this.accent3 = StringValue.parse(value); return;
      case "w:accent4": this.accent4 = StringValue.parse(value); return;
      case "w:accent5": this.accent5 = StringValue.parse(value); return;
      case "w:accent6": this.accent6 = StringValue.parse(value); return;
      case "w:hyperlink": this.hyperlink = StringValue.parse(value); return;
      case "w:followedHyperlink": this.followedHyperlink = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.background1 !== undefined) out.push(["w:bg1", this.background1.toString()]);
    if (this.text1 !== undefined) out.push(["w:t1", this.text1.toString()]);
    if (this.background2 !== undefined) out.push(["w:bg2", this.background2.toString()]);
    if (this.text2 !== undefined) out.push(["w:t2", this.text2.toString()]);
    if (this.accent1 !== undefined) out.push(["w:accent1", this.accent1.toString()]);
    if (this.accent2 !== undefined) out.push(["w:accent2", this.accent2.toString()]);
    if (this.accent3 !== undefined) out.push(["w:accent3", this.accent3.toString()]);
    if (this.accent4 !== undefined) out.push(["w:accent4", this.accent4.toString()]);
    if (this.accent5 !== undefined) out.push(["w:accent5", this.accent5.toString()]);
    if (this.accent6 !== undefined) out.push(["w:accent6", this.accent6.toString()]);
    if (this.hyperlink !== undefined) out.push(["w:hyperlink", this.hyperlink.toString()]);
    if (this.followedHyperlink !== undefined) out.push(["w:followedHyperlink", this.followedHyperlink.toString()]);
    return out;
  }

}
