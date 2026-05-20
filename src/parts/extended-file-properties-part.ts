/**
 * `ExtendedFilePropertiesPart` —— OPC 包级扩展属性 Part（`/docProps/app.xml`）。
 *
 * 根元素 `<ap:Properties>`，含应用程序名称、版本、公司名称等文档元数据。
 * Word/Excel/PPT 三族共用一份，属包级关系（package-level relationship）。
 *
 * Registry 注册 extended-properties（ap:）+ doc-props-vtypes（vt:）两个命名空间，
 * 使反序列化时 `<ap:HeadingPairs>` 内的 `<vt:vector>` 等子元素能被正确解析。
 *
 * @see DocumentFormat.OpenXml.Packaging.ExtendedFilePropertiesPart
 */

import { registerDocPropsVTypesElements } from "../doc-props-vtypes/generated/_registry.js";
import { ElementRegistry } from "../element/index.js";
import { registerExtendedPropertiesElements } from "../extended-properties/generated/_registry.js";
import { Properties } from "../extended-properties/generated/properties.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

const AP_NS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";

/** 模块级专用 registry：extended-properties + doc-props-vtypes（vt: 子元素）。 */
const extendedPropertiesRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerExtendedPropertiesElements(r);
  registerDocPropsVTypesElements(r);
  return r;
})();

export class ExtendedFilePropertiesPart extends TypedXmlPart<Properties> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.extended-properties+xml";

  constructor(part: IPackagePart, _registry: ElementRegistry = extendedPropertiesRegistry) {
    super(part, extendedPropertiesRegistry, ExtendedPropertiesPlaceholder);
  }

  /** `<ap:Properties>` 根元素。 */
  get properties(): Properties {
    return this.root;
  }

  set properties(value: Properties) {
    this.root = value;
  }
}

/** 新建占位：空 `<ap:Properties>` 带命名空间声明。 */
class ExtendedPropertiesPlaceholder extends Properties {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:ap", AP_NS);
  }
}
