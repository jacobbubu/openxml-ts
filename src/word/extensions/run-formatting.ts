/**
 * Epic-38：Word `Run` 格式访问器 mixin。
 *
 * 给 \`Run.prototype\` 挂便捷字段：
 *
 *   r.bold = true                  // 加粗（写 <w:b/>）
 *   r.bold = false                 // 显式取消（写 <w:b w:val="false"/>）
 *   r.bold = undefined             // 删 Bold（继承样式）
 *   r.italic = true / false / undefined
 *   r.underline = "single" / "double" / "none" / undefined
 *   r.fontSizeHalfPoints = 24      // 字号（半点；24 = 12pt）
 *   r.colorHex = "FF0000"          // hex 字符串，无 #
 *
 * 设计：
 * - 共享 rPr lazy-create，rPr 不存在时自动创建并作为 Run 第一个 child
 * - bold / italic 读 OnOff 语义：Bold 子存在 + val 非 "false" → true；val 为 false → false；无 → undefined
 * - 其它字段都是 typed val 直接读写
 */

import { BooleanValue, StringValue } from "../../element/index.js";
import { Bold } from "../generated/bold.js";
import { Color } from "../generated/color.js";
import { FontSize } from "../generated/font-size.js";
import { Italic } from "../generated/italic.js";
import { RunProperties } from "../generated/run-properties.js";
import { Run } from "../generated/run.js";
import { Underline } from "../generated/underline.js";

declare module "../generated/run.js" {
  interface Run {
    /** 加粗：true / 显式 false / undefined（继承）。 */
    bold: boolean | undefined;
    /** 斜体。 */
    italic: boolean | undefined;
    /** 下划线样式："single" / "double" / "dotted" / "dash" / "thick" / "none" / 等。 */
    underline: string | undefined;
    /** 字号（半点）；24 = 12pt。 */
    fontSizeHalfPoints: number | undefined;
    /** 颜色 hex 字符串（无 #），如 "FF0000"；或 "auto"。 */
    colorHex: string | undefined;
  }
}

// ─── 内部 helpers ────────────────────────────────────────────────────────────

function ensureRPr(run: Run, readOnly: boolean): RunProperties | undefined {
  const existing = run.firstChild(RunProperties);
  if (existing !== undefined) return existing;
  if (readOnly) return undefined;
  const rPr = new RunProperties();
  const first = run.children.at(0);
  if (first === undefined) run.appendChild(rPr);
  else run.children.insertBefore(rPr, first);
  return rPr;
}

function readOnOff<T extends { val?: BooleanValue | undefined }>(
  rPr: RunProperties | undefined,
  Cls: new () => T,
): boolean | undefined {
  const el = rPr?.firstChild(Cls);
  if (el === undefined) return undefined;
  const v = el.val;
  if (v === undefined) return true; // 空 <w:b/> 视为 true
  return v.value;
}

function writeOnOff<T extends { val?: BooleanValue | undefined }>(
  run: Run,
  Cls: new () => T,
  value: boolean | undefined,
): void {
  const rPrReadOnly = value === undefined;
  const rPr = ensureRPr(run, rPrReadOnly);
  if (rPr === undefined) return;
  let el = rPr.firstChild(Cls);
  if (value === undefined) {
    if (el !== undefined) rPr.children.remove(el);
    return;
  }
  if (el === undefined) {
    el = new Cls();
    rPr.appendChild(el);
  }
  el.val = value ? undefined : new BooleanValue(false);
}

// ─── 字段定义 ────────────────────────────────────────────────────────────────

Object.defineProperty(Run.prototype, "bold", {
  configurable: false,
  enumerable: false,
  get(this: Run): boolean | undefined {
    return readOnOff(this.firstChild(RunProperties), Bold);
  },
  set(this: Run, value: boolean | undefined): void {
    writeOnOff(this, Bold, value);
  },
});

Object.defineProperty(Run.prototype, "italic", {
  configurable: false,
  enumerable: false,
  get(this: Run): boolean | undefined {
    return readOnOff(this.firstChild(RunProperties), Italic);
  },
  set(this: Run, value: boolean | undefined): void {
    writeOnOff(this, Italic, value);
  },
});

Object.defineProperty(Run.prototype, "underline", {
  configurable: false,
  enumerable: false,
  get(this: Run): string | undefined {
    return this.firstChild(RunProperties)?.firstChild(Underline)?.val?.toString();
  },
  set(this: Run, value: string | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    let el = rPr.firstChild(Underline);
    if (value === undefined) {
      if (el !== undefined) rPr.children.remove(el);
      return;
    }
    if (el === undefined) {
      el = new Underline();
      rPr.appendChild(el);
    }
    el.val = StringValue.parse(value);
  },
});

Object.defineProperty(Run.prototype, "fontSizeHalfPoints", {
  configurable: false,
  enumerable: false,
  get(this: Run): number | undefined {
    const v = this.firstChild(RunProperties)?.firstChild(FontSize)?.val?.toString();
    if (v === undefined) return undefined;
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) ? n : undefined;
  },
  set(this: Run, value: number | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    let el = rPr.firstChild(FontSize);
    if (value === undefined) {
      if (el !== undefined) rPr.children.remove(el);
      return;
    }
    if (el === undefined) {
      el = new FontSize();
      rPr.appendChild(el);
    }
    el.val = StringValue.parse(String(value));
  },
});

Object.defineProperty(Run.prototype, "colorHex", {
  configurable: false,
  enumerable: false,
  get(this: Run): string | undefined {
    return this.firstChild(RunProperties)?.firstChild(Color)?.val?.toString();
  },
  set(this: Run, value: string | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    let el = rPr.firstChild(Color);
    if (value === undefined) {
      if (el !== undefined) rPr.children.remove(el);
      return;
    }
    if (el === undefined) {
      el = new Color();
      rPr.appendChild(el);
    }
    el.val = StringValue.parse(value);
  },
});
