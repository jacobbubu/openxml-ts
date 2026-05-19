/**
 * Epic-39：PPT / DrawingML `a:r` Run 格式访问器 mixin。
 *
 * 给 `Run.prototype` 挂便捷字段：
 *
 *   r.bold = true / false / undefined
 *   r.italic = true / false / undefined
 *   r.underline = "sng" / "dbl" / "none" / undefined
 *   r.fontSizeHundredths = 2400    // 1/100 pt，2400 = 24pt
 *   r.colorHex = "FF0000"          // hex，无 #
 *
 * 注意：DrawingML 与 Word 结构有差异——Word 把每个属性放到 rPr 的子元素
 * （Bold / Italic / FontSize 等），DrawingML 直接挂在 rPr 自身的属性上。
 * 颜色仍走 child：rPr > solidFill > srgbClr。
 */

import { RgbColorModelHex } from "../../drawing/generated/rgb-color-model-hex.js";
import { RunProperties } from "../../drawing/generated/run-properties.js";
import { Run } from "../../drawing/generated/run.js";
import { SolidFill } from "../../drawing/generated/solid-fill.js";
import { BooleanValue, HexBinaryValue, Int32Value, StringValue } from "../../element/index.js";

declare module "../../drawing/generated/run.js" {
  interface Run {
    /** 加粗。true / 显式 false / undefined（继承）。 */
    bold: boolean | undefined;
    /** 斜体。 */
    italic: boolean | undefined;
    /** 下划线："sng" / "dbl" / "dotted" / "none" 等。 */
    underline: string | undefined;
    /** 字号（1/100 pt）；2400 = 24pt。 */
    fontSizeHundredths: number | undefined;
    /** 颜色 hex（无 #），如 "FF0000"。 */
    colorHex: string | undefined;
  }
}

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

Object.defineProperty(Run.prototype, "bold", {
  configurable: false,
  enumerable: false,
  get(this: Run): boolean | undefined {
    return this.firstChild(RunProperties)?.bold?.value;
  },
  set(this: Run, value: boolean | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    rPr.bold = value === undefined ? undefined : new BooleanValue(value);
  },
});

Object.defineProperty(Run.prototype, "italic", {
  configurable: false,
  enumerable: false,
  get(this: Run): boolean | undefined {
    return this.firstChild(RunProperties)?.italic?.value;
  },
  set(this: Run, value: boolean | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    rPr.italic = value === undefined ? undefined : new BooleanValue(value);
  },
});

Object.defineProperty(Run.prototype, "underline", {
  configurable: false,
  enumerable: false,
  get(this: Run): string | undefined {
    return this.firstChild(RunProperties)?.underline?.toString();
  },
  set(this: Run, value: string | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    rPr.underline = value === undefined ? undefined : StringValue.parse(value);
  },
});

Object.defineProperty(Run.prototype, "fontSizeHundredths", {
  configurable: false,
  enumerable: false,
  get(this: Run): number | undefined {
    const v = this.firstChild(RunProperties)?.fontSize;
    if (v === undefined) return undefined;
    const n = Number.parseInt(v.toString(), 10);
    return Number.isFinite(n) ? n : undefined;
  },
  set(this: Run, value: number | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    rPr.fontSize = value === undefined ? undefined : Int32Value.parse(String(value));
  },
});

Object.defineProperty(Run.prototype, "colorHex", {
  configurable: false,
  enumerable: false,
  get(this: Run): string | undefined {
    const fill = this.firstChild(RunProperties)?.firstChild(SolidFill);
    return fill?.firstChild(RgbColorModelHex)?.val?.toString();
  },
  set(this: Run, value: string | undefined): void {
    const rPr = ensureRPr(this, value === undefined);
    if (rPr === undefined) return;
    let fill = rPr.firstChild(SolidFill);
    if (value === undefined) {
      if (fill !== undefined) rPr.children.remove(fill);
      return;
    }
    if (fill === undefined) {
      fill = new SolidFill();
      rPr.appendChild(fill);
    }
    // 清旧色 child
    for (const c of fill.children.toArray()) fill.children.remove(c);
    const color = new RgbColorModelHex();
    color.val = new HexBinaryValue(value);
    fill.appendChild(color);
  },
});
