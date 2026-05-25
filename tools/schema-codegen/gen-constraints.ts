#!/usr/bin/env -S bun run
/**
 * Constraint data generator for Epic-78 OpenXmlValidator Phase 1.
 *
 * Reads schema JSON files and emits compact per-namespace constraint tables:
 *   src/validation/constraints/<name>.ts
 *
 * Each file exports a `constraints` record mapping class names to:
 *   - particle: normalized tree of allowed children + min/max occurs + kind
 *   - requiredAttrs: list of required attribute qnames
 *   - attrConstraints: per-attr string/number bounds
 *
 * Usage:
 *   bun run tools/schema-codegen/gen-constraints.ts
 *
 * Run for all 4 core namespaces automatically.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");
const OUTPUT_DIR = resolve(REPO_ROOT, "src/validation/constraints");
// Ensure OUTPUT_DIR uses the actual REPO_ROOT (worktree-safe)

// Support both normal workspace and worktree contexts
function findSchemasDir(): string {
  // Try relative to REPO_ROOT first (normal clone layout: openxml_ts/../github/...)
  const candidate1 = resolve(REPO_ROOT, "../../github/Open-XML-SDK/data/schemas");
  // Try absolute path used in package.json gen scripts
  const candidate2 = "/Users/rongshen/github/Open-XML-SDK/data/schemas";
  // Use whichever exists (sync check via Bun.file)
  try {
    const fs = require("node:fs");
    if (fs.existsSync(candidate1)) return candidate1;
  } catch {}
  return candidate2;
}
const SCHEMAS_DIR = findSchemasDir();

// Well-known prefix → URI mapping (from transforms/namespaces.ts)
const PREFIX_TO_URI: Record<string, string> = {
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  pic: "http://schemas.openxmlformats.org/drawingml/2006/picture",
  xl: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  // Note: xl is the canonical prefix but schema uses x or no prefix for many attrs
  // The actual namespace uses no prefix convention; the file uses the URI directly
  v: "urn:schemas-microsoft-com:vml",
  o: "urn:schemas-microsoft-com:office:office",
  xvml: "urn:schemas-microsoft-com:office:excel",
  w10: "urn:schemas-microsoft-com:office:word",
  pvml: "urn:schemas-microsoft-com:office:powerpoint",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  c: "http://schemas.openxmlformats.org/drawingml/2006/chart",
  xdr: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
  cdr: "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing",
  ap: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  op: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  b: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
  ds: "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
  sl: "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
  lc: "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas",
  comp: "http://schemas.openxmlformats.org/drawingml/2006/compatibility",
  dgm: "http://schemas.openxmlformats.org/drawingml/2006/diagram",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  x14: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  x15: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main",
  p14: "http://schemas.microsoft.com/office/powerpoint/2010/main",
  a14: "http://schemas.microsoft.com/office/drawing/2010/main",
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
};

// Core namespace schemas to generate constraints for
const CORE_SCHEMAS: ReadonlyArray<{ file: string; outName: string; ns: string }> = [
  {
    file: "schemas_openxmlformats_org_wordprocessingml_2006_main.json",
    outName: "word",
    ns: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  },
  {
    file: "schemas_openxmlformats_org_spreadsheetml_2006_main.json",
    outName: "excel",
    ns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  },
  {
    file: "schemas_openxmlformats_org_presentationml_2006_main.json",
    outName: "ppt",
    ns: "http://schemas.openxmlformats.org/presentationml/2006/main",
  },
  {
    file: "schemas_openxmlformats_org_drawingml_2006_main.json",
    outName: "drawing",
    ns: "http://schemas.openxmlformats.org/drawingml/2006/main",
  },
  {
    file: "schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json",
    outName: "spreadsheet-drawing",
    ns: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
  },
  {
    file: "schemas_microsoft_com_office_spreadsheetml_2009_9_main.json",
    outName: "excel-2009",
    ns: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  },
];

// ---- Version name → numeric value mapping (mirrors FileFormatVersions enum) ----
const VERSION_VALUES: Record<string, number> = {
  Office2007: 1,
  Office2010: 2,
  Office2013: 4,
  Office2016: 8,
  Office2019: 16,
  Office2021: 32,
  Microsoft365: 64,
};

// ---- Types matching the schema JSON structure ----
interface SchemaValidatorArg {
  readonly Name?: string;
  readonly Type?: string;
  readonly Value?: string;
}
interface SchemaValidator {
  readonly Name: string;
  readonly Arguments?: readonly SchemaValidatorArg[];
  readonly Version?: string;
}
interface SchemaAttribute {
  readonly QName: string;
  readonly PropertyName: string;
  readonly Type: string;
  readonly Validators?: readonly SchemaValidator[];
}
interface ParticleItem {
  readonly Name?: string; // "prefix:TypeName/prefix:localName"
  readonly Kind?: "Sequence" | "Choice" | "All" | "Group" | "Any";
  readonly Occurs?: ReadonlyArray<{ readonly Min?: number; readonly Max?: number }>;
  readonly Items?: readonly ParticleItem[];
  readonly InitialVersion?: string;
}
interface SchemaChild {
  readonly Name: string;
  readonly PropertyName?: string;
}
interface SchemaParticle {
  readonly Kind: "Sequence" | "Choice" | "All" | "Group";
  readonly Occurs?: ReadonlyArray<{ readonly Min?: number; readonly Max?: number }>;
  readonly Items: readonly ParticleItem[];
}
interface SchemaEnumFacet {
  readonly Value: string;
  readonly Version?: string;
}
interface SchemaEnum {
  readonly Type: string;
  readonly Name: string;
  readonly Facets: readonly SchemaEnumFacet[];
}
interface SchemaType {
  readonly Name: string;
  readonly ClassName: string;
  readonly IsAbstract?: boolean;
  readonly IsLeafElement?: boolean;
  readonly IsLeafText?: boolean;
  readonly Attributes?: readonly SchemaAttribute[];
  readonly Children?: readonly SchemaChild[];
  readonly Particle?: SchemaParticle;
}
interface SchemaFile {
  readonly TargetNamespace: string;
  readonly Types: readonly SchemaType[];
  readonly Enums?: readonly SchemaEnum[];
}

// ---- Normalized constraint types (emitted into generated files) ----
// These are the types that will be emitted as TypeScript literals.
// Keep compact: no class names in the output, use qnames directly.

/** A leaf entry in the normalized particle: one allowed element with occurs. */
interface NormalizedLeaf {
  readonly kind: "leaf";
  /** namespace URI of the allowed element */
  readonly ns: string;
  /** local name of the allowed element */
  readonly local: string;
  readonly min: number;
  readonly max: number | "unbounded";
  readonly initialVersion?: string;
  readonly expectedClassName?: string;
}

