/**
 * 把 ParsedFlatOpc 灌注到一个 MemoryOpenXmlPackage 子类里。
 *
 * 为什么子类化：MemoryOpenXmlPackage 的 insertPart 是 protected，避免外部误用；
 * 这里继承一下让加载逻辑能直接调用，同时保留 protected 的语义边界。
 */

import { MemoryOpenXmlPackage } from "../../backends/memory/memory-package.js";
import { ContentTypeManifest } from "../content-types/index.js";
import { OpenXmlPackageError } from "../errors.js";
import { type PartUri, isPartUri } from "../interfaces/types.js";
import { type ParsedRelationship, parseRelationshipsXml } from "../relationships/index.js";
import type { FlatOpcEntry, ParsedFlatOpc } from "./flat-opc-parser.js";

const CONTENT_TYPES_NAME = "/[Content_Types].xml";
const PACKAGE_RELS_NAME = "/_rels/.rels";

/**
 * 把 {@link parseFlatOpc} 解析出来的 Flat OPC 内容加载到一个内存 OpenXmlPackage。
 *
 * 用法：`new FlatOpcLoader().loadFromParsed(parseFlatOpc(xml))`——之后这个实例就
 * 可以当一般 OPC 包用（hasPart / getPart / saveAs* 等）。
 */
export class FlatOpcLoader extends MemoryOpenXmlPackage {
  loadFromParsed(parsed: ParsedFlatOpc): void {
    const manifest = pickContentTypes(parsed.entries);
    // 1) 把 manifest 拷到本实例
    for (const def of manifest.defaults()) {
      this.contentTypes.addDefault(def.extension, def.contentType);
    }
    for (const ov of manifest.overrides()) {
      this.contentTypes.addOverride(ov.partName, ov.contentType);
    }

    // 2) 收集 .rels（包级 + Part 级），放进 buffer 等 Part 创建完后再 attach
    let packageRels: ParsedRelationship[] = [];
    const partRelsBuffer = new Map<PartUri, ParsedRelationship[]>();

    // 3) 按出现顺序灌 Part（跳过 manifest 与 .rels 条目）
    for (const entry of parsed.entries) {
      if (entry.name === CONTENT_TYPES_NAME) continue;
      if (entry.name === PACKAGE_RELS_NAME) {
        packageRels = parseRelationshipsXml(decodeText(entry.content));
        continue;
      }
      const ownerOfRels = ownerForPartLevelRels(entry.name);
      if (ownerOfRels !== undefined) {
        partRelsBuffer.set(ownerOfRels, parseRelationshipsXml(decodeText(entry.content)));
        continue;
      }
      // 普通 Part
      this.insertPart(entry.name, entry.contentType, "normal", entry.content);
    }

    // 4) 包级关系
    for (const rel of packageRels) {
      this.relationships.create({
        id: rel.id,
        type: rel.type,
        target: rel.target,
        targetMode: rel.targetMode,
      });
    }

    // 5) Part 级关系
    for (const [ownerUri, rels] of partRelsBuffer) {
      if (!this.hasPart(ownerUri)) continue; // 孤立 .rels：静默丢弃
      const owner = this.getPart(ownerUri);
      for (const rel of rels) {
        owner.relationships.create({
          id: rel.id,
          type: rel.type,
          target: rel.target,
          targetMode: rel.targetMode,
        });
      }
    }
  }
}

function pickContentTypes(entries: FlatOpcEntry[]): ContentTypeManifest {
  for (const entry of entries) {
    if (entry.name === CONTENT_TYPES_NAME) {
      return ContentTypeManifest.parse(decodeText(entry.content));
    }
  }
  throw new OpenXmlPackageError({
    code: "MISSING_CONTENT_TYPES",
    message: "Flat OPC missing /[Content_Types].xml part",
  });
}

function decodeText(bytes: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

function ownerForPartLevelRels(uri: string): PartUri | undefined {
  // /word/_rels/document.xml.rels → /word/document.xml
  // /xl/_rels/sheet1.xml.rels   → /xl/sheet1.xml
  // /_rels/.rels                → 包级（已单独处理）
  const m = uri.match(/^\/((?:.+\/)?)(_rels)\/(.+)\.rels$/);
  if (m === null) return undefined;
  const dir = m[1] ?? ""; // "word/" or ""
  const basename = m[3] ?? ""; // "document.xml"
  if (basename.length === 0) return undefined;
  const owner = `/${dir}${basename}`;
  if (!isPartUri(owner)) return undefined;
  return owner;
}
