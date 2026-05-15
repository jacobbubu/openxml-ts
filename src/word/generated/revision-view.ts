// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.RevisionView

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Visibility of Annotation Types.
 *
 * Element: `w:revisionView` */
export class RevisionView extends OpenXmlLeafElement {
  override readonly localName = "revisionView" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Display Visual Indicator Of Markup Area (w:markup) */
  markup: BooleanValue | undefined;

  /** Display Comments (w:comments) */
  comments: BooleanValue | undefined;

  /** Display Content Revisions (w:insDel) */
  displayRevision: BooleanValue | undefined;

  /** Display Formatting Revisions (w:formatting) */
  formatting: BooleanValue | undefined;

  /** Display Ink Annotations (w:inkAnnotations) */
  inkAnnotations: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:markup": this.markup = BooleanValue.parse(value); return;
      case "w:comments": this.comments = BooleanValue.parse(value); return;
      case "w:insDel": this.displayRevision = BooleanValue.parse(value); return;
      case "w:formatting": this.formatting = BooleanValue.parse(value); return;
      case "w:inkAnnotations": this.inkAnnotations = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.markup !== undefined) out.push(["w:markup", this.markup.toString()]);
    if (this.comments !== undefined) out.push(["w:comments", this.comments.toString()]);
    if (this.displayRevision !== undefined) out.push(["w:insDel", this.displayRevision.toString()]);
    if (this.formatting !== undefined) out.push(["w:formatting", this.formatting.toString()]);
    if (this.inkAnnotations !== undefined) out.push(["w:inkAnnotations", this.inkAnnotations.toString()]);
    return out;
  }
}
