// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.RatioType

import {
  Int32Value,
  OpenXmlLeafElement,
  assertRequired,
} from "../../element/index.js";

/** Defines the RatioType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class RatioType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Numerator (:n) */
  numerator: Int32Value | undefined;

  /** Denominator (:d) */
  denominator: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":n": this.numerator = Int32Value.parse(value); return;
      case ":d": this.denominator = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.numerator !== undefined) out.push([":n", this.numerator.toString()]);
    if (this.denominator !== undefined) out.push([":d", this.denominator.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.numerator, { attribute: ":n", elementClass: "RatioType" });
    assertRequired(this.denominator, { attribute: ":d", elementClass: "RatioType" });
  }
}
