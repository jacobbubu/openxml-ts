/**
 * `CustomXmlPart` —— 自定义 XML 数据 Part（`customXml/item1.xml` 等）。
 *
 * 根元素为**任意用户 XML**（无固定 schema）——用 `OpenXmlUnknownElement` 透传：
 * 读出什么样、写回去就什么样，保证 docx/xlsx/pptx round-trip 不破。
 *
 * Word/Excel/PPT 三族共用本类，属 MainDocumentPart / WorkbookPart /
 * PresentationPart 的 part-level 关系（可多实例：item1、item2……）。
 * 伴生 `CustomXmlPropertiesPart`（`customXml/itemProps1.xml`）持有
 * `<ds:datastoreItem>` 元数据，通过 CustomXmlPart 自身的 part-level 关系
 * `customXmlProps` 挂载。
 *
 * @see DocumentFormat.OpenXml.Packaging.CustomXmlPart
 */

import type { ElementRegistry, OpenXmlElement } from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import type { IPackage } from "../packaging/interfaces/package.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { CustomXmlPropertiesPart } from "./custom-xml-properties-part.js";
import { relationshipTypeMatches } from "./relationship-type-match.js";
import { resolveRelativePartUri } from "./relationship-uri.js";
import { TypedXmlPart } from "./typed-xml-part.js";

export class CustomXmlPart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml";
  /**
   * 内容类型：自定义 XML Part 无固定 schema，规范默认用 `application/xml`。
   * 实际打包时由调用方指定或沿用包内已有 Default 声明（OPC §10.1）。
   */
  static readonly contentType = "application/xml";

  /** 已解析的 CustomXmlPropertiesPart 缓存。 */
  private _propertiesPart: CustomXmlPropertiesPart | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, CustomXmlPlaceholder);
  }

  /** 任意用户 XML 根元素（透传 Unknown）。 */
  get customXml(): OpenXmlElement {
    return this.root;
  }

  set customXml(value: OpenXmlElement) {
    this.root = value;
  }

  /**
   * 伴生 `CustomXmlPropertiesPart`（`<ds:datastoreItem>`）。
   * 从 CustomXmlPart 自身的 part-level 关系中按 `customXmlProps` type 解析；
   * 不存在时返回 `undefined`。
   */
  get customXmlPropertiesPart(): CustomXmlPropertiesPart | undefined {
    if (this._propertiesPart !== undefined) return this._propertiesPart;
    for (const rel of this._part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, CustomXmlPropertiesPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this._part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      this._propertiesPart = new CustomXmlPropertiesPart(this.pkg.getPart(targetUri));
      return this._propertiesPart;
    }
    return undefined;
  }
}

/** 给 TypedXmlPart 的 RootCtor 占位：新建场景下 root 是空 unknown（任意命名空间）。 */
class CustomXmlPlaceholder extends OpenXmlUnknownElement {
  constructor() {
    super("", "customXmlRoot", "");
  }
}
