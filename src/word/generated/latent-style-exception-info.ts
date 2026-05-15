// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.LatentStyleExceptionInfo

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Latent Style Exception.
 *
 * Element: `w:lsdException` */
export class LatentStyleExceptionInfo extends OpenXmlLeafElement {
  override readonly localName = "lsdException" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Primary Style Name (w:name) */
  name: StringValue | undefined;

  /** Latent Style Locking Setting (w:locked) */
  locked: BooleanValue | undefined;

  /** Override default sorting order (w:uiPriority) */
  uiPriority: Int32Value | undefined;

  /** Semi hidden text override (w:semiHidden) */
  semiHidden: BooleanValue | undefined;

  /** Unhide when used (w:unhideWhenUsed) */
  unhideWhenUsed: BooleanValue | undefined;

  /** Latent Style Primary Style Setting (w:qFormat) */
  primaryStyle: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:name": this.name = StringValue.parse(value); return;
      case "w:locked": this.locked = BooleanValue.parse(value); return;
      case "w:uiPriority": this.uiPriority = Int32Value.parse(value); return;
      case "w:semiHidden": this.semiHidden = BooleanValue.parse(value); return;
      case "w:unhideWhenUsed": this.unhideWhenUsed = BooleanValue.parse(value); return;
      case "w:qFormat": this.primaryStyle = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.locked !== undefined) out.push(["w:locked", this.locked.toString()]);
    if (this.uiPriority !== undefined) out.push(["w:uiPriority", this.uiPriority.toString()]);
    if (this.semiHidden !== undefined) out.push(["w:semiHidden", this.semiHidden.toString()]);
    if (this.unhideWhenUsed !== undefined) out.push(["w:unhideWhenUsed", this.unhideWhenUsed.toString()]);
    if (this.primaryStyle !== undefined) out.push(["w:qFormat", this.primaryStyle.toString()]);
    return out;
  }
}
