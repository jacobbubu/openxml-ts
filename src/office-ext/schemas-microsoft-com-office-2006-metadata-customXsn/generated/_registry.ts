// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_metadata_customXsn.json

import type { ElementRegistry } from "../../../element/index.js";
import { CachedView } from "./cached-view.js";
import { CustomXsn } from "./custom-xsn.js";
import { OpenByDefault } from "./open-by-default.js";
import { Scope } from "./scope.js";
import { XsnLocation } from "./xsn-location.js";

/**
 * 把 2006-metadata-customXsn 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register2006MetadataCustomXsnElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2006/metadata/customXsn", "cached", CachedView);
  registry.register("http://schemas.microsoft.com/office/2006/metadata/customXsn", "customXsn", CustomXsn);
  registry.register("http://schemas.microsoft.com/office/2006/metadata/customXsn", "openByDefault", OpenByDefault);
  registry.register("http://schemas.microsoft.com/office/2006/metadata/customXsn", "xsnScope", Scope);
  registry.register("http://schemas.microsoft.com/office/2006/metadata/customXsn", "xsnLocation", XsnLocation);
}
