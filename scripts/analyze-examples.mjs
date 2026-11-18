import fs from 'node:fs';

const mdGuide = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");
const lessonBlocks = mdGuide.split(/(?=###\s+py-\d+-\d+\s+—)/g).slice(1);

let validCodeCount = 0;
let proseExamples = [];

for (const block of lessonBlocks) {
  const m = block.match(/^###\s+(py-\d+-\d+)\s+—\s+([^\n]+)/);
  if (!m) continue;
  const id = m[1];
  const title = m[2].trim();
  const kodM = block.match(/\*\*Kod\s*\/\s*amaliy namuna\.\*\*\s+([\s\S]*?)(?=\*\*Mustaqil|$)/i);
  const example = kodM ? kodM[1].trim() : "";

  if (example.includes("ichida") || example.includes("terminalda") || example.includes("yoki") || example.includes("kerak") || example.includes("bajariladi") || example.includes("--version")) {
    proseExamples.push({ id, title, example });
  } else {
    validCodeCount++;
  }
}

console.log(`Total lessons: ${lessonBlocks.length}`);
console.log(`Valid clean code candidates: ${validCodeCount}`);
console.log(`Prose/cli examples needing smart synthesis: ${proseExamples.length}`);
console.log('Sample prose examples:');
for (const p of proseExamples.slice(0, 10)) {
  console.log(`[${p.id}] ${p.title} => ${p.example}`);
}
