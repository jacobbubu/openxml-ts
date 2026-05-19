// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Kinsoku

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the Kinsoku Class.
 *
 * Element: `p:kinsoku` */
export class Kinsoku extends OpenXmlLeafElement {
  override readonly localName = "kinsoku" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Language (:lang) */
  language: StringValue | undefined;

  /** Invalid Kinsoku Start Characters (:invalStChars) */
  invalidStartChars: StringValue | undefined;

  /** Invalid Kinsoku End Characters (:invalEndChars) */
  invalidEndChars: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "lang": this.language = StringValue.parse(value); return;
      case "invalStChars": this.invalidStartChars = StringValue.parse(value); return;
      case "invalEndChars": this.invalidEndChars = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.language !== undefined) out.push(["lang", this.language.toString()]);
    if (this.invalidStartChars !== undefined) out.push(["invalStChars", this.invalidStartChars.toString()]);
    if (this.invalidEndChars !== undefined) out.push(["invalEndChars", this.invalidEndChars.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.invalidStartChars, { attribute: ":invalStChars", elementClass: "Kinsoku" });
    assertRequired(this.invalidEndChars, { attribute: ":invalEndChars", elementClass: "Kinsoku" });
  }
}
