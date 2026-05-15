import { OpenXmlPackageError } from "../errors.js";

/**
 * 用一个布尔状态拦截 dispose 之后的访问。多次 dispose 自然幂等。
 */
export class DisposalGuard {
  private disposed = false;

  get isDisposed(): boolean {
    return this.disposed;
  }

  /** 标记已 dispose；幂等。返回是否是「本次新触发」的 dispose（用于 autoSave 等钩子）。 */
  markDisposed(): boolean {
    if (this.disposed) return false;
    this.disposed = true;
    return true;
  }

  /** 操作前校验。已 dispose 抛 STREAM_CLOSED。 */
  ensureOpen(context: string): void {
    if (this.disposed) {
      throw new OpenXmlPackageError({
        code: "STREAM_CLOSED",
        message: `${context} after package has been disposed`,
      });
    }
  }
}
