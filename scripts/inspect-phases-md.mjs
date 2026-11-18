import fs from "node:fs";

const md = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");
const phaseRegex = /##\s+(PY-\d+)[\s\S]*?(?=##\s+PY-\d+|$)/g;

let match;
let count = 0;
while ((match = phaseRegex.exec(md)) !== null) {
  count++;
  const phaseText = match[0];
  const phaseId = match[1];
  const lessonMatches = phaseText.match(/###\s+(py-\d+-\d+)\s+—\s+([^\n]+)/g) || [];
  const assessmentMatch = phaseText.match(/###\s+Nazorat loyihasi[\s\S]*?(?=\n##\s+PY|\n###\s+py|$)/i);
  console.log(`${phaseId}: ${lessonMatches.length} dars, Nazorat loyihasi: ${Boolean(assessmentMatch)}`);
}
console.log("Total phases parsed:", count);
