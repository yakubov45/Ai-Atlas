import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('docs/python/python_344_curriculum.json', 'utf8'));
const examples = [];

for (const phase of raw.phases) {
  for (const lesson of phase.lessons) {
    examples.push({ id: lesson.id, title: lesson.title_uz, ex: lesson.example_uz });
  }
}

console.log(`Total lessons: ${examples.length}`);
// Print first 30 examples
for (const e of examples.slice(0, 30)) {
  console.log(`[${e.id}] ${e.title}: ${e.ex}`);
}
