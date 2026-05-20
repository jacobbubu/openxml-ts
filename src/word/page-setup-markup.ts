/**
 * Epic-61：Word Section 页面设置访问器。
 *
 * 提供 6 个自由函数，以最少的代码完成页面尺寸、页边距和纸张方向的读写，
 * 无需手工操作 PageSize / PageMargin 元素细节。
 *
 * 公开 API：
 *   setPageSize(section, opts)        → void
 *   setPageMargin(section, opts)      → void
 *   getPageSize(section)              → { widthDxa, heightDxa, orientation? } | undefined
 *   getPageMargin(section)            → { ... } | undefined
 *   getDefaultSection(doc)            → SectionProperties | undefined
 *   ensureDefaultSection(doc)         → SectionProperties
 *
 * 单位：DXA（twentieths of a point，1 英寸 = 1440 DXA）。
 * A4 纸：宽 11906 DXA × 高 16838 DXA。
 * Letter 纸：宽 12240 DXA × 高 15840 DXA。
 */

import { Int32Value, StringValue, UInt32Value } from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import { Body } from "./generated/body.js";
import type { Document } from "./generated/document.js";
import { PageMargin } from "./generated/page-margin.js";
import { PageSize } from "./generated/page-size.js";
import { SectionProperties } from "./generated/section-properties.js";
import type { WordprocessingDocument } from "./word-document.js";

// ─── 公共类型 ────────────────────────────────────────────────────────────────

/** 页面尺寸选项（单位：DXA）。 */
export interface PageSizeOptions {
  /** 页面宽度（DXA）。A4 = 11906，Letter = 12240。 */
  widthDxa: number;
  /** 页面高度（DXA）。A4 = 16838，Letter = 15840。 */
  heightDxa: number;
  /** 纸张方向。默认不写 orient 属性（portrait）。 */
  orientation?: "portrait" | "landscape";
}

/** 页边距选项（单位：DXA）。所有字段均可选，未提供的保留原有值。 */
export interface PageMarginOptions {
  /** 上边距（DXA，Int32，可负）。 */
  topDxa?: number;
  /** 右边距（DXA，UInt32）。 */
  rightDxa?: number;
  /** 下边距（DXA，Int32，可负）。 */
  bottomDxa?: number;
  /** 左边距（DXA，UInt32）。 */
  leftDxa?: number;
  /** 页眉到顶边距离（DXA，UInt32）。 */
  headerDxa?: number;
  /** 页脚到底边距离（DXA，UInt32）。 */
  footerDxa?: number;
  /** 装订线（DXA，UInt32）。 */
  gutterDxa?: number;
}

/** getPageSize 返回值。 */
export interface PageSizeResult {
  widthDxa: number;
  heightDxa: number;
  orientation?: "portrait" | "landscape";
}

/** getPageMargin 返回值。所有字段均可能缺失（XML 属性未定义时）。 */
export interface PageMarginResult {
  topDxa?: number;
  rightDxa?: number;
  bottomDxa?: number;
  leftDxa?: number;
  headerDxa?: number;
  footerDxa?: number;
  gutterDxa?: number;
}

// ─── setPageSize ──────────────────────────────────────────────────────────────

/**
 * 设置节的页面尺寸和方向（幂等）。
 *
 * 若节内已有 `<w:pgSz>`，直接覆盖其属性；否则 append 新元素。
 *
 * @param section SectionProperties 实例（来自 getDefaultSection / ensureDefaultSection）
 * @param opts    widthDxa / heightDxa / orientation
 */
export function setPageSize(section: SectionProperties, opts: PageSizeOptions): void {
  let pgSz = section.firstChild(PageSize);
  if (pgSz === undefined) {
    pgSz = new PageSize();
    section.appendChild(pgSz);
  }
  pgSz.width = new UInt32Value(opts.widthDxa);
  pgSz.height = new UInt32Value(opts.heightDxa);
  if (opts.orientation !== undefined) {
    pgSz.orient = StringValue.parse(opts.orientation);
  } else {
    pgSz.orient = undefined;
  }
}

// ─── setPageMargin ────────────────────────────────────────────────────────────

/**
 * 设置节的页边距（合并更新，未提供的字段保留原有值）。
 *
 * 若节内已有 `<w:pgMar>`，只更新提供的字段；否则 append 新元素再写入。
 *
 * @param section SectionProperties 实例
 * @param opts    各方向边距，单位 DXA，所有字段可选
 */