/** An xsd:any wildcard particle. */
interface NormalizedAny {
  readonly kind: "any";
  readonly min: number;
  readonly max: number | "unbounded";
}

/** A composite particle node. */
interface NormalizedComposite {
  readonly kind: "sequence" | "choice" | "all" | "group";
  readonly min: number;
  readonly max: number | "unbounded";
  readonly items: readonly NormalizedNode[];
}

type NormalizedNode = NormalizedLeaf | NormalizedAny | NormalizedComposite;

interface NormalizedParticle {
  readonly root: NormalizedNode;
}

interface AttrConstraint {
  readonly qname: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly typeHint?: string;
  readonly enumMembers?: readonly string[];
  readonly length?: number;
}

/** A version-scoped required attribute entry (matches VersionedRequiredAttr in types.ts). */
interface VersionedRequiredAttr {
  readonly qname: string;
  readonly minVersion?: number;
  readonly maxVersion?: number;
  readonly optional?: true;
}

interface ElementConstraint {
  readonly className: string;
  readonly namespaceUri: string;
  readonly localName: string;
  readonly particle?: NormalizedParticle;
  readonly requiredAttrs?: readonly string[];
  readonly versionedRequiredAttrs?: readonly VersionedRequiredAttr[];
  readonly attrConstraints?: readonly AttrConstraint[];
}

/**
 * Parse the element qname from a particle item Name like "w:CT_xxx/w:localName".
 * Returns { prefix, local } or null if not parseable.
 */
function parseItemName(name: string): { prefix: string; local: string } | null {
  const slash = name.indexOf("/");
  if (slash === -1) return null;
  const elemQName = name.slice(slash + 1);
  const colon = elemQName.indexOf(":");
  if (colon === -1) return { prefix: "", local: elemQName };
  return { prefix: elemQName.slice(0, colon), local: elemQName.slice(colon + 1) };
}

function resolveNs(prefix: string, targetNs: string): string {
  if (prefix.length === 0) return targetNs;
  return PREFIX_TO_URI[prefix] ?? targetNs;
}

