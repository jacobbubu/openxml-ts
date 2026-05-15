import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  OpenXmlPackage,
  OpenXmlPackageError,
  createInMemory,
  openSync,
  tryPartUri,
} from "../../../src/index.js";
import type { IPackagePart, PartUri } from "../../../src/index.js";

function uri(s: string): PartUri {
  const u = tryPartUri(s);
  if (u === undefined) throw new Error(`bad test fixture URI: ${s}`);
  return u;
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
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

describe("createInMemory / openSync", () => {
  it("createInMemory 默认 readWrite，无 Parts", () => {
    const pkg = createInMemory();
    expect(pkg).toBeInstanceOf(OpenXmlPackage);
    expect(pkg.accessMode).toBe("readWrite");
    expect([...pkg.parts()]).toEqual([]);
    expect(pkg.relationships.count).toBe(0);
  });

  it("createInMemory 可指定 read 访问模式", () => {
    const pkg = createInMemory({ accessMode: "read" });
    expect(pkg.accessMode).toBe("read");
    expect(() => pkg.createPart(uri("/word/document.xml"), "application/xml")).toThrowError(
      expect.objectContaining({ code: "UNSUPPORTED_OPERATION" }),
    );
  });

  it("openSync 空字节流等同 createInMemory", () => {
    const pkg = openSync(new Uint8Array(0));
    expect(pkg).toBeInstanceOf(OpenXmlPackage);
    expect([...pkg.parts()]).toEqual([]);
  });

  it("openSync 非空字节流抛 UNSUPPORTED_OPERATION（待 Story-1.5）", () => {
    expect(() => openSync(new Uint8Array([0x50, 0x4b]))).toThrowError(
      expect.objectContaining({ code: "UNSUPPORTED_OPERATION" }),
    );
  });
});

describe("Part CRUD", () => {
  let pkg: ReturnType<typeof createInMemory>;
  beforeEach(() => {
    pkg = createInMemory();
  });
  afterEach(async () => {
    await pkg.dispose();
  });

  it("createPart 注册新 Part 并可枚举", () => {
    const part = pkg.createPart(uri("/word/document.xml"), "application/xml");
    expect(part.uri).toBe("/word/document.xml");
    expect(part.contentType).toBe("application/xml");
    expect(pkg.hasPart(uri("/word/document.xml"))).toBe(true);
    expect([...pkg.parts()].map((p) => p.uri)).toEqual(["/word/document.xml"]);
  });

  it("createPart 重复 URI 抛 PART_ALREADY_EXISTS", () => {
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    expect(() => pkg.createPart(uri("/word/document.xml"), "application/xml")).toThrowError(
      expect.objectContaining({ code: "PART_ALREADY_EXISTS" }),
    );
  });

  it("createPart 空 contentType 抛 CONTENT_TYPE_MISSING", () => {
    expect(() => pkg.createPart(uri("/word/document.xml"), "")).toThrowError(
      expect.objectContaining({ code: "CONTENT_TYPE_MISSING" }),
    );
  });

  it("createPart 非法 URI 抛 INVALID_PART_URI", () => {
    // 绕过 tryPartUri 直接把字符串当 PartUri，模拟外部传入脏数据
    expect(() => pkg.createPart("/word/../etc/passwd" as PartUri, "application/xml")).toThrowError(
      expect.objectContaining({ code: "INVALID_PART_URI" }),
    );
  });

  it("getPart 命中返回；未命中抛 PART_NOT_FOUND", () => {
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    expect(pkg.getPart(uri("/word/document.xml")).uri).toBe("/word/document.xml");
    expect(() => pkg.getPart(uri("/missing.xml"))).toThrowError(
      expect.objectContaining({ code: "PART_NOT_FOUND" }),
    );
  });

  it("deletePart 删除存在的 Part；不存在则静默", () => {
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    pkg.deletePart(uri("/word/document.xml"));
    expect(pkg.hasPart(uri("/word/document.xml"))).toBe(false);
    expect(() => pkg.deletePart(uri("/never-existed.xml"))).not.toThrow();
  });

  it("createPart 默认 normal 压缩；可显式指定", () => {
    const part = pkg.createPart(uri("/word/media.png"), "image/png", "none");
    // 通过 IPackagePart 不暴露 compression，但 backend 内部记录；用对象身份验证
    expect(part).toBeDefined();
    type WithCompression = IPackagePart & { compression?: string };
    expect((part as WithCompression).compression).toBe("none");
  });
});

describe("Part 流式读写", () => {
  it("writeAsync(Uint8Array) → openReadStream 复读", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(uri("/word/document.xml"), "application/xml");
    await part.writeAsync(new Uint8Array([1, 2, 3]));
    expect(await readAll(part.openReadStream())).toEqual(new Uint8Array([1, 2, 3]));
    expect(await readAll(part.openReadStream())).toEqual(new Uint8Array([1, 2, 3]));
  });

  it("writeAsync(string) 按 UTF-8 编码", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(uri("/notes.txt"), "text/plain");
    await part.writeAsync("中文 hello");
    const bytes = await readAll(part.openReadStream());
    expect(new TextDecoder().decode(bytes)).toBe("中文 hello");
  });

  it("writeAsync(Blob) 走 arrayBuffer 路径", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(uri("/data.bin"), "application/octet-stream");
    const blob = new Blob([new Uint8Array([9, 8, 7])]);
    await part.writeAsync(blob);
    expect(await readAll(part.openReadStream())).toEqual(new Uint8Array([9, 8, 7]));
  });

  it("writeAsync(ReadableStream) 逐 chunk 拼接", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(uri("/stream.bin"), "application/octet-stream");
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2]));
        controller.enqueue(new Uint8Array([3, 4, 5]));
        controller.close();
      },
    });
    await part.writeAsync(source);
    expect(await readAll(part.openReadStream())).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it("空 Part openReadStream 立即结束", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(uri("/empty.bin"), "application/octet-stream");
    expect(await readAll(part.openReadStream())).toEqual(new Uint8Array(0));
  });
});

