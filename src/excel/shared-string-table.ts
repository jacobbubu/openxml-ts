/**
 * SharedStringTable 跨 Part 解引用（Story-3.4 / Architecture §4）。
 *
 * Excel 把所有共享字符串集中放在 `xl/sharedStrings.xml`：
 *
 *     <sst count="3" uniqueCount="3">
 *       <si><t>Apple</t></si>
 *       <si><t>Banana</t></si>
 *       <si><t>Cherry</t></si>
 *     </sst>
 *
 * 而 typed cell `<c t="s"><v>0</v></c>` 的 `0` 是指向第 0 项的索引。本模块
 * 提供 `SharedStringResolver`：
 * - `resolve(idx)` —— 解出第 idx 项的纯文本（拼接所有 `<t>` 段，含 `<r><t>`
 *   富文本运行；越界 / 无 `<si>` 返回 undefined）；
 * - `intern(phrase)` —— 把 phrase 加入表；若已存在直接返回既有 index，
 *   不重复入表（Architecture §4.3：「intern 不是 appendItem」）。
 *
 * 跨 Part 注册机制：本模块维护一个 `WeakMap<Worksheet, SharedStringResolver>`，
 * typed Part 层（或 SpreadsheetDocument 门面）在加载 worksheet 时把对应的
 * resolver 写进去；`Cell.resolvedText` getter（参 `cell-extensions.ts`）
 * 走 parent 链反向找到 Worksheet 后从 WeakMap 取出。
 */

import type { OpenXmlCompositeElement } from "../element/index.js";
import { SharedStringItem } from "./generated/shared-string-item.js";
import type { SharedStringTable } from "./generated/shared-string-table.js";
import { Text } from "./generated/text.js";
import type { Worksheet } from "./generated/worksheet.js";

export class SharedStringResolver {
  /** phrase → index 反向索引，构造时一次性建表。 */
  private readonly index: Map<string, number>;

  constructor(private readonly sst: SharedStringTable) {
    this.index = new Map();
    let i = 0;
    for (const si of sst.elements(SharedStringItem)) {
      const phrase = SharedStringResolver.collectText(si);
      if (!this.index.has(phrase)) this.index.set(phrase, i);
      i += 1;
    }
  }

  /** 第 idx 个共享串的解析后文本；越界 / 无 si 返回 undefined。 */
  resolve(idx: number): string | undefined {
    if (!Number.isInteger(idx) || idx < 0) return undefined;
    let i = 0;
    for (const si of this.sst.elements(SharedStringItem)) {
      if (i === idx) return SharedStringResolver.collectText(si);
      i += 1;
    }
    return undefined;
  }

  /**
   * 把 phrase 加入共享串池；若已存在则返回既有 index（强制去重）。
   * 复杂度：O(1) Map 查询 + O(1) 追加（不含解析）。
   */
  intern(phrase: string): number {
    const existing = this.index.get(phrase);
    if (existing !== undefined) return existing;
    const si = new SharedStringItem();
    const t = new Text();
    t.text = phrase;
    si.appendChild(t);
    this.sst.appendChild(si);
    const idx = this.index.size;
    this.index.set(phrase, idx);
    return idx;
  }

  /** 拼 `<si>` 下所有 `<t>` 文本（同时覆盖 `<si><t>` 与 `<si><r><t>` 两种形态）。 */
  static collectText(si: OpenXmlCompositeElement): string {
    let buf = "";
    for (const t of si.descendants(Text)) {
      if (t.text !== undefined) buf += t.text;
    }
    return buf;
  }
}

// ─── Cross-Part registration（Architecture §4） ─────────────────────────

const worksheetResolverRegistry = new WeakMap<Worksheet, SharedStringResolver>();

/**
 * 注册一个 Worksheet 实例与其 SharedStringResolver 的对应。typed Part /
 * SpreadsheetDocument 在加载 worksheet 树后调用一次；`Cell.resolvedText`
 * getter 通过 `getResolverForWorksheet` 反查。
 */
export function registerSharedStringResolver(
  worksheet: Worksheet,
  resolver: SharedStringResolver,
): void {
  worksheetResolverRegistry.set(worksheet, resolver);
}

/** 给 cell-extensions 用的反查；返回 undefined 表示孤儿 Cell 或未注册。 */
export function getResolverForWorksheet(worksheet: Worksheet): SharedStringResolver | undefined {
  return worksheetResolverRegistry.get(worksheet);
}
