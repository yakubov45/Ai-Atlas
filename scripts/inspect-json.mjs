import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('docs/python/python_344_curriculum.json', 'utf8'));
console.log('Phase count:', raw.phases.length);
console.log('Total lessons:', raw.phases.reduce((acc, p) => acc + p.lessons.length, 0));

const sample = raw.phases[0].lessons[1]; // py-01-02
console.log('Sample lesson JSON:', JSON.stringify(sample, null, 2));
