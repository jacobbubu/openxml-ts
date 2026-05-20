// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_custom-properties.json

import type { ElementRegistry } from "../../element/index.js";
import { CustomDocumentProperty } from "./custom-document-property.js";
import { Properties } from "./properties.js";

/**
 * 把 custom-properties 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerCustomPropertiesElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/custom-properties", "property", CustomDocumentProperty);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/custom-properties", "Properties", Properties);
}
