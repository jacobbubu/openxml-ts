// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.FieldChar

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Complex Field Character.
 *
 * Element: `w:fldChar` */
export class FieldChar extends OpenXmlCompositeElement {
  override readonly localName = "fldChar" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field Character Type (w:fldCharType) */
  fieldCharType: StringValue | undefined;

  /** Field Should Not Be Recalculated (w:fldLock) */
  fieldLock: BooleanValue | undefined;

  /** Field Result Invalidated (w:dirty) */
  dirty: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:fldCharType": this.fieldCharType = StringValue.parse(value); return;
      case "w:fldLock": this.fieldLock = BooleanValue.parse(value); return;
      case "w:dirty": this.dirty = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fieldCharType !== undefined) out.push(["w:fldCharType", this.fieldCharType.toString()]);
    if (this.fieldLock !== undefined) out.push(["w:fldLock", this.fieldLock.toString()]);
    if (this.dirty !== undefined) out.push(["w:dirty", this.dirty.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.fieldCharType, { attribute: "w:fldCharType", elementClass: "FieldChar" });
  }
}
