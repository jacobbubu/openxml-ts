// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.EmbedBoldItalicFont

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the EmbedBoldItalicFont Class.
 *
 * Element: `w:embedBoldItalic` */
export class EmbedBoldItalicFont extends OpenXmlLeafElement {
  override readonly localName = "embedBoldItalic" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** fontKey (w:fontKey) */
  fontKey: StringValue | undefined;

  /** subsetted (w:subsetted) */
  subsetted: BooleanValue | undefined;

  /** Relationship to Part (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:fontKey": this.fontKey = StringValue.parse(value); return;
      case "w:subsetted": this.subsetted = BooleanValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fontKey !== undefined) out.push(["w:fontKey", this.fontKey.toString()]);
    if (this.subsetted !== undefined) out.push(["w:subsetted", this.subsetted.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "EmbedBoldItalicFont" });
  }
}
