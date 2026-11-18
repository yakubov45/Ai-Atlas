/**
 * Mathematical Functions Engine for Interactive Visualizations.
 * Supports Linear, Quadratic, ReLU, Sigmoid, and Tanh with
 * analytical derivatives, parameter bounds, safe numerical clamping,
 * and dynamic formula formatting.
 */

export type FunctionId = "linear" | "quadratic" | "relu" | "sigmoid" | "tanh";

export interface FunctionParameter {
  id: string;
  name: string;
  symbol: string;
  min: number;
  max: number;
  step: number;
  default: number;
  description: string;
}

export interface FunctionDefinition {
  id: FunctionId;
  name: string;
  symbolicLatex: string;
  category: "algebra" | "activation";
  description: string;
  aiContext: string;
  parameters: FunctionParameter[];
  evaluate: (x: number, params: Record<string, number>) => number;
  derivative: (x: number, params: Record<string, number>) => number;
  formatFormula: (params: Record<string, number>) => string;
  domainDefault: [number, number];
  rangeDefault: [number, number];
}

/** Safe Sigmoid with numerical clamping against float overflow/underflow */
export function safeSigmoid(z: number): number {
  if (z > 40) return 1.0;
  if (z < -40) return 0.0;
  return 1.0 / (1.0 + Math.exp(-z));
}

/** Safe Tanh with clamping */
export function safeTanh(z: number): number {
  if (z > 20) return 1.0;
  if (z < -20) return -1.0;
  return Math.tanh(z);
}

