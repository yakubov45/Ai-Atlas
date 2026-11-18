import fs from 'node:fs';

const md = fs.readFileSync('30_days_python_test_javoblari.md', 'utf8');
console.log(md.slice(0, 1500));
