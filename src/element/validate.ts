/**
 * Schema validator —— opt-in 全树校验，**永远不抛错**，返回 issue 列表。
 *
 * 设计动机：deserialize 走 lenient mode（Phase B）让真实 Office 文件能解，但失去
 * 写入时校验能力。本模块给用户一条 escape hatch：拿到 element 树后显式调
 * `validate()` 走全树验证，决定要不要修。
 *
 * 当前实现：递归走每个节点，调 generated 类的 `validateRequired()`（已存在），
 * 收集 throw。**不**调 schema 长度 / 数值 / 枚举验证——这些 codegen 出来的 assert
 * 在 deserialize 阶段已被吞掉，要重新打开需要 codegen 改动，留到后续。
 */

import { OpenXmlCompositeElement, type OpenXmlElement } from "./element.js";
import { OpenXmlPackageError } from "../packaging/errors.js";

export interface ValidationIssue {
  /** element 在树里的 path，如 `/document/body/p[2]/r[0]`。 */
  readonly path: string;
  /** 内部错误码（如 `REQUIRED_ATTR_MISSING`），便于 i18n / 自动化处理。 */
  readonly code: string;
  /** 人类可读消息。 */
  readonly message: string;
}

/**
 * 递归走整棵 element 子树，收集所有 schema 校验 issue。永远返回数组（即便 root
 * 自己也有问题也不抛）。
 */
export function collectValidationIssues(root: OpenXmlElement): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  walk(root, makePath("", root, 0), issues);
  return issues;
}

function walk(el: OpenXmlElement, path: string, issues: ValidationIssue[]): void {
  // 调用 generated 类自带的 validateRequired（如果存在）；吞掉 throw 收 issue。
  const validate = (el as { validateRequired?: () => void }).validateRequired;
  if (typeof validate === "function") {
    try {
      validate.call(el);
    } catch (err) {
      issues.push(toIssue(err, path));
    }
  }
  if (el instanceof OpenXmlCompositeElement) {
    let i = 0;
    for (const child of el.children) {
      walk(child, makePath(path, child, i), issues);
      i += 1;
    }
  }
}

function makePath(parent: string, el: OpenXmlElement, index: number): string {
  const segment = `${el.localName}[${index}]`;
  return parent.length === 0 ? `/${segment}` : `${parent}/${segment}`;
}

function toIssue(err: unknown, path: string): ValidationIssue {
  if (err instanceof OpenXmlPackageError) {
    return { path, code: err.code, message: err.message };
  }
  const message = (err as Error)?.message ?? String(err);
  return { path, code: "VALIDATION_ERROR", message };
}
