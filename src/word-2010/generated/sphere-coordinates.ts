// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.SphereCoordinates

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the SphereCoordinates Class.
 *
 * Element: `w14:rot` */
export class SphereCoordinates extends OpenXmlLeafElement {
  override readonly localName = "rot" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** lat (w14:lat) */
  lattitude: Int32Value | undefined;

  /** lon (w14:lon) */
  longitude: Int32Value | undefined;

  /** rev (w14:rev) */
  revolution: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:lat": this.lattitude = Int32Value.parse(value); assertNumber(this.lattitude, { min: 0 }, { attribute: "w14:lat", elementClass: "SphereCoordinates" }); return;
      case "w14:lon": this.longitude = Int32Value.parse(value); assertNumber(this.longitude, { min: 0 }, { attribute: "w14:lon", elementClass: "SphereCoordinates" }); return;
      case "w14:rev": this.revolution = Int32Value.parse(value); assertNumber(this.revolution, { min: 0 }, { attribute: "w14:rev", elementClass: "SphereCoordinates" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.lattitude !== undefined) out.push(["w14:lat", this.lattitude.toString()]);
    if (this.longitude !== undefined) out.push(["w14:lon", this.longitude.toString()]);
    if (this.revolution !== undefined) out.push(["w14:rev", this.revolution.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.lattitude, { attribute: "w14:lat", elementClass: "SphereCoordinates" });
    assertRequired(this.longitude, { attribute: "w14:lon", elementClass: "SphereCoordinates" });
    assertRequired(this.revolution, { attribute: "w14:rev", elementClass: "SphereCoordinates" });
  }
}
