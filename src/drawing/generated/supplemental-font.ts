// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.SupplementalFont

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Font.
 *
 * Element: `a:font` */
export class SupplementalFont extends OpenXmlLeafElement {
  override readonly localName = "font" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Script (:script) */
  script: StringValue | undefined;

  /** Typeface (:typeface) */
  typeface: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "script": this.script = StringValue.parse(value); return;
      case "typeface": this.typeface = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.script !== undefined) out.push(["script", this.script.toString()]);
    if (this.typeface !== undefined) out.push(["typeface", this.typeface.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.script, { attribute: ":script", elementClass: "SupplementalFont" });
    assertRequired(this.typeface, { attribute: ":typeface", elementClass: "SupplementalFont" });
  }
}
