import { PYTHON_344_LESSONS_MAP } from '../src/lib/curriculum/python-344-curriculum';

const l = PYTHON_344_LESSONS_MAP['py-01-02'];
console.log('Keys:', Object.keys(l || {}));
console.log('checkpoint:', (l as any)?.checkpointQuestions || (l as any)?.quiz || (l as any)?.checkpoint);
