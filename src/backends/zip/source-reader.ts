/**
 * `openAsync` 接受的四类输入归一为 `Uint8Array` —— 为 MVP 简化 ZIP 读取路径。
 *
 * - `string`：文件路径，Node/Bun `node:fs/promises` 读入；
 * - `Uint8Array`：直接使用；
 * - `Blob`：`arrayBuffer()`；
 * - `ReadableStream<Uint8Array>`：逐 chunk 收集。
 *
 * 浏览器场景调用 `string` 路径会抛 `UNSUPPORTED_OPERATION`——开发者应改传 Blob 或 stream。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

export type ZipSource = string | Uint8Array | Blob | ReadableStream<Uint8Array>;

export async function readSourceToBytes(source: ZipSource): Promise<Uint8Array> {
  if (typeof source === "string") return readFilePath(source);
  if (source instanceof Uint8Array) return source;
  if (source instanceof Blob) return new Uint8Array(await source.arrayBuffer());
  if (isReadableStream(source)) return collectStream(source);
  throw new OpenXmlPackageError({
    code: "UNSUPPORTED_OPERATION",
    message: "openAsync source must be string path, Uint8Array, Blob, or ReadableStream",
  });
}

async function readFilePath(path: string): Promise<Uint8Array> {
  if (typeof globalThis.process === "undefined") {
    throw new OpenXmlPackageError({
      code: "UNSUPPORTED_OPERATION",
      message:
        "File path input requires Node or Bun runtime; pass Blob or ReadableStream in browser",
    });
  }
  try {
    const fs = await import("node:fs/promises");
    const buf = await fs.readFile(path);
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  } catch (err) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `Failed to read "${path}": ${(err as Error).message}`,
      cause: err,
    });
  }
}

function isReadableStream(value: unknown): value is ReadableStream<Uint8Array> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { getReader?: unknown }).getReader === "function"
  );
}

async function collectStream(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value !== undefined) {
      chunks.push(value);
      total += value.byteLength;
    }
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

export async function writeFilePath(path: string, bytes: Uint8Array): Promise<void> {
  if (typeof globalThis.process === "undefined") {
    throw new OpenXmlPackageError({
      code: "UNSUPPORTED_OPERATION",
      message: "File path output requires Node or Bun runtime",
    });
  }
  try {
    const fs = await import("node:fs/promises");
    await fs.writeFile(path, bytes);
  } catch (err) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `Failed to write "${path}": ${(err as Error).message}`,
      cause: err,
    });
  }
}
