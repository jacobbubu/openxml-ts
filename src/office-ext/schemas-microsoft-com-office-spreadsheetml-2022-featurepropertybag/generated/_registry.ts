// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_featurepropertybag.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2022FeaturepropertybagChildMaps } from "./_child-map.js";
import { ArrayFeatureProperty } from "./array-feature-property.js";
import { BagExtensions } from "./bag-extensions.js";
import { ColumnBodyRevDxfTableRevDxf } from "./column-body-rev-dxf-table-rev-dxf.js";
import { ColumnHeaderRevDxfTableRevDxf } from "./column-header-rev-dxf-table-rev-dxf.js";
import { ColumnTotalsRevDxfTableRevDxf } from "./column-totals-rev-dxf-table-rev-dxf.js";
import { DataRevDxfTableRevDxf } from "./data-rev-dxf-table-rev-dxf.js";
import { DifferentialFormatType } from "./differential-format-type.js";
import { DXFComplement } from "./dxf-complement.js";
import { ExtensionList } from "./extension-list.js";
import { FeaturePropertyBag } from "./feature-property-bag.js";
import { FeaturePropertyBags } from "./feature-property-bags.js";
import { FpbsFeaturePropertyBags } from "./fpbs-feature-property-bags.js";
import { HeaderRowBorderRevDxfTableRevDxf } from "./header-row-border-rev-dxf-table-rev-dxf.js";
import { HeaderRowRevDxfTableRevDxf } from "./header-row-rev-dxf-table-rev-dxf.js";
import { RelXsdstring } from "./rel-xsdstring.js";
import { RevDxf } from "./rev-dxf.js";
import { StringFeatureProperty } from "./string-feature-property.js";
import { TableBorderRevDxfTableRevDxf } from "./table-border-rev-dxf-table-rev-dxf.js";
import { TotalsRowBorderRevDxfTableRevDxf } from "./totals-row-border-rev-dxf-table-rev-dxf.js";
import { TotalsRowRevDxfTableRevDxf } from "./totals-row-rev-dxf-table-rev-dxf.js";
import { XfComplement } from "./xf-complement.js";
import { Xsdboolean } from "./xsdboolean.js";
import { Xsddouble } from "./xsddouble.js";
import { Xsdinteger } from "./xsdinteger.js";
import { XsdunsignedInt } from "./xsdunsigned-int.js";

/**
 * 把 spreadsheetml-2022-featurepropertybag 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2022FeaturepropertybagElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "a", ArrayFeatureProperty);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "bagExt", BagExtensions);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "columnBodyRevDxf", ColumnBodyRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "columnHeaderRevDxf", ColumnHeaderRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "columnTotalsRevDxf", ColumnTotalsRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "dataRevDxf", DataRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "dxf", DifferentialFormatType);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "DXFComplement", DXFComplement);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "bag", FeaturePropertyBag);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "FeaturePropertyBags", FeaturePropertyBags);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "fpbs", FpbsFeaturePropertyBags);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "headerRowBorderRevDxf", HeaderRowBorderRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "headerRowRevDxf", HeaderRowRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "rel", RelXsdstring);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "revdxf", RevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "s", StringFeatureProperty);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "tableBorderRevDxf", TableBorderRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "totalsRowBorderRevDxf", TotalsRowBorderRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "totalsRowRevDxf", TotalsRowRevDxfTableRevDxf);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "xfComplement", XfComplement);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "b", Xsdboolean);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "d", Xsddouble);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "i", Xsdinteger);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag", "bagId", XsdunsignedInt);
  registerSpreadsheetml2022FeaturepropertybagChildMaps(registry);
}
