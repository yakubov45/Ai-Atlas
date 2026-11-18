import fs from "node:fs";

const json = JSON.parse(fs.readFileSync("docs/python/python_344_curriculum.json", "utf8"));
function findLesson(id) {
  for (const p of json.phases) {
    const l = p.lessons.find((x) => x.id === id);
    if (l) return { phase: p.id, phaseTitle: p.title_uz, ...l };
  }
  return null;
}

console.log("py-03-04:", JSON.stringify(findLesson("py-03-04"), null, 2));
console.log("py-10-14:", JSON.stringify(findLesson("py-10-14"), null, 2));
console.log("py-15-04:", JSON.stringify(findLesson("py-15-04"), null, 2));
