// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2025_pivotDataSource.json
// @see DocumentFormat.OpenXml.Spreadsheetml2025PivotDataSource.PivotCacheDataSource

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the PivotCacheDataSource Class.
 *
 * Element: `xlpds:pivotCacheDataSource` */
export class PivotCacheDataSource extends OpenXmlCompositeElement {
  override readonly localName = "pivotCacheDataSource" as const;
  override readonly prefix = "xlpds" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2025/pivotDataSource" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

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

}
