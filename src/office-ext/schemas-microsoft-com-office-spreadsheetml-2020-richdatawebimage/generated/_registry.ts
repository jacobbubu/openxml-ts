// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2020_richdatawebimage.json

import type { ElementRegistry } from "../../../element/index.js";
import { AddressWebImageSupportingRichDataRelationship } from "./address-web-image-supporting-rich-data-relationship.js";
import { BlipWebImageSupportingRichDataRelationship } from "./blip-web-image-supporting-rich-data-relationship.js";
import { ExtensionList } from "./extension-list.js";
import { MoreImagesAddressWebImageSupportingRichDataRelationship } from "./more-images-address-web-image-supporting-rich-data-relationship.js";
import { WebImagesSupportingRichData } from "./web-images-supporting-rich-data.js";
import { WebImageSupportingRichData } from "./web-image-supporting-rich-data.js";

/**
 * 把 spreadsheetml-2020-richdatawebimage 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetml2020RichdatawebimageElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage", "address", AddressWebImageSupportingRichDataRelationship);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage", "blip", BlipWebImageSupportingRichDataRelationship);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage", "moreImagesAddress", MoreImagesAddressWebImageSupportingRichDataRelationship);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage", "webImagesSrd", WebImagesSupportingRichData);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage", "webImageSrd", WebImageSupportingRichData);
}
