/**
 * MemoryOpenXmlPackage 状态 → ZIP 字节流。
 *
 * 写出顺序（PRD §FR-6.2、Architecture §4）：
 * 1. `[Content_Types].xml`
 * 2. `_rels/.rels`（包级关系；空则跳过）
 * 3. 每个 Part：先内容，再它的 `_rels/<basename>.rels`（关系非空时）
 *
 * Part 间顺序使用 `MemoryOpenXmlPackage.partOrder`（保留 open 时的原序，
 * 新增的 Part 追加到末尾），用于支持字节级稳定 diff。
 */

import { Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } from "@zip.js/zip.js";
import type { CompressionLevel } from "../../packaging/interfaces/types.js";
import type { MemoryPackagePart } from "../memory/memory-package-part.js";
import type { MemoryOpenXmlPackage } from "../memory/memory-package.js";
import { configureZipJs } from "./zip-config.js";

/**
 * 把 Memory 状态序列化为 ZIP 字节流。
 *
 * 注意：调用方必须保证 `pkg` 在调用过程中不被 mutate。
 */
export async function packageToZipBytes(pkg: MemoryOpenXmlPackage): Promise<Uint8Array> {
  configureZipJs();
  const out = new Uint8ArrayWriter();
  const writer = new ZipWriter(out, { bufferedWrite: true });
  try {
    // 1) [Content_Types].xml
    await writer.add(
      "[Content_Types].xml",
      new Uint8ArrayReader(encode(pkg.contentTypes.serialize())),
      { level: 6 },
    );

    // 2) /_rels/.rels（包级，非空才写）
    if (pkg.relationships.count > 0) {
      await writer.add(
        "_rels/.rels",
        new Uint8ArrayReader(encode(pkg.relationships.serializeXml())),
        { level: 6 },
      );
    }

    // 3) 各 Part 与其 .rels
    const orderedParts = orderPartsForWrite(pkg);
    for (const part of orderedParts) {
      const zipName = part.uri.replace(/^\//, "");
      await writer.add(zipName, new Uint8ArrayReader(part.snapshot()), {
        level: levelFor(part.compression),
      });
      if (part.relationships.count > 0) {
        await writer.add(
          relsPathFor(zipName),
          new Uint8ArrayReader(encode(part.relationships.serializeXml())),
          { level: 6 },
        );
      }
    }

    return await writer.close();
  } catch (err) {
    try {
      await writer.close();
    } catch {
      /* ignore */
    }
    throw err;
  }
}

function orderPartsForWrite(pkg: MemoryOpenXmlPackage): MemoryPackagePart[] {
  // 优先按 partOrder，把 partOrder 之外的 Part（理论上不会出现）追加到末尾
  const ordered: MemoryPackagePart[] = [];
  const seen = new Set<string>();
  for (const uri of pkg.partOrderSnapshot()) {
    const part = pkg.getPart(uri);
    ordered.push(part);
    seen.add(uri);
  }
  for (const part of pkg.parts()) {
    if (!seen.has(part.uri)) ordered.push(part);
  }
  return ordered;
}

function relsPathFor(zipName: string): string {
  // word/document.xml → word/_rels/document.xml.rels
  // header.xml → _rels/header.xml.rels
  const lastSlash = zipName.lastIndexOf("/");
  if (lastSlash === -1) return `_rels/${zipName}.rels`;
  const dir = zipName.slice(0, lastSlash);
  const file = zipName.slice(lastSlash + 1);
  return `${dir}/_rels/${file}.rels`;
}

function levelFor(c: CompressionLevel): number {
  switch (c) {
    case "none":
      return 0;
    case "fast":
      return 1;
    case "normal":
      return 6;
    case "max":
      return 9;
  }
}

function encode(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}
