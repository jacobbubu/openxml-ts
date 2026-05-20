/**
 * Epic-57：Word 页眉 / 页脚文本简化访问器。
 *
 * 提供 6 个自由函数，让调用方以一行代码完成页眉 / 页脚的设置、读取和清除，
 * 无需手工管理 HeaderPart / FooterPart、sectPr 引用、rId 分配等底层细节。
 *
 * 公开 API：
 *   setDocumentHeader(doc, text, type?)  → HeaderPart
 *   setDocumentFooter(doc, text, type?)  → FooterPart
 *   getDocumentHeader(doc, type?)        → string | undefined
 *   getDocumentFooter(doc, type?)        → string | undefined
 *   clearDocumentHeader(doc, type?)      → void
 *   clearDocumentFooter(doc, type?)      → void
 *
 * 行为约定：
 *   - type 默认 "default"（每页均显示）。
 *   - set 幂等：若已存在同 type 的引用，直接更新其文本；否则新建 Part + 关系。
 *   - get 返回页眉 / 页脚第一段所有 `<w:t>` 拼接后的字符串；Part 不存在返 undefined。
 *   - clear 从 sectPr 移除对应 `<w:headerReference>` / `<w:footerReference>`，
 *     并删除 main 侧关系（Part bytes 由 OPC 层保留，不强制删 Part）。
 */

import { ElementRegistry } from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import type { IPackage, IPackageRelationship } from "../packaging/index.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { resolveRelativePartUri } from "../parts/relationship-uri.js";
import { registerWordprocessingElements } from "./generated/_registry.js";
import { Body } from "./generated/body.js";
import type { Document } from "./generated/document.js";
import { FooterReference } from "./generated/footer-reference.js";
import type { Footer } from "./generated/footer.js";
import { HeaderReference } from "./generated/header-reference.js";
import type { Header } from "./generated/header.js";
import { Paragraph } from "./generated/paragraph.js";
import { Run } from "./generated/run.js";
import { SectionProperties } from "./generated/section-properties.js";
import { Text } from "./generated/text.js";
import { FooterPart } from "./parts/footer-part.js";
import { HeaderPart } from "./parts/header-part.js";
import type { MainDocumentPart } from "./parts/main-document-part.js";
import type { WordprocessingDocument } from "./word-document.js";

// ─── 模块级 registry（与 word-document.ts 同样模式） ─────────────────────────

const wordRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerWordprocessingElements(r);
  return r;
})();

// ─── 模块级 Part 缓存（避免重复创建包装、保证读写同一个 in-memory 根） ──────────

/**
 * 按 doc → uri 缓存本模块创建的 HeaderPart / FooterPart 包装，
 * 使 set 后立即 get 能读到同一 in-memory 根，无需等待 flush。
 * WeakMap 保证 doc GC 后自动释放。
 */
const headerPartCache = new WeakMap<WordprocessingDocument, Map<string, HeaderPart>>();

const footerPartCache = new WeakMap<WordprocessingDocument, Map<string, FooterPart>>();

function getCachedHeader(doc: WordprocessingDocument, uri: string): HeaderPart | undefined {
  return headerPartCache.get(doc)?.get(uri);
}

function setCachedHeader(doc: WordprocessingDocument, uri: string, hp: HeaderPart): void {
  let m = headerPartCache.get(doc);
  if (m === undefined) {
    m = new Map();
    headerPartCache.set(doc, m);
  }
  m.set(uri, hp);
}

function removeCachedHeader(doc: WordprocessingDocument, uri: string): void {
  headerPartCache.get(doc)?.delete(uri);
}

function getCachedFooter(doc: WordprocessingDocument, uri: string): FooterPart | undefined {
  return footerPartCache.get(doc)?.get(uri);
}

function setCachedFooter(doc: WordprocessingDocument, uri: string, fp: FooterPart): void {
  let m = footerPartCache.get(doc);
  if (m === undefined) {
    m = new Map();
    footerPartCache.set(doc, m);
  }
  m.set(uri, fp);
}

function removeCachedFooter(doc: WordprocessingDocument, uri: string): void {
  footerPartCache.get(doc)?.delete(uri);
}

// ─── 公共类型 ────────────────────────────────────────────────────────────────

/** 页眉 / 页脚类型：default（每页）/ first（首页）/ even（偶数页）。 */
export type HeaderFooterType = "default" | "first" | "even";

// ─── setDocumentHeader ───────────────────────────────────────────────────────

