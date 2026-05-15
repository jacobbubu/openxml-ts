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

export function debug(scope: string, message: string, extra?: unknown): void {
  if (!enabled) return;
  if (extra === undefined) {
    console.debug(`[openxml-ts:${scope}] ${message}`);
  } else {
    console.debug(`[openxml-ts:${scope}] ${message}`, extra);
  }
}

export const isDebugEnabled = (): boolean => enabled;
