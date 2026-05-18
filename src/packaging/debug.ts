/**
 * 轻量调试日志。仅当 `OPENXML_TS_DEBUG=1` 环境变量被设置时输出到 `console.debug`。
 *
 * 浏览器场景下 `process` 不存在；通过 `globalThis.process` 探测，未配置时静默无副作用。
 */

const enabled = (() => {
  try {
    const env = globalThis.process?.env;
    return env?.OPENXML_TS_DEBUG === "1";
  } catch {
    return false;
  }
})();

/** 在 `OPENXML_TS_DEBUG=1` 时输出一条带 scope 前缀的 debug 信息；未启用时零开销返回。 */
export function debug(scope: string, message: string, extra?: unknown): void {
  if (!enabled) return;
  if (extra === undefined) {
    console.debug(`[openxml-ts:${scope}] ${message}`);
  } else {
    console.debug(`[openxml-ts:${scope}] ${message}`, extra);
  }
}

/** 是否启用了 `OPENXML_TS_DEBUG` 调试日志——测试用，可避免在静默路径上做无用工作。 */
export const isDebugEnabled = (): boolean => enabled;
