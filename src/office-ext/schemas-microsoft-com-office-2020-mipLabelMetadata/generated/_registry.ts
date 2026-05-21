// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2020_mipLabelMetadata.json

import type { ElementRegistry } from "../../../element/index.js";
import { ClassificationExtension } from "./classification-extension.js";
import { ClassificationExtensionList } from "./classification-extension-list.js";
import { ClassificationLabel } from "./classification-label.js";
import { ClassificationLabelList } from "./classification-label-list.js";

/**
 * 把 2020-mipLabelMetadata 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register2020MipLabelMetadataElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2020/mipLabelMetadata", "ext", ClassificationExtension);
  registry.register("http://schemas.microsoft.com/office/2020/mipLabelMetadata", "extLst", ClassificationExtensionList);
  registry.register("http://schemas.microsoft.com/office/2020/mipLabelMetadata", "label", ClassificationLabel);
  registry.register("http://schemas.microsoft.com/office/2020/mipLabelMetadata", "labelList", ClassificationLabelList);
}
