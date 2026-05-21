// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-59：PPT `Slide.transition` 切换效果访问器 mixin。
 *
 * 操作 `<p:sld>` 下的 `<p:transition>` 元素（位于 `<p:clrMapOvr>` 之后）。
 *
 * - getter：返回 `{ effect, speed?, advanceOnClick?, advanceAfterTimeMs? } | undefined`
 * - setter：写入 `<p:transition spd="..." advClick="..." advTm="..."><p:xxx/></p:transition>`
 * - setter undefined → 删除 `<p:transition>`
 *
 * 支持的切换效果（Phase 1）：fade / push / cut / wipe / split / dissolve
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import { BooleanValue, StringValue } from "../../element/index.js";
import { CutTransition } from "../generated/cut-transition.js";
import { DissolveTransition } from "../generated/dissolve-transition.js";
import { FadeTransition } from "../generated/fade-transition.js";
import { PushTransition } from "../generated/push-transition.js";
import { Slide } from "../generated/slide.js";
import { SplitTransition } from "../generated/split-transition.js";
import { Transition } from "../generated/transition.js";
import { WipeTransition } from "../generated/wipe-transition.js";

/** 支持的 Phase-1 切换效果名称 */
export type TransitionEffect = "fade" | "push" | "cut" | "wipe" | "split" | "dissolve";

/** 切换速度 */
export type TransitionSpeed = "slow" | "med" | "fast";

/** `Slide.transition` 的值类型 */
export interface SlideTransition {
  /** 切换效果 */
  effect: TransitionEffect;
  /** 切换速度（省略时由 PowerPoint 取默认值） */
  speed?: TransitionSpeed;
  /** 鼠标单击推进幻灯片 */
  advanceOnClick?: boolean;
  /** 自动推进时间（毫秒）*/
  advanceAfterTimeMs?: number;
}

declare module "../generated/slide.js" {
  interface Slide {
    /**
     * 幻灯片切换效果。
     * - getter：无 `<p:transition>` 或不含支持效果时返回 undefined。
     * - setter undefined → 删除 `<p:transition>`。
     */
    transition: SlideTransition | undefined;
  }
}

/** effect 名称 → 对应子元素 localName */
const EFFECT_LOCAL_NAMES: Record<TransitionEffect, string> = {
  fade: "fade",
  push: "push",
  cut: "cut",
  wipe: "wipe",
  split: "split",
  dissolve: "dissolve",
};

/** localName → TransitionEffect（反查） */
const LOCAL_NAME_TO_EFFECT: Record<string, TransitionEffect> = {
  fade: "fade",
  push: "push",
  cut: "cut",
  wipe: "wipe",
  split: "split",
  dissolve: "dissolve",
};

/** 根据 effect 名称创建对应的子元素 */
function createEffectElement(
  effect: TransitionEffect,
):
  | FadeTransition
  | PushTransition
  | CutTransition
  | WipeTransition
  | SplitTransition
  | DissolveTransition {
  switch (effect) {
    case "fade":
      return new FadeTransition();
    case "push":
      return new PushTransition();
    case "cut":
      return new CutTransition();
    case "wipe":
      return new WipeTransition();
    case "split":
      return new SplitTransition();
    case "dissolve":
      return new DissolveTransition();
  }
}

Object.defineProperty(Slide.prototype, "transition", {
  configurable: false,
  enumerable: false,

  get(this: Slide): SlideTransition | undefined {
    const trans = this.firstChild(Transition);
    if (trans === undefined) return undefined;

    // 找到第一个匹配支持效果的子元素
    let effect: TransitionEffect | undefined;
    for (const child of trans.children) {
      const candidate = LOCAL_NAME_TO_EFFECT[child.localName];
      if (candidate !== undefined) {
        effect = candidate;
        break;
      }
    }
    if (effect === undefined) return undefined;

    const result: SlideTransition = { effect };

    const spd = trans.speed?.value;
    if (spd === "slow" || spd === "med" || spd === "fast") {
      result.speed = spd;
    }

    if (trans.advanceOnClick !== undefined) {
      result.advanceOnClick = trans.advanceOnClick.value;
    }

    if (trans.advanceAfterTime !== undefined) {
      const ms = Number(trans.advanceAfterTime.value);
      if (!Number.isNaN(ms)) {
        result.advanceAfterTimeMs = ms;
      }
    }

    return result;
  },

  set(this: Slide, value: SlideTransition | undefined): void {
    // 删除场景
    if (value === undefined) {
      const existing = this.firstChild(Transition);
      if (existing !== undefined) this.children.remove(existing);
      return;
    }

    // 确保 Transition 元素存在；复用已有或新建
    let trans = this.firstChild(Transition);
    if (trans === undefined) {
      trans = new Transition();
      // <p:transition> 应该 append 到 slide 最后（schema 顺序：cSld, clrMapOvr, transition）
      this.appendChild(trans);
    }

    // 设置属性
    if (value.speed !== undefined) {
      trans.speed = new StringValue(value.speed);
    } else {
      trans.speed = undefined;
    }

    if (value.advanceOnClick !== undefined) {
      trans.advanceOnClick = new BooleanValue(value.advanceOnClick);
    } else {
      trans.advanceOnClick = undefined;
    }

    if (value.advanceAfterTimeMs !== undefined) {
      trans.advanceAfterTime = new StringValue(String(value.advanceAfterTimeMs));
    } else {
      trans.advanceAfterTime = undefined;
    }

    // 清除旧的效果子元素，写入新的
    const effectLocalName = EFFECT_LOCAL_NAMES[value.effect];
    for (const child of trans.children.toArray()) {
      if (child.localName in LOCAL_NAME_TO_EFFECT) {
        trans.children.remove(child);
      }
    }
    // 检查是否已存在正确的效果元素
    let found = false;
    for (const child of trans.children) {
      if (child.localName === effectLocalName) {
        found = true;
        break;
      }
    }
    if (!found) {
      trans.appendChild(createEffectElement(value.effect));
    }
  },
});