function occursToMinMax(
  occurs: ReadonlyArray<{ readonly Min?: number; readonly Max?: number }> | undefined,
): { min: number; max: number | "unbounded" } {
  if (!occurs || occurs.length === 0) {
    // No Occurs means defaults: min=1, max=1 for explicit items
    // But in practice schema uses empty Occurs to mean unbounded (0..*)
    // An empty object {} in Occurs means 0..unbounded (confirmed by schema inspection)
    return { min: 1, max: 1 };
  }
  const o = occurs[0];
  if (o === undefined || (o.Min === undefined && o.Max === undefined)) {
    // Empty object = 0..unbounded
    return { min: 0, max: "unbounded" };
  }
  const min = o.Min ?? 0;
  const max = o.Max ?? "unbounded";
  return { min, max: max === 0 ? "unbounded" : max };
}

function normalizeParticleItem(
  item: ParticleItem,
  targetNs: string,
  expectedClassMap: ReadonlyMap<string, string>,
): NormalizedNode | null {
  const { min, max } = occursToMinMax(item.Occurs);

  // xsd:any wildcard
  if (item.Kind === "Any") {
    // noOccurs → min=1 max=unbounded (per xsd:any with minOccurs="1")
    if (!item.Occurs || item.Occurs.length === 0) {
      return { kind: "any", min: 1, max: "unbounded" };
    }
    return { kind: "any", min, max };
  }

  if (item.Name !== undefined) {
    // Leaf element reference
    const parsed = parseItemName(item.Name);
    if (parsed === null) return null;
    const ns = resolveNs(parsed.prefix, targetNs);
    const initialVersion = item.InitialVersion;
    const expectedClassName = expectedClassMap.get(item.Name);
    return {
      kind: "leaf",
      ns,
      local: parsed.local,
      min,
      max,
      ...(initialVersion !== undefined ? { initialVersion } : {}),
      ...(expectedClassName !== undefined ? { expectedClassName } : {}),
    };
  }

  if (item.Kind !== undefined && item.Items !== undefined) {
    const subItems: NormalizedNode[] = [];
    for (const sub of item.Items) {
      const n = normalizeParticleItem(sub, targetNs, expectedClassMap);
      if (n !== null) subItems.push(n);
    }
    const kind = item.Kind.toLowerCase() as "sequence" | "choice" | "all" | "group";
    return { kind, min, max, items: subItems };
  }

  return null;
}

function normalizeParticle(
  particle: SchemaParticle,
  targetNs: string,
  expectedClassMap: ReadonlyMap<string, string>,
): NormalizedParticle | null {
  const { min, max } = occursToMinMax(particle.Occurs);
  const items: NormalizedNode[] = [];
  for (const item of particle.Items) {
    const n = normalizeParticleItem(item, targetNs, expectedClassMap);
    if (n !== null) items.push(n);
  }
  const kind = particle.Kind.toLowerCase() as "sequence" | "choice" | "all" | "group";
  const root: NormalizedComposite = { kind, min, max, items };
  return { root };
}

function buildEnumMap(enums: readonly SchemaEnum[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const e of enums) {
    // Only include facets without version gating (base values)
    // Version-gated facets are ignored for now
    const values = e.Facets.filter((f) => f.Version === undefined).map((f) => f.Value);
    if (values.length > 0) {
      map.set(e.Name, values);
    }
    // Also index by Type (e.g. "w:ST_HexColorAuto")
    if (e.Type !== undefined) {
      map.set(e.Type, values);
    }
  }
  return map;
}

function extractTypeHint(attrType: string): string | undefined {
  if (attrType.includes("HexBinaryValue")) return "hexBinary";
  if (attrType.includes("Base64BinaryValue")) return "base64Binary";
  if (attrType.includes("ListValue")) return "list";
  if (attrType.includes("OnOffValue")) return "onOff";
  return undefined;
}

/** Parse the short enum name from a .NET EnumValue<T> type string.
 *  e.g. "EnumValue<DocumentFormat.OpenXml.Wordprocessing.JustificationValues>" → "JustificationValues" */
function parseEnumValueName(attrType: string): string | undefined {
  const m = attrType.match(/EnumValue<[^>]*\.(\w+)>/);
  return m ? m[1] : undefined;
}