/**
 * 设置文档页眉文本（幂等）。
 *
 * - 若 sectPr 已有同 `type` 的 `<w:headerReference>`，替换其 `<w:hdr>` 内容；
 * - 否则创建新的 HeaderPart + mainDocumentPart 关系，并在 sectPr 插入引用。
 *
 * @param doc  WordprocessingDocument 实例
 * @param text 页眉纯文本
 * @param type "default" / "first" / "even"，默认 "default"
 * @returns    HeaderPart 实例
 * @throws     OpenXmlPackageError 当 mainDocumentPart 不存在
 */
export function setDocumentHeader(
  doc: WordprocessingDocument,
  text: string,
  type: HeaderFooterType = "default",
): HeaderPart {
  const { main, pkg, sectPr } = resolveDocContext(doc);

  // 找已有的同 type headerReference
  for (const child of sectPr.children) {
    if (!(child instanceof HeaderReference)) continue;
    const refType = child.type?.toString() ?? child.extendedAttributes.get("w:type");
    if (refType !== type) continue;
    const relId = child.id?.toString() ?? child.extendedAttributes.get("r:id");
    if (relId === undefined) continue;
    // 尝试从模块缓存或 OPC 层拿 HeaderPart 包装
    const hp = resolveHeaderPart(doc, main.part.relationships, relId, pkg, main.part.uri);
    if (hp !== undefined) {
      fillRoot(hp.header, text);
      return hp;
    }
  }

  // 无现有引用 → 新建
  const { part: hp, relId } = doc.addHeader(text, type);
  // 把新建的包装存入缓存，供后续 get 直接读取
  setCachedHeader(doc, hp.part.uri, hp);
  // 确保 sectPr 里的 extendedAttributes 与新 relId 对齐（addHeader 已写，此处只做缓存）
  void relId;
  return hp;
}

// ─── setDocumentFooter ───────────────────────────────────────────────────────

/**
 * 设置文档页脚文本（幂等）。行为与 setDocumentHeader 对称。
 *
 * @param doc  WordprocessingDocument 实例
 * @param text 页脚纯文本
 * @param type "default" / "first" / "even"，默认 "default"
 * @returns    FooterPart 实例
 * @throws     OpenXmlPackageError 当 mainDocumentPart 不存在
 */
export function setDocumentFooter(
  doc: WordprocessingDocument,
  text: string,
  type: HeaderFooterType = "default",
): FooterPart {
  const { main, pkg, sectPr } = resolveDocContext(doc);

  for (const child of sectPr.children) {
    if (!(child instanceof FooterReference)) continue;
    const refType = child.type?.toString() ?? child.extendedAttributes.get("w:type");
    if (refType !== type) continue;
    const relId = child.id?.toString() ?? child.extendedAttributes.get("r:id");
    if (relId === undefined) continue;
    const fp = resolveFooterPart(doc, main.part.relationships, relId, pkg, main.part.uri);
    if (fp !== undefined) {
      fillRoot(fp.footer, text);
      return fp;
    }
  }

  const { part: fp, relId } = doc.addFooter(text, type);
  setCachedFooter(doc, fp.part.uri, fp);
  void relId;
  return fp;
}

// ─── getDocumentHeader ───────────────────────────────────────────────────────

/**
 * 读取文档页眉的纯文本（展平所有 `<w:t>`）。
 *
 * @param doc  WordprocessingDocument 实例
 * @param type "default" / "first" / "even"，默认 "default"
 * @returns    页眉文本字符串；Part 不存在 / sectPr 无对应引用返 undefined
 */
export function getDocumentHeader(
  doc: WordprocessingDocument,
  type: HeaderFooterType = "default",
): string | undefined {
  const ctx = tryResolveDocContext(doc);
  if (ctx === undefined) return undefined;
  const { main, pkg, sectPr } = ctx;

  for (const child of sectPr.children) {
    if (!(child instanceof HeaderReference)) continue;
    const refType = child.type?.toString() ?? child.extendedAttributes.get("w:type");
    if (refType !== type) continue;
    const relId = child.id?.toString() ?? child.extendedAttributes.get("r:id");
    if (relId === undefined) continue;
    const hp = resolveHeaderPart(doc, main.part.relationships, relId, pkg, main.part.uri);
    if (hp !== undefined) return extractText(hp.header);
  }
  return undefined;
}

// ─── getDocumentFooter ───────────────────────────────────────────────────────

