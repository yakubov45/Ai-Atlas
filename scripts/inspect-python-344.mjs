import fs from "node:fs";

const json = JSON.parse(fs.readFileSync("docs/python/python_344_curriculum.json", "utf8"));
console.log("Phases count:", json.phases.length);
json.phases.forEach((p, idx) => {
  console.log(
    `${p.id} (Phase ${idx + 1}): ${p.title_uz} [${p.track}] — ${p.lessons.length} dars | Nazorat: ${p.assessment?.title_uz}`
  );
});
