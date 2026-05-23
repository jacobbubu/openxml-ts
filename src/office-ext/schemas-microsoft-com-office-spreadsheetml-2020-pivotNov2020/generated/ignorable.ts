// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2020_pivotNov2020.json
// @see DocumentFormat.OpenXml.Spreadsheetml2020PivotNov2020.Ignorable

import {
  ByteValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Ignorable Class.
 *
 * Element: `xxpim:ignorableAfterVersion` */
export class Ignorable extends OpenXmlLeafElement {
  override readonly localName = "ignorableAfterVersion" as const;
  override readonly prefix = "xxpim" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2020/pivotNov2020" as const;


  /** version (:version) */
  version: ByteValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "version": this.version = ByteValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.version !== undefined) out.push(["version", this.version.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.version, { attribute: ":version", elementClass: "Ignorable" });
  }
}
