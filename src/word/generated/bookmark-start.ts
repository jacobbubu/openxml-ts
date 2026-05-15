// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.BookmarkStart

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the BookmarkStart Class.
 *
 * Element: `w:bookmarkStart` */
export class BookmarkStart extends OpenXmlLeafElement {
  override readonly localName = "bookmarkStart" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** name (w:name) */
  name: StringValue | undefined;

  /** colFirst (w:colFirst) */
  columnFirst: Int32Value | undefined;

  /** colLast (w:colLast) */
  columnLast: Int32Value | undefined;

  /** displacedByCustomXml (w:displacedByCustomXml) */
  displacedByCustomXml: StringValue | undefined;

  /** Annotation Identifier (w:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:name": this.name = StringValue.parse(value); return;
      case "w:colFirst": this.columnFirst = Int32Value.parse(value); return;
      case "w:colLast": this.columnLast = Int32Value.parse(value); return;
      case "w:displacedByCustomXml": this.displacedByCustomXml = StringValue.parse(value); return;
      case "w:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.columnFirst !== undefined) out.push(["w:colFirst", this.columnFirst.toString()]);
    if (this.columnLast !== undefined) out.push(["w:colLast", this.columnLast.toString()]);
    if (this.displacedByCustomXml !== undefined) out.push(["w:displacedByCustomXml", this.displacedByCustomXml.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    return out;
  }
}
