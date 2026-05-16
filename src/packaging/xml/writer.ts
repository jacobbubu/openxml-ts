/**
 * 稳定输出的 XML 序列化器。
 *
 * 输出形态固定：
 * - 永远 `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` 声明（与 Microsoft 端一致）；
 * - 属性总是双引号；
 * - 自闭合元素写作 `<Name .../>`（无前导空格之外的格式差异）；
 * - 无意义空白零输出（调用方自行决定缩进策略）。
 */

import { xmlEscapeAttr, xmlEscapeText } from "./escape.js";

export class XmlWriter {
  private readonly parts: string[] = [];

  declaration(): this {
    this.parts.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
    return this;
  }

  /**
   * 写一个自闭合元素。`attrs` 按插入顺序输出；undefined 值跳过。
   */
  empty(name: string, attrs?: Iterable<readonly [string, string | undefined]>): this {
    this.parts.push("<", name);
    this.writeAttrs(attrs);
    this.parts.push("/>");
    return this;
  }

  open(name: string, attrs?: Iterable<readonly [string, string | undefined]>): this {
    this.parts.push("<", name);
    this.writeAttrs(attrs);
    this.parts.push(">");
    return this;
  }

  close(name: string): this {
    this.parts.push("</", name, ">");
    return this;
  }

  text(value: string): this {
    this.parts.push(xmlEscapeText(value));
    return this;
  }

  raw(snippet: string): this {
    this.parts.push(snippet);
    return this;
  }

  toString(): string {
    return this.parts.join("");
  }

  private writeAttrs(attrs?: Iterable<readonly [string, string | undefined]>): void {
    if (attrs === undefined) return;
    for (const [key, value] of attrs) {
      if (value === undefined) continue;
      // Schema 的 attribute QName 形如 `:name`（空前缀）→ 输出 `name`；`r:id` 保留。
      const normalized = key.startsWith(":") ? key.slice(1) : key;
      this.parts.push(" ", normalized, '="', xmlEscapeAttr(value), '"');
    }
  }
}
