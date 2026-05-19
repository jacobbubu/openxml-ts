/**
 * Epic-35：Word `Paragraph.tabStops` 访问器 mixin。
 *
 * 给 Paragraph.prototype 挂 getter/setter，封装段落 `<w:pPr><w:tabs><w:tab ...></w:tabs></w:pPr>`。
 *
 * - 单位：positionDxa（dxa，1 inch = 1440 dxa）
 * - setter 接受 ParagraphTabStop[] | undefined：传 undefined 删 `<w:tabs>`；传数组整体替换
 * - getter 返回按 position 升序排序的数组；未设返 undefined
 * - pPr 不存在时自动创建并插入为 Paragraph 第一个 child（与 Epic-30/31 同构）
 */

import { Int32Value, StringValue } from "../../element/index.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { Paragraph } from "../generated/paragraph.js";
import { TabStop } from "../generated/tab-stop.js";
import { Tabs } from "../generated/tabs.js";

export type TabAlignment = "left" | "center" | "right" | "decimal" | "bar" | "clear";
export type TabLeader = "none" | "dot" | "hyphen" | "underscore" | "heavy" | "middleDot";

export interface ParagraphTabStop {
  /** 位置（dxa）。 */
  readonly positionDxa: number;
  /** 对齐方式。未传等同于 "left"。 */
  readonly alignment?: TabAlignment;
  /** 制表前导符。未传 / "none" 都表示无前导符。 */
  readonly leader?: TabLeader;
}

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /**
     * 段落自定义制表位列表。读不到返 undefined。setter undefined 删 `<w:tabs>`；
     * 传数组时整体替换（自动按 positionDxa 升序写入）。
     */
    tabStops: ParagraphTabStop[] | undefined;
  }
}

Object.defineProperty(Paragraph.prototype, "tabStops", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): ParagraphTabStop[] | undefined {
    const pPr = this.firstChild(ParagraphProperties);
    const tabs = pPr?.firstChild(Tabs);
    if (tabs === undefined) return undefined;
    const out: ParagraphTabStop[] = [];
    for (const c of tabs.children) {
      if (!(c instanceof TabStop)) continue;
      const p = c.position;
      if (p === undefined) continue;
      const positionDxa = Number.parseInt(p.toString(), 10);
      if (!Number.isFinite(positionDxa)) continue;
      const stop: { -readonly [K in keyof ParagraphTabStop]: ParagraphTabStop[K] } = {
        positionDxa,
      };
      const v = c.val?.toString();
      if (v !== undefined) stop.alignment = v as TabAlignment;
      const l = c.leader?.toString();
      if (l !== undefined) stop.leader = l as TabLeader;
      out.push(stop);
    }
    out.sort((a, b) => a.positionDxa - b.positionDxa);
    return out.length === 0 ? undefined : out;
  },
  set(this: Paragraph, value: ParagraphTabStop[] | undefined): void {
    let pPr = this.firstChild(ParagraphProperties);
    if (value === undefined || value.length === 0) {
      if (pPr === undefined) return;
      const existing = pPr.firstChild(Tabs);
      if (existing !== undefined) pPr.children.remove(existing);
      return;
    }
    if (pPr === undefined) {
      pPr = new ParagraphProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(pPr);
      else this.children.insertBefore(pPr, first);
    }
    let tabs = pPr.firstChild(Tabs);
    if (tabs === undefined) {
      tabs = new Tabs();
      pPr.appendChild(tabs);
    } else {
      tabs.children.clear();
    }
    const sorted = [...value].sort((a, b) => a.positionDxa - b.positionDxa);
    for (const t of sorted) {
      const ts = new TabStop();
      ts.position = Int32Value.parse(String(t.positionDxa));
      if (t.alignment !== undefined) ts.val = StringValue.parse(t.alignment);
      if (t.leader !== undefined) ts.leader = StringValue.parse(t.leader);
      tabs.appendChild(ts);
    }
  },
});
