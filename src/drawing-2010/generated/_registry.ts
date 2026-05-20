// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json

import type { ElementRegistry } from "../../element/index.js";
import { ArtisticBlur } from "./artistic-blur.js";
import { ArtisticCement } from "./artistic-cement.js";
import { ArtisticChalkSketch } from "./artistic-chalk-sketch.js";
import { ArtisticCrisscrossEtching } from "./artistic-crisscross-etching.js";
import { ArtisticCutout } from "./artistic-cutout.js";
import { ArtisticFilmGrain } from "./artistic-film-grain.js";
import { ArtisticGlass } from "./artistic-glass.js";
import { ArtisticGlowDiffused } from "./artistic-glow-diffused.js";
import { ArtisticGlowEdges } from "./artistic-glow-edges.js";
import { ArtisticLightScreen } from "./artistic-light-screen.js";
import { ArtisticLineDrawing } from "./artistic-line-drawing.js";
import { ArtisticMarker } from "./artistic-marker.js";
import { ArtisticMosaicBubbles } from "./artistic-mosaic-bubbles.js";
import { ArtisticPaintBrush } from "./artistic-paint-brush.js";
import { ArtisticPaintStrokes } from "./artistic-paint-strokes.js";
import { ArtisticPastelsSmooth } from "./artistic-pastels-smooth.js";
import { ArtisticPencilGrayscale } from "./artistic-pencil-grayscale.js";
import { ArtisticPencilSketch } from "./artistic-pencil-sketch.js";
import { ArtisticPhotocopy } from "./artistic-photocopy.js";
import { ArtisticPlasticWrap } from "./artistic-plastic-wrap.js";
import { ArtisticTexturizer } from "./artistic-texturizer.js";
import { ArtisticWatercolorSponge } from "./artistic-watercolor-sponge.js";
import { BackgroundMark } from "./background-mark.js";
import { BackgroundRemoval } from "./background-removal.js";
import { BrightnessContrast } from "./brightness-contrast.js";
import { CameraTool } from "./camera-tool.js";
import { ColorTemperature } from "./color-temperature.js";
import { CompatExtension } from "./compat-extension.js";
import { ContentPartLocks } from "./content-part-locks.js";
import { ForegroundMark } from "./foreground-mark.js";
import { GvmlContentPart } from "./gvml-content-part.js";
import { HiddenEffectsProperties } from "./hidden-effects-properties.js";
import { HiddenFillProperties } from "./hidden-fill-properties.js";
import { HiddenLineProperties } from "./hidden-line-properties.js";
import { HiddenScene3D } from "./hidden-scene3-d.js";
import { HiddenShape3D } from "./hidden-shape3-d.js";
import { ImageEffect } from "./image-effect.js";
import { ImageLayer } from "./image-layer.js";
import { ImageProperties } from "./image-properties.js";
import { IsCanvas } from "./is-canvas.js";
import { NonVisualContentPartProperties } from "./non-visual-content-part-properties.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualInkContentPartProperties } from "./non-visual-ink-content-part-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { Saturation } from "./saturation.js";
import { ShadowObscured } from "./shadow-obscured.js";
import { SharpenSoften } from "./sharpen-soften.js";
import { TextMath } from "./text-math.js";
import { Transform2D } from "./transform2-d.js";
import { UseLocalDpi } from "./use-local-dpi.js";

/**
 * 把 drawing-2010 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2010Elements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticBlur", ArtisticBlur);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticCement", ArtisticCement);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticChalkSketch", ArtisticChalkSketch);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticCrisscrossEtching", ArtisticCrisscrossEtching);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticCutout", ArtisticCutout);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticFilmGrain", ArtisticFilmGrain);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticGlass", ArtisticGlass);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticGlowDiffused", ArtisticGlowDiffused);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticGlowEdges", ArtisticGlowEdges);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticLightScreen", ArtisticLightScreen);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticLineDrawing", ArtisticLineDrawing);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticMarker", ArtisticMarker);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticMosiaicBubbles", ArtisticMosaicBubbles);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPaintBrush", ArtisticPaintBrush);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPaintStrokes", ArtisticPaintStrokes);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPastelsSmooth", ArtisticPastelsSmooth);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPencilGrayscale", ArtisticPencilGrayscale);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPencilSketch", ArtisticPencilSketch);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPhotocopy", ArtisticPhotocopy);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticPlasticWrap", ArtisticPlasticWrap);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticTexturizer", ArtisticTexturizer);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "artisticWatercolorSponge", ArtisticWatercolorSponge);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "backgroundMark", BackgroundMark);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "backgroundRemoval", BackgroundRemoval);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "brightnessContrast", BrightnessContrast);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "cameraTool", CameraTool);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "colorTemperature", ColorTemperature);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "compatExt", CompatExtension);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "cpLocks", ContentPartLocks);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "foregroundMark", ForegroundMark);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "contentPart", GvmlContentPart);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "hiddenEffects", HiddenEffectsProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "hiddenFill", HiddenFillProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "hiddenLine", HiddenLineProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "hiddenScene3d", HiddenScene3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "hiddenSp3d", HiddenShape3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "imgEffect", ImageEffect);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "imgLayer", ImageLayer);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "imgProps", ImageProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "isCanvas", IsCanvas);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "nvContentPartPr", NonVisualContentPartProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "cNvContentPartPr", NonVisualInkContentPartProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "saturation", Saturation);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "shadowObscured", ShadowObscured);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "sharpenSoften", SharpenSoften);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "m", TextMath);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "xfrm", Transform2D);
  registry.register("http://schemas.microsoft.com/office/drawing/2010/main", "useLocalDpi", UseLocalDpi);
}
