// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_docPropsVTypes.json

import type { ElementRegistry } from "../../element/index.js";
import { Variant } from "./variant.js";
import { VTArray } from "./vt-array.js";
import { VTBlob } from "./vt-blob.js";
import { VTBool } from "./vt-bool.js";
import { VTBString } from "./vtb-string.js";
import { VTByte } from "./vt-byte.js";
import { VTClassId } from "./vt-class-id.js";
import { VTClipboardData } from "./vt-clipboard-data.js";
import { VTCurrency } from "./vt-currency.js";
import { VTDate } from "./vt-date.js";
import { VTDecimal } from "./vt-decimal.js";
import { VTDouble } from "./vt-double.js";
import { VTEmpty } from "./vt-empty.js";
import { VTError } from "./vt-error.js";
import { VTFileTime } from "./vt-file-time.js";
import { VTFloat } from "./vt-float.js";
import { VTInt32 } from "./vt-int32.js";
import { VTInt64 } from "./vt-int64.js";
import { VTInteger } from "./vt-integer.js";
import { VTLPSTR } from "./vtlpstr.js";
import { VTLPWSTR } from "./vtlpwstr.js";
import { VTNull } from "./vt-null.js";
import { VTOBlob } from "./vto-blob.js";
import { VTOStorage } from "./vto-storage.js";
import { VTOStreamData } from "./vto-stream-data.js";
import { VTShort } from "./vt-short.js";
import { VTStorage } from "./vt-storage.js";
import { VTStreamData } from "./vt-stream-data.js";
import { VTUnsignedByte } from "./vt-unsigned-byte.js";
import { VTUnsignedInt32 } from "./vt-unsigned-int32.js";
import { VTUnsignedInt64 } from "./vt-unsigned-int64.js";
import { VTUnsignedInteger } from "./vt-unsigned-integer.js";
import { VTUnsignedShort } from "./vt-unsigned-short.js";
import { VTVector } from "./vt-vector.js";
import { VTVStreamData } from "./vtv-stream-data.js";

/**
 * 把 docPropsVTypes 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDocPropsVTypesElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "variant", Variant);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "array", VTArray);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "blob", VTBlob);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "bool", VTBool);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "bstr", VTBString);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "i1", VTByte);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "clsid", VTClassId);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "cf", VTClipboardData);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "cy", VTCurrency);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "date", VTDate);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "decimal", VTDecimal);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "r8", VTDouble);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "empty", VTEmpty);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "error", VTError);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "filetime", VTFileTime);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "r4", VTFloat);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "i4", VTInt32);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "i8", VTInt64);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "int", VTInteger);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "lpstr", VTLPSTR);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "lpwstr", VTLPWSTR);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "null", VTNull);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "oblob", VTOBlob);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "ostorage", VTOStorage);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "ostream", VTOStreamData);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "i2", VTShort);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "storage", VTStorage);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "stream", VTStreamData);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "ui1", VTUnsignedByte);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "ui4", VTUnsignedInt32);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "ui8", VTUnsignedInt64);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "uint", VTUnsignedInteger);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "ui2", VTUnsignedShort);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "vector", VTVector);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", "vstream", VTVStreamData);
}
