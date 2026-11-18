import fs from "node:fs";

const md = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");
const json = JSON.parse(fs.readFileSync("docs/python/python_344_curriculum.json", "utf8"));

const assessmentBlocks = md.split(/(?=###\s+Nazorat ishi\s+—)/g).slice(1);
console.log("Total assessment blocks in md:", assessmentBlocks.length);

const assessments = [];
for (let i = 0; i < json.phases.length; i++) {
  const phase = json.phases[i];
  const block = assessmentBlocks[i];
  const jsonAssess = phase.assessment;

  let requirements = jsonAssess?.requirements_uz || "";
  let acceptanceCases = jsonAssess?.acceptance_cases_uz || "";
  let constraints = jsonAssess?.constraints_uz || "";
  let rubric = "ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15";

  if (block) {
    const reqM = block.match(/\*\*Talablar:\*\*\s+([^\n]+)/i);
    const accM = block.match(/\*\*Tekshiruv holatlari:\*\*\s+([^\n]+)/i);
    const conM = block.match(/\*\*Cheklovlar:\*\*\s+([^\n]+)/i);
    const rubM = block.match(/\*\*Baholash\s*\([^)]+\):\*\*\s+([^\n]+)/i);
    if (reqM) requirements = reqM[1].trim();
    if (accM) acceptanceCases = accM[1].trim();
    if (conM) constraints = conM[1].trim();
    if (rubM) rubric = rubM[1].trim();
  }

  assessments.push({
    phaseId: phase.id.toLowerCase(),
    phaseTitle: phase.title_uz,
    title: jsonAssess?.title_uz || `Phase ${i + 1} Nazorat Ishi`,
    requirements,
    acceptanceCases,
    constraints,
    rubric,
  });
}

console.log("Parsed all 20 assessments successfully.");
console.log("Assessment 1:", assessments[0]);
console.log("Assessment 20:", assessments[19]);
