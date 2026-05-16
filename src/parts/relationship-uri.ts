/**
 * Relationship target → 绝对 PartUri 的解析。
 *
 * 把 OPC relationship `target` 解析为绝对 `PartUri`：
 * - 以 `/` 开头：视为绝对，原样返回；
 * - 其它：相对于 `base`（包级关系用 `"/"`，Part 级关系用所属 Part 的 URI），按
 *   OPC §9.3 的相对 URI 解析方式拼接，再折叠 `.` / `..`。
 *
 * 解析后若不是合法 `PartUri` 抛 `OpenXmlPackageError("INVALID_PART_URI")`；
 * 空 target 返回 `undefined`。
 */

import { OpenXmlPackageError } from "../packaging/errors.js";
import { type PartUri, isPartUri } from "../packaging/interfaces/types.js";

export function resolveRelativePartUri(base: string, target: string): PartUri | undefined {
  if (target.length === 0) return undefined;
  const baseDir = (() => {
    if (base === "/") return "";
    const slash = base.lastIndexOf("/");
    return slash <= 0 ? "" : base.slice(0, slash);
  })();
  const raw = target.startsWith("/") ? target : `${baseDir}/${target}`;
  const stack: string[] = [];
  for (const seg of raw.split("/")) {
    if (seg.length === 0 || seg === ".") continue;
    if (seg === "..") {
      stack.pop();
      continue;
    }
    stack.push(seg);
  }
  const normalized = `/${stack.join("/")}`;
  if (!isPartUri(normalized)) {
    throw new OpenXmlPackageError({
      code: "INVALID_PART_URI",
      message: `Relationship target "${target}" (base "${base}") does not resolve to a valid Part URI`,
    });
  }
  return normalized;
}
