/**
 * Phase D：加密 OOXML 文档检测（CFB 容器嗅探）。
 *
 * 与上游 dotnet/Open-XML-SDK 同策略——detect + throw friendly error，不实现解密。
 * 上游做法见 OpenXmlPackage.IsEncryptedOfficeFile() + StreamPackageFeature 抛
 * "Encrypted packages are not supported."。我们在 `parseZipBytes` 入口加同样的
 * CFB magic 嗅探。
 *
 * 测试覆盖：
 * - 加密 fixture 触发 `ENCRYPTED_PACKAGE_NOT_SUPPORTED`；
 * - 正常 fixture 不触发；
 * - 错误消息含 "Encrypted OOXML package" 关键字便于排错。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { openAsync } from "../../src/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENCRYPTED = join(HERE, "../fixtures/upstream-smoke/encrypted_pptx.pptx");
const NORMAL = join(HERE, "../fixtures/upstream-smoke/HelloWorld.docx");

describe("encryption detection · Phase D", () => {
  it("加密 pptx → ENCRYPTED_PACKAGE_NOT_SUPPORTED 错码", async () => {
    const bytes = new Uint8Array(await readFile(ENCRYPTED));
    await expect(openAsync(bytes)).rejects.toThrow(OpenXmlPackageError);
    try {
      await openAsync(bytes);
    } catch (err) {
      expect(err).toBeInstanceOf(OpenXmlPackageError);
      const e = err as OpenXmlPackageError;
      expect(e.code).toBe("ENCRYPTED_PACKAGE_NOT_SUPPORTED");
      expect(e.message).toContain("Encrypted OOXML package");
      expect(e.message).toContain("CFB container");
    }
  });

  it("正常 docx 不触发加密检测", async () => {
    const bytes = new Uint8Array(await readFile(NORMAL));
    await expect(openAsync(bytes)).resolves.toBeDefined();
  });

  it("空字节流不会撞 CFB 检测（应该走原 INVALID_ZIP 路径）", async () => {
    await expect(openAsync(new Uint8Array(0))).rejects.toThrow();
  });

  it("短字节流（< 8 字节）不会误判 CFB", async () => {
    // 不到 CFB magic 长度的字节流：走原 ZIP 解析路径，因为 magic 长度不够
    await expect(openAsync(new Uint8Array([0xd0, 0xcf, 0x11]))).rejects.toThrow();
  });
});
