/**
 * Flat OPC 反序列化入口。
 *
 * 与 {@link MemoryOpenXmlPackage.toFlatOpc} 对称：
 * - `toFlatOpc()` —— 实例方法，输出 Flat OPC 字符串；
 * - `fromFlatOpcAsync(xml)` —— 顶层异步工厂，吃 Flat OPC 字符串还原成包。
 *
 * 标 async 是为了和 `openAsync` 同形态——即便当前实现没有真正的 I/O，
 * 未来若需要支持 ReadableStream 输入也不会破坏调用方签名。
 */

import type { OpenXmlPackage } from "../core/open-xml-package.js";
import { FlatOpcLoader } from "./flat-opc-loader.js";
import { parseFlatOpc } from "./flat-opc-parser.js";

export async function fromFlatOpcAsync(xml: string): Promise<OpenXmlPackage> {
  const parsed = parseFlatOpc(xml);
  const loader = new FlatOpcLoader();
  loader.loadFromParsed(parsed);
  return loader;
}
