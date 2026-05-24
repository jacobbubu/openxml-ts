/**
 * Port of Microsoft Open-XML-SDK samples/AnimatedModel3DExample/Program.cs
 * @see https://github.com/microsoft/Open-XML-SDK/blob/main/samples/AnimatedModel3DExample/Program.cs
 *
 * Demonstrates inserting an animated 3D model (GLB file) into a PowerPoint slide.
 * The 3D model is embedded via a Model3DReferenceRelationshipPart, with a PNG fallback.
 * An mc:AlternateContent element wraps the 3D choice (for Office 2019+ renderers) and
 * a PNG picture fallback (for older renderers). A p:timing element drives the animation.
 *
 * TS note: The full markup uses am3d: namespace elements from Office 2019 Drawing Model3D.
 * openxml-ts has typed elements for Model3D, Model3DCamera, etc. but the presentation-level
 * AlternateContent, GraphicFrame and timing hierarchy are built via raw XML since openxml-ts
 * doesn't expose PPT AlternateContent wrappers through the slide shape tree facade.
 *
 * Run (requires .pptx, .png and .glb files):
 *   pnpm tsx examples/microsoft-samples/animated-model-3d.ts <presentation.pptx> <image.png> <model.glb>
 *
 * To test without real files, use --create-dummy to create a minimal presentation:
 *   pnpm tsx examples/microsoft-samples/animated-model-3d.ts --create-dummy <output.pptx>
 */

import { readFileSync } from "node:fs";
import type { PartUri } from "../../src/packaging/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";

/** Content type for 3D model binary (GLB/GLTF). */
const MODEL3D_CONTENT_TYPE = "model/gltf-binary";
const MODEL3D_RELATIONSHIP_TYPE =
  "http://schemas.microsoft.com/office/2017/06/relationships/3dModel";
const _IMAGE_RELATIONSHIP_TYPE =
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";

/**
 * Port of InsertAnimatedModel3D.
 * Adds an animated 3D model to the first slide of the given presentation.
 *
 * @param doc      PresentationDocument open for editing
 * @param pngBytes PNG image bytes for the raster fallback
 * @param glbBytes GLB 3D model file bytes
 */
