import { OpenXmlPackageError } from "../errors.js";
import { type PartUri, isPartUri } from "../interfaces/types.js";

/**
 * 把字符串校验并铸造为 {@link PartUri}；失败时抛 `INVALID_PART_URI`。
 * 与 `tryPartUri` 的区别是：tryPartUri 返回 undefined，本函数主动抛错，
 * 适合实现内部需要明确 fail-fast 的路径。
 */
export function assertPartUri(value: string): PartUri {
  if (!isPartUri(value)) {
    throw new OpenXmlPackageError({
      code: "INVALID_PART_URI",
      message: `"${value}" is not a valid OPC Part URI`,
    });
  }
  return value;
}
