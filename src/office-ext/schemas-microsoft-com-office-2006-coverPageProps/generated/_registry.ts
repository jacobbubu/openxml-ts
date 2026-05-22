// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_coverPageProps.json

import type { ElementRegistry } from "../../../element/index.js";
import { register2006CoverPagePropsChildMaps } from "./_child-map.js";
import { CompanyAddress } from "./company-address.js";
import { CompanyEmailAddress } from "./company-email-address.js";
import { CompanyFaxNumber } from "./company-fax-number.js";
import { CompanyPhoneNumber } from "./company-phone-number.js";
import { CoverPageProperties } from "./cover-page-properties.js";
import { DocumentAbstract } from "./document-abstract.js";
import { PublishDate } from "./publish-date.js";

/**
 * 把 2006-coverPageProps 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register2006CoverPagePropsElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "CompanyAddress", CompanyAddress);
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "CompanyEmail", CompanyEmailAddress);
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "CompanyFax", CompanyFaxNumber);
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "CompanyPhone", CompanyPhoneNumber);
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "CoverPageProperties", CoverPageProperties);
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "Abstract", DocumentAbstract);
  registry.register("http://schemas.microsoft.com/office/2006/coverPageProps", "PublishDate", PublishDate);
  register2006CoverPagePropsChildMaps(registry);
}
