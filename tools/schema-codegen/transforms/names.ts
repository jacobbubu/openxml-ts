/**
 * 类名 / 文件名 / element 限定名规范化。
 */

/**
 * 解析 `"<typePrefix>:<typeName>/<elPrefix>:<elName>"` 结构。
 *
 * 第二段为空（如 `"w:CT_TrackChange/"`）表示抽象基类，无 element 名。
 * 第一段为空（如 `"/w:p"`）理论上少见，仍兼容。
 */
export function parseSchemaName(name: string): {
  typePrefix: string;
  typeName: string;
  elementPrefix: string;
  elementName: string;
  isAbstract: boolean;
} {
  const slash = name.indexOf("/");
  const typePart = slash === -1 ? name : name.slice(0, slash);
  const elementPart = slash === -1 ? "" : name.slice(slash + 1);
  const [typePrefix, typeName] = splitQName(typePart);
  const [elementPrefix, elementName] = splitQName(elementPart);
  return {
    typePrefix,
    typeName,
    elementPrefix,
    elementName,
    isAbstract: elementName.length === 0,
  };
}

function splitQName(qname: string): [string, string] {
  if (qname.length === 0) return ["", ""];
  const colon = qname.indexOf(":");
  if (colon === -1) return ["", qname];
  return [qname.slice(0, colon), qname.slice(colon + 1)];
}

/** PascalCase className → kebab-case 文件名（少见首字母连续大写时也合理拆分）。 */
export function classNameToFileName(className: string): string {
  return className
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}
