// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_customXml.json

import type { ElementRegistry } from "../../element/index.js";
import { DataStoreItem } from "./data-store-item.js";
import { SchemaReference } from "./schema-reference.js";
import { SchemaReferences } from "./schema-references.js";

/**
 * 把 customXml 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerCustomXmlElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/customXml", "datastoreItem", DataStoreItem);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/customXml", "schemaRef", SchemaReference);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/customXml", "schemaRefs", SchemaReferences);
}
