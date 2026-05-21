// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-50：Word `Run` 字体访问器 mixin。
 *
 * 给 `Run.prototype` 挂便捷字段：
 *
 *   r.fontFamily = "Calibri"
 *   // 同时把 ascii / eastAsia / hAnsi(highAnsi) / cs(complexScript) 四个属性都设为 "Calibri"
 *
 *   r.fontFamily                                        // 读 ascii；如无 rFonts → undefined
 *   r.fontFamily = undefined                            // 删 <w:rFonts>
 *
 *   r.fontFamilyDetail = { ascii: "Calibri", eastAsia: "宋体" }
 *   // 只设置指定字段，其它字段置 undefined（即不写入）
 *
 *   r.fontFamilyDetail                                  // { ascii?, eastAsia?, hAnsi?, cs? }
 *   r.fontFamilyDetail = undefined                      // 删 <w:rFonts>
 *
 * 注意：RunFonts 生成类中属性映射：
 *   w:ascii      → ascii
 *   w:hAnsi      → highAnsi
 *   w:eastAsia   → eastAsia
 *   w:cs         → complexScript
 */

import { StringValue } from "../../element/index.js";
import { RunFonts } from "../generated/run-fonts.js";
import { RunProperties } from "../generated/run-properties.js";
import { Run } from "../generated/run.js";

/** 细粒度字体设置；字段名与 Word XML 语义对齐，隐藏内部 TypeScript 属性命名。 */
export interface RunFontDetail {
  /** w:ascii — 拉丁字母字体 */
  ascii?: string;
  /** w:eastAsia — 东亚字体 */
  eastAsia?: string;
  /** w:hAnsi — 高 ANSI 字体 */
  hAnsi?: string;
  /** w:cs — 复杂脚本字体 */
  cs?: string;
}

declare module "../generated/run.js" {
  interface Run {
    /**
     * 字体族（快捷方式）：设置时同时写 ascii / eastAsia / hAnsi / cs 四个字段；
     * 读取时返回 ascii 值（最常用场景）；
     * 设为 undefined 时删除整个 `<w:rFonts>`。
     */
    fontFamily: string | undefined;
    /**
     * 细粒度字体设置；读取返回 `{ ascii?, eastAsia?, hAnsi?, cs? }`；
     * 写入时只有指定的字段会被设置（未指定的字段清空）；
     * 设为 undefined 时删除整个 `<w:rFonts>`。
     */
    fontFamilyDetail: RunFontDetail | undefined;
  }
}

// ─── 内部 helpers ────────────────────────────────────────────────────────────

function ensureRPr(run: Run, readOnly: true): RunProperties | undefined;
function ensureRPr(run: Run, readOnly: false): RunProperties;
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

function getRFonts(run: Run): RunFonts | undefined {
  return run.firstChild(RunProperties)?.firstChild(RunFonts);
}

function ensureRFonts(run: Run): RunFonts {
  const rPr = ensureRPr(run, false);
  let rf = rPr.firstChild(RunFonts);
  if (rf === undefined) {
    rf = new RunFonts();
    rPr.appendChild(rf);
  }
  return rf;
}

function removeRFonts(run: Run): void {
  const rPr = run.firstChild(RunProperties);
  if (rPr === undefined) return;
  const rf = rPr.firstChild(RunFonts);
  if (rf !== undefined) rPr.children.remove(rf);
}

// ─── fontFamily ──────────────────────────────────────────────────────────────

Object.defineProperty(Run.prototype, "fontFamily", {
  configurable: false,
  enumerable: false,
  get(this: Run): string | undefined {
    return getRFonts(this)?.ascii?.toString();
  },
  set(this: Run, value: string | undefined): void {
    if (value === undefined) {
      removeRFonts(this);
      return;
    }
    const sv = StringValue.parse(value);
    const rf = ensureRFonts(this);
    rf.ascii = sv;
    rf.eastAsia = sv;
    rf.highAnsi = sv;
    rf.complexScript = sv;
  },
});

// ─── fontFamilyDetail ────────────────────────────────────────────────────────

Object.defineProperty(Run.prototype, "fontFamilyDetail", {
  configurable: false,
  enumerable: false,
  get(this: Run): RunFontDetail | undefined {
    const rf = getRFonts(this);
    if (rf === undefined) return undefined;
    const result: RunFontDetail = {};
    const ascii = rf.ascii?.toString();
    const eastAsia = rf.eastAsia?.toString();
    const hAnsi = rf.highAnsi?.toString();
    const cs = rf.complexScript?.toString();
    if (ascii !== undefined) result.ascii = ascii;
    if (eastAsia !== undefined) result.eastAsia = eastAsia;
    if (hAnsi !== undefined) result.hAnsi = hAnsi;
    if (cs !== undefined) result.cs = cs;
    // Return undefined if all fields are absent
    if (
      result.ascii === undefined &&
      result.eastAsia === undefined &&
      result.hAnsi === undefined &&
      result.cs === undefined
    ) {
      return undefined;
    }
    return result;
  },
  set(this: Run, value: RunFontDetail | undefined): void {
    if (value === undefined) {
      removeRFonts(this);
      return;
    }
    const rf = ensureRFonts(this);
    rf.ascii = value.ascii !== undefined ? StringValue.parse(value.ascii) : undefined;
    rf.eastAsia = value.eastAsia !== undefined ? StringValue.parse(value.eastAsia) : undefined;
    rf.highAnsi = value.hAnsi !== undefined ? StringValue.parse(value.hAnsi) : undefined;
    rf.complexScript = value.cs !== undefined ? StringValue.parse(value.cs) : undefined;
  },
});
