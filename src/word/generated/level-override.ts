// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.LevelOverride

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertRequired,
} from "../../element/index.js";

/** Defines the LevelOverride Class.
 *
 * Element: `w:lvlOverride` */
export class LevelOverride extends OpenXmlCompositeElement {
  override readonly localName = "lvlOverride" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Numbering Level ID (w:ilvl) */
  levelIndex: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:ilvl": this.levelIndex = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.levelIndex !== undefined) out.push(["w:ilvl", this.levelIndex.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.levelIndex, { attribute: "w:ilvl", elementClass: "LevelOverride" });
  }
}
