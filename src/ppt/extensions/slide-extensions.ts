/**
 * Epic-24：PPT \`p:sld\` (Slide) 与 drawingml \`p:sp\` / \`a:txBody\` 的只读 \`text\` getter。
 *
 * - \`Slide.text\`：展平整张 slide 所有 \`<a:t>\`，段落之间 \\n、\`<a:br>\` 也 \\n
 * - \`Shape.text\`：drawingml Shape，展平 shape 内所有文本（同 slide 语义）
 *
 * 副作用：通过 \`openxml-ts/ppt\` 入口加载。
 */

import { Shape } from "../generated/shape.js";
import { Slide } from "../generated/slide.js";
import { collectAText } from "./text-collect.js";

declare module "../generated/slide.js" {
  interface Slide {
    /** 整张 slide 的纯文本展平。段落之间 \\n。只读。 */
    readonly text: string;
  }
}

declare module "../generated/shape.js" {
  interface Shape {
    /** Shape 内所有文本展平。段落之间 \\n。只读。 */
    readonly text: string;
  }
}

Object.defineProperty(Slide.prototype, "text", {
  configurable: false,
  enumerable: false,
  get(this: Slide): string {
    return collectAText(this);
  },
});

Object.defineProperty(Shape.prototype, "text", {
  configurable: false,
  enumerable: false,
  get(this: Shape): string {
    return collectAText(this);
  },
});
