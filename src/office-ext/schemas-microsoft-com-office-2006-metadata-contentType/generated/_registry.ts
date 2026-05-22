// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_metadata_contentType.json

import type { ElementRegistry } from "../../../element/index.js";
import { register2006MetadataContentTypeChildMaps } from "./_child-map.js";
import { ContentTypeSchema } from "./content-type-schema.js";

/**
 * 把 2006-metadata-contentType 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register2006MetadataContentTypeElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2006/metadata/contentType", "contentTypeSchema", ContentTypeSchema);
  register2006MetadataContentTypeChildMaps(registry);
}