describe("Relationships", () => {
  it("包级关系：create → 自动生成 rId1 起递增", () => {
    const pkg = createInMemory();
    const r1 = pkg.relationships.create({
      type: "http://example.com/r1",
      target: "/word/document.xml",
      targetMode: "internal",
    });
    const r2 = pkg.relationships.create({
      type: "http://example.com/r2",
      target: "/word/styles.xml",
      targetMode: "internal",
    });
    expect(r1.id).toBe("rId1");
    expect(r2.id).toBe("rId2");
    expect(pkg.relationships.count).toBe(2);
    expect(pkg.relationships.get("rId1").target).toBe("/word/document.xml");
  });

  it("指定 id 重复抛 RELATIONSHIP_ID_CONFLICT", () => {
    const pkg = createInMemory();
    pkg.relationships.create({
      type: "x",
      target: "/foo.xml",
      targetMode: "internal",
      id: "rIdMain",
    });
    expect(() =>
      pkg.relationships.create({
        type: "x",
        target: "/bar.xml",
        targetMode: "internal",
        id: "rIdMain",
      }),
    ).toThrowError(expect.objectContaining({ code: "RELATIONSHIP_ID_CONFLICT" }));
  });

  it("自动 id 跳过已占用的 N", () => {
    const pkg = createInMemory();
    pkg.relationships.create({
      type: "x",
      target: "/a.xml",
      targetMode: "internal",
      id: "rId1",
    });
    pkg.relationships.create({
      type: "x",
      target: "/b.xml",
      targetMode: "internal",
      id: "rId2",
    });
    const r3 = pkg.relationships.create({
      type: "x",
      target: "/c.xml",
      targetMode: "internal",
    });
    expect(r3.id).toBe("rId3");
  });

  it("internal target 为空抛 RELATIONSHIP_TARGET_INVALID", () => {
    const pkg = createInMemory();
    expect(() =>
      pkg.relationships.create({
        type: "x",
        target: "",
        targetMode: "internal",
      }),
    ).toThrowError(expect.objectContaining({ code: "RELATIONSHIP_TARGET_INVALID" }));
  });

  it("external 关系允许任意目标 URI", () => {
    const pkg = createInMemory();
    const r = pkg.relationships.create({
      type: "http://example.com/hyperlink",
      target: "https://example.com",
      targetMode: "external",
    });
    expect(r.targetMode).toBe("external");
    expect(r.target).toBe("https://example.com");
  });

  it("get 未知 id 抛 PART_NOT_FOUND（带 relationshipId）", () => {
    const pkg = createInMemory();
    try {
      pkg.relationships.get("missing");
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(OpenXmlPackageError);
      const e = err as OpenXmlPackageError;
      expect(e.code).toBe("PART_NOT_FOUND");
      expect(e.relationshipId).toBe("missing");
    }
  });

  it("remove 删除关系", () => {
    const pkg = createInMemory();
    const r = pkg.relationships.create({
      type: "x",
      target: "/foo.xml",
      targetMode: "internal",
    });
    pkg.relationships.remove(r.id);
    expect(pkg.relationships.has(r.id)).toBe(false);
    expect(pkg.relationships.count).toBe(0);
  });

  it("Part 自带独立的 relationships 集合", () => {
    const pkg = createInMemory();
    const part = pkg.createPart(uri("/word/document.xml"), "application/xml");
    part.relationships.create({
      type: "http://example.com/styles",
      target: "/word/styles.xml",
      targetMode: "internal",
    });
    expect(pkg.relationships.count).toBe(0);
    expect(part.relationships.count).toBe(1);
  });

  it("relationships 可作为 Iterable 展开", () => {
    const pkg = createInMemory();
    pkg.relationships.create({
      type: "x",
      target: "/a.xml",
      targetMode: "internal",
    });
    pkg.relationships.create({
      type: "y",
      target: "/b.xml",
      targetMode: "internal",
    });
    const ids = [...pkg.relationships].map((r) => r.id);
    expect(ids).toEqual(["rId1", "rId2"]);
  });
});

