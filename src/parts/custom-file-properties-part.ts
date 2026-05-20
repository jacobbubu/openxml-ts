/**
 * `CustomFilePropertiesPart` —— OPC 包级自定义属性 Part（`/docProps/custom.xml`）。
 *
 * 根元素 `<op:Properties>`，含用户自定义文档属性（名称 + 类型化值）。
 * Word/Excel/PPT 三族共用一份，属包级关系（package-level relationship）。
 *
 * Registry 注册 custom-properties（op:）+ doc-props-vtypes（vt:）两个命名空间，
 * 使反序列化时 `<op:property>` 内的 `<vt:*>` 类型化值能被正确解析。
 *
 * @see DocumentFormat.OpenXml.Packaging.CustomFilePropertiesPart
 */

import { registerCustomPropertiesElements } from "../custom-properties/generated/_registry.js";
import { Properties } from "../custom-properties/generated/properties.js";
import { registerDocPropsVTypesElements } from "../doc-props-vtypes/generated/_registry.js";
import { ElementRegistry } from "../element/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

const OP_NS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
const VT_NS = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes";

/** 模块级专用 registry：custom-properties + doc-props-vtypes（vt: 子元素）。 */
const customPropertiesRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerCustomPropertiesElements(r);
  registerDocPropsVTypesElements(r);
  return r;
})();

export class CustomFilePropertiesPart extends TypedXmlPart<Properties> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.custom-properties+xml";

  constructor(part: IPackagePart, _registry: ElementRegistry = customPropertiesRegistry) {
    super(part, customPropertiesRegistry, CustomPropertiesPlaceholder);
  }

  /** `<op:Properties>` 根元素。 */
  get properties(): Properties {
    return this.root;
  }

  set properties(value: Properties) {
    this.root = value;
  }
}

/** 新建占位：空 `<op:Properties>` 带命名空间声明。 */
class CustomPropertiesPlaceholder extends Properties {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:op", OP_NS);
    this.extendedAttributes.set("xmlns:vt", VT_NS);
  }
}
