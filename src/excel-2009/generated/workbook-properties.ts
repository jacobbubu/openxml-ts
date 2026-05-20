// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.WorkbookProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the WorkbookProperties Class.
 *
 * Element: `x14:workbookPr` */
export class WorkbookProperties extends OpenXmlLeafElement {
  override readonly localName = "workbookPr" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** defaultImageDpi (:defaultImageDpi) */
  defaultImageDpi: UInt32Value | undefined;

  /** discardImageEditData (:discardImageEditData) */
  discardImageEditData: BooleanValue | undefined;

  /** accuracyVersion (:accuracyVersion) */
  accuracyVersion: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "defaultImageDpi": this.defaultImageDpi = UInt32Value.parse(value); return;
      case "discardImageEditData": this.discardImageEditData = BooleanValue.parse(value); return;
      case "accuracyVersion": this.accuracyVersion = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.defaultImageDpi !== undefined) out.push(["defaultImageDpi", this.defaultImageDpi.toString()]);
    if (this.discardImageEditData !== undefined) out.push(["discardImageEditData", this.discardImageEditData.toString()]);
    if (this.accuracyVersion !== undefined) out.push(["accuracyVersion", this.accuracyVersion.toString()]);
    return out;
  }

}
