import fs from 'node:fs';

const content = fs.readFileSync('src/lib/curriculum/python-344-curriculum.ts', 'utf8');

function showLesson(id) {
  const match = content.match(new RegExp(`"id":\\s*"${id}"[\\s\\S]*?(?=\\n\\s*\\{\\s*"id":\\s*"py-|export const PYTHON_344_LESSONS_MAP)`));
  if (match) {
    console.log(`=== ${id} ===`);
    // Find checkpointQuestions and steps
    const qMatch = match[0].match(/"checkpointQuestions":\s*(\[[\\s\\S]*?\]),\s*"practiceTasks"/);
    if (qMatch) {
      console.log('--- checkpointQuestions:');
      console.log(qMatch[1]);
    }
    const stepMatch = match[0].match(/"steps":\s*(\[[\\s\\S]*?\]),\s*"examples"/);
    if (stepMatch) {
      console.log('--- steps:');
      console.log(stepMatch[1]);
    }
  } else {
    console.log(`Not found: ${id}`);
  }
}

showLesson('py-01-02');
