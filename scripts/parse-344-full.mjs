import fs from "node:fs";

const json = JSON.parse(fs.readFileSync("docs/python/python_344_curriculum.json", "utf8"));
const md = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");

// Parse md lessons
// Each lesson has heading: ### py-XX-YY — Title
const lessonBlocks = md.split(/(?=###\s+py-\d+-\d+\s+—)/g).slice(1);
console.log("Total markdown lesson blocks found:", lessonBlocks.length);

const parsedMdLessons = new Map();

for (const block of lessonBlocks) {
  const m = block.match(/^###\s+(py-\d+-\d+)\s+—\s+([^\n]+)/);
  if (!m) continue;
  const id = m[1];
  const title = m[2].trim();

  // Extract Tushuncha
  const tushunchaM = block.match(/\*\*Tushuncha\.\*\*\s+([\s\S]*?)(?=\*\*Kod|\*\*Mustaqil|$)/i);
  const theory = tushunchaM ? tushunchaM[1].trim() : "";

  // Extract Kod / amaliy namuna
  const kodM = block.match(/\*\*Kod\s*\/\s*amaliy namuna\.\*\*\s+([\s\S]*?)(?=\*\*Mustaqil|$)/i);
  const example = kodM ? kodM[1].trim() : "";

  // Extract Mustaqil mashq
  const mashqM = block.match(/\*\*Mustaqil mashq\.\*\*\s+([\s\S]*?)(?=\n###|\n##|$)/i);
  const practice = mashqM ? mashqM[1].trim() : "";

  parsedMdLessons.set(id, { id, title, theory, example, practice });
}

console.log("Parsed MD lessons count:", parsedMdLessons.size);
console.log("Sample parsed lesson py-01-01:", parsedMdLessons.get("py-01-01"));
console.log("Sample parsed lesson py-03-04:", parsedMdLessons.get("py-03-04"));
console.log("Sample parsed lesson py-10-14:", parsedMdLessons.get("py-10-14"));
console.log("Sample parsed lesson py-15-04:", parsedMdLessons.get("py-15-04"));
