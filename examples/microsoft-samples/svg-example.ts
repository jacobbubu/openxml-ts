/**
 * Port of Microsoft Open-XML-SDK samples/SVGExample/Program.cs
 * @see https://github.com/microsoft/Open-XML-SDK/blob/main/samples/SVGExample/Program.cs
 *
 * Demonstrates adding an SVG image to a PowerPoint slide. SVG images in OOXML require
 * a paired PNG fallback (for older renderers). The SVG is referenced via an SVGBlip
 * extension in the Blip element.
 *
 * TS note: The .NET sample uses the Svg.NET NuGet package to rasterise the SVG to PNG.
 * Here we use a tiny 1×1 transparent PNG as the raster fallback.
 * In production, use a real SVG-to-PNG library (e.g. sharp or resvg-js).
 *
 * Run:
 *   pnpm tsx examples/microsoft-samples/svg-example.ts <output.pptx> [path-to.svg]
 */

import { readFileSync } from "node:fs";
import {
  AdjustValueList,
  Blip,
  BlipExtensionList,
  Extension,
  Extents,
  FillRectangle,
  NonVisualDrawingPropertiesExtension,
  NonVisualDrawingPropertiesExtensionList,
  Offset,
  PictureLocks,
  PresetGeometry,
  Stretch,
  Transform2D,
} from "../../src/drawing/index.js";
import { StringValue } from "../../src/element/index.js";
import { CreationId } from "../../src/office-ext/schemas-microsoft-com-office-drawing-2014-main/generated/creation-id.js";
import { SVGBlip } from "../../src/office-ext/schemas-microsoft-com-office-drawing-2016-SVG-main/generated/svg-blip.js";
import { ApplicationNonVisualDrawingProperties } from "../../src/ppt/generated/application-non-visual-drawing-properties.js";
import { BlipFill } from "../../src/ppt/generated/blip-fill.js";
import { NonVisualDrawingProperties } from "../../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualPictureDrawingProperties } from "../../src/ppt/generated/non-visual-picture-drawing-properties.js";
import { NonVisualPictureProperties } from "../../src/ppt/generated/non-visual-picture-properties.js";
import { Picture } from "../../src/ppt/generated/picture.js";
import { ShapeProperties } from "../../src/ppt/generated/shape-properties.js";
import { PresentationDocument } from "../../src/ppt/index.js";

// 1×1 transparent PNG used as raster fallback for the SVG
const TINY_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
  0x42, 0x60, 0x82,
]);

// Minimal SVG used when no path is provided
const MINIMAL_SVG = new TextEncoder().encode(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">` +
    `<circle cx="50" cy="50" r="40" fill="#0078d4"/>` +
    "</svg>",
);

export function addSvgToSlide(doc: PresentationDocument, svgBytes: Uint8Array): void {
  const presentationPart = doc.presentationPart;
  if (presentationPart === undefined) {
    throw new Error("presentationPart is missing");
  }

  const slideParts = presentationPart.slideParts;
  if (slideParts.length === 0) {
    throw new Error("No slides found");
  }

  const slidePart = slideParts[0]!;
  const partsCount = slidePart.part.relationships.count;

  // Add PNG raster fallback first
  const { relId: pngRelId } = doc.addImagePart(0, TINY_PNG, { contentType: "image/png" });

  // Add SVG image part
  const { relId: svgRelId } = doc.addImagePart(0, svgBytes, { contentType: "image/svg+xml" });

  // Build creation ID for non-visual drawing properties
  // (namespace is baked into CreationId.namespaceUri; no addNamespaceDeclaration needed)
  const creationId = new CreationId();
  creationId.id = `{${crypto.randomUUID().toUpperCase()}}`;

  // Build SVGBlip extension (inside Blip)
  const svgBlip = new SVGBlip();
  svgBlip.embed = StringValue.parse(svgRelId);

  const blipExt = new Extension();
  blipExt.extendedAttributes.set("uri", "{96DAC541-7B7A-43D3-8B79-37D633B846F1}");
  blipExt.appendChild(svgBlip);

  const blipExtList = new BlipExtensionList();
  blipExtList.appendChild(blipExt);

  const blip = new Blip();
  blip.embed = StringValue.parse(pngRelId);
  blip.appendChild(blipExtList);

  // Position: 2×2 inch, centred on a default 10×7.5 inch slide (EMU = 914400 per inch)
  const extentEmu = 914400 * 2;
  const offsetXEmu = 914400 * 4;
  const offsetYEmu = Math.round(914400 * 2.75);

  // NonVisualPictureProperties
  const nvExt = new NonVisualDrawingPropertiesExtension();
  nvExt.extendedAttributes.set("uri", "{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}");
  nvExt.appendChild(creationId);

  const nvExtList = new NonVisualDrawingPropertiesExtensionList();
  nvExtList.appendChild(nvExt);

  const nvDrawing = new NonVisualDrawingProperties();
  nvDrawing.extendedAttributes.set("id", String(partsCount + 3));
  nvDrawing.extendedAttributes.set("name", "Picture 1");
  nvDrawing.appendChild(nvExtList);

  const picLocks = new PictureLocks();
  picLocks.extendedAttributes.set("noChangeAspect", "1");

  const nvPicDrawing = new NonVisualPictureDrawingProperties();
  nvPicDrawing.appendChild(picLocks);

  const appNvPr = new ApplicationNonVisualDrawingProperties();

  const nvPicPr = new NonVisualPictureProperties();
  nvPicPr.appendChild(nvDrawing);
  nvPicPr.appendChild(nvPicDrawing);
  nvPicPr.appendChild(appNvPr);

  // BlipFill
  const blipFill = new BlipFill();
  blipFill.appendChild(blip);
  blipFill.appendChild(new Stretch(new FillRectangle()));

  // ShapeProperties
  const off = new Offset();
  off.extendedAttributes.set("x", String(offsetXEmu));
  off.extendedAttributes.set("y", String(offsetYEmu));

  const ext = new Extents();
  ext.extendedAttributes.set("cx", String(extentEmu));
  ext.extendedAttributes.set("cy", String(extentEmu));

  const xfrm = new Transform2D();
  xfrm.appendChild(off);
  xfrm.appendChild(ext);

  const prstGeom = new PresetGeometry(new AdjustValueList());
  prstGeom.extendedAttributes.set("prst", "rect");

  const spPr = new ShapeProperties();
  spPr.appendChild(xfrm);
  spPr.appendChild(prstGeom);

  // Assemble the Picture element
  const picture = new Picture();
  picture.appendChild(nvPicPr);
  picture.appendChild(blipFill);
  picture.appendChild(spPr);

  // Append to slide shape tree
  const slide = slidePart.slide;
  const cSld = slide.firstChild()!;
  const spTree = [...cSld.children].find((c) => c.localName === "spTree");
  if (spTree === undefined) {
    throw new Error("spTree not found in slide");
  }
  (spTree as { appendChild: (e: unknown) => void }).appendChild(picture);
}

async function main(): Promise<void> {
  const [outputPath, svgPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write(
      "usage: svg-example <output.pptx> [path-to.svg]\n" +
        "  Creates a pptx with an SVG image on the first slide.\n" +
        "  If no SVG path is given, a minimal blue circle SVG is embedded.\n",
    );
    process.exit(2);
  }

  const svgBytes = svgPath !== undefined ? readFileSync(svgPath) : MINIMAL_SVG;

  const doc = PresentationDocument.create();
  addSvgToSlide(doc, svgBytes);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (SVG image embedded on slide 1)\n`);
}

if (process.argv[1] === (await import("node:url")).fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
    process.exit(1);
  });
}
