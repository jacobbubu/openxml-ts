// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordml.json
// @see DocumentFormat.OpenXml.Word2012Wordml.Person

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Person Class.
 *
 * Element: `w15:person` */
export class Person extends OpenXmlCompositeElement {
  override readonly localName = "person" as const;
  override readonly prefix = "w15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2012/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** author (w15:author) */
  author: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w15:author": this.author = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.author !== undefined) out.push(["w15:author", this.author.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.author, { attribute: "w15:author", elementClass: "Person" });
  }
}
