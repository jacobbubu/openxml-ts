/**
 * `OpenXmlPackage.diagnostics` 的只读视图。
 *
 * 当前覆盖（PRD §NFR-5.1）：
 * - Part 总数；
 * - 包级 + 全部 Part 级关系总数；
 * - 加载过程中产生的警告列表（孤立 .rels、未知子元素等）。
 *
 * Story-1.8 之后 backend 会按场景往 warnings 里追加。
 */

import type { IPackage } from "./interfaces/package.js";

export interface PackageDiagnostics {
  /** Part 总数；与 `[...pkg.parts()]` 长度一致。 */
  readonly partCount: number;
  /** 包级 + 各 Part 级关系总数。 */
  readonly relationshipCount: number;
  /** 加载阶段或显式 mutation 时产生的非阻塞警告（不是错误）。 */
  readonly warnings: readonly string[];
}

/** 由 backend 在 open 等关键时机往里追加 warning。 */
export class DiagnosticsRecorder {
  private readonly warnings: string[] = [];

  warn(message: string): void {
    this.warnings.push(message);
  }

  snapshot(pkg: IPackage): PackageDiagnostics {
    let partCount = 0;
    let relationshipCount = pkg.relationships.count;
    for (const part of pkg.parts()) {
      partCount += 1;
      relationshipCount += part.relationships.count;
    }
    return {
      partCount,
      relationshipCount,
      warnings: [...this.warnings],
    };
  }

  warningCount(): number {
    return this.warnings.length;
  }
}
