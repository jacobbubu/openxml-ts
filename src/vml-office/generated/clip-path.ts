// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.ClipPath

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Shape Clipping Path.
 *
 * Element: `o:clippath` */
export class ClipPath extends OpenXmlLeafElement {
  override readonly localName = "clippath" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** Path Definition (o:v) */
  value: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "o:v": this.value = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.value !== undefined) out.push(["o:v", this.value.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.value, { attribute: "o:v", elementClass: "ClipPath" });
  }
}
