/**
 * XML → OpenXmlElement 树反序列化。
 *
 * 复用 Epic-1 的 `tokenizeXml`；本模块负责：
 * 1. 跟踪 namespace prefix → URI 的作用域栈（XML 命名空间继承）；
 * 2. 按 `(namespaceUri, localName)` 在 ElementRegistry 中查类；
 * 3. 未注册的元素降级为 {@link OpenXmlUnknownElement}（不抛错）；
 * 4. 文本节点写入当前栈顶元素的 `text` 字段（仅 Leaf 与 Unknown 接受文本）。
 */

import { OpenXmlPackageError } from "../packaging/errors.js";
import { tokenizeXml } from "../packaging/xml/index.js";
import { OpenXmlCompositeElement, type OpenXmlElement, OpenXmlLeafElement } from "./element.js";
import { type ElementRegistry, elementRegistry } from "./registry.js";
import { OpenXmlUnknownElement } from "./unknown-element.js";

export interface DeserializeOptions {
  /** 元素注册表；默认使用全局 {@link elementRegistry}。 */
  readonly registry?: ElementRegistry;
}

type NsScope = ReadonlyMap<string, string>;

interface Frame {
  readonly element: OpenXmlElement;
  readonly scope: NsScope;
}

export function deserialize(xml: string, options: DeserializeOptions = {}): OpenXmlElement {
  const registry = options.registry ?? elementRegistry;
  const stack: Frame[] = [];
  let root: OpenXmlElement | undefined;

  for (const token of tokenizeXml(xml)) {
    if (token.kind === "decl") continue;

    if (token.kind === "open") {
      const parentScope = stack.length === 0 ? EMPTY_SCOPE : stack[stack.length - 1]?.scope;
      const localDecls = collectNsDeclarations(token.attrs);
      const fullScope = mergeScope(parentScope ?? EMPTY_SCOPE, localDecls);
      const { prefix, localName, namespaceUri } = resolveQName(token.name, fullScope);

      // Epic-86: 上下文感知消歧——先查父元素 child-map，未命中再降级到全局 lookup。
      const parentEl = stack.length > 0 ? stack[stack.length - 1]?.element : undefined;
      const parentClassName = parentEl !== undefined ? parentEl.constructor.name : undefined;
      const ctor =
        (parentClassName !== undefined
          ? registry.lookupChild(parentClassName, namespaceUri, localName)
          : undefined) ?? registry.lookup(namespaceUri, localName);
      const element: OpenXmlElement =
        ctor !== undefined
          ? new ctor()
          : new OpenXmlUnknownElement(prefix, localName, namespaceUri);

      for (const [key, value] of token.attrs) {
        // Deserialize 走 **lenient mode**：schema 长度 / 数值 / 枚举校验失败
        // 不应让 parse 整个挂——真实 Office 文件含大量 schema 越界值（如
        // `<w:color w:val="auto">` 的 4 chars 越过 maxLength=3）。把校验
        // 异常吞掉，保留原始字符串属性即可，让用户能继续遍历 / 修改。严格
        // 校验留给上层（OpenXmlElement.validateRequired() 等显式调用）。
        try {
          element.applyAttribute(key, value);
        } catch {
          // 校验失败时 typed 字段可能已写入，保留 raw 属性到 extendedAttributes
          if (!element.extendedAttributes.has(key)) {
            element.extendedAttributes.set(key, value);
          }
        }
      }

      // 当 typed class 的固有 prefix（如 Workbook.prefix="x"）与 XML 用的
      // prefix（如默认 namespace 下的空前缀）不一致时，re-serialize 会输出
      // `<x:workbook>` 但 xmlns:x 没声明，下一轮反序列化会降级为 Unknown。
      // 仅在 typed.prefix 尚未绑定到 typed.namespaceUri 时补一次 `xmlns:<typed.prefix>`；
      // 同步把 binding 写入 effectiveScope，让子孙看作 in-scope 不再重复声明（否则
      // 每个 typed 元素都会冗余 `xmlns:x`，文件体积 4x 暴胀且部分严格客户端拒读）。
      let effectiveScope = fullScope;
      if (
        ctor !== undefined &&
        element.prefix.length > 0 &&
        namespaceUri.length > 0 &&
        fullScope.get(element.prefix) !== namespaceUri
      ) {
        if (!element.extendedAttributes.has(`xmlns:${element.prefix}`)) {
          element.extendedAttributes.set(`xmlns:${element.prefix}`, namespaceUri);
        }
        const extended = new Map(fullScope);
        extended.set(element.prefix, namespaceUri);
        effectiveScope = extended;
      }

      if (root === undefined) {
        root = element;
      } else {
        const top = stack[stack.length - 1];
        if (top === undefined) {
          throw new OpenXmlPackageError({
            code: "BACKEND_ERROR",
            message: "Unexpected sibling root element",
          });
        }
        if (!(top.element instanceof OpenXmlCompositeElement)) {
          throw new OpenXmlPackageError({
            code: "BACKEND_ERROR",
            message: `Cannot append child to leaf element <${top.element.localName}>`,
          });
        }
        top.element.appendChild(element);
      }

      if (!token.selfClosing) {
        stack.push({ element, scope: effectiveScope });
      }
      continue;
    }

    if (token.kind === "close") {
      if (stack.length === 0) {
        throw new OpenXmlPackageError({
          code: "BACKEND_ERROR",
          message: `Unbalanced close tag </${token.name}>`,
        });
      }
      stack.pop();
      continue;
    }

    if (token.kind === "text") {
      const top = stack[stack.length - 1];
      if (top === undefined) continue;
      if (top.element instanceof OpenXmlLeafElement) {
        top.element.text = (top.element.text ?? "") + token.value;
      } else if (top.element instanceof OpenXmlUnknownElement) {
        top.element.text = (top.element.text ?? "") + token.value;
      }
    }
  }

  if (root === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "XML did not produce any root element",
    });
  }
  if (stack.length !== 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "Unterminated element at end of XML",
    });
  }
  return root;
}

const EMPTY_SCOPE: NsScope = new Map();

function collectNsDeclarations(attrs: ReadonlyMap<string, string>): NsScope {
  const out = new Map<string, string>();
  for (const [k, v] of attrs) {
    if (k === "xmlns") {
      out.set("", v);
    } else if (k.startsWith("xmlns:")) {
      out.set(k.slice(6), v);
    }
  }
  return out;
}

function mergeScope(parent: NsScope, local: NsScope): NsScope {
  if (local.size === 0) return parent;
  const merged = new Map(parent);
  for (const [k, v] of local) merged.set(k, v);
  return merged;
}

function resolveQName(
  qname: string,
  scope: NsScope,
): { prefix: string; localName: string; namespaceUri: string } {
  const colon = qname.indexOf(":");
  const prefix = colon === -1 ? "" : qname.slice(0, colon);
  const localName = colon === -1 ? qname : qname.slice(colon + 1);
  const namespaceUri = scope.get(prefix) ?? "";
  return { prefix, localName, namespaceUri };
}
