// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MdxKpi

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** KPI MDX Metadata.
 *
 * Element: `x:k` */
export class MdxKpi extends OpenXmlLeafElement {
  override readonly localName = "k" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Member Unique Name Index (:n) */
  nameIndex: UInt32Value | undefined;

  /** KPI Index (:np) */
  kpiIndex: UInt32Value | undefined;

  /** KPI Property (:p) */
  kpiProperty: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.nameIndex = UInt32Value.parse(value); return;
      case "np": this.kpiIndex = UInt32Value.parse(value); return;
      case "p": this.kpiProperty = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.nameIndex !== undefined) out.push(["n", this.nameIndex.toString()]);
    if (this.kpiIndex !== undefined) out.push(["np", this.kpiIndex.toString()]);
    if (this.kpiProperty !== undefined) out.push(["p", this.kpiProperty.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.nameIndex, { attribute: ":n", elementClass: "MdxKpi" });
    assertRequired(this.kpiIndex, { attribute: ":np", elementClass: "MdxKpi" });
    assertRequired(this.kpiProperty, { attribute: ":p", elementClass: "MdxKpi" });
  }
}
