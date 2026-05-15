// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.FitText

import {
  Int32Value,
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the FitText Class.
 *
 * Element: `w:fitText` */
export class FitText extends OpenXmlLeafElement {
  override readonly localName = "fitText" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Value (w:val) */
  val: UInt32Value | undefined;

  /** Fit Text Run ID (w:id) */
  id: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = UInt32Value.parse(value); assertNumber(this.val, { max: 31680 }, { attribute: "w:val", elementClass: "FitText" }); return;
      case "w:id": this.id = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "w:val", elementClass: "FitText" });
  }
}
