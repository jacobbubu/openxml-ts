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
  /**
   * 已加载到内存的 OpenXmlElement 总数（含 leaf）。
   *
   * OPC 层永远报 0；只有上层文档门面（如 `WordprocessingDocument`）才会在
   * typed Part 缓存就绪时填这两个字段。
   */
  readonly elementCount: number;
  /** 反序列化后被识别为 `OpenXmlUnknownElement` 的子集（schema 未覆盖的元素）。 */
  readonly unknownElementCount: number;
  /** 加载阶段或显式 mutation 时产生的非阻塞警告（不是错误）。 */
  readonly warnings: readonly string[];
}

/** 由 backend 在 open 等关键时机往里追加 warning。 */
export class DiagnosticsRecorder {
  private readonly warnings: string[] = [];
  private elementCounter?: () => { elementCount: number; unknownElementCount: number };

  warn(message: string): void {
    this.warnings.push(message);
  }

  /**
   * 让上层（如 `WordprocessingDocument`）注入 element 计数函数。
   * snapshot() 时会调用它，得不到（未注册）就回落到 0/0。
   */
  registerElementCounter(
    counter: () => { elementCount: number; unknownElementCount: number },
  ): void {
    this.elementCounter = counter;
  }

  snapshot(pkg: IPackage): PackageDiagnostics {
    let partCount = 0;
    let relationshipCount = pkg.relationships.count;
    for (const part of pkg.parts()) {
      partCount += 1;
      relationshipCount += part.relationships.count;
    }
    const counts = this.elementCounter?.() ?? { elementCount: 0, unknownElementCount: 0 };
    return {
      partCount,
      relationshipCount,
      elementCount: counts.elementCount,
      unknownElementCount: counts.unknownElementCount,
      warnings: [...this.warnings],
    };
  }

  warningCount(): number {
    return this.warnings.length;
  }
}
