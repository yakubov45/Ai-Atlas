import fs from "node:fs";
import path from "node:path";
import { getContentRepository } from "../src/lib/content/repository";
import { buildSearchIndex } from "../src/lib/search/build-index";

function run() {
  console.log("⚡ Qidiruv indeksini yaratish boshlandi...");
  const repo = getContentRepository();
  const index = buildSearchIndex(repo);

  const outDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "search-index.json");
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2), "utf8");

  console.log(`✅ Qidiruv indeksi saqlandi: ${outPath} (${index.documents.length} ta hujjat)`);
}

run();
