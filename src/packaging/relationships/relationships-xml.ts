/**
 * OPC `_rels/<part>.rels` 与 `_rels/.rels` 的解析与序列化。
 *
 * 命名空间：`http://schemas.openxmlformats.org/package/2006/relationships`
 *
 * 序列化形态固定为：
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 * <Relationships xmlns="...">
 *   <Relationship Id="rId1" Type="..." Target="..."/>
 *   <Relationship Id="rId2" Type="..." Target="..." TargetMode="External"/>
 * </Relationships>
 * ```
 *
 * - 顺序与传入的迭代器顺序一致；
 * - `TargetMode` 默认 `Internal`，序列化时只在 `external` 才显式输出 `TargetMode="External"`，
 *   与 Microsoft 端实际产物字节级一致。
 */

import { OpenXmlPackageError } from "../errors.js";
import type { IPackageRelationship } from "../interfaces/relationship.js";
import type { TargetMode } from "../interfaces/types.js";
import { XmlWriter, tokenizeXml } from "../xml/index.js";

/** `.rels` 文件根命名空间。 */
export const RELATIONSHIPS_NS = "http://schemas.openxmlformats.org/package/2006/relationships";

/** 解析后的单条 Relationship——id、type、target、targetMode 四元组。 */
export interface ParsedRelationship {
  readonly id: string;
  readonly type: string;
  readonly target: string;
  readonly targetMode: TargetMode;
}

/** 把 relationships 集合序列化成 `.rels` XML 字符串（包级或 Part 级共用一份格式）。 */
export function serializeRelationshipsXml(rels: Iterable<IPackageRelationship>): string {
  const w = new XmlWriter();
  w.declaration();
  w.open("Relationships", [["xmlns", RELATIONSHIPS_NS]]);
  for (const r of rels) {
    const attrs: [string, string | undefined][] = [
      ["Id", r.id],
      ["Type", r.type],
      ["Target", r.target],
    ];
    if (r.targetMode === "external") {
      attrs.push(["TargetMode", "External"]);
    }
    w.empty("Relationship", attrs);
  }
  w.close("Relationships");
  return w.toString();
}

/**
 * 解析 `.rels` XML 字符串到 {@link ParsedRelationship} 数组。
 * 顺序遵循 XML 文档顺序——后续 save 会按解析顺序写回，方便字节级稳定 diff。
 */
export function parseRelationshipsXml(xml: string): ParsedRelationship[] {
  let sawRoot = false;
  let rootClosed = false;
  const out: ParsedRelationship[] = [];
  try {
    for (const token of tokenizeXml(xml)) {
      if (token.kind === "decl" || token.kind === "text") continue;
      if (token.kind === "open") {
        if (!sawRoot) {
          if (token.name !== "Relationships") {
            throw new OpenXmlPackageError({
              code: "BACKEND_ERROR",
              message: `Expected <Relationships>, got <${token.name}>`,
            });
          }
          if (token.attrs.get("xmlns") !== RELATIONSHIPS_NS) {
            throw new OpenXmlPackageError({
              code: "BACKEND_ERROR",
              message: `<Relationships> must declare xmlns="${RELATIONSHIPS_NS}"`,
            });
          }
          sawRoot = true;
          if (token.selfClosing) rootClosed = true;
          continue;
        }
        if (rootClosed) {
          throw new OpenXmlPackageError({
            code: "BACKEND_ERROR",
            message: "Content found after </Relationships>",
          });
        }
        if (token.name !== "Relationship") {
          throw new OpenXmlPackageError({
            code: "BACKEND_ERROR",
            message: `Unexpected element <${token.name}> inside <Relationships>`,
          });
        }
        const id = requireAttr(token.attrs, "Id");
        const type = requireAttr(token.attrs, "Type");
        const target = requireAttr(token.attrs, "Target");
        const modeAttr = token.attrs.get("TargetMode");
        let targetMode: TargetMode = "internal";
        if (modeAttr !== undefined) {
          if (modeAttr === "External") targetMode = "external";
          else if (modeAttr === "Internal") targetMode = "internal";
          else {
            throw new OpenXmlPackageError({
              code: "BACKEND_ERROR",
              relationshipId: id,
              message: `Unknown TargetMode="${modeAttr}"`,
            });
          }
        }
        out.push({ id, type, target, targetMode });
        continue;
      }
      if (token.kind === "close" && token.name === "Relationships") {
        rootClosed = true;
      }
    }
  } catch (err) {
    if (err instanceof OpenXmlPackageError) throw err;
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `Failed to parse .rels: ${(err as Error).message}`,
      cause: err,
    });
  }
  if (!sawRoot) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "Missing <Relationships> root element",
    });
  }
  if (!rootClosed) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "Missing </Relationships>",
    });
  }
  return out;
}

function requireAttr(attrs: ReadonlyMap<string, string>, name: string): string {
  const v = attrs.get(name);
  if (v === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `<Relationship> missing required "${name}" attribute`,
    });
  }
  return v;
}
