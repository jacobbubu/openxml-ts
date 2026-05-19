/**
 * Epic-34：Word 简单字段（`<w:fldSimple>`）便捷层。
 *
 * 主用例：页眉/页脚里的 "PAGE" / "NUMPAGES" / 当前日期等单段字段。
 * 复杂字段（fldChar begin/separate/end 三段）不在本模块范围。
 *
 * 公开 API：
 *   createFieldRun(instr, { cachedText? })
 *     → 返回一个 `<w:fldSimple w:instr="..."><w:r><w:t>...</w:t></w:r></w:fldSimple>`，
 *       可直接 append 到 Paragraph
 *   createPageNumberRun()  → 等价于 createFieldRun("PAGE", { cachedText: "1" })
 *   createTotalPagesRun()  → 等价于 createFieldRun("NUMPAGES", { cachedText: "1" })
 */

import { StringValue } from "../element/index.js";
import { Run } from "./generated/run.js";
import { SimpleField } from "./generated/simple-field.js";
import { Text } from "./generated/text.js";

export interface CreateFieldRunOptions {
  /**
   * 字段缓存文本。Word 重新打开文档时会按 instr 重算字段值；缓存文本只在
   * 「未启用字段重算 / 早期渲染」时显示。默认 instr 本身。
   */
  readonly cachedText?: string;
}

/**
 * 构造一个简单字段（`<w:fldSimple>`）。返回的元素可直接 append 进 Paragraph。
 *
 * 例：
 *   const p = new Paragraph();
 *   p.appendChild(createFieldRun("PAGE", { cachedText: "1" }));
 */
export function createFieldRun(
  instruction: string,
  options: CreateFieldRunOptions = {},
): SimpleField {
  if (instruction.length === 0) {
    throw new Error("createFieldRun: instruction must not be empty");
  }
  const fld = new SimpleField();
  fld.instruction = StringValue.parse(instruction);
  const r = new Run();
  const t = new Text();
  t.text = options.cachedText ?? instruction;
  r.appendChild(t);
  fld.appendChild(r);
  return fld;
}

/**
 * 当前页码字段（"PAGE"）。等价于 `createFieldRun("PAGE", { cachedText: "1" })`。
 */
export function createPageNumberRun(): SimpleField {
  return createFieldRun("PAGE", { cachedText: "1" });
}

/**
 * 总页数字段（"NUMPAGES"）。等价于 `createFieldRun("NUMPAGES", { cachedText: "1" })`。
 */
export function createTotalPagesRun(): SimpleField {
  return createFieldRun("NUMPAGES", { cachedText: "1" });
}