export async function insertAnimatedModel3D(
  doc: PresentationDocument,
  pngBytes: Uint8Array,
  glbBytes: Uint8Array,
): Promise<void> {
  const presentationPart = doc.presentationPart;
  if (presentationPart === undefined) {
    throw new Error("presentationPart is missing");
  }

  const slideParts = presentationPart.slideParts;
  if (slideParts.length === 0) {
    throw new Error("No slides found");
  }

  const slidePart = slideParts[0]!;
  const pkg = doc.package;
  const slidePartRel = slidePart.part;

  // ── Add GLB 3D model part ──────────────────────────────────────────────────
  const glbUri = "/ppt/media/model1.glb" as PartUri;
  const glbPart = pkg.createPart(glbUri, MODEL3D_CONTENT_TYPE);
  const glbRelId = slidePartRel.relationships.create({
    type: MODEL3D_RELATIONSHIP_TYPE,
    target: "../media/model1.glb",
    targetMode: "internal",
  }).id;
  await glbPart.writeAsync(glbBytes);

  // ── Add PNG raster fallback ────────────────────────────────────────────────
  const { relId: pngRelId } = doc.addImagePart(0, pngBytes, { contentType: "image/png" });

  // ── Unique IDs ─────────────────────────────────────────────────────────────
  const guidId = `{${crypto.randomUUID().toUpperCase()}}`;
  const threeDModelId = 2;

  // ── Build the mc:AlternateContent + p:timing XML ───────────────────────────
  // The structure mirrors the .NET sample exactly:
  //   mc:AlternateContent
  //     mc:Choice requires="am3d"
  //       p:graphicFrame (with am3d:model3d, camera, transform, raster, animation, lights)
  //     mc:Fallback
  //       p:pic (PNG fallback image)
  //
  // This is written as raw XML appended to the slide XML because openxml-ts does not
  // yet expose AlternateContent wrappers in the slide shape tree facade (typed API).

  const ns = {
    mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
    p: "http://schemas.openxmlformats.org/presentationml/2006/main",
    a: "http://schemas.openxmlformats.org/drawingml/2006/main",
    r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d",
    a16: "http://schemas.microsoft.com/office/drawing/2014/main",
    p14: "http://schemas.microsoft.com/office/powerpoint/2010/main",
    a3danim: "http://schemas.microsoft.com/office/drawing/2018/animation/model3d",
  };

  // The slide XML is modified by reading the current bytes, removing the closing </p:sld> tag,
  // injecting our markup, and re-writing. This is the lowest-risk approach without needing
  // to add new typed API surface.
  // For a production implementation, add AlternateContent to the typed slide model.

  const alternateContentXml = `<mc:AlternateContent xmlns:mc="${ns.mc}"><mc:Choice Requires="am3d" xmlns:am3d="${ns.am3d}"><p:graphicFrame xmlns:p="${ns.p}" xmlns:a="${ns.a}" xmlns:r="${ns.r}"><p:nvGraphicFramePr><p:cNvPr id="${threeDModelId}" name="3D Model 1" descr="Flying bee"><a:extLst><a:ext uri="{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}"><a16:creationId xmlns:a16="${ns.a16}" id="${guidId}"/></a:ext></a:extLst></p:cNvPr><p:cNvGraphicFramePr/><p:nvPr><p:extLst><p:ext uri="{D42A27DB-BD31-4B8C-83A1-F6EECF244321}"><p14:modId xmlns:p14="${ns.p14}" val="3636546711"/></p:ext></p:extLst></p:nvPr></p:nvGraphicFramePr><p:xfrm><a:off x="4016654" y="1698584"/><a:ext cx="4158691" cy="3460830"/></p:xfrm><a:graphic><a:graphicData uri="${ns.am3d}"><am3d:model3d r:embed="${glbRelId}"><am3d:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="4158691" cy="3460830"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></am3d:spPr><am3d:model3dCamera><am3d:pos x="0" y="0" z="67740115"/><am3d:up dx="0" dy="36000000" dz="0"/><am3d:lookAt x="0" y="0" z="0"/><am3d:perspective fov="2700000"/></am3d:model3dCamera><am3d:model3dTx><am3d:meterPerModelUnitPositiveRatio n="30569" d="1000000"/><am3d:preTxVec dx="-98394" dy="-14223043" dz="-1124542"/><am3d:scale3D><am3d:sx n="1000000" d="1000000"/><am3d:sy n="1000000" d="1000000"/><am3d:sz n="1000000" d="1000000"/></am3d:scale3D><am3d:rot3D/><am3d:postTxVec dx="0" dy="0" dz="0"/></am3d:model3dTx><am3d:model3dRaster rName="Office3DRenderer" rVer="16.0.8326"><am3d:blip r:embed="${pngRelId}"/></am3d:model3dRaster><am3d:extLst><a:ext uri="{9A65AA19-BECB-4387-8358-8AD5134E1D82}"><a3danim:embedAnim xmlns:a3danim="${ns.a3danim}" animId="0"><a3danim:animPr length="1899" count="indefinite"/></a3danim:embedAnim></a:ext><a:ext uri="{E9DE012E-A134-456F-84FE-255F9AAD75C6}"><a3danim:posterFrame xmlns:a3danim="${ns.a3danim}" animId="0"/></a:ext></am3d:extLst><am3d:objectPr viewportSz="5418666"/><am3d:ambientLight><am3d:clr><a:srgbClr val="808080"/></am3d:clr><am3d:illuminancePositiveRatio n="500000" d="1000000"/></am3d:ambientLight><am3d:ptLight rad="0"><am3d:clr><a:srgbClr val="FFC080"/></am3d:clr><am3d:intensityPositiveRatio n="9765625" d="1000000"/><am3d:pos x="21959998" y="70920001" z="16344003"/></am3d:ptLight><am3d:ptLight rad="0"><am3d:clr><a:srgbClr val="6699F2"/></am3d:clr><am3d:intensityPositiveRatio n="12250000" d="1000000"/><am3d:pos x="-37964106" y="51130435" z="57631972"/></am3d:ptLight><am3d:ptLight rad="0"><am3d:clr><a:srgbClr val="DEB9FF"/></am3d:clr><am3d:intensityPositiveRatio n="3125000" d="1000000"/><am3d:pos x="-37739122" y="58056624" z="-34769649"/></am3d:ptLight></am3d:model3d></a:graphicData></a:graphic></p:graphicFrame></mc:Choice><mc:Fallback><p:pic xmlns:p="${ns.p}" xmlns:a="${ns.a}" xmlns:r="${ns.r}"><p:nvPicPr><p:cNvPr id="${threeDModelId}" name="3D Model 1" descr="Flying bee"><a:extLst><a:ext uri="{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}"><a16:creationId xmlns:a16="${ns.a16}" id="${guidId}"/></a:ext></a:extLst></p:cNvPr><p:cNvPicPr><a:picLocks noGrp="1" noRot="1" noChangeAspect="1" noMove="1" noResize="1" noEditPoints="1" noAdjustHandles="1" noChangeArrowheads="1" noChangeShapeType="1" noCrop="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="${pngRelId}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="4016654" y="1698584"/><a:ext cx="4158691" cy="3460830"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic></mc:Fallback></mc:AlternateContent>`;

  // Append timing for animation
  const timingXml = `<p:timing xmlns:p="${ns.p}"><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmingRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst><p:par><p:cTn id="3" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst><p:par><p:cTn id="4" fill="hold"><p:childTnLst><p:par><p:cTn id="5" presetID="100" presetClass="emph" presetSubtype="1" fill="hold" repeatCount="indefinite" nodeType="withEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="6" dur="1900" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:anim calcmode="lin" valueType="num"><p:cBhvr><p:cTn id="7" dur="1900" fill="hold"/><p:tgtEl><p:spTgt spid="${threeDModelId}"/></p:tgtEl><p:attrNameLst><p:attrName>embedded1</p:attrName></p:attrNameLst></p:cBhvr><p:tavLst><p:tav tm="0"><p:val><p:fltVal val="0"/></p:val></p:tav><p:tav tm="100000"><p:val><p:fltVal val="1"/></p:val></p:tav></p:tavLst></p:anim></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>`;

  // Append AlternateContent and timing to slide shape tree and slide root
  const slide = slidePart.slide;
  const cSld = slide.firstChild()!;
  const spTree = [...cSld.children].find((c) => c.localName === "spTree");
  if (spTree === undefined) {
    throw new Error("spTree not found");
  }

  // We need to inject raw XML into the shape tree. Use OpenXmlUnknownElement as a raw holder.
  const { OpenXmlUnknownElement } = await import("../../src/element/index.js");

  const _acEl = new OpenXmlUnknownElement(
    "mc",
    "AlternateContent",
    "http://schemas.openxmlformats.org/markup-compatibility/2006",
  );
  // The full XML is complex; we store it via extendedAttributes approach won't work.
  // Instead we write the full slide XML by modifying the part bytes directly.
  // This is a pragmatic approach — the alternative would require adding AlternateContent
  // support to the typed slide model (future enhancement, blocked on typed-slide-model API).

  // Approach: get current slide bytes, inject XML before </p:sld>
  const slideStream = slidePartRel.openReadStream();
  const reader = slideStream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const decoder = new TextDecoder();
  let slideXml = chunks.map((c) => decoder.decode(c)).join("");

  // Inject AlternateContent before </p:spTree>, and timing before </p:sld>
  slideXml = slideXml.replace("</p:spTree>", `${alternateContentXml}</p:spTree>`);
  slideXml = slideXml.replace("</p:sld>", `${timingXml}</p:sld>`);

  await slidePartRel.writeAsync(slideXml);
}

