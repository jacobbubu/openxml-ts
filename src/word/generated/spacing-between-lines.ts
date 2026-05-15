// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.SpacingBetweenLines

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the SpacingBetweenLines Class.
 *
 * Element: `w:spacing` */
export class SpacingBetweenLines extends OpenXmlLeafElement {
  override readonly localName = "spacing" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Spacing Above Paragraph (w:before) */
  before: StringValue | undefined;

  /** Spacing Above Paragraph IN Line Units (w:beforeLines) */
  beforeLines: Int32Value | undefined;

  /** Automatically Determine Spacing Above Paragraph (w:beforeAutospacing) */
  beforeAutoSpacing: BooleanValue | undefined;

  /** Spacing Below Paragraph (w:after) */
  after: StringValue | undefined;

  /** Spacing Below Paragraph in Line Units (w:afterLines) */
  afterLines: Int32Value | undefined;

  /** Automatically Determine Spacing Below Paragraph (w:afterAutospacing) */
  afterAutoSpacing: BooleanValue | undefined;

  /** Spacing Between Lines in Paragraph (w:line) */
  line: StringValue | undefined;

  /** Type of Spacing Between Lines (w:lineRule) */
  lineRule: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:before": this.before = StringValue.parse(value); return;
      case "w:beforeLines": this.beforeLines = Int32Value.parse(value); return;
      case "w:beforeAutospacing": this.beforeAutoSpacing = BooleanValue.parse(value); return;
      case "w:after": this.after = StringValue.parse(value); return;
      case "w:afterLines": this.afterLines = Int32Value.parse(value); return;
      case "w:afterAutospacing": this.afterAutoSpacing = BooleanValue.parse(value); return;
      case "w:line": this.line = StringValue.parse(value); return;
      case "w:lineRule": this.lineRule = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.before !== undefined) out.push(["w:before", this.before.toString()]);
    if (this.beforeLines !== undefined) out.push(["w:beforeLines", this.beforeLines.toString()]);
    if (this.beforeAutoSpacing !== undefined) out.push(["w:beforeAutospacing", this.beforeAutoSpacing.toString()]);
    if (this.after !== undefined) out.push(["w:after", this.after.toString()]);
    if (this.afterLines !== undefined) out.push(["w:afterLines", this.afterLines.toString()]);
    if (this.afterAutoSpacing !== undefined) out.push(["w:afterAutospacing", this.afterAutoSpacing.toString()]);
    if (this.line !== undefined) out.push(["w:line", this.line.toString()]);
    if (this.lineRule !== undefined) out.push(["w:lineRule", this.lineRule.toString()]);
    return out;
  }
}
