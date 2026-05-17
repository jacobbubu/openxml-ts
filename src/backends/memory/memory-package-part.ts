import { RelationshipCollection } from "../../packaging/core/relationship-collection.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import type {
  CompressionLevel,
  PartUri,
  PartWriteInput,
} from "../../packaging/interfaces/types.js";

/**
 * 内存 Part 实现。
 *
 * - 内容保存为单一 `Uint8Array`（一次性灌注或流式读完后落 buffer）；
 * - `openReadStream()` 每次返回新流，复读安全；
 * - `writeAsync()` 接四类输入，统一解码为 `Uint8Array` 存内部。
 */
export class MemoryPackagePart implements IPackagePart {
  readonly package: IPackage;
  readonly uri: PartUri;
  readonly contentType: string;
  readonly compression: CompressionLevel;
  readonly relationships: RelationshipCollection;
  private content: Uint8Array;

  constructor(
    pkg: IPackage,
    uri: PartUri,
    contentType: string,
    compression: CompressionLevel,
    initialContent: Uint8Array = new Uint8Array(0),
  ) {
    this.package = pkg;
    this.uri = uri;
    this.contentType = contentType;
    this.compression = compression;
    this.relationships = new RelationshipCollection(uri);
    this.content = initialContent;
  }

  openReadStream(): ReadableStream<Uint8Array> {
    const bytes = this.content;
    return new ReadableStream<Uint8Array>({
      start(controller) {
        if (bytes.byteLength > 0) controller.enqueue(bytes);
        controller.close();
      },
    });
  }

  async writeAsync(input: PartWriteInput): Promise<void> {
    this.content = await normalizeWriteInput(input);
  }

  /**
   * 同步写入字节流——给 typed 文档门面的 `create()` 工厂 seed XML 用，
   * 避免「sync create + async writeAsync 的 microtask 隔阂」（首次访问 typed root
   * 时 part 字节还没落地）。仅接 string / Uint8Array，不接 Blob / ReadableStream。
   */
  writeSync(input: string | Uint8Array): void {
    this.content = input instanceof Uint8Array ? input : new TextEncoder().encode(input);
  }

  /** 测试或更高层调用：直接读出当前缓冲（不通过流）。 */
  snapshot(): Uint8Array {
    return this.content;
  }
}

async function normalizeWriteInput(input: PartWriteInput): Promise<Uint8Array> {
  if (input instanceof Uint8Array) return input;
  if (typeof input === "string") return new TextEncoder().encode(input);
  if (input instanceof Blob) return new Uint8Array(await input.arrayBuffer());
  // ReadableStream<Uint8Array>
  const reader = input.getReader();
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
