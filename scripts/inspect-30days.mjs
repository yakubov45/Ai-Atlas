import fs from 'node:fs';

const md = fs.readFileSync('30_days_python_test_va_amaliyot.md', 'utf8');
const days = md.split(/(?=##\s+Day\s+\d+)/g).slice(1);

console.log(`Total days: ${days.length}`);
console.log('--- Day 1 ---');
console.log(days[0].slice(0, 1000));
