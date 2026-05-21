// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json

import type { ElementRegistry } from "../../../element/index.js";
import { ArrayData } from "./array-data.js";
import { CustomRichFilter } from "./custom-rich-filter.js";
import { CustomRichFilters } from "./custom-rich-filters.js";
import { Dxfs } from "./dxfs.js";
import { DynamicRichFilter } from "./dynamic-rich-filter.js";
import { ExtensionList } from "./extension-list.js";
import { RichDateGroupItem } from "./rich-date-group-item.js";
import { RichFilter } from "./rich-filter.js";
import { RichFilterColumn } from "./rich-filter-column.js";
import { RichFilters } from "./rich-filters.js";
import { RichFormatProperties } from "./rich-format-properties.js";
import { RichFormatProperty } from "./rich-format-property.js";
import { RichSortCondition } from "./rich-sort-condition.js";
import { RichStyle } from "./rich-style.js";
import { RichStylePropertyValue } from "./rich-style-property-value.js";
import { RichStyles } from "./rich-styles.js";
import { RichStylesheet } from "./rich-stylesheet.js";
import { RichTop10 } from "./rich-top10.js";
import { RichValueGlobalType } from "./rich-value-global-type.js";
import { RichValueType } from "./rich-value-type.js";
import { RichValueTypeKeyFlags } from "./rich-value-type-key-flags.js";
import { RichValueTypeReservedKey } from "./rich-value-type-reserved-key.js";
import { RichValueTypeReservedKeyFlag } from "./rich-value-type-reserved-key-flag.js";
import { RichValueTypes } from "./rich-value-types.js";
import { RichValueTypesInfo } from "./rich-value-types-info.js";
import { SupportingPropertyBag } from "./supporting-property-bag.js";
import { SupportingPropertyBagArray } from "./supporting-property-bag-array.js";
import { SupportingPropertyBagArrayData } from "./supporting-property-bag-array-data.js";
import { SupportingPropertyBagData } from "./supporting-property-bag-data.js";
import { SupportingPropertyBagKey } from "./supporting-property-bag-key.js";
import { SupportingPropertyBags } from "./supporting-property-bags.js";
import { SupportingPropertyBagStructure } from "./supporting-property-bag-structure.js";
import { SupportingPropertyBagStructures } from "./supporting-property-bag-structures.js";
import { SupportingPropertyBagValue } from "./supporting-property-bag-value.js";

/**
 * 把 spreadsheetml-2017-richdata2 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetml2017Richdata2Elements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "arrayData", ArrayData);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "customFilter", CustomRichFilter);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "customFilters", CustomRichFilters);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "dxfs", Dxfs);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "dynamicFilter", DynamicRichFilter);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "dateGroupItem", RichDateGroupItem);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "filter", RichFilter);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "filterColumn", RichFilterColumn);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "filters", RichFilters);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "richProperties", RichFormatProperties);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "rPr", RichFormatProperty);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "richSortCondition", RichSortCondition);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "rSty", RichStyle);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "rpv", RichStylePropertyValue);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "richStyles", RichStyles);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "richStyleSheet", RichStylesheet);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "top10", RichTop10);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "global", RichValueGlobalType);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "type", RichValueType);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "keyFlags", RichValueTypeKeyFlags);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "key", RichValueTypeReservedKey);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "flag", RichValueTypeReservedKeyFlag);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "types", RichValueTypes);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "rvTypesInfo", RichValueTypesInfo);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "spb", SupportingPropertyBag);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "a", SupportingPropertyBagArray);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "spbArrays", SupportingPropertyBagArrayData);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "spbData", SupportingPropertyBagData);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "k", SupportingPropertyBagKey);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "supportingPropertyBags", SupportingPropertyBags);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "s", SupportingPropertyBagStructure);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "spbStructures", SupportingPropertyBagStructures);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", "v", SupportingPropertyBagValue);
}
