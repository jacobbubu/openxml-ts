// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_main.json
// @see DocumentFormat.OpenXml.Drawing2012Main.BackgroundProperties

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the BackgroundProperties Class.
 *
 * Element: `a15:backgroundPr` */
export class BackgroundProperties extends OpenXmlLeafElement {
  override readonly localName = "backgroundPr" as const;
  override readonly prefix = "a15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/main" as const;


  /** bwMode (:bwMode) */
  mode: StringValue | undefined;

  /** bwPure (:bwPure) */
  pure: StringValue | undefined;

  /** bwNormal (:bwNormal) */
  normal: StringValue | undefined;

  /** targetScreenSize (:targetScreenSize) */
  targetScreenSize: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bwMode": this.mode = StringValue.parse(value); return;
      case "bwPure": this.pure = StringValue.parse(value); return;
      case "bwNormal": this.normal = StringValue.parse(value); return;
      case "targetScreenSize": this.targetScreenSize = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.mode !== undefined) out.push(["bwMode", this.mode.toString()]);
    if (this.pure !== undefined) out.push(["bwPure", this.pure.toString()]);
    if (this.normal !== undefined) out.push(["bwNormal", this.normal.toString()]);
    if (this.targetScreenSize !== undefined) out.push(["targetScreenSize", this.targetScreenSize.toString()]);
    return out;
  }

}
