// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.LatentStyles

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
} from "../../element/index.js";

/** Latent Style Information.
 *
 * Element: `w:latentStyles` */
export class LatentStyles extends OpenXmlCompositeElement {
  override readonly localName = "latentStyles" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Default Style Locking Setting (w:defLockedState) */
  defaultLockedState: BooleanValue | undefined;

  /** Default User Interface Priority Setting (w:defUIPriority) */
  defaultUiPriority: Int32Value | undefined;

  /** Default Semi-Hidden Setting (w:defSemiHidden) */
  defaultSemiHidden: BooleanValue | undefined;

  /** Default Hidden Until Used Setting (w:defUnhideWhenUsed) */
  defaultUnhideWhenUsed: BooleanValue | undefined;

  /** Default Primary Style Setting (w:defQFormat) */
  defaultPrimaryStyle: BooleanValue | undefined;

  /** Latent Style Count (w:count) */
  count: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:defLockedState": this.defaultLockedState = BooleanValue.parse(value); return;
      case "w:defUIPriority": this.defaultUiPriority = Int32Value.parse(value); assertNumber(this.defaultUiPriority, { min: 0, max: 99 }, { attribute: "w:defUIPriority", elementClass: "LatentStyles" }); return;
      case "w:defSemiHidden": this.defaultSemiHidden = BooleanValue.parse(value); return;
      case "w:defUnhideWhenUsed": this.defaultUnhideWhenUsed = BooleanValue.parse(value); return;
      case "w:defQFormat": this.defaultPrimaryStyle = BooleanValue.parse(value); return;
      case "w:count": this.count = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.defaultLockedState !== undefined) out.push(["w:defLockedState", this.defaultLockedState.toString()]);
    if (this.defaultUiPriority !== undefined) out.push(["w:defUIPriority", this.defaultUiPriority.toString()]);
    if (this.defaultSemiHidden !== undefined) out.push(["w:defSemiHidden", this.defaultSemiHidden.toString()]);
    if (this.defaultUnhideWhenUsed !== undefined) out.push(["w:defUnhideWhenUsed", this.defaultUnhideWhenUsed.toString()]);
    if (this.defaultPrimaryStyle !== undefined) out.push(["w:defQFormat", this.defaultPrimaryStyle.toString()]);
    if (this.count !== undefined) out.push(["w:count", this.count.toString()]);
    return out;
  }

}
