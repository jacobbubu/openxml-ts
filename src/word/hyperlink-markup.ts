/**
 * Story-15.1：Word 超链接 markup 助手。
 *
 * 一行返完整 `<w:hyperlink>` 节点（含内嵌 Run + 蓝色下划线字符样式），调用方
 * `paragraph.appendChild(hyperlink)` 即可。
 *
 * 两种目标二选一：
 *
 * 1. **外链**——`{ relId }`：调用方先用
 *    `WordprocessingDocument.addHyperlinkRelationship(url)` 拿 relId，再把 relId
 *    传进来，markup 走 `<w:hyperlink r:id="rIdN">…</w:hyperlink>`；
 * 2. **内链**——`{ anchor }`：定位到同文档里的书签 / 标题，markup 走
 *    `<w:hyperlink w:anchor="bookmark1">…</w:hyperlink>`，不需要 relationship。
 *
 * 默认套用 Word 内置的 `Hyperlink` 字符样式（蓝色下划线），自动写入
 * `<w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr>`。
 */

import { StringValue } from "../element/index.js";
import { Hyperlink } from "./generated/hyperlink.js";
import { RunProperties } from "./generated/run-properties.js";
import { RunStyle } from "./generated/run-style.js";
import { Run } from "./generated/run.js";
import { Text } from "./generated/text.js";

const R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

/**
 * `createHyperlinkRun` 入参——`relId` 与 `anchor` 二选一必填。
 */
export type CreateHyperlinkRunOptions = {
  /** 链接文本（必填）。 */
  readonly text: string;
  /** 浮出提示（hover tooltip）；为空则不写。 */
  readonly tooltip?: string;
  /** 是否记入「已访问历史」（点过后变紫色）；默认 true。 */
  readonly history?: boolean;
  /**
   * 应用到内嵌 Run 的字符样式 id。默认 "Hyperlink"（Word 内置蓝色下划线）。
   * 传空串 "" 时不写 rStyle（用户的样式表里没有该样式时回退方案）。
   */
  readonly style?: string;
} & (
  | {
      /** 外链：用 `addHyperlinkRelationship(url)` 拿到的 relId。 */
      readonly relId: string;
      readonly anchor?: never;
    }
  | {
      /** 内链：同文档书签 / 标题 anchor 名（不含 `#`）。 */
      readonly anchor: string;
      readonly relId?: never;
    }
);

/**
 * 给定目标与文本，返一个完整可挂的 `<w:hyperlink>` 节点。
 *
 * 节点上额外声明 `xmlns:r`——让本 Hyperlink 即便在未声明 r ns 的祖先树里独立
 * serialize 也合法。
 */
export function createHyperlinkRun(options: CreateHyperlinkRunOptions): Hyperlink {
  const link = new Hyperlink();
  // 总是声明 xmlns:r：外链场景 r:id 是 typed 属性必须有 ns；内链场景多写一个
  // ns 攻击面极小，换来「独立 serialize 合法」的可移植性。
  link.extendedAttributes.set("xmlns:r", R_NS);

  if ("relId" in options && options.relId !== undefined) {
    link.id = StringValue.parse(options.relId);
  } else {
    link.anchor = StringValue.parse(options.anchor);
  }
  if (options.tooltip !== undefined && options.tooltip.length > 0) {
    link.tooltip = StringValue.parse(options.tooltip);
  }
  if (options.history === false) {
    // BooleanValue serializes "0" / "1"——给字符串就行
    link.extendedAttributes.set("w:history", "0");
  }

  const r = new Run();
  const style = options.style ?? "Hyperlink";
  if (style.length > 0) {
    const rPr = new RunProperties();
    const rStyle = new RunStyle();
    rStyle.extendedAttributes.set("w:val", style);
    rPr.appendChild(rStyle);
    r.appendChild(rPr);
  }
  const t = new Text();
  t.text = options.text;
  if (needsXmlSpacePreserve(options.text)) t.extendedAttributes.set("xml:space", "preserve");
  r.appendChild(t);

  link.appendChild(r);
  return link;
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
