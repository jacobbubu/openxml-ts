// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ReadModeInkLockDown

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Freeze Document Layout.
 *
 * Element: `w:readModeInkLockDown` */
export class ReadModeInkLockDown extends OpenXmlLeafElement {
  override readonly localName = "readModeInkLockDown" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Use Actual Pages, Not Virtual Pages (w:actualPg) */
  useActualPages: BooleanValue | undefined;

  /** Virtual Page Width (w:w) */
  width: UInt32Value | undefined;

  /** Virtual Page Height (w:h) */
  height: UInt32Value | undefined;

  /** Font Size Scaling (w:fontSz) */
  fontSize: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:actualPg": this.useActualPages = BooleanValue.parse(value); return;
      case "w:w": this.width = UInt32Value.parse(value); return;
      case "w:h": this.height = UInt32Value.parse(value); return;
      case "w:fontSz": this.fontSize = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.useActualPages !== undefined) out.push(["w:actualPg", this.useActualPages.toString()]);
    if (this.width !== undefined) out.push(["w:w", this.width.toString()]);
    if (this.height !== undefined) out.push(["w:h", this.height.toString()]);
    if (this.fontSize !== undefined) out.push(["w:fontSz", this.fontSize.toString()]);
    return out;
  }
}
