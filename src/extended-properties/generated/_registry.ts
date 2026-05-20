// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_extended-properties.json

import type { ElementRegistry } from "../../element/index.js";
import { Application } from "./application.js";
import { ApplicationVersion } from "./application-version.js";
import { Characters } from "./characters.js";
import { CharactersWithSpaces } from "./characters-with-spaces.js";
import { Company } from "./company.js";
import { DigitalSignature } from "./digital-signature.js";
import { DocumentSecurity } from "./document-security.js";
import { HeadingPairs } from "./heading-pairs.js";
import { HiddenSlides } from "./hidden-slides.js";
import { HyperlinkBase } from "./hyperlink-base.js";
import { HyperlinkList } from "./hyperlink-list.js";
import { HyperlinksChanged } from "./hyperlinks-changed.js";
import { Lines } from "./lines.js";
import { LinksUpToDate } from "./links-up-to-date.js";
import { Manager } from "./manager.js";
import { MultimediaClips } from "./multimedia-clips.js";
import { Notes } from "./notes.js";
import { Pages } from "./pages.js";
import { Paragraphs } from "./paragraphs.js";
import { PresentationFormat } from "./presentation-format.js";
import { Properties } from "./properties.js";
import { ScaleCrop } from "./scale-crop.js";
import { SharedDocument } from "./shared-document.js";
import { Slides } from "./slides.js";
import { Template } from "./template.js";
import { TitlesOfParts } from "./titles-of-parts.js";
import { TotalTime } from "./total-time.js";
import { Words } from "./words.js";

/**
 * 把 extended-properties 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerExtendedPropertiesElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Application", Application);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "AppVersion", ApplicationVersion);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Characters", Characters);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "CharactersWithSpaces", CharactersWithSpaces);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Company", Company);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "DigSig", DigitalSignature);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "DocSecurity", DocumentSecurity);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "HeadingPairs", HeadingPairs);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "HiddenSlides", HiddenSlides);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "HyperlinkBase", HyperlinkBase);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "HLinks", HyperlinkList);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "HyperlinksChanged", HyperlinksChanged);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Lines", Lines);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "LinksUpToDate", LinksUpToDate);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Manager", Manager);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "MMClips", MultimediaClips);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Notes", Notes);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Pages", Pages);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Paragraphs", Paragraphs);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "PresentationFormat", PresentationFormat);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Properties", Properties);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "ScaleCrop", ScaleCrop);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "SharedDoc", SharedDocument);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Slides", Slides);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Template", Template);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "TitlesOfParts", TitlesOfParts);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "TotalTime", TotalTime);
  registry.register("http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", "Words", Words);
}
