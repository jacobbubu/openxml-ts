/**
 * `CustomXmlPropertiesPart` —— 自定义 XML 属性 Part（`customXml/itemProps1.xml` 等）。
 *
 * 根元素 `<ds:datastoreItem>`，含自定义 XML 数据存储条目的元数据（itemID、schemaRefs）。
 * 属 CustomXmlPart 的 part-level 关系，由 `CustomXmlPart` 持有。
 *
 * Registry 注册 custom-xml（ds:）命名空间，使 `<ds:datastoreItem>` 及其子元素
 * 在反序列化时被正确解析为 `DataStoreItem` / `SchemaReferences` 等 typed 类。
 *
 * @see DocumentFormat.OpenXml.Packaging.CustomXmlPropertiesPart
 */

import { registerCustomXmlElements } from "../custom-xml/generated/_registry.js";
import { DataStoreItem } from "../custom-xml/generated/data-store-item.js";
import { ElementRegistry, type OpenXmlElement } from "../element/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

const DS_NS = "http://schemas.openxmlformats.org/officeDocument/2006/customXml";

/** 模块级专用 registry：custom-xml（ds:）命名空间。 */
const customXmlPropertiesRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerCustomXmlElements(r);
  return r;
})();

export class CustomXmlPropertiesPart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.customXmlProperties+xml";

  constructor(part: IPackagePart, _registry: ElementRegistry = customXmlPropertiesRegistry) {
    super(part, customXmlPropertiesRegistry, DataStoreItemPlaceholder);
  }

  /** `<ds:datastoreItem>` 根元素。 */
  get datastoreItem(): OpenXmlElement {
    return this.root;
  }

  set datastoreItem(value: OpenXmlElement) {
    this.root = value;
  }
}

/** 新建占位：空 `<ds:datastoreItem>` 带命名空间声明。 */
class DataStoreItemPlaceholder extends DataStoreItem {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:ds", DS_NS);
  }
}
