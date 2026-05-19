// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.ColorMap

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Color Scheme Map.
 *
 * Element: `p:clrMap` */
export class ColorMap extends OpenXmlCompositeElement {
  override readonly localName = "clrMap" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Background 1 (:bg1) */
  background1: StringValue | undefined;

  /** Text 1 (:tx1) */
  text1: StringValue | undefined;

  /** Background 2 (:bg2) */
  background2: StringValue | undefined;

  /** Text 2 (:tx2) */
  text2: StringValue | undefined;

  /** Accent 1 (:accent1) */
  accent1: StringValue | undefined;

  /** Accent 2 (:accent2) */
  accent2: StringValue | undefined;

  /** Accent 3 (:accent3) */
  accent3: StringValue | undefined;

  /** Accent 4 (:accent4) */
  accent4: StringValue | undefined;

  /** Accent 5 (:accent5) */
  accent5: StringValue | undefined;

  /** Accent 6 (:accent6) */
  accent6: StringValue | undefined;

  /** Hyperlink (:hlink) */
  hyperlink: StringValue | undefined;

  /** Followed Hyperlink (:folHlink) */
  followedHyperlink: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bg1": this.background1 = StringValue.parse(value); return;
      case "tx1": this.text1 = StringValue.parse(value); return;
      case "bg2": this.background2 = StringValue.parse(value); return;
      case "tx2": this.text2 = StringValue.parse(value); return;
      case "accent1": this.accent1 = StringValue.parse(value); return;
      case "accent2": this.accent2 = StringValue.parse(value); return;
      case "accent3": this.accent3 = StringValue.parse(value); return;
      case "accent4": this.accent4 = StringValue.parse(value); return;
      case "accent5": this.accent5 = StringValue.parse(value); return;
      case "accent6": this.accent6 = StringValue.parse(value); return;
      case "hlink": this.hyperlink = StringValue.parse(value); return;
      case "folHlink": this.followedHyperlink = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.background1 !== undefined) out.push(["bg1", this.background1.toString()]);
    if (this.text1 !== undefined) out.push(["tx1", this.text1.toString()]);
    if (this.background2 !== undefined) out.push(["bg2", this.background2.toString()]);
    if (this.text2 !== undefined) out.push(["tx2", this.text2.toString()]);
    if (this.accent1 !== undefined) out.push(["accent1", this.accent1.toString()]);
    if (this.accent2 !== undefined) out.push(["accent2", this.accent2.toString()]);
    if (this.accent3 !== undefined) out.push(["accent3", this.accent3.toString()]);
    if (this.accent4 !== undefined) out.push(["accent4", this.accent4.toString()]);
    if (this.accent5 !== undefined) out.push(["accent5", this.accent5.toString()]);
    if (this.accent6 !== undefined) out.push(["accent6", this.accent6.toString()]);
    if (this.hyperlink !== undefined) out.push(["hlink", this.hyperlink.toString()]);
    if (this.followedHyperlink !== undefined) out.push(["folHlink", this.followedHyperlink.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.background1, { attribute: ":bg1", elementClass: "ColorMap" });
    assertRequired(this.text1, { attribute: ":tx1", elementClass: "ColorMap" });
    assertRequired(this.background2, { attribute: ":bg2", elementClass: "ColorMap" });
    assertRequired(this.text2, { attribute: ":tx2", elementClass: "ColorMap" });
    assertRequired(this.accent1, { attribute: ":accent1", elementClass: "ColorMap" });
    assertRequired(this.accent2, { attribute: ":accent2", elementClass: "ColorMap" });
    assertRequired(this.accent3, { attribute: ":accent3", elementClass: "ColorMap" });
    assertRequired(this.accent4, { attribute: ":accent4", elementClass: "ColorMap" });
    assertRequired(this.accent5, { attribute: ":accent5", elementClass: "ColorMap" });
    assertRequired(this.accent6, { attribute: ":accent6", elementClass: "ColorMap" });
    assertRequired(this.hyperlink, { attribute: ":hlink", elementClass: "ColorMap" });
    assertRequired(this.followedHyperlink, { attribute: ":folHlink", elementClass: "ColorMap" });
  }
}