function extractAttrConstraints(
  attrs: readonly SchemaAttribute[],
  enumMap: Map<string, string[]>,
): {
  required: string[];
  versionedRequired: VersionedRequiredAttr[];
  constraints: AttrConstraint[];
} {
  const required: string[] = [];
  const versionedRequired: VersionedRequiredAttr[] = [];
  const constraints: AttrConstraint[] = [];

  for (const attr of attrs) {
    let hasConstraint = false;
    const c: Partial<AttrConstraint> = { qname: attr.QName };

    // Collect all RequiredValidator entries for this attribute
    const reqValidators = (attr.Validators ?? []).filter((v) => v.Name === "RequiredValidator");

    if (reqValidators.length > 0) {
      const hasVersioned = reqValidators.some((v) => v.Version !== undefined);

      if (!hasVersioned) {
        // Check if any declares IsRequired=False (unconditional optional override)
        const anyOptional = reqValidators.some((v) => {
          const args = argsToMap(v.Arguments);
          return args.IsRequired?.toLowerCase() === "false";
        });
        if (!anyOptional) {
          required.push(attr.QName);
        }
        // else: all validators have IsRequired=False → attribute is optional, skip
      } else {
        // Has versioned RequiredValidators — build VersionedRequiredAttr entries
        // Sort by version value to determine min/max per version entry
        // Group into "required" ranges and "optional" (IsRequired=False) declarations
        for (const v of reqValidators) {
          const args = argsToMap(v.Arguments);
          const isOptional = args.IsRequired?.toLowerCase() === "false";
          const versionName = v.Version;
          const versionValue =
            versionName !== undefined ? (VERSION_VALUES[versionName] ?? undefined) : undefined;

          if (isOptional) {
            // This version says it's NOT required — emit optional override
            const entry: VersionedRequiredAttr = {
              qname: attr.QName,
              ...(versionValue !== undefined ? { minVersion: versionValue } : {}),
              optional: true,
            };
            versionedRequired.push(entry);
          } else {
            // This version says it IS required
            const entry: VersionedRequiredAttr = {
              qname: attr.QName,
              ...(versionValue !== undefined
                ? { minVersion: versionValue, maxVersion: versionValue }
                : {}),
            };
            versionedRequired.push(entry);
          }
        }
      }
    }

    // typeHint from attribute type
    const typeHint = extractTypeHint(attr.Type);
    if (typeHint !== undefined) {
      c.typeHint = typeHint;
      hasConstraint = true;
    }

    // EnumValue<T> → enumMembers from enum map
    const enumValueName = parseEnumValueName(attr.Type);
    if (enumValueName !== undefined) {
      const members = enumMap.get(enumValueName);
      if (members !== undefined && members.length > 0) {
        c.enumMembers = members;
        hasConstraint = true;
      }
    }

    const isHexBinary = c.typeHint === "hexBinary";

    for (const v of attr.Validators ?? []) {
      if (v.Name === "StringValidator") {
        const args = argsToMap(v.Arguments);
        if (isHexBinary && args.Length !== undefined) {
          // hexBinary length in bytes (not characters)
          c.length = Number(args.Length);
          hasConstraint = true;
        } else {
          if (args.MaxLength !== undefined) {
            c.maxLength = Number(args.MaxLength);
            hasConstraint = true;
          }
          if (args.MinLength !== undefined) {
            c.minLength = Number(args.MinLength);
            hasConstraint = true;
          }
          if (args.Length !== undefined) {
            c.maxLength = Number(args.Length);
            c.minLength = Number(args.Length);
            hasConstraint = true;
          }
        }
      } else if (v.Name === "NumberValidator") {
        const args = argsToMap(v.Arguments);
        if (args.MinInclusive !== undefined) {
          c.minValue = Number(args.MinInclusive);
          hasConstraint = true;
        }
        if (args.MaxInclusive !== undefined) {
          c.maxValue = Number(args.MaxInclusive);
          hasConstraint = true;
        }
      } else if (v.Name === "EnumValidator") {
        // Explicit EnumValidator: look up by type name (e.g. "w:ST_HexColorAuto")
        const enumType = (v as { Type?: string }).Type;
        if (enumType !== undefined) {
          const members = enumMap.get(enumType);
          if (members !== undefined && members.length > 0) {
            c.enumMembers = members;
            hasConstraint = true;
          }
        }
      }
    }

    if (hasConstraint) {
      constraints.push(c as AttrConstraint);
    }
  }

  return { required, versionedRequired, constraints };
}

function argsToMap(args: readonly SchemaValidatorArg[] | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of args ?? []) {
    if (typeof a.Name === "string" && typeof a.Value === "string") {
      out[a.Name] = a.Value;
    }
  }
  return out;
}

/**
 * Get element qname from the Type Name like "w:CT_xxx/w:localName".
 */