/**
 * 读取文档页脚的纯文本（展平所有 `<w:t>`）。
 *
 * @param doc  WordprocessingDocument 实例
 * @param type "default" / "first" / "even"，默认 "default"
 * @returns    页脚文本字符串；Part 不存在 / sectPr 无对应引用返 undefined
 */
export function getDocumentFooter(
  doc: WordprocessingDocument,
  type: HeaderFooterType = "default",
): string | undefined {
  const ctx = tryResolveDocContext(doc);
  if (ctx === undefined) return undefined;
  const { main, pkg, sectPr } = ctx;

  for (const child of sectPr.children) {
    if (!(child instanceof FooterReference)) continue;
    const refType = child.type?.toString() ?? child.extendedAttributes.get("w:type");
    if (refType !== type) continue;
    const relId = child.id?.toString() ?? child.extendedAttributes.get("r:id");
    if (relId === undefined) continue;
    const fp = resolveFooterPart(doc, main.part.relationships, relId, pkg, main.part.uri);
    if (fp !== undefined) return extractText(fp.footer);
  }
  return undefined;
}

// ─── clearDocumentHeader ─────────────────────────────────────────────────────

/**
 * 移除文档页眉：从 sectPr 删除对应 `<w:headerReference>`，
 * 并删除 mainDocumentPart 侧的关系记录。
 *
 * @param doc  WordprocessingDocument 实例
 * @param type "default" / "first" / "even"，默认 "default"
 */
export function clearDocumentHeader(
  doc: WordprocessingDocument,
  type: HeaderFooterType = "default",
): void {
  const ctx = tryResolveDocContext(doc);
  if (ctx === undefined) return;
  const { main, pkg, sectPr } = ctx;

  const toRemove: HeaderReference[] = [];
  for (const child of sectPr.children) {
    if (!(child instanceof HeaderReference)) continue;
    const refType = child.type?.toString() ?? child.extendedAttributes.get("w:type");
    if (refType !== type) continue;
    const relId = child.id?.toString() ?? child.extendedAttributes.get("r:id");
    if (relId !== undefined) {
      // 清模块缓存
      const partUri = resolveRelIdToUri(main.part.relationships, relId, pkg, main.part.uri);
      if (partUri !== undefined) removeCachedHeader(doc, partUri);
      main.part.relationships.remove(relId);
    }
    toRemove.push(child);
  }
  for (const ref of toRemove) {
    sectPr.children.remove(ref);
  }
}

// ─── clearDocumentFooter ─────────────────────────────────────────────────────

/**
 * 移除文档页脚：从 sectPr 删除对应 `<w:footerReference>`，
 * 并删除 mainDocumentPart 侧的关系记录。
 *
 * @param doc  WordprocessingDocument 实例
 * @param type "default" / "first" / "even"，默认 "default"
 */
export function clearDocumentFooter(
  doc: WordprocessingDocument,
  type: HeaderFooterType = "default",
): void {
  const ctx = tryResolveDocContext(doc);
  if (ctx === undefined) return;
  const { main, pkg, sectPr } = ctx;

  const toRemove: FooterReference[] = [];
  for (const child of sectPr.children) {
    if (!(child instanceof FooterReference)) continue;
    const refType = child.type?.toString() ?? child.extendedAttributes.get("w:type");
    if (refType !== type) continue;
    const relId = child.id?.toString() ?? child.extendedAttributes.get("r:id");
    if (relId !== undefined) {
      const partUri = resolveRelIdToUri(main.part.relationships, relId, pkg, main.part.uri);
      if (partUri !== undefined) removeCachedFooter(doc, partUri);
      main.part.relationships.remove(relId);
    }
    toRemove.push(child);
  }
  for (const ref of toRemove) {
    sectPr.children.remove(ref);
  }
}

// ─── 内部工具 ─────────────────────────────────────────────────────────────────

interface DocContext {
  main: MainDocumentPart;
  pkg: IPackage;
  sectPr: SectionProperties;
}

/** 解析 doc context，缺 mainDocumentPart 或 sectPr 时抛错。 */
function resolveDocContext(doc: WordprocessingDocument): DocContext {
  const main = doc.mainDocumentPart;
  if (main === undefined) {
    throw new OpenXmlPackageError({
      code: "PART_NOT_FOUND",
      message: "header-footer-markup: mainDocumentPart is missing",
    });
  }
  const pkg = doc.package;
  const sectPr = findOrCreateSectPr(main.document);
  return { main, pkg, sectPr };
}

