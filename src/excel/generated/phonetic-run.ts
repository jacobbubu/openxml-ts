// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PhoneticRun

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Phonetic Run.
 *
 * Element: `x:rPh` */
export class PhoneticRun extends OpenXmlCompositeElement {
  override readonly localName = "rPh" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Base Text Start Index (:sb) */
  baseTextStartIndex: UInt32Value | undefined;

  /** Base Text End Index (:eb) */
  endingBaseIndex: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":sb": this.baseTextStartIndex = UInt32Value.parse(value); return;
      case ":eb": this.endingBaseIndex = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.baseTextStartIndex !== undefined) out.push([":sb", this.baseTextStartIndex.toString()]);
    if (this.endingBaseIndex !== undefined) out.push([":eb", this.endingBaseIndex.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.baseTextStartIndex, { attribute: ":sb", elementClass: "PhoneticRun" });
    assertRequired(this.endingBaseIndex, { attribute: ":eb", elementClass: "PhoneticRun" });
  }
}
