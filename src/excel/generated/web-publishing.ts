// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WebPublishing

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the WebPublishing Class.
 *
 * Element: `x:webPublishing` */
export class WebPublishing extends OpenXmlLeafElement {
  override readonly localName = "webPublishing" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** css (:css) */
  useCss: BooleanValue | undefined;

  /** thicket (:thicket) */
  thicket: BooleanValue | undefined;

  /** longFileNames (:longFileNames) */
  longFileNames: BooleanValue | undefined;

  /** vml (:vml) */
  useVml: BooleanValue | undefined;

  /** allowPng (:allowPng) */
  allowPng: BooleanValue | undefined;

  /** targetScreenSize (:targetScreenSize) */
  targetScreenSize: StringValue | undefined;

  /** dpi (:dpi) */
  dpi: UInt32Value | undefined;

  /** codePage (:codePage) */
  codePage: UInt32Value | undefined;

  /** characterSet (:characterSet) */
  characterSet: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "css": this.useCss = BooleanValue.parse(value); return;
      case "thicket": this.thicket = BooleanValue.parse(value); return;
      case "longFileNames": this.longFileNames = BooleanValue.parse(value); return;
      case "vml": this.useVml = BooleanValue.parse(value); return;
      case "allowPng": this.allowPng = BooleanValue.parse(value); return;
      case "targetScreenSize": this.targetScreenSize = StringValue.parse(value); return;
      case "dpi": this.dpi = UInt32Value.parse(value); return;
      case "codePage": this.codePage = UInt32Value.parse(value); return;
      case "characterSet": this.characterSet = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.useCss !== undefined) out.push(["css", this.useCss.toString()]);
    if (this.thicket !== undefined) out.push(["thicket", this.thicket.toString()]);
    if (this.longFileNames !== undefined) out.push(["longFileNames", this.longFileNames.toString()]);
    if (this.useVml !== undefined) out.push(["vml", this.useVml.toString()]);
    if (this.allowPng !== undefined) out.push(["allowPng", this.allowPng.toString()]);
    if (this.targetScreenSize !== undefined) out.push(["targetScreenSize", this.targetScreenSize.toString()]);
    if (this.dpi !== undefined) out.push(["dpi", this.dpi.toString()]);
    if (this.codePage !== undefined) out.push(["codePage", this.codePage.toString()]);
    if (this.characterSet !== undefined) out.push(["characterSet", this.characterSet.toString()]);
    return out;
  }

}
