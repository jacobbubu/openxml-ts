// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotCacheIdVersion

import {
  ByteValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../element/index.js";

/** Defines the PivotCacheIdVersion Class.
 *
 * Element: `x15:pivotCacheIdVersion` */
export class PivotCacheIdVersion extends OpenXmlLeafElement {
  override readonly localName = "pivotCacheIdVersion" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** cacheIdSupportedVersion (:cacheIdSupportedVersion) */
  cacheIdSupportedVersion: ByteValue | undefined;

  /** cacheIdCreatedVersion (:cacheIdCreatedVersion) */
  cacheIdCreatedVersion: ByteValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "cacheIdSupportedVersion": this.cacheIdSupportedVersion = ByteValue.parse(value); return;
      case "cacheIdCreatedVersion": this.cacheIdCreatedVersion = ByteValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cacheIdSupportedVersion !== undefined) out.push(["cacheIdSupportedVersion", this.cacheIdSupportedVersion.toString()]);
    if (this.cacheIdCreatedVersion !== undefined) out.push(["cacheIdCreatedVersion", this.cacheIdCreatedVersion.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cacheIdSupportedVersion, { attribute: ":cacheIdSupportedVersion", elementClass: "PivotCacheIdVersion" });
    assertRequired(this.cacheIdCreatedVersion, { attribute: ":cacheIdCreatedVersion", elementClass: "PivotCacheIdVersion" });
  }
}