/** 解析 doc context，缺 mainDocumentPart 时返 undefined（get/clear 用）。 */
function tryResolveDocContext(doc: WordprocessingDocument): DocContext | undefined {
  const main = doc.mainDocumentPart;
  if (main === undefined) return undefined;
  const pkg = doc.package;
  const sectPr = findSectPr(main.document);
  if (sectPr === undefined) return undefined;
  return { main, pkg, sectPr };
}

/** 在 Document 内找 Body 的 `<w:sectPr>`；找不到就创建一个 append 到 body。 */
function findOrCreateSectPr(doc: Document): SectionProperties {
  const body = doc.firstChild(Body);
  if (body === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "header-footer-markup: document is missing body",
    });
  }
  for (const child of body.children) {
    if (child instanceof SectionProperties) return child;
  }
  const sectPr = new SectionProperties();
  body.appendChild(sectPr);
  return sectPr;
}

/** 在 Document 内找 Body 的 `<w:sectPr>`；找不到返 undefined。 */
function findSectPr(doc: Document): SectionProperties | undefined {
  const body = doc.firstChild(Body);
  if (body === undefined) return undefined;
  for (const child of body.children) {
    if (child instanceof SectionProperties) return child;
  }
  return undefined;
}

/** 把 `<w:hdr>` / `<w:ftr>` 的内容替换成单段单 Run 单 Text。 */
function fillRoot(root: Header | Footer, text: string): void {
  // 清空所有子节点
  for (const child of root.children.toArray()) {
    root.children.remove(child);
  }
  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = text;
  if (needsXmlSpacePreserve(text)) {
    t.extendedAttributes.set("xml:space", "preserve");
  }
  r.appendChild(t);
  p.appendChild(r);
  root.appendChild(p);
}

/** 展平 `<w:hdr>` / `<w:ftr>` 里所有 `<w:t>` 文本。 */
function extractText(root: Header | Footer): string {
  let buf = "";
  for (const t of root.descendants(Text)) {
    if (t.text !== undefined) buf += t.text;
  }
  return buf;
}

/**
 * 按 relId 解析 Part URI（不加载 Part）。
 * clear 时用于清缓存。
 */
function resolveRelIdToUri(
  relationships: Iterable<IPackageRelationship>,
  relId: string,
  pkg: IPackage,
  baseUri: PartUri,
): string | undefined {
  for (const rel of relationships) {
    if (rel.id !== relId) continue;
    const partUri = resolveRelativePartUri(baseUri, rel.target);
    if (partUri === undefined || !pkg.hasPart(partUri)) return undefined;
    return partUri;
  }
  return undefined;
}

/**
 * 按 relId 从关系集合里找 target → 优先从缓存返 HeaderPart，
 * 缓存未命中时从 OPC bytes 加载（round-trip 场景）。
 */
function resolveHeaderPart(
  doc: WordprocessingDocument,
  relationships: Iterable<IPackageRelationship>,
  relId: string,
  pkg: IPackage,
  baseUri: PartUri,
): HeaderPart | undefined {
  for (const rel of relationships) {
    if (rel.id !== relId) continue;
    const partUri = resolveRelativePartUri(baseUri, rel.target);
    if (partUri === undefined || !pkg.hasPart(partUri)) return undefined;
    // 优先从模块缓存取（避免重复包装 / bytes 未 flush 时内容丢失）
    const cached = getCachedHeader(doc, partUri);
    if (cached !== undefined) return cached;
    // 缓存未命中：从 OPC bytes 加载（round-trip 场景）
    const part = pkg.getPart(partUri);
    const hp = new HeaderPart(part, wordRegistry);
    setCachedHeader(doc, partUri, hp);
    return hp;
  }
  return undefined;
}

/** 按 relId 从关系集合里找 target → 优先从缓存返 FooterPart。 */
function resolveFooterPart(
  doc: WordprocessingDocument,
  relationships: Iterable<IPackageRelationship>,
  relId: string,
  pkg: IPackage,
  baseUri: PartUri,
): FooterPart | undefined {
  for (const rel of relationships) {
    if (rel.id !== relId) continue;
    const partUri = resolveRelativePartUri(baseUri, rel.target);
    if (partUri === undefined || !pkg.hasPart(partUri)) return undefined;
    const cached = getCachedFooter(doc, partUri);
    if (cached !== undefined) return cached;
    const part = pkg.getPart(partUri);
    const fp = new FooterPart(part, wordRegistry);
    setCachedFooter(doc, partUri, fp);
    return fp;
  }
  return undefined;
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
