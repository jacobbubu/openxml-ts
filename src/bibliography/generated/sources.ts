// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_bibliography.json
// @see DocumentFormat.OpenXml.Bibliography.Sources

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Sources.
 *
 * Element: `b:Sources` */
export class Sources extends OpenXmlCompositeElement {
  override readonly localName = "Sources" as const;
  override readonly prefix = "b" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/bibliography" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Selected Style (:SelectedStyle) */
  selectedStyle: StringValue | undefined;

  /** Documentation Style Name (:StyleName) */
  styleName: StringValue | undefined;

  /** Uniform Resource Identifier (:URI) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "SelectedStyle": this.selectedStyle = StringValue.parse(value); assertString(this.selectedStyle, { maxLength: 255, minLength: 0 }, { attribute: ":SelectedStyle", elementClass: "Sources" }); return;
      case "StyleName": this.styleName = StringValue.parse(value); assertString(this.styleName, { maxLength: 255, minLength: 0 }, { attribute: ":StyleName", elementClass: "Sources" }); return;
      case "URI": this.uri = StringValue.parse(value); assertString(this.uri, { maxLength: 255, minLength: 0 }, { attribute: ":URI", elementClass: "Sources" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.selectedStyle !== undefined) out.push(["SelectedStyle", this.selectedStyle.toString()]);
    if (this.styleName !== undefined) out.push(["StyleName", this.styleName.toString()]);
    if (this.uri !== undefined) out.push(["URI", this.uri.toString()]);
    return out;
  }

}
