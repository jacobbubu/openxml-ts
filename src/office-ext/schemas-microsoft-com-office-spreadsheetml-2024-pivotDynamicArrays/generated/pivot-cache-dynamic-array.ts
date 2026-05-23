// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2024_pivotDynamicArrays.json
// @see DocumentFormat.OpenXml.Spreadsheetml2024PivotDynamicArrays.PivotCacheDynamicArray

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PivotCacheDynamicArray Class.
 *
 * Element: `xlpda:pivotCacheDynamicArray` */
export class PivotCacheDynamicArray extends OpenXmlLeafElement {
  override readonly localName = "pivotCacheDynamicArray" as const;
  override readonly prefix = "xlpda" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2024/pivotDynamicArrays" as const;


  /** ref (:ref) */
  ref: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ref": this.ref = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.ref !== undefined) out.push(["ref", this.ref.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.ref, { attribute: ":ref", elementClass: "PivotCacheDynamicArray" });
  }
}
