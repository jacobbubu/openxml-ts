/**
 * OpenXmlPartWriter — 推送式 XML 写入器（镜像 .NET SDK OpenXmlPartWriter）。
 *
 * 设计原则：
 * - 同步推送模型：逐步写入 XML 片段；
 * - 底层复用 `XmlWriter`；
 * - `writeElement()` 将整个 typed element 子树写入；
 * - `close()` 完成并返回最终 XML 字符串；
 * - 无 Node Writable（SDK 风格）。
 */

import type { OpenXmlElement } from "../element/element.js";
import { XmlWriter } from "../packaging/xml/writer.js";

// ---- Public types ----

export interface WriterAttributeDescriptor {
  readonly name: string;
  readonly value: string;
}

export interface StartElementDescriptor {
  readonly localName: string;
  readonly prefix?: string;
  readonly namespaceUri?: string;
  readonly attributes?: readonly WriterAttributeDescriptor[];
}

// ---- OpenXmlPartWriter ----

/**
 * 推送式 XML 写入器，镜像 .NET `DocumentFormat.OpenXml.OpenXmlPartWriter`。
 *
 * 用法示例：
 * ```ts
 * const writer = new OpenXmlPartWriter();
 * writer.writeStartDocument();
 * writer.writeStartElement({
 *   localName: "document",
 *   prefix: "w",
 *   namespaceUri: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
 *   attributes: [{ name: "xmlns:w", value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main" }],
 * });
 * writer.writeElement(body);
 * writer.writeEndElement();
 * const xml = writer.close();
 * ```
 */
export class OpenXmlPartWriter {
  private readonly _writer: XmlWriter = new XmlWriter();
  private readonly _elementStack: string[] = [];
  private _closed = false;

  // ---- Document-level ----

  /**
   * 写入 XML 声明 `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`。
   * 镜像 .NET `WriteStartDocument()`。
   */
  writeStartDocument(): this {
    this._assertOpen();
    this._writer.declaration();
    return this;
  }

  // ---- Element writing ----

  /**
   * 写入一个 startElement。接受 `StartElementDescriptor` 描述符（手动指定 localName
   * / prefix / attributes）或 `OpenXmlElement` 实例（从其 qualifiedName + extendedAttributes
   * 提取标签）。
   *
   * 对应 .NET `WriteStartElement(OpenXmlElement)` / `WriteStartElement(string, string, string, ...)`。
   */
  writeStartElement(elementOrDescriptor: OpenXmlElement | StartElementDescriptor): this {
    this._assertOpen();
    const { qname, attrs } = this._resolveStartElement(elementOrDescriptor);
    this._writer.open(qname, attrs);
    this._elementStack.push(qname);
    return this;
  }

  /**
   * 写入与最近一个 `writeStartElement()` 匹配的结束标签。
   * 镜像 .NET `WriteEndElement()`。
   */
  writeEndElement(): this {
    this._assertOpen();
    const qname = this._elementStack.pop();
    if (qname === undefined) {
      throw new Error(
        "OpenXmlPartWriter: writeEndElement() called with no matching writeStartElement()",
      );
    }
    this._writer.close(qname);
    return this;
  }

  /**
   * 写入文本内容（自动转义）。
   * 镜像 .NET `WriteString(string)`。
   */
  writeString(text: string): this {
    this._assertOpen();
    this._writer.text(text);
    return this;
  }

  /**
   * 将整个 typed element 子树写入（等同于 `element.writeTo(writer)`）。
   * 镜像 .NET `WriteElement(OpenXmlElement)`。
   */
  writeElement(element: OpenXmlElement): this {
    this._assertOpen();
    element.writeTo(this._writer);
    return this;
  }

  // ---- Finalization ----

  /**
   * 关闭写入器并返回完整 XML 字符串。
   * 未关闭的 startElement 会被自动关闭。
   * 镜像 .NET `Close()`。
   */
  close(): string {
    if (this._closed) {
      return this._writer.toString();
    }
    // Auto-close any unclosed elements
    while (this._elementStack.length > 0) {
      const qname = this._elementStack.pop();
      if (qname !== undefined) this._writer.close(qname);
    }
    this._closed = true;
    return this._writer.toString();
  }

  // ---- Private helpers ----

  private _assertOpen(): void {
    if (this._closed) {
      throw new Error("OpenXmlPartWriter: writer is already closed");
    }
  }

  /**
   * Resolve qname + attrs from either an OpenXmlElement or a StartElementDescriptor.
   *
   * For OpenXmlElement: capture the open tag by serializing the element via
   * a capturing XmlWriter, then extract just the open-tag content. We use a
   * lightweight approach: create a capture writer, call writeTo on a clone that
   * emits only its open tag by overriding via the `open` interception.
   *
   * Since collectAttributes() is protected, we serialize the full element and
   * then parse back only the first open token to get the qname + attrs.
   */
  private _resolveStartElement(target: OpenXmlElement | StartElementDescriptor): {
    qname: string;
    attrs: Iterable<readonly [string, string | undefined]>;
  } {
    if ("qualifiedName" in target) {
      // OpenXmlElement: extract the open tag by using a capturing writer that
      // records just the `open()` call, then replays it.
      const capture = new OpenTagCapture();
      target.writeTo(capture);
      return { qname: capture.qname, attrs: capture.attrs };
    }
    // StartElementDescriptor
    const prefix = target.prefix ?? "";
    const qname = prefix.length > 0 ? `${prefix}:${target.localName}` : target.localName;
    const attrs: Array<readonly [string, string | undefined]> =
      target.attributes !== undefined
        ? target.attributes.map((a) => [a.name, a.value] as const)
        : [];
    return { qname, attrs };
  }
}

// ---- OpenTagCapture ----

/**
 * A fake XmlWriter that captures only the first `open()` call and ignores
 * everything else. Used to extract the qualified name + attribute list from
 * an OpenXmlElement without accessing the protected `collectAttributes()`.
 */
class OpenTagCapture extends XmlWriter {
  qname = "";
  attrs: Array<readonly [string, string | undefined]> = [];
  private _captured = false;

  override open(name: string, attrsArg?: Iterable<readonly [string, string | undefined]>): this {
    if (!this._captured) {
      this._captured = true;
      this.qname = name;
      this.attrs = attrsArg !== undefined ? [...attrsArg] : [];
    }
    // Do NOT call super — we don't want to accumulate output.
    return this;
  }

  override empty(name: string, attrsArg?: Iterable<readonly [string, string | undefined]>): this {
    if (!this._captured) {
      this._captured = true;
      this.qname = name;
      this.attrs = attrsArg !== undefined ? [...attrsArg] : [];
    }
    return this;
  }

  override close(_name: string): this {
    return this;
  }

  override text(_value: string): this {
    return this;
  }

  override declaration(): this {
    return this;
  }

  override raw(_snippet: string): this {
    return this;
  }

  override toString(): string {
    return "";
  }
}
