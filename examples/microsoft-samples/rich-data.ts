/**
 * Port of Microsoft Open-XML-SDK samples/RichData/Program.cs
 * @see https://github.com/microsoft/Open-XML-SDK/blob/main/samples/RichData/Program.cs
 *
 * Demonstrates inserting Excel RichData (linked entity / web image) parts into an xlsx.
 * RichData is the mechanism behind Excel's "Stocks" and "Geography" data types.
 * The sample embeds a "Seattle" linked entity card with a web image and metadata.
 *
 * TS note: All RichData parts in openxml-ts have opaque roots, so XML is written via
 * part.writeAsync() rather than typed element trees.
 *
 * Run:
 *   pnpm tsx examples/microsoft-samples/rich-data.ts <output.xlsx>
 */

import {
  Cell,
  CellMetadataPart,
  RdArrayPart,
  RdRichValuePart,
  RdRichValueStructurePart,
  RdRichValueTypesPart,
  RdRichValueWebImagePart,
  RdSupportingPropertyBagPart,
  RdSupportingPropertyBagStructurePart,
  RichStylesPart,
  Row,
  SheetData,
  SpreadsheetDocument,
} from "../../src/excel/index.js";
import type { PartUri } from "../../src/packaging/index.js";

export async function insertRichData(doc: SpreadsheetDocument): Promise<void> {
  const workbookPart = doc.workbookPart;
  if (workbookPart === undefined) {
    throw new Error("workbookPart is missing");
  }

  const pkg = doc.package;
  const wbPart = workbookPart.part;

  // ── Helper: create a part + register relationship ──────────────────────────
  async function addPart(
    uri: PartUri,
    contentType: string,
    relType: string,
    relTarget: string,
    xml: string,
  ): Promise<void> {
    const raw = pkg.createPart(uri, contentType);
    wbPart.relationships.create({
      type: relType,
      target: relTarget,
      targetMode: "internal",
    });
    await raw.writeAsync(xml);
  }

  // ── 1. RdRichValueWebImagePart ─────────────────────────────────────────────
  // Stores web image references (hyperlink relationships to Bing image results).
  // The .NET sample uses AddHyperlinkRelationship; in TS we write raw XML with
  // rId references matching the hyperlink targets.
  const webImgUri = "/xl/richData/rdRichValueWebImage.xml" as PartUri;
  const webImgRaw = pkg.createPart(webImgUri, RdRichValueWebImagePart.contentType);
  wbPart.relationships.create({
    type: RdRichValueWebImagePart.relationshipType,
    target: "richData/rdRichValueWebImage.xml",
    targetMode: "internal",
  });
  // Add hyperlink relationships to the webImage part
  const webImgRel1 = webImgRaw.relationships.create({
    type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
    target: "https://www.bing.com/images/search?form=xlimg&q=seattle",
    targetMode: "external",
  });
  const webImgRel2 = webImgRaw.relationships.create({
    type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
    target: "https://www.bing.com/th?id=AMMS_348b88a346e44ffe38a8fd278b585309&qlt=95",
    targetMode: "external",
  });
  await webImgRaw.writeAsync(
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><webImagesSrd xmlns="http://schemas.microsoft.com/office/excel/2021/richdata/webimage" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><webImageSrd><address r:id="${webImgRel1.id}"/><moreImagesAddress r:id="${webImgRel2.id}"/></webImageSrd></webImagesSrd>`,
  );

  // ── 2. RdRichValuePart ─────────────────────────────────────────────────────
  // Stores the actual rich values (linked entities, formatted numbers, web images, etc.)
  await addPart(
    "/xl/richData/rdrichvalue.xml" as PartUri,
    RdRichValuePart.contentType,
    RdRichValuePart.relationshipType,
    "richData/rdrichvalue.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<rvData xmlns="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" count="14">` +
      `<rv s="0"><v>536870912</v><v>Seattle</v><v>5fbba6b8-85e1-4d41-9444-d9055436e473</v><v>en-US</v><v>Map</v></rv>` +
      `<rv s="0"><v>536870912</v><v>Washington</v><v>982ad551-fd5d-45df-bd70-bf704dd576e4</v><v>en-US</v><v>Map</v></rv>` +
      `<rv s="0"><v>536870912</v><v>King County</v><v>54389684-d1e7-09ad-33b0-d0587d219a6e</v><v>en-US</v><v>Map</v></rv>` +
      `<rv s="1"><fb>369.2</fb><v>14</v></rv>` +
      `<rv s="0"><v>536870912</v><v>United States</v><v>5232ed96-85b1-2edb-12c6-63e6c597a1de</v><v>en-US</v><v>Map</v></rv>` +
      `<rv s="2"><v>0</v><v>12</v><v>15</v><v>6</v><v>0</v><v>Image of Seattle</v></rv>` +
      `<rv s="1"><fb>47.603228999999999</fb><v>16</v></rv>` +
      `<rv s="0"><v>805306368</v><v>Bruce Harrell (Mayor)</v><v>a3002d35-4b06-4b03-40c7-10b98d6e23f2</v><v>en-US</v><v>Generic</v></rv>` +
      `<rv s="3"><v>0</v></rv>` +
      `<rv s="4"><v>https://www.bing.com/search?q=seattle&amp;form=skydnc</v><v>Learn more on Bing</v></rv>` +
      `<rv s="1"><fb>-122.33028</fb><v>16</v></rv>` +
      `<rv s="1"><fb>737015</fb><v>14</v></rv>` +
      `<rv s="3"><v>1</v></rv>` +
      `<rv s="5"><v>#VALUE!</v><v>en-US</v><v>5fbba6b8-85e1-4d41-9444-d9055436e473</v><v>536870912</v><v>1</v><v>6</v><v>7</v><v>Seattle</v><v>10</v><v>11</v><v>Map</v><v>12</v><v>13</v><v>1</v><v>2</v><v>3</v><v>4</v><v>Seattle is a seaport city on the West Coast of the United States. It is the seat of King County, Washington. With a 2020 population of 737,015, it is the largest city in both the state of Washington and the Pacific Northwest region of North America. The Seattle metropolitan area&apos;s population is 4.02 million, making it the 15th-largest in the United States. Its growth rate of 21.1% between 2010 and 2020 makes it one of the nation&apos;s fastest-growing large cities.</v><v>5</v><v>6</v><v>8</v><v>9</v><v>10</v><v>Seattle</v><v>11</v><v>12</v><v>Seattle</v><v>mdp/vdpid/4860655131336638465</v></rv>` +
      "</rvData>",
  );

  // ── 3. RdRichValueStructurePart ────────────────────────────────────────────
  await addPart(
    "/xl/richData/rdRichValueStructure.xml" as PartUri,
    RdRichValueStructurePart.contentType,
    RdRichValueStructurePart.relationshipType,
    "richData/rdRichValueStructure.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<rvStructures xmlns="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" count="6">` +
      `<s t="_linkedentity2"><k n="%EntityServiceId" t="i"/><k n="_DisplayString" t="s"/><k n="%EntityId" t="s"/><k n="%EntityCulture" t="s"/><k n="_Icon" t="s"/></s>` +
      `<s t="_formattednumber"><k n="_Format" t="spb"/></s>` +
      `<s t="_webimage"><k n="WebImageIdentifier" t="i"/><k n="_Provider" t="spb"/><k n="Attribution" t="spb"/><k n="CalcOrigin" t="i"/><k n="ComputedImage" t="b"/><k n="Text" t="s"/></s>` +
      `<s t="_array"><k n="array" t="a"/></s>` +
      `<s t="_hyperlink"><k n="Address" t="s"/><k n="Text" t="s"/></s>` +
      `<s t="_linkedentity2core"><k n="_CRID" t="e"/><k n="%EntityCulture" t="s"/><k n="%EntityId" t="s"/><k n="%EntityServiceId" t="i"/><k n="%IsRefreshable" t="b"/><k n="_Attribution" t="spb"/><k n="_Display" t="spb"/><k n="_DisplayString" t="s"/><k n="_Flags" t="spb"/><k n="_Format" t="spb"/><k n="_Icon" t="s"/><k n="_Provider" t="spb"/><k n="_SubLabel" t="spb"/><k n="Admin Division 1 (State/province/other)" t="r"/><k n="Admin Division 2 (County/district/other)" t="r"/><k n="Area" t="r"/><k n="Country/region" t="r"/><k n="Description" t="s"/><k n="Image" t="r"/><k n="Latitude" t="r"/><k n="Leader(s)" t="r"/><k n="LearnMoreOnLink" t="r"/><k n="Longitude" t="r"/><k n="Name" t="s"/><k n="Population" t="r"/><k n="Time zone(s)" t="r"/><k n="UniqueName" t="s"/><k n="VDPID/VSID" t="s"/></s>` +
      "</rvStructures>",
  );

  // ── 4. RdArrayPart ─────────────────────────────────────────────────────────
  await addPart(
    "/xl/richData/rdRichValueArray.xml" as PartUri,
    RdArrayPart.contentType,
    RdArrayPart.relationshipType,
    "richData/rdRichValueArray.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<arrays xmlns="http://schemas.microsoft.com/office/spreadsheetml/2019/richdata2" count="2">` +
      `<array r="1"><av t="r">7</av></array>` +
      `<array r="1"><av t="s">Pacific Time Zone</av></array>` +
      "</arrays>",
  );

  // ── 5. RichStylesPart ──────────────────────────────────────────────────────
  await addPart(
    "/xl/richData/richStyles.xml" as PartUri,
    RichStylesPart.contentType,
    RichStylesPart.relationshipType,
    "richData/richStyles.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<richStyleSheet xmlns="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata"` +
      ` xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"` +
      ` xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
      `<dxfs count="2">` +
      `<dxf><numFmt numFmtId="3" formatCode="#,##0"/></dxf>` +
      `<dxf><numFmt numFmtId="0" formatCode="General"/></dxf>` +
      "</dxfs>" +
      "<rfps>" +
      `<rfp n="IsTitleField" t="b"/><rfp n="IsHeroField" t="b"/>` +
      `<rfp n="RequiresInlineAttribution" t="b"/><rfp n="NumberFormat" t="s"/>` +
      "</rfps>" +
      "<rSts>" +
      `<rSt><rpv i="0">1</rpv></rSt>` +
      `<rSt><rpv i="1">1</rpv></rSt>` +
      `<rSt><rpv i="2">1</rpv></rSt>` +
      `<rSt dxfid="0"><rpv i="3">#,##0</rpv></rSt>` +
      `<rSt dxfid="1"><rpv i="3">0.0000</rpv></rSt>` +
      "</rSts>" +
      "</richStyleSheet>",
  );

  // ── 6. RdSupportingPropertyBagStructurePart ────────────────────────────────
  await addPart(
    "/xl/richData/rdRichValueSupportingPropertyBagStructure.xml" as PartUri,
    RdSupportingPropertyBagStructurePart.contentType,
    RdSupportingPropertyBagStructurePart.relationshipType,
    "richData/rdRichValueSupportingPropertyBagStructure.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<spbStructures xmlns="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" count="10">` +
      `<s><k n="SourceText" t="s"/><k n="LicenseText" t="s"/><k n="SourceAddress" t="s"/><k n="LicenseAddress" t="s"/></s>` +
      `<s><k n="Area" t="spb"/><k n="Name" t="spb"/><k n="Population" t="spb"/><k n="UniqueName" t="spb"/><k n="Description" t="spb"/><k n="Country/region" t="spb"/><k n="Admin Division 1 (State/province/other)" t="spb"/><k n="Admin Division 2 (County/district/other)" t="spb"/></s>` +
      `<s><k n="^Order" t="spb"/><k n="TitleProperty" t="s"/><k n="SubTitleProperty" t="s"/></s>` +
      `<s><k n="ShowInCardView" t="b"/><k n="ShowInDotNotation" t="b"/><k n="ShowInAutoComplete" t="b"/></s>` +
      `<s><k n="ShowInDotNotation" t="b"/><k n="ShowInAutoComplete" t="b"/></s>` +
      `<s><k n="UniqueName" t="spb"/><k n="VDPID/VSID" t="spb"/><k n="Description" t="spb"/><k n="LearnMoreOnLink" t="spb"/></s>` +
      `<s><k n="Name" t="i"/><k n="Image" t="i"/><k n="Description" t="i"/></s>` +
      `<s><k n="link" t="s"/><k n="logo" t="s"/><k n="name" t="s"/></s>` +
      `<s><k n="Area" t="s"/><k n="Population" t="s"/></s>` +
      `<s><k n="_Self" t="i"/></s>` +
      "</spbStructures>",
  );

  // ── 7. RdSupportingPropertyBagPart ────────────────────────────────────────
  await addPart(
    "/xl/richData/rdRichValueSupportingPropertyBag.xml" as PartUri,
    RdSupportingPropertyBagPart.contentType,
    RdSupportingPropertyBagPart.relationshipType,
    "richData/rdRichValueSupportingPropertyBag.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<spbs xmlns="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata">` +
      `<spbArrays count="1"><spbArray count="27">` +
      `<v t="s">%EntityServiceId</v><v t="s">%IsRefreshable</v><v t="s">%EntityCulture</v>` +
      `<v t="s">%EntityId</v><v t="s">_Icon</v><v t="s">_Provider</v><v t="s">_Attribution</v>` +
      `<v t="s">_Display</v><v t="s">Name</v><v t="s">_Format</v>` +
      `<v t="s">Admin Division 2 (County/district/other)</v>` +
      `<v t="s">Admin Division 1 (State/province/other)</v><v t="s">Country/region</v>` +
      `<v t="s">Leader(s)</v><v t="s">_SubLabel</v><v t="s">Population</v><v t="s">Area</v>` +
      `<v t="s">Latitude</v><v t="s">Longitude</v><v t="s">Time zone(s)</v><v t="s">_Flags</v>` +
      `<v t="s">VDPID/VSID</v><v t="s">UniqueName</v><v t="s">_DisplayString</v>` +
      `<v t="s">LearnMoreOnLink</v><v t="s">Image</v><v t="s">Description</v>` +
      "</spbArray></spbArrays>" +
      `<spbData count="17">` +
      `<spb s="0"><v>Wikipedia\tWikipedia\tWikipedia\tWikipedia\t</v><v>CC-BY-SA\tCC-BY-SA\tCC-BY-SA\tCC-BY-SA\t</v><v>http://en.wikipedia.org/wiki/Seattle\thttp://de.wikipedia.org/wiki/Seattle\thttp://es.wikipedia.org/wiki/Seattle\thttp://fr.wikipedia.org/wiki/Seattle\t</v><v>http://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\t</v></spb>` +
      `<spb s="1"><v>0</v><v>1</v><v>2</v><v>1</v><v>2</v><v>3</v><v>4</v><v>5</v></spb>` +
      `<spb s="2"><v>0</v><v>Name</v><v>LearnMoreOnLink</v></spb>` +
      `<spb s="3"><v>0</v><v>0</v><v>0</v></spb>` +
      `<spb s="4"><v>0</v><v>0</v></spb>` +
      `<spb s="5"><v>8</v><v>8</v><v>9</v><v>8</v></spb>` +
      `<spb s="6"><v>1</v><v>2</v><v>3</v></spb>` +
      `<spb s="7"><v>https://www.bing.com</v><v>https://www.bing.com/th?id=Ga%5Cbing_yt.png&amp;w=100&amp;h=40&amp;c=0&amp;pid=0.1</v><v>Powered by Bing</v></spb>` +
      `<spb s="8"><v>square km</v><v>2020</v></spb>` +
      `<spb s="9"><v>4</v></spb>` +
      `<spb s="0"><v>Wikipedia\t</v><v>CC-BY-SA\t</v><v>http://en.wikipedia.org/wiki/Seattle\t</v><v>http://creativecommons.org/licenses/by-sa/3.0/\t</v></spb>` +
      `<spb s="0"><v>Wikipedia\tWikipedia\tSec\t</v><v>CC-BY-SA\t\t</v><v>http://en.wikipedia.org/wiki/Seattle https://www.sec.gov/\t</v><v>http://creativecommons.org/licenses/by-sa/3.0/\t\t</v></spb>` +
      `<spb s="0"><v>Wikipedia\tWikipedia\t</v><v>CC-BY-SA\tCC-BY-SA\t</v><v>http://en.wikipedia.org/wiki/Seattle\thttps://en.wikipedia.org/wiki/Seattle\t</v><v>http://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\t</v></spb>` +
      `<spb s="0"><v>Wikipedia\tWikipedia\t</v><v>CC-BY-SA\tCC-BY-SA\t</v><v>http://en.wikipedia.org/wiki/Seattle\thttp://fr.wikipedia.org/wiki/Seattle\t</v><v>http://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\t</v></spb>` +
      `<spb s="0"><v>Wikipedia\tWikipedia\tWikipedia\tWikipedia\t</v><v>CC-BY-SA\tCC-BY-SA\tCC-BY-SA\tCC-BY-SA\t</v><v>http://en.wikipedia.org/wiki/Seattle\thttp://de.wikipedia.org/wiki/Seattle\thttp://es.wikipedia.org/wiki/Seattle\thttp://fr.wikipedia.org/wiki/Seattle\t</v><v>http://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\thttp://creativecommons.org/licenses/by-sa/3.0/\t</v></spb>` +
      `<spb s="0"><v>Wikipedia\t</v><v>CC BY-SA 3.0\t</v><v>http://nl.wikipedia.org/wiki/Seattle\t</v><v>https://creativecommons.org/licenses/by-sa/3.0\t</v></spb>` +
      `<spb s="9"><v>5</v></spb>` +
      "</spbData>" +
      "</spbs>",
  );

  // ── 8. RdRichValueTypesPart ────────────────────────────────────────────────
  await addPart(
    "/xl/richData/rdRichValueTypes.xml" as PartUri,
    RdRichValueTypesPart.contentType,
    RdRichValueTypesPart.relationshipType,
    "richData/rdRichValueTypes.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<rvTypesInfo xmlns="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata"` +
      ` xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"` +
      ` xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
      `<global><keyFlags><key name="_Self"><flag name="ExcludeFromFile" value="1"/><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_DisplayString"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_Flags"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_Format"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_SubLabel"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_Attribution"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_Icon"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_Display"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_CanonicalPropertyNames"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      `<key name="_ClassificationId"><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      "</keyFlags></global>" +
      "<types>" +
      `<type name="_linkedentity2"><keyFlags>` +
      `<key name="%EntityServiceId"><flag name="ShowInCardView" value="0"/><flag name="ShowInDotNotation" value="0"/><flag name="ShowInAutoComplete" value="0"/></key>` +
      `<key name="%EntityCulture"><flag name="ShowInCardView" value="0"/><flag name="ShowInDotNotation" value="0"/><flag name="ShowInAutoComplete" value="0"/></key>` +
      `<key name="%EntityId"><flag name="ShowInCardView" value="0"/><flag name="ShowInDotNotation" value="0"/><flag name="ShowInAutoComplete" value="0"/></key>` +
      `<key name="%cvi"><flag name="ShowInCardView" value="0"/><flag name="ShowInDotNotation" value="0"/><flag name="ShowInAutoComplete" value="0"/><flag name="ExcludeFromCalcComparison" value="1"/></key>` +
      "</keyFlags></type>" +
      `<type name="_webimage"><keyFlags>` +
      `<key name="WebImageIdentifier"><flag name="ShowInCardView" value="0"/></key>` +
      "</keyFlags></type>" +
      "</types>" +
      "</rvTypesInfo>",
  );

  // ── 9. SheetData ───────────────────────────────────────────────────────────
  // Add a cell A1 with the #VALUE! error (the RichData value — Excel resolves it at runtime)
  const ws = workbookPart.worksheetParts[0]?.worksheet;
  if (ws !== undefined) {
    let sd = ws.firstChild(SheetData);
    if (sd === undefined) {
      sd = ws.appendChild(new SheetData()) as SheetData;
    }
    const r = new Row();
    r.extendedAttributes.set("r", "1");
    r.extendedAttributes.set("spans", "1:1");
    r.extendedAttributes.set("x14ac:dyDescent", ".25");
    const c = new Cell();
    c.extendedAttributes.set("r", "A1");
    c.extendedAttributes.set("t", "e");
    c.extendedAttributes.set("vm", "1");
    r.appendChild(c);
    sd.appendChild(r);
  }

  // ── 10. CellMetadataPart ──────────────────────────────────────────────────
  await addPart(
    "/xl/metadata.xml" as PartUri,
    CellMetadataPart.contentType,
    CellMetadataPart.relationshipType,
    "metadata.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"` +
      ` xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata">` +
      `<metadataTypes count="1">` +
      `<metadataType name="XLRICHVALUE" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1"/>` +
      "</metadataTypes>" +
      `<futureMetadata name="XLRICHVALUE" count="1">` +
      `<bk><extLst><ext uri="{3e2802c4-a4d2-4d8b-9148-e3be6c30e623}"><xlrd:rvb i="0"/></ext></extLst></bk>` +
      "</futureMetadata>" +
      `<valueMetadata count="1">` +
      `<bk><rc t="1" v="0"/></bk>` +
      "</valueMetadata>" +
      "</metadata>",
  );
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write(
      "usage: rich-data <output.xlsx>\n" +
        "  Creates an xlsx with a RichData linked entity (Seattle map) in cell A1.\n",
    );
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  await insertRichData(doc);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (RichData linked entity embedded)\n`);
}

if (process.argv[1] === (await import("node:url")).fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
    process.exit(1);
  });
}
