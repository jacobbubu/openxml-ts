// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.NoLineBreaksAfterKinsoku

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Custom Set of Characters Which Cannot End a Line.
 *
 * Element: `w:noLineBreaksAfter` */
export class NoLineBreaksAfterKinsoku extends OpenXmlLeafElement {
  override readonly localName = "noLineBreaksAfter" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** lang (w:lang) */
  language: StringValue | undefined;

  /** val (w:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:lang": this.language = StringValue.parse(value); assertString(this.language, { maxLength: 84 }, { attribute: "w:lang", elementClass: "NoLineBreaksAfterKinsoku" }); return;
      case "w:val": this.val = StringValue.parse(value); assertString(this.val, { maxLength: 50 }, { attribute: "w:val", elementClass: "NoLineBreaksAfterKinsoku" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.language !== undefined) out.push(["w:lang", this.language.toString()]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.language, { attribute: "w:lang", elementClass: "NoLineBreaksAfterKinsoku" });
    assertRequired(this.val, { attribute: "w:val", elementClass: "NoLineBreaksAfterKinsoku" });
  }
}
