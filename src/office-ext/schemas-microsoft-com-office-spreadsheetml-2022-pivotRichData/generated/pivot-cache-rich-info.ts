// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_pivotRichData.json
// @see DocumentFormat.OpenXml.Spreadsheetml2022PivotRichData.PivotCacheRichInfo

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PivotCacheRichInfo Class.
 *
 * Element: `xprd:richInfo` */
export class PivotCacheRichInfo extends OpenXmlLeafElement {
  override readonly localName = "richInfo" as const;
  override readonly prefix = "xprd" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2022/pivotRichData" as const;


  /** pivotCacheGuid (:pivotCacheGuid) */
  pivotCacheGuid: StringValue | undefined;

  /** pivotIgnoreInvalidCache (:pivotIgnoreInvalidCache) */
  pivotIgnoreInvalidCache: BooleanValue | undefined;

  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "pivotCacheGuid": this.pivotCacheGuid = StringValue.parse(value); return;
      case "pivotIgnoreInvalidCache": this.pivotIgnoreInvalidCache = BooleanValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pivotCacheGuid !== undefined) out.push(["pivotCacheGuid", this.pivotCacheGuid.toString()]);
    if (this.pivotIgnoreInvalidCache !== undefined) out.push(["pivotIgnoreInvalidCache", this.pivotIgnoreInvalidCache.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.pivotCacheGuid, { attribute: ":pivotCacheGuid", elementClass: "PivotCacheRichInfo" });
  }
}
