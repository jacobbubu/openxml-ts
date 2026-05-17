// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.BuildChart

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Build Chart.
 *
 * Element: `a:bldChart` */
export class BuildChart extends OpenXmlLeafElement {
  override readonly localName = "bldChart" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Build (:bld) */
  build: StringValue | undefined;

  /** Animate Background (:animBg) */
  animateBackground: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":bld": this.build = StringValue.parse(value); return;
      case ":animBg": this.animateBackground = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.build !== undefined) out.push([":bld", this.build.toString()]);
    if (this.animateBackground !== undefined) out.push([":animBg", this.animateBackground.toString()]);
    return out;
  }

}
