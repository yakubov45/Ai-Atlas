import fs from 'node:fs';

const mdGuide = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");
const lessonBlocks = mdGuide.split(/(?=###\s+py-\d+-\d+\s+—)/g).slice(1);

console.log(`Parsed ${lessonBlocks.length} lesson blocks`);

for (let i = 0; i < 12; i++) {
  const block = lessonBlocks[i];
  const m = block.match(/^###\s+(py-\d+-\d+)\s+—\s+([^\n]+)/);
  if (!m) continue;
  const id = m[1];
  const title = m[2].trim();

  const tushunchaM = block.match(/\*\*Tushuncha\.\*\*\s+([\s\S]*?)(?=\*\*Kod|\*\*Mustaqil|$)/i);
  const theory = tushunchaM ? tushunchaM[1].trim() : "";

  const kodM = block.match(/\*\*Kod\s*\/\s*amaliy namuna\.\*\*\s+([\s\S]*?)(?=\*\*Mustaqil|$)/i);
  const example = kodM ? kodM[1].trim() : "";

  const mashqM = block.match(/\*\*Mustaqil mashq\.\*\*\s+([\s\S]*?)(?=\n###|\n##|$)/i);
  const practice = mashqM ? mashqM[1].trim() : "";

  console.log(`\n--- [${id}] ${title} ---`);
  console.log('Theory:', theory);
  console.log('Example:', example);
  console.log('Practice:', practice);
}
