// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.PrintingProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the PrintingProperties Class.
 *
 * Element: `p:prnPr` */
export class PrintingProperties extends OpenXmlCompositeElement {
  override readonly localName = "prnPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Print Output (:prnWhat) */
  printWhat: StringValue | undefined;

  /** Print Color Mode (:clrMode) */
  colorMode: StringValue | undefined;

  /** Print Hidden Slides (:hiddenSlides) */
  hiddenSlides: BooleanValue | undefined;

  /** Scale to Fit Paper when printing (:scaleToFitPaper) */
  scaleToFitPaper: BooleanValue | undefined;

  /** Frame slides when printing (:frameSlides) */
  frameSlides: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":prnWhat": this.printWhat = StringValue.parse(value); return;
      case ":clrMode": this.colorMode = StringValue.parse(value); return;
      case ":hiddenSlides": this.hiddenSlides = BooleanValue.parse(value); return;
      case ":scaleToFitPaper": this.scaleToFitPaper = BooleanValue.parse(value); return;
      case ":frameSlides": this.frameSlides = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.printWhat !== undefined) out.push([":prnWhat", this.printWhat.toString()]);
    if (this.colorMode !== undefined) out.push([":clrMode", this.colorMode.toString()]);
    if (this.hiddenSlides !== undefined) out.push([":hiddenSlides", this.hiddenSlides.toString()]);
    if (this.scaleToFitPaper !== undefined) out.push([":scaleToFitPaper", this.scaleToFitPaper.toString()]);
    if (this.frameSlides !== undefined) out.push([":frameSlides", this.frameSlides.toString()]);
    return out;
  }

}
