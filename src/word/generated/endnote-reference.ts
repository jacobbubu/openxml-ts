// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.EndnoteReference

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Endnote Reference.
 *
 * Element: `w:endnoteReference` */
export class EndnoteReference extends OpenXmlLeafElement {
  override readonly localName = "endnoteReference" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Suppress Footnote/Endnote Reference Mark (w:customMarkFollows) */
  customMarkFollows: BooleanValue | undefined;

  /** Footnote/Endnote ID Reference (w:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:customMarkFollows": this.customMarkFollows = BooleanValue.parse(value); return;
      case "w:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.customMarkFollows !== undefined) out.push(["w:customMarkFollows", this.customMarkFollows.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "w:id", elementClass: "EndnoteReference" });
  }
}