describe("级联删除关系", () => {
  it("deletePart 自动清掉包级与其他 Part 中指向它的内部关系", () => {
    const pkg = createInMemory();
    const main = pkg.createPart(uri("/word/document.xml"), "application/xml");
    pkg.createPart(uri("/word/styles.xml"), "application/xml");
    const stylesUri = uri("/word/styles.xml");

    pkg.relationships.create({
      type: "package-level",
      target: stylesUri,
      targetMode: "internal",
    });
    main.relationships.create({
      type: "main-to-styles",
      target: stylesUri,
      targetMode: "internal",
    });
    main.relationships.create({
      type: "external-link",
      target: "https://example.com/styles",
      targetMode: "external",
    });

    pkg.deletePart(stylesUri);

    expect(pkg.relationships.count).toBe(0);
    expect(main.relationships.count).toBe(1);
    expect([...main.relationships][0]?.targetMode).toBe("external");
  });
});

describe("生命周期", () => {
  it("dispose 之后所有访问抛 STREAM_CLOSED", async () => {
    const pkg = createInMemory();
    pkg.createPart(uri("/foo.xml"), "application/xml");
    await pkg.dispose();
    expect(() => [...pkg.parts()]).toThrowError(expect.objectContaining({ code: "STREAM_CLOSED" }));
    expect(() => pkg.hasPart(uri("/foo.xml"))).toThrowError(
      expect.objectContaining({ code: "STREAM_CLOSED" }),
    );
  });

  it("二次 dispose 幂等", async () => {
    const pkg = createInMemory();
    await pkg.dispose();
    await expect(pkg.dispose()).resolves.toBeUndefined();
  });

  it("Symbol.dispose 同步钩子", () => {
    const pkg = createInMemory();
    pkg[Symbol.dispose]();
    expect(() => [...pkg.parts()]).toThrowError(expect.objectContaining({ code: "STREAM_CLOSED" }));
  });

  it("await using 自动调用 asyncDispose", async () => {
    const pkg = createInMemory();
    {
      await using held = pkg;
      held.createPart(uri("/foo.xml"), "application/xml");
    }
    expect(() => pkg.hasPart(uri("/foo.xml"))).toThrowError(
      expect.objectContaining({ code: "STREAM_CLOSED" }),
    );
  });

  it("read 模式禁止 createPart / deletePart / saveAsync", async () => {
    const pkg = createInMemory({ accessMode: "read" });
    expect(() => pkg.createPart(uri("/foo.xml"), "application/xml")).toThrowError(
      expect.objectContaining({ code: "UNSUPPORTED_OPERATION" }),
    );
    expect(() => pkg.deletePart(uri("/foo.xml"))).toThrowError(
      expect.objectContaining({ code: "UNSUPPORTED_OPERATION" }),
    );
    await expect(pkg.saveAsync()).rejects.toMatchObject({
      code: "UNSUPPORTED_OPERATION",
    });
  });

  it("saveAsync 对内存 backend 是 no-op", async () => {
    const pkg = createInMemory();
    pkg.createPart(uri("/foo.xml"), "application/xml");
    await expect(pkg.saveAsync()).resolves.toBeUndefined();
    // 状态保留
    expect(pkg.hasPart(uri("/foo.xml"))).toBe(true);
  });
});

describe("Properties", () => {
  it("可读可写，初始全 undefined", () => {
    const pkg = createInMemory();
    expect(pkg.properties.title).toBeUndefined();
    pkg.properties.title = "Q2 报告";
    pkg.properties.creator = "Rong";
    pkg.properties.created = new Date("2026-05-15T00:00:00Z");
    expect(pkg.properties.title).toBe("Q2 报告");
    expect(pkg.properties.creator).toBe("Rong");
    expect(pkg.properties.created?.toISOString()).toBe("2026-05-15T00:00:00.000Z");
  });
});