export const SUPPORTED_FUNCTIONS: Record<FunctionId, FunctionDefinition> = {
  linear: {
    id: "linear",
    name: "Chiziqli Funksiya (Linear)",
    symbolicLatex: "f(x) = ax + b",
    category: "algebra",
    description: "Chiziqli bog'lanish — kirish qiymati o'zgarganda chiqish mutanosib ravishda o'zgaradi. a — qiyalik (slope), b — siljish (bias).",
    aiContext: "Chiziqli regressiya va sun'iy neyronning tortilgan yig'indisi (weighted sum z = w·x + b) asosidir.",
    domainDefault: [-6, 6],
    rangeDefault: [-6, 6],
    parameters: [
      { id: "a", name: "Qiyalik (Vazn a)", symbol: "a", min: -5, max: 5, step: 0.1, default: 1.0, description: "To'g'ri chiziqning burchak koeffitsiyenti" },
      { id: "b", name: "Siljish (Bias b)", symbol: "b", min: -5, max: 5, step: 0.1, default: 0.0, description: "Y o'qi bilan kesishish nuqtasi" },
    ],
    evaluate: (x, p) => (p.a ?? 1) * x + (p.b ?? 0),
    derivative: (_x, p) => p.a ?? 1,
    formatFormula: (p) => {
      const a = (p.a ?? 1).toFixed(2);
      const b = p.b ?? 0;
      const bStr = b >= 0 ? `+ ${b.toFixed(2)}` : `- ${Math.abs(b).toFixed(2)}`;
      return `f(x) = ${a}x ${bStr}`;
    },
  },

  quadratic: {
    id: "quadratic",
    name: "Kvadratik Funksiya (Quadratic)",
    symbolicLatex: "f(x) = ax^2 + bx + c",
    category: "algebra",
    description: "Parabola shaklidagi egri chiziq. a > 0 bo'lganda global minimumga ega bo'ladi, bu esa konveks optimizatsiyani ifodalaydi.",
    aiContext: "O'rtacha kvadratik xatolik (MSE Loss: L(w) = (w - y)^2) va konveks yo'qotish funksiyalari prototipidir.",
    domainDefault: [-6, 6],
    rangeDefault: [-2, 10],
    parameters: [
      { id: "a", name: "Kvadratik koeffitsiyent", symbol: "a", min: -3, max: 3, step: 0.1, default: 1.0, description: "Parabolaning egrilik darajasi va yo'nalishi" },
      { id: "b", name: "Chiziqli koeffitsiyent", symbol: "b", min: -5, max: 5, step: 0.1, default: -2.0, description: "Minimumning gorizontal siljishiga ta'sir qiladi" },
      { id: "c", name: "Erkin had (Bias c)", symbol: "c", min: -5, max: 5, step: 0.1, default: 1.0, description: "Parabolani vertikal bo'yicha siljitadi" },
    ],
    evaluate: (x, p) => {
      const a = p.a ?? 1;
      const b = p.b ?? -2;
      const c = p.c ?? 1;
      return a * x * x + b * x + c;
    },
    derivative: (x, p) => {
      const a = p.a ?? 1;
      const b = p.b ?? -2;
      return 2 * a * x + b;
    },
    formatFormula: (p) => {
      const a = (p.a ?? 1).toFixed(2);
      const b = p.b ?? -2;
      const c = p.c ?? 1;
      const bStr = b >= 0 ? `+ ${b.toFixed(2)}x` : `- ${Math.abs(b).toFixed(2)}x`;
      const cStr = c >= 0 ? `+ ${c.toFixed(2)}` : `- ${Math.abs(c).toFixed(2)}`;
      return `f(x) = ${a}x^2 ${bStr} ${cStr}`;
    },
  },

  relu: {
    id: "relu",
    name: "ReLU (Rectified Linear Unit)",
    symbolicLatex: "f(x) = \\max(0, x)",
    category: "activation",
    description: "Nol yoki musbat qiymatlarni o'tkazadi, manfiy qiymatlarni esa to'liq kesib tashlaydi. Zamonaviy chuqur tarmoqlarda eng ko'p qo'llaniladi.",
    aiContext: "Vanishing gradient muammosini hal qiladi va hisoblash jihatidan nihoyatda tejamkor (faqat threshold tekshirish).",
    domainDefault: [-6, 6],
    rangeDefault: [-2, 6],
    parameters: [
      { id: "scale", name: "Ko'paytiruvchi (Scale)", symbol: "s", min: 0.2, max: 3, step: 0.1, default: 1.0, description: "Musbat sohadagi qiyalik koeffitsiyenti" },
      { id: "threshold", name: "Ostonasi (Shift)", symbol: "x_0", min: -3, max: 3, step: 0.1, default: 0.0, description: "Funksiya nolga aylanadigan nuqta" },
    ],
    evaluate: (x, p) => {
      const scale = p.scale ?? 1;
      const threshold = p.threshold ?? 0;
      return Math.max(0, scale * (x - threshold));
    },
    derivative: (x, p) => {
      const scale = p.scale ?? 1;
      const threshold = p.threshold ?? 0;
      return x > threshold ? scale : 0;
    },
    formatFormula: (p) => {
      const s = (p.scale ?? 1).toFixed(2);
      const t = p.threshold ?? 0;
      const tStr = t === 0 ? "x" : t > 0 ? `(x - ${t.toFixed(2)})` : `(x + ${Math.abs(t).toFixed(2)})`;
      return `f(x) = \\max(0, ${s === "1.00" ? "" : s}${tStr})`;
    },
  },

  sigmoid: {
    id: "sigmoid",
    name: "Sigmoid (Logistik Funksiya)",
    symbolicLatex: "\\sigma(x) = \\frac{1}{1 + e^{-x}}",
    category: "activation",
    description: "Ixtiyoriy haqiqiy sonni (0, 1) oraliqdagi ehtimollik qiymatiga silliq akslantiruvchi S-simon egri chiziq.",
    aiContext: "Binar klassifikatsiya chiqish qatlamida va an'anaviy neyron tarmoqlarida ehtimollik modelini tuzishda ishlatiladi.",
    domainDefault: [-6, 6],
    rangeDefault: [-0.2, 1.2],
    parameters: [
      { id: "k", name: "Tiklik (Steepness k)", symbol: "k", min: 0.2, max: 4, step: 0.1, default: 1.0, description: "O'tish sohasining qanchalik tez o'zgarishi" },
      { id: "shift", name: "Markaz siljishi (x_0)", symbol: "x_0", min: -3, max: 3, step: 0.1, default: 0.0, description: "Egri chiziqning 0.5 ga teng bo'lgan nuqtasi" },
    ],
    evaluate: (x, p) => {
      const k = p.k ?? 1;
      const shift = p.shift ?? 0;
      return safeSigmoid(k * (x - shift));
    },
    derivative: (x, p) => {
      const k = p.k ?? 1;
      const shift = p.shift ?? 0;
      const s = safeSigmoid(k * (x - shift));
      return k * s * (1 - s);
    },
    formatFormula: (p) => {
      const k = (p.k ?? 1).toFixed(2);
      const shift = p.shift ?? 0;
      const shiftStr = shift === 0 ? "x" : shift > 0 ? `(x - ${shift.toFixed(2)})` : `(x + ${Math.abs(shift).toFixed(2)})`;
      return `\\sigma(x) = \\frac{1}{1 + e^{-${k}${shiftStr}}}`;
    },
  },

  tanh: {
    id: "tanh",
    name: "Giperbolik Tangens (Tanh)",
    symbolicLatex: "\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}",
    category: "activation",
    description: "Nolga nisbatan simmetrik bo'lib, chiqish qiymatini (-1, 1) oraliqqa keltiradi. Nol markazli (zero-centered) xususiyatga ega.",
    aiContext: "RNN va LSTM xotira bloklarida hamda yashirin qatlamlarda ma'lumotlarni normalizatsiya qilish uchun ishlatiladi.",
    domainDefault: [-6, 6],
    rangeDefault: [-1.4, 1.4],
    parameters: [
      { id: "k", name: "Tiklik (Steepness k)", symbol: "k", min: 0.2, max: 4, step: 0.1, default: 1.0, description: "Nol atrofidagi qiyalik tezligi" },
      { id: "shift", name: "Markaz siljishi (x_0)", symbol: "x_0", min: -3, max: 3, step: 0.1, default: 0.0, description: "Funksiya nolga teng bo'ladigan nuqta" },
    ],
    evaluate: (x, p) => {
      const k = p.k ?? 1;
      const shift = p.shift ?? 0;
      return safeTanh(k * (x - shift));
    },
    derivative: (x, p) => {
      const k = p.k ?? 1;
      const shift = p.shift ?? 0;
      const t = safeTanh(k * (x - shift));
      return k * (1 - t * t);
    },
    formatFormula: (p) => {
      const k = (p.k ?? 1).toFixed(2);
      const shift = p.shift ?? 0;
      const shiftStr = shift === 0 ? "x" : shift > 0 ? `(x - ${shift.toFixed(2)})` : `(x + ${Math.abs(shift).toFixed(2)})`;
      return `f(x) = \\tanh(${k}${shiftStr})`;
    },
  },
};
