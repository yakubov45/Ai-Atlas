import { getPythonMicroLessonById } from '../src/lib/curriculum/python-developer';

const l = getPythonMicroLessonById('py-01-05');
console.log('--- py-01-05 ---');
console.log('Title:', l?.title);
console.log('Steps:', JSON.stringify(l?.steps, null, 2));
console.log('Examples:', JSON.stringify(l?.examples, null, 2));
console.log('Questions:', JSON.stringify(l?.checkpointQuestions, null, 2));
console.log('Practice Tasks:', JSON.stringify(l?.practiceTasks, null, 2));
