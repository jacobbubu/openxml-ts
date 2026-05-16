// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Mdx

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** MDX Metadata Record.
 *
 * Element: `x:mdx` */
export class Mdx extends OpenXmlCompositeElement {
  override readonly localName = "mdx" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Connection Name Index (:n) */
  nameIndex: UInt32Value | undefined;

  /** Cube Function Tag (:f) */
  cubeFunction: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":n": this.nameIndex = UInt32Value.parse(value); return;
      case ":f": this.cubeFunction = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.nameIndex !== undefined) out.push([":n", this.nameIndex.toString()]);
    if (this.cubeFunction !== undefined) out.push([":f", this.cubeFunction.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.nameIndex, { attribute: ":n", elementClass: "Mdx" });
    assertRequired(this.cubeFunction, { attribute: ":f", elementClass: "Mdx" });
  }
}