function parseTypeName(name: string): { prefix: string; local: string } | null {
  const slash = name.indexOf("/");
  if (slash === -1) return null;
  const elemQName = name.slice(slash + 1);
  const colon = elemQName.indexOf(":");
  if (colon === -1) return { prefix: "", local: elemQName };
  return { prefix: elemQName.slice(0, colon), local: elemQName.slice(colon + 1) };
}

function processSchema(schemaData: SchemaFile): ElementConstraint[] {
  const targetNs = schemaData.TargetNamespace;
  const enumMap = buildEnumMap(schemaData.Enums ?? []);
  const constraints: ElementConstraint[] = [];

  // Build set of ambiguous local names (localName shared by >1 type)
  const localNameCounts = new Map<string, number>();
  for (const type of schemaData.Types) {
    const p = parseTypeName(type.Name);
    if (p !== null) {
      localNameCounts.set(p.local, (localNameCounts.get(p.local) ?? 0) + 1);
    }
  }
  const ambiguousLocals = new Set<string>();
  for (const [local, count] of localNameCounts) {
    if (count > 1) ambiguousLocals.add(local);
  }

  for (const type of schemaData.Types) {
    if (type.ClassName.length === 0) continue;
    if (type.IsAbstract === true) continue;

    const parsed = parseTypeName(type.Name);
    if (parsed === null) continue;

    const localName = parsed.local;
    const namespaceUri = resolveNs(parsed.prefix, targetNs);

    const constraint: Partial<ElementConstraint> = {
      className: type.ClassName,
      namespaceUri,
      localName,
    };

    // Build expectedClassMap from Children for ambiguous localNames
    const expectedClassMap = new Map<string, string>();
    for (const child of type.Children ?? []) {
      const cp = parseItemName(child.Name);
      if (cp !== null && ambiguousLocals.has(cp.local) && child.PropertyName !== undefined) {
        expectedClassMap.set(child.Name, child.PropertyName);
      }
    }

    // Particle constraints (only composite elements have particles)
    if (type.Particle !== undefined && type.IsLeafElement !== true && type.IsLeafText !== true) {
      const norm = normalizeParticle(type.Particle, targetNs, expectedClassMap);
      if (norm !== null) {
        constraint.particle = norm;
      }
    }

    // Attribute constraints
    if (type.Attributes !== undefined && type.Attributes.length > 0) {
      const {
        required,
        versionedRequired,
        constraints: attrC,
      } = extractAttrConstraints(type.Attributes, enumMap);
      if (required.length > 0) constraint.requiredAttrs = required;
      if (versionedRequired.length > 0) constraint.versionedRequiredAttrs = versionedRequired;
      if (attrC.length > 0) constraint.attrConstraints = attrC;
    }

    // Only emit if we have some constraint data
    if (
      constraint.particle !== undefined ||
      constraint.requiredAttrs !== undefined ||
      constraint.versionedRequiredAttrs !== undefined ||
      constraint.attrConstraints !== undefined
    ) {
      constraints.push(constraint as ElementConstraint);
    }
  }

  // Sort deterministically by className
  constraints.sort((a, b) => a.className.localeCompare(b.className));
  return constraints;
}

function nodeToTs(node: NormalizedNode, indent: number): string {
  const pad = "  ".repeat(indent);
  if (node.kind === "any") {
    const maxStr = node.max === "unbounded" ? '"unbounded"' : String(node.max);
    return `${pad}{ kind: "any", min: ${node.min}, max: ${maxStr} }`;
  }
  if (node.kind === "leaf") {
    const maxStr = node.max === "unbounded" ? '"unbounded"' : String(node.max);
    const iv =
      node.initialVersion !== undefined
        ? `, initialVersion: ${JSON.stringify(node.initialVersion)}`
        : "";
    const ec =
      node.expectedClassName !== undefined
        ? `, expectedClassName: ${JSON.stringify(node.expectedClassName)}`
        : "";
    return `${pad}{ kind: "leaf", ns: ${JSON.stringify(node.ns)}, local: ${JSON.stringify(node.local)}, min: ${node.min}, max: ${maxStr}${iv}${ec} }`;
  }
  const itemsStr = node.items.map((item) => nodeToTs(item, indent + 1)).join(",\n");
  const maxStr = node.max === "unbounded" ? '"unbounded"' : String(node.max);
  return `${pad}{ kind: ${JSON.stringify(node.kind)}, min: ${node.min}, max: ${maxStr}, items: [\n${itemsStr}\n${pad}] }`;
}

