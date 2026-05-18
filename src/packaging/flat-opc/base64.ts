/**
 * 跨运行时 base64 编解码。Node/Bun 走 Buffer；浏览器走分块 btoa/atob。
 */

/** 把字节数组编码成 base64 字符串——Flat OPC `<pkg:binaryData>` 用。 */
export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof globalThis.Buffer !== "undefined") {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  // Chunk to avoid call-stack overflow on large arrays
  const chunkSize = 0x8000;
  let s = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    s += String.fromCharCode(...slice);
  }
  return globalThis.btoa(s);
}

/** base64 → 字节数组；自动忽略空白字符（Flat OPC 中常带换行）。 */
export function base64ToBytes(b64: string): Uint8Array {
  // 去掉所有空白（Flat OPC 中 base64 常带换行）
  const clean = b64.replace(/\s+/g, "");
  if (typeof globalThis.Buffer !== "undefined") {
    const buf = globalThis.Buffer.from(clean, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  const binary = globalThis.atob(clean);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}
