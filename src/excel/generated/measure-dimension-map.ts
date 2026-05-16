// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MeasureDimensionMap

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** OLAP Measure Group.
 *
 * Element: `x:map` */
export class MeasureDimensionMap extends OpenXmlLeafElement {
  override readonly localName = "map" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Measure Group Id (:measureGroup) */
  measureGroup: UInt32Value | undefined;

  /** Dimension Id (:dimension) */
  dimension: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":measureGroup": this.measureGroup = UInt32Value.parse(value); return;
      case ":dimension": this.dimension = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.measureGroup !== undefined) out.push([":measureGroup", this.measureGroup.toString()]);
    if (this.dimension !== undefined) out.push([":dimension", this.dimension.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.measureGroup, { attribute: ":measureGroup", elementClass: "MeasureDimensionMap" });
    assertRequired(this.dimension, { attribute: ":dimension", elementClass: "MeasureDimensionMap" });
  }
}