export function setPageMargin(section: SectionProperties, opts: PageMarginOptions): void {
  let pgMar = section.firstChild(PageMargin);
  if (pgMar === undefined) {
    pgMar = new PageMargin();
    section.appendChild(pgMar);
  }
  if (opts.topDxa !== undefined) pgMar.top = Int32Value.parse(String(opts.topDxa));
  if (opts.rightDxa !== undefined) pgMar.right = new UInt32Value(opts.rightDxa);
  if (opts.bottomDxa !== undefined) pgMar.bottom = Int32Value.parse(String(opts.bottomDxa));
  if (opts.leftDxa !== undefined) pgMar.left = new UInt32Value(opts.leftDxa);
  if (opts.headerDxa !== undefined) pgMar.header = new UInt32Value(opts.headerDxa);
  if (opts.footerDxa !== undefined) pgMar.footer = new UInt32Value(opts.footerDxa);
  if (opts.gutterDxa !== undefined) pgMar.gutter = new UInt32Value(opts.gutterDxa);
}

// ─── getPageSize ──────────────────────────────────────────────────────────────

/**
 * 读取节的页面尺寸和方向。
 *
 * @param section SectionProperties 实例
 * @returns       { widthDxa, heightDxa, orientation? }；无 `<w:pgSz>` 或 width/height 缺失时返 undefined
 */
export function getPageSize(section: SectionProperties): PageSizeResult | undefined {
  const pgSz = section.firstChild(PageSize);
  if (pgSz === undefined) return undefined;
  const w = pgSz.width?.value;
  const h = pgSz.height?.value;
  if (w === undefined || h === undefined) return undefined;
  const orientStr = pgSz.orient?.value;
  if (orientStr === "portrait" || orientStr === "landscape") {
    return { widthDxa: w, heightDxa: h, orientation: orientStr };
  }
  return { widthDxa: w, heightDxa: h };
}

// ─── getPageMargin ────────────────────────────────────────────────────────────

/**
 * 读取节的页边距。
 *
 * @param section SectionProperties 实例
 * @returns       各方向边距对象；无 `<w:pgMar>` 时返 undefined
 */
export function getPageMargin(section: SectionProperties): PageMarginResult | undefined {
  const pgMar = section.firstChild(PageMargin);
  if (pgMar === undefined) return undefined;
  const result: PageMarginResult = {};
  if (pgMar.top?.value !== undefined) result.topDxa = pgMar.top.value;
  if (pgMar.right?.value !== undefined) result.rightDxa = pgMar.right.value;
  if (pgMar.bottom?.value !== undefined) result.bottomDxa = pgMar.bottom.value;
  if (pgMar.left?.value !== undefined) result.leftDxa = pgMar.left.value;
  if (pgMar.header?.value !== undefined) result.headerDxa = pgMar.header.value;
  if (pgMar.footer?.value !== undefined) result.footerDxa = pgMar.footer.value;
  if (pgMar.gutter?.value !== undefined) result.gutterDxa = pgMar.gutter.value;
  return result;
}

// ─── getDefaultSection ────────────────────────────────────────────────────────

/**
 * 获取文档默认节（body 中最后一个 `<w:sectPr>`）。
 *
 * OOXML 规范：body 末尾的 sectPr 为 document-level section（默认节）。
 *
 * @param doc WordprocessingDocument 实例
 * @returns   SectionProperties；不存在时返 undefined
 */
export function getDefaultSection(doc: WordprocessingDocument): SectionProperties | undefined {
  const main = doc.mainDocumentPart;
  if (main === undefined) return undefined;
  return findLastSectPr(main.document);
}

// ─── ensureDefaultSection ─────────────────────────────────────────────────────

/**
 * 获取文档默认节；不存在时自动创建并 append 到 body。
 *
 * @param doc WordprocessingDocument 实例
 * @returns   SectionProperties 实例
 * @throws    OpenXmlPackageError 当 mainDocumentPart 或 body 不存在
 */
export function ensureDefaultSection(doc: WordprocessingDocument): SectionProperties {
  const main = doc.mainDocumentPart;
  if (main === undefined) {
    throw new OpenXmlPackageError({
      code: "PART_NOT_FOUND",
      message: "page-setup-markup: mainDocumentPart is missing",
    });
  }
  const existing = findLastSectPr(main.document);
  if (existing !== undefined) return existing;

  const body = main.document.firstChild(Body);
  if (body === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "page-setup-markup: document is missing body",
    });
  }
  const sectPr = new SectionProperties();
  body.appendChild(sectPr);
  return sectPr;
}

// ─── 内部工具 ─────────────────────────────────────────────────────────────────

/**
 * 在 Document 的 body 中找最后一个 `<w:sectPr>`。
 * OOXML 中 body 末尾的 sectPr 是 document-level section。
 */
function findLastSectPr(doc: Document): SectionProperties | undefined {
  const body = doc.firstChild(Body);
  if (body === undefined) return undefined;
  let last: SectionProperties | undefined;
  for (const child of body.children) {
    if (child instanceof SectionProperties) last = child;
  }
  return last;
}
