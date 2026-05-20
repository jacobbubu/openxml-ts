// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.CustomXmlConflictInsertionRangeEnd

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the CustomXmlConflictInsertionRangeEnd Class.
 *
 * Element: `w14:customXmlConflictInsRangeEnd` */
export class CustomXmlConflictInsertionRangeEnd extends OpenXmlLeafElement {
  override readonly localName = "customXmlConflictInsRangeEnd" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** Annotation Identifier (w:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "w:id", elementClass: "CustomXmlConflictInsertionRangeEnd" });
  }
}
