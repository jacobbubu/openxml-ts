/**
 * ZIP 字节流 → 已解析的 OPC 状态。
 *
 * 处理步骤：
 * 1. 走 `@zip.js/zip.js` 枚举所有 entry，应用安全阈值（单包/总包字节、路径穿越）；
 * 2. 拣出 `[Content_Types].xml` 解析为 ContentTypeManifest（必需）；
 * 3. 把 `_rels/*.rels` 全部解析出来，先挂在「待结合」表里；
 * 4. 其它 entry 视为 Part（contentType 从 manifest 推导）；
 * 5. 把 .rels 解析结果合并到对应 owner（包级 / Part 级）。
 */

import {
  type Entry,
  type FileEntry,
  Uint8ArrayReader,
  Uint8ArrayWriter,
  ZipReader,
} from "@zip.js/zip.js";
import { ContentTypeManifest } from "../../packaging/content-types/index.js";
import { OpenXmlPackageError } from "../../packaging/errors.js";
import { type PartUri, isPartUri } from "../../packaging/interfaces/types.js";
import type { ParsedRelationship } from "../../packaging/relationships/index.js";
import { parseRelationshipsXml } from "../../packaging/relationships/index.js";
import { type ZipLimits, configureZipJs, resolveLimits } from "./zip-config.js";

const CONTENT_TYPES_ENTRY = "[Content_Types].xml";
const PACKAGE_RELS_ENTRY = "_rels/.rels";

export interface ParsedPart {
  readonly uri: PartUri;
  readonly contentType: string;
  readonly content: Uint8Array;
}

export interface ParsedZipPackage {
  readonly contentTypes: ContentTypeManifest;
  /** Part 在原 ZIP 中出现的顺序（用于 saveAs 字节级稳定）。 */
  readonly partOrder: PartUri[];
  readonly parts: Map<PartUri, ParsedPart>;
  /** 包级关系；未存在则为空数组。 */
  readonly packageRelationships: ParsedRelationship[];
  /** Part 级关系，key 为 owner Part URI。 */
  readonly partRelationships: Map<PartUri, ParsedRelationship[]>;
  /** 解析期发现但未阻断的异常情况（孤立 .rels 等），由 backend 转入 diagnostics。 */
  readonly warnings: readonly string[];
}

export async function parseZipBytes(
  bytes: Uint8Array,
  limitsInput?: Partial<ZipLimits>,
): Promise<ParsedZipPackage> {
  configureZipJs();
  const limits = resolveLimits(limitsInput);

  // 加密 OOXML 文档外层是 CFB（Compound File Binary，OLE 复合文档），magic
  // bytes 是 `D0 CF 11 E0 A1 B1 1A E1`。给出明确错误，不让用户看到迷惑的
  // 「End of central directory not found」ZIP 错误。
  // 与上游 dotnet/Open-XML-SDK 同策略：检测 + 拒绝；不实现解密。
  if (isCompoundFileBinary(bytes)) {
    throw new OpenXmlPackageError({
      code: "ENCRYPTED_PACKAGE_NOT_SUPPORTED",
      message:
        "Encrypted OOXML package detected (CFB container). openxml-ts does not implement decryption; pass an already-decrypted ZIP stream instead. See https://github.com/jacobbubu/openxml-ts/issues for the planned officecrypto-tool integration.",
    });
  }

  let zipReader: ZipReader<Uint8Array> | undefined;
  let entries: Entry[];
  try {
    zipReader = new ZipReader(new Uint8ArrayReader(bytes));
    entries = await zipReader.getEntries();
  } catch (err) {
    throw new OpenXmlPackageError({
      code: "INVALID_ZIP",
      message: `Cannot read ZIP container: ${(err as Error).message}`,
      cause: err,
    });
  }

  try {
    return await assembleFromEntries(entries, limits);
  } finally {
    if (zipReader !== undefined) await zipReader.close().catch(() => undefined);
  }
}

