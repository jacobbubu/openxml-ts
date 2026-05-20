// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_schemaLibrary_2006_main.json
// @see DocumentFormat.OpenXml.SchemaLibrary.Schema

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Custom XML Schema Reference.
 *
 * Element: `sl:schema` */
export class Schema extends OpenXmlLeafElement {
  override readonly localName = "schema" as const;
  override readonly prefix = "sl" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/schemaLibrary/2006/main" as const;


  /** Custom XML Schema Namespace (sl:uri) */
  uri: StringValue | undefined;

  /** Resource File Location (sl:manifestLocation) */
  manifestLocation: StringValue | undefined;

  /** Custom XML Schema Location (sl:schemaLocation) */
  schemaLocation: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sl:uri": this.uri = StringValue.parse(value); return;
      case "sl:manifestLocation": this.manifestLocation = StringValue.parse(value); return;
      case "sl:schemaLocation": this.schemaLocation = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["sl:uri", this.uri.toString()]);
    if (this.manifestLocation !== undefined) out.push(["sl:manifestLocation", this.manifestLocation.toString()]);
    if (this.schemaLocation !== undefined) out.push(["sl:schemaLocation", this.schemaLocation.toString()]);
    return out;
  }

}