function buildOutput(constraints: ElementConstraint[], sourcePath: string): string {
  const lines: string[] = [
    "// THIS FILE IS GENERATED BY tools/schema-codegen/gen-constraints.ts. DO NOT EDIT.",
    `// Source: ${sourcePath}`,
    'import type { ElementConstraint } from "../types.js";',
    "",
    "export const constraints: ReadonlyArray<ElementConstraint> = [",
  ];

  for (const c of constraints) {
    lines.push("  {");
    lines.push(`    className: ${JSON.stringify(c.className)},`);
    lines.push(`    namespaceUri: ${JSON.stringify(c.namespaceUri)},`);
    lines.push(`    localName: ${JSON.stringify(c.localName)},`);

    if (c.particle !== undefined) {
      lines.push("    particle: {");
      lines.push(`      root: ${nodeToTs(c.particle.root, 3).trimStart()}`);
      lines.push("    },");
    }

    if (c.requiredAttrs !== undefined && c.requiredAttrs.length > 0) {
      lines.push(
        `    requiredAttrs: [${c.requiredAttrs.map((a) => JSON.stringify(a)).join(", ")}],`,
      );
    }

    if (c.versionedRequiredAttrs !== undefined && c.versionedRequiredAttrs.length > 0) {
      lines.push("    versionedRequiredAttrs: [");
      for (const vr of c.versionedRequiredAttrs) {
        const parts: string[] = [`qname: ${JSON.stringify(vr.qname)}`];
        if (vr.minVersion !== undefined) parts.push(`minVersion: ${vr.minVersion}`);
        if (vr.maxVersion !== undefined) parts.push(`maxVersion: ${vr.maxVersion}`);
        if (vr.optional === true) parts.push("optional: true");
        lines.push(`      { ${parts.join(", ")} },`);
      }
      lines.push("    ],");
    }

    if (c.attrConstraints !== undefined && c.attrConstraints.length > 0) {
      lines.push("    attrConstraints: [");
      for (const ac of c.attrConstraints) {
        const parts: string[] = [`qname: ${JSON.stringify(ac.qname)}`];
        if (ac.typeHint !== undefined) parts.push(`typeHint: ${JSON.stringify(ac.typeHint)}`);
        if (ac.enumMembers !== undefined && ac.enumMembers.length > 0) {
          parts.push(`enumMembers: [${ac.enumMembers.map((m) => JSON.stringify(m)).join(", ")}]`);
        }
        if (ac.length !== undefined) parts.push(`length: ${ac.length}`);
        if (ac.minLength !== undefined) parts.push(`minLength: ${ac.minLength}`);
        if (ac.maxLength !== undefined) parts.push(`maxLength: ${ac.maxLength}`);
        if (ac.minValue !== undefined) parts.push(`minValue: ${ac.minValue}`);
        if (ac.maxValue !== undefined) parts.push(`maxValue: ${ac.maxValue}`);
        lines.push(`      { ${parts.join(", ")} },`);
      }
      lines.push("    ],");
    }

    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

async function main(): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const schema of CORE_SCHEMAS) {
    const inputPath = join(SCHEMAS_DIR, schema.file);
    process.stdout.write(`Processing ${schema.outName}...\n`);

    const json = JSON.parse(await readFile(inputPath, "utf-8")) as SchemaFile;
    const constraints = processSchema(json);
    const sourcePath = `../../github/Open-XML-SDK/data/schemas/${schema.file}`;
    const content = buildOutput(constraints, sourcePath);

    const outPath = join(OUTPUT_DIR, `${schema.outName}.ts`);
    await writeFile(outPath, content);
    process.stdout.write(`  -> ${constraints.length} constraints -> ${outPath}\n`);
  }

  // Write the index file
  const indexContent = [
    "// THIS FILE IS GENERATED. DO NOT EDIT.",
    "",
    'export { constraints as wordConstraints } from "./word.js";',
    'export { constraints as excelConstraints } from "./excel.js";',
    'export { constraints as pptConstraints } from "./ppt.js";',
    'export { constraints as drawingConstraints } from "./drawing.js";',
    'export { constraints as spreadsheetDrawingConstraints } from "./spreadsheet-drawing.js";',
    'export { constraints as excel2009Constraints } from "./excel-2009.js";',
    "",
  ].join("\n");

  await writeFile(join(OUTPUT_DIR, "index.ts"), indexContent);
  process.stdout.write("Done.\n");
}

main().catch((err) => {
  process.stderr.write(`gen-constraints failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