async function assembleFromEntries(entries: Entry[], limits: ZipLimits): Promise<ParsedZipPackage> {
  let totalBytes = 0;
  const partOrder: PartUri[] = [];
  const parts = new Map<PartUri, ParsedPart>();
  const partRelationships = new Map<PartUri, ParsedRelationship[]>();
  let contentTypes: ContentTypeManifest | undefined;
  let packageRelationships: ParsedRelationship[] = [];
  // 先缓存 .rels 解析结果，等到 parts 列表确定后再 attach
  const relsBuffer = new Map<string, ParsedRelationship[]>();

  for (const entry of entries) {
    if (entry.directory) continue;
    const filename = entry.filename;
    enforcePathSafety(filename);
    if (entry.uncompressedSize > limits.maxEntryBytes) {
      throw new OpenXmlPackageError({
        code: "SECURITY_VIOLATION",
        message: `Entry "${filename}" exceeds maxEntryBytes (${entry.uncompressedSize} > ${limits.maxEntryBytes})`,
      });
    }
    totalBytes += entry.uncompressedSize;
    if (totalBytes > limits.maxTotalBytes) {
      throw new OpenXmlPackageError({
        code: "SECURITY_VIOLATION",
        message: `Total uncompressed size exceeds maxTotalBytes (${totalBytes} > ${limits.maxTotalBytes})`,
      });
    }

    const bytes = await readEntryBytes(entry, filename);

    if (filename === CONTENT_TYPES_ENTRY) {
      contentTypes = ContentTypeManifest.parse(decodeText(bytes));
      continue;
    }
    if (filename === PACKAGE_RELS_ENTRY) {
      packageRelationships = parseRelationshipsXml(decodeText(bytes));
      continue;
    }
    if (isPartLevelRels(filename)) {
      relsBuffer.set(filename, parseRelationshipsXml(decodeText(bytes)));
      continue;
    }
    // 普通 Part
    const uri = filenameToPartUri(filename);
    if (parts.has(uri)) {
      throw new OpenXmlPackageError({
        code: "INVALID_ZIP",
        partUri: uri,
        message: `Duplicate Part "${uri}"`,
      });
    }
    parts.set(uri, {
      uri,
      contentType: "", // 稍后由 manifest 推导
      content: bytes,
    });
    partOrder.push(uri);
  }

  if (contentTypes === undefined) {
    throw new OpenXmlPackageError({
      code: "MISSING_CONTENT_TYPES",
      message: "[Content_Types].xml is missing from ZIP",
    });
  }

  // 用 manifest 回填 Part.contentType
  for (const uri of partOrder) {
    const ct = contentTypes.resolveContentType(uri);
    if (ct === undefined) {
      throw new OpenXmlPackageError({
        code: "CONTENT_TYPE_MISSING",
        partUri: uri,
      });
    }
    const existing = parts.get(uri);
    if (existing === undefined) continue;
    parts.set(uri, { ...existing, contentType: ct });
  }

  // 把 .rels 缓冲 attach 到 owner
  const orphanRels: string[] = [];
  for (const [relsName, rels] of relsBuffer) {
    const ownerUri = ownerOfPartRels(relsName);
    if (!parts.has(ownerUri)) {
      // 孤立 .rels：忽略而非报错，保持鲁棒（与 .NET 可观察行为一致）
      orphanRels.push(relsName);
      continue;
    }
    partRelationships.set(ownerUri, rels);
  }

  return {
    contentTypes,
    partOrder,
    parts,
    packageRelationships,
    partRelationships,
    warnings: orphanRels.map((name) => `Orphan part-level .rels ignored: ${name}`),
  };
}

async function readEntryBytes(entry: FileEntry, filename: string): Promise<Uint8Array> {
  try {
    return await entry.getData(new Uint8ArrayWriter());
  } catch (err) {
    throw new OpenXmlPackageError({
      code: "INVALID_ZIP",
      message: `Failed to read entry "${filename}": ${(err as Error).message}`,
      cause: err,
    });
  }
}

function decodeText(bytes: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

function enforcePathSafety(filename: string): void {
  if (filename.length === 0) {
    throw new OpenXmlPackageError({
      code: "SECURITY_VIOLATION",
      message: "Empty ZIP entry name",
    });
  }
  if (filename.startsWith("/") || filename.startsWith("\\")) {
    throw new OpenXmlPackageError({
      code: "SECURITY_VIOLATION",
      message: `Absolute path in ZIP entry "${filename}"`,
    });
  }
  if (filename.includes("\0")) {
    throw new OpenXmlPackageError({
      code: "SECURITY_VIOLATION",
      message: `NUL byte in ZIP entry "${filename}"`,
    });
  }
  const segments = filename.split(/[\\/]/);
  for (const seg of segments) {
    if (seg === "..") {
      throw new OpenXmlPackageError({
        code: "SECURITY_VIOLATION",
        message: `Path traversal in ZIP entry "${filename}"`,
      });
    }
  }
}

function filenameToPartUri(filename: string): PartUri {
  // ZIP 内部用 forward slash；规范化以接受 backslash 容差
  const normalized = `/${filename.replace(/\\/g, "/")}`;
  if (!isPartUri(normalized)) {
    throw new OpenXmlPackageError({
      code: "INVALID_PART_URI",
      message: `ZIP entry "${filename}" does not map to a valid OPC Part URI`,
    });
  }
  return normalized;
}

function isPartLevelRels(filename: string): boolean {
  // `_rels/.rels`（包级）已单独处理；这里只匹配 `<path>/_rels/<basename>.rels`
  return /(^|\/)_rels\/[^/]+\.rels$/.test(filename) && filename !== PACKAGE_RELS_ENTRY;
}

function ownerOfPartRels(filename: string): PartUri {
  // word/_rels/document.xml.rels → /word/document.xml
  const lastSlash = filename.lastIndexOf("/");
  const dir = filename.slice(0, lastSlash); // word/_rels
  const basename = filename.slice(lastSlash + 1); // document.xml.rels
  const partBasename = basename.replace(/\.rels$/, ""); // document.xml
  const parentDir = dir.replace(/\/?_rels$/, ""); // word
  const ownerPath = parentDir.length === 0 ? `/${partBasename}` : `/${parentDir}/${partBasename}`;
  return ownerPath as PartUri;
}

/**
 * 检测 Compound File Binary (CFB / OLE) magic：`D0 CF 11 E0 A1 B1 1A E1`。
 * 加密 OOXML 文档外层就是 CFB，里面装 `\EncryptionInfo` 与 `\EncryptedPackage`
 * 两个 stream（ECMA-376-4 §5.2 / MS-OFFCRYPTO）。
 */
const CFB_MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] as const;

function isCompoundFileBinary(bytes: Uint8Array): boolean {
  if (bytes.byteLength < CFB_MAGIC.length) return false;
  for (let i = 0; i < CFB_MAGIC.length; i += 1) {
    if (bytes[i] !== CFB_MAGIC[i]) return false;
  }
  return true;
}
