import fs from 'node:fs';

const mdGuide = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");
const phaseMatches = [...mdGuide.matchAll(/##\s+(PY-\d+)\s*\n\s*\*\*([^\*]+)\*\*\s*·\s*([^\n]+)/g)];

for (const m of phaseMatches) {
  console.log(`${m[1]}: ${m[2]} (${m[3]})`);
}