// ── Minimal 1×1 PNG as fallback when running without real files ──────────────
const TINY_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
  0x42, 0x60, 0x82,
]);

// Minimal GLB binary (just the header bytes for a valid GLB v2 container)
// Real usage: pass an actual .glb file from the args
const MINIMAL_GLB = new Uint8Array([
  0x67,
  0x6c,
  0x54,
  0x46, // magic: "glTF"
  0x02,
  0x00,
  0x00,
  0x00, // version: 2
  0x0c,
  0x00,
  0x00,
  0x00, // length: 12 (header only)
]);

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args[0] === "--create-dummy") {
    const outputPath = args[1] ?? "./animated_3d.pptx";
    const doc = PresentationDocument.create();
    await insertAnimatedModel3D(doc, TINY_PNG, MINIMAL_GLB);
    await doc.saveAsAsync(outputPath);
    process.stdout.write(`Wrote ${outputPath} (dummy 3D model — not renderable by PowerPoint)\n`);
    return;
  }

  const [pptxPath, pngPath, glbPath] = args;
  if (pptxPath === undefined || pngPath === undefined || glbPath === undefined) {
    process.stderr.write(
      "usage: animated-model-3d <output.pptx> <image.png> <model.glb>\n" +
        "   or: animated-model-3d --create-dummy [output.pptx]\n" +
        "  Inserts an animated 3D model into a new PowerPoint presentation.\n",
    );
    process.exit(2);
  }

  const pngBytes = new Uint8Array(readFileSync(pngPath));
  const glbBytes = new Uint8Array(readFileSync(glbPath));

  const doc = PresentationDocument.create();
  await insertAnimatedModel3D(doc, pngBytes, glbBytes);
  await doc.saveAsAsync(pptxPath);
  process.stdout.write(`Wrote ${pptxPath} (animated 3D model inserted)\n`);
}

if (process.argv[1] === (await import("node:url")).fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
    process.exit(1);
  });
}
