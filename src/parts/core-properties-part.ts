/**
 * `CorePropertiesPart` —— OPC 包级元数据 Part（`/docProps/core.xml`）。
 *
 * 根元素 `<cp:coreProperties>`，含 Dublin Core (dc:) + dcterms 元素描述文档
 * 标题 / 作者 / 创建时间等。Word/Excel/PPT 三族共用一份。
 *
 * codegen 不出这套 schema（独立于 SDK 主 schemas/）；root 用
 * \`OpenXmlUnknownElement\` 透传，外层 \`CoreProperties\` 类挂 typed 访问器。
 *
 * @see DocumentFormat.OpenXml.Packaging.CoreFilePropertiesPart
 */

import type { ElementRegistry, OpenXmlElement } from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

const CP_NS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
const DC_NS = "http://purl.org/dc/elements/1.1/";
const DCTERMS_NS = "http://purl.org/dc/terms/";
const XSI_NS = "http://www.w3.org/2001/XMLSchema-instance";

export class CorePropertiesPart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
  static readonly contentType = "application/vnd.openxmlformats-package.core-properties+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, CorePropertiesPlaceholder);
  }

  /** `<cp:coreProperties>` 根元素。 */
  get coreProperties(): OpenXmlElement {
    return this.root;
  }

  set coreProperties(value: OpenXmlElement) {
    this.root = value;
  }
}

/** 新建占位：空 \`<cp:coreProperties>\` 带 4 个标准 ns 声明。 */
class CorePropertiesPlaceholder extends OpenXmlUnknownElement {
  constructor() {
    super("cp", "coreProperties", CP_NS);
    this.extendedAttributes.set("xmlns:cp", CP_NS);
    this.extendedAttributes.set("xmlns:dc", DC_NS);
    this.extendedAttributes.set("xmlns:dcterms", DCTERMS_NS);
    this.extendedAttributes.set("xmlns:xsi", XSI_NS);
  }
}
