/**
 * Safe arithmetic expression parser used by data-driven mathematical charts.
 *
 * Content authors describe functions as strings (e.g. "a * x^2 + b"), so the
 * parser must never call `eval`/`Function`. It supports:
 *   numbers, identifiers (variables/parameters), constants (pi, e),
 *   + - * / ^ (right-associative), unary +/-, parentheses,
 *   and a fixed whitelist of math functions.
 */

export type ExpressionNode =
  | { type: "number"; value: number }
  | { type: "identifier"; name: string }
  | { type: "unary"; op: "-" | "+"; arg: ExpressionNode }
  | { type: "binary"; op: "+" | "-" | "*" | "/" | "^"; left: ExpressionNode; right: ExpressionNode }
  | { type: "call"; name: string; args: ExpressionNode[] };

type MathFn = (...args: number[]) => number;

export const EXPRESSION_FUNCTIONS: Readonly<Record<string, { fn: MathFn; arity: number | "variadic" }>> = {
  sin: { fn: Math.sin, arity: 1 },
  cos: { fn: Math.cos, arity: 1 },
  tan: { fn: Math.tan, arity: 1 },
  asin: { fn: Math.asin, arity: 1 },
  acos: { fn: Math.acos, arity: 1 },
  atan: { fn: Math.atan, arity: 1 },
  sinh: { fn: Math.sinh, arity: 1 },
  cosh: { fn: Math.cosh, arity: 1 },
  tanh: { fn: Math.tanh, arity: 1 },
  exp: { fn: Math.exp, arity: 1 },
  log: { fn: Math.log, arity: 1 },
  ln: { fn: Math.log, arity: 1 },
  log2: { fn: Math.log2, arity: 1 },
  log10: { fn: Math.log10, arity: 1 },
  sqrt: { fn: Math.sqrt, arity: 1 },
  abs: { fn: Math.abs, arity: 1 },
  floor: { fn: Math.floor, arity: 1 },
  ceil: { fn: Math.ceil, arity: 1 },
  round: { fn: Math.round, arity: 1 },
  sign: { fn: Math.sign, arity: 1 },
  pow: { fn: Math.pow, arity: 2 },
  min: { fn: Math.min, arity: "variadic" },
  max: { fn: Math.max, arity: "variadic" },
  sigmoid: {
    fn: (x: number) => {
      const clamped = Math.max(-60, Math.min(60, x));
      return 1 / (1 + Math.exp(-clamped));
    },
    arity: 1,
  },
  relu: {
    fn: (x: number) => Math.max(0, x),
    arity: 1,
  },
  gelu: {
    fn: (x: number) => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))),
    arity: 1,
  },
  silu: {
    fn: (x: number) => {
      const clamped = Math.max(-60, Math.min(60, x));
      return x / (1 + Math.exp(-clamped));
    },
    arity: 1,
  },
  swish: {
    fn: (x: number) => {
      const clamped = Math.max(-60, Math.min(60, x));
      return x / (1 + Math.exp(-clamped));
    },
    arity: 1,
  },
  softplus: {
    fn: (x: number) => {
      if (x > 20) return x;
      if (x < -20) return Math.exp(x);
      return Math.log1p(Math.exp(x));
    },
    arity: 1,
  },
  step: {
    fn: (x: number) => (x >= 0 ? 1 : 0),
    arity: 1,
  },
  sinc: {
    fn: (x: number) => (x === 0 ? 1 : Math.sin(x) / x),
    arity: 1,
  },
  clamp: {
    fn: (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x)),
    arity: 3,
  },
};

export const EXPRESSION_CONSTANTS: Readonly<Record<string, number>> = {
  pi: Math.PI,
  e: Math.E,
};

export class ExpressionError extends Error {
  readonly position: number;
  constructor(message: string, position: number) {
    super(`${message} (pozitsiya ${position})`);
    this.name = "ExpressionError";
    this.position = position;
  }
}

type Token =
  | { kind: "number"; value: number; pos: number }
  | { kind: "ident"; value: string; pos: number }
  | { kind: "op"; value: "+" | "-" | "*" | "/" | "^"; pos: number }
  | { kind: "lparen"; pos: number }
  | { kind: "rparen"; pos: number }
  | { kind: "comma"; pos: number }
  | { kind: "eof"; pos: number };

const MAX_EXPRESSION_LENGTH = 500;

function tokenize(source: string): Token[] {
  if (source.length > MAX_EXPRESSION_LENGTH) {
    throw new ExpressionError("Ifoda juda uzun", MAX_EXPRESSION_LENGTH);
  }
  const rawTokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i] as string;
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const match = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(source.slice(i));
      if (!match) throw new ExpressionError(`Noto‘g‘ri son`, i);
      rawTokens.push({ kind: "number", value: Number(match[0]), pos: i });
      i += match[0].length;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      const match = /^[A-Za-z_][A-Za-z0-9_]*/.exec(source.slice(i));
      const name = match ? match[0] : ch;
      rawTokens.push({ kind: "ident", value: name, pos: i });
      i += name.length;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^") {
      rawTokens.push({ kind: "op", value: ch, pos: i });
      i++;
      continue;
    }
    if (ch === "(") rawTokens.push({ kind: "lparen", pos: i });
    else if (ch === ")") rawTokens.push({ kind: "rparen", pos: i });
    else if (ch === ",") rawTokens.push({ kind: "comma", pos: i });
    else throw new ExpressionError(`Kutilmagan belgi '${ch}'`, i);
    i++;
  }
  rawTokens.push({ kind: "eof", pos: source.length });

  // Desmos-style implicit multiplication insertion:
  // e.g. 2x -> 2 * x, 2(x+1) -> 2 * (x+1), (x-1)(x+1) -> (x-1) * (x+1), x(x+1) -> x * (x+1)
  const tokens: Token[] = [];
  for (let idx = 0; idx < rawTokens.length; idx++) {
    const curr = rawTokens[idx]!;
    tokens.push(curr);
    if (idx + 1 < rawTokens.length) {
      const next = rawTokens[idx + 1]!;
      const isCurrFnCall = curr.kind === "ident" && curr.value in EXPRESSION_FUNCTIONS && next.kind === "lparen";
      if (!isCurrFnCall) {
        if (
          (curr.kind === "number" && (next.kind === "ident" || next.kind === "lparen")) ||
          (curr.kind === "rparen" && (next.kind === "number" || next.kind === "ident" || next.kind === "lparen")) ||
          (curr.kind === "ident" && next.kind === "lparen") ||
          (curr.kind === "ident" && (next.kind === "ident" || next.kind === "number"))
        ) {
          tokens.push({ kind: "op", value: "*", pos: next.pos });
        }
      }
    }
  }

  return tokens;
}

class Parser {
  private index = 0;
  constructor(private readonly tokens: Token[]) {}

  private peek(): Token {
    return this.tokens[this.index] as Token;
  }

  private next(): Token {
    const token = this.tokens[this.index] as Token;
    this.index++;
    return token;
  }

  parse(): ExpressionNode {
    const node = this.parseAdditive();
    const token = this.peek();
    if (token.kind !== "eof") throw new ExpressionError("Ifoda oxirida ortiqcha belgi", token.pos);
    return node;
  }

  private parseAdditive(): ExpressionNode {
    let left = this.parseMultiplicative();
    for (;;) {
      const token = this.peek();
      if (token.kind === "op" && (token.value === "+" || token.value === "-")) {
        this.next();
        left = { type: "binary", op: token.value, left, right: this.parseMultiplicative() };
      } else return left;
    }
  }

  private parseMultiplicative(): ExpressionNode {
    let left = this.parseUnary();
    for (;;) {
      const token = this.peek();
      if (token.kind === "op" && (token.value === "*" || token.value === "/")) {
        this.next();
        left = { type: "binary", op: token.value, left, right: this.parseUnary() };
      } else return left;
    }
  }

  private parseUnary(): ExpressionNode {
    const token = this.peek();
    if (token.kind === "op" && (token.value === "-" || token.value === "+")) {
      this.next();
      return { type: "unary", op: token.value, arg: this.parseUnary() };
    }
    return this.parsePower();
  }

  private parsePower(): ExpressionNode {
    const base = this.parsePrimary();
    const token = this.peek();
    if (token.kind === "op" && token.value === "^") {
      this.next();
      // right-associative; exponent may carry its own unary sign
      return { type: "binary", op: "^", left: base, right: this.parseUnary() };
    }
    return base;
  }

  private parsePrimary(): ExpressionNode {
    const token = this.next();
    switch (token.kind) {
      case "number":
        return { type: "number", value: token.value };
      case "ident": {
        if (this.peek().kind === "lparen") {
          const fn = EXPRESSION_FUNCTIONS[token.value];
          if (!fn) throw new ExpressionError(`Noma’lum funksiya '${token.value}'`, token.pos);
          this.next();
          const args: ExpressionNode[] = [];
          if (this.peek().kind !== "rparen") {
            args.push(this.parseAdditive());
            while (this.peek().kind === "comma") {
              this.next();
              args.push(this.parseAdditive());
            }
          }
          const close = this.next();
          if (close.kind !== "rparen") throw new ExpressionError("')' kutilgan", close.pos);
          if (fn.arity !== "variadic" && args.length !== fn.arity) {
            throw new ExpressionError(
              `'${token.value}' funksiyasi ${fn.arity} ta argument qabul qiladi`,
              token.pos,
            );
          }
          if (fn.arity === "variadic" && args.length === 0) {
            throw new ExpressionError(`'${token.value}' kamida bitta argument talab qiladi`, token.pos);
          }
          return { type: "call", name: token.value, args };
        }
        return { type: "identifier", name: token.value };
      }
      case "lparen": {
        const inner = this.parseAdditive();
        const close = this.next();
        if (close.kind !== "rparen") throw new ExpressionError("')' kutilgan", close.pos);
        return inner;
      }
      default:
        throw new ExpressionError("Son, o‘zgaruvchi yoki '(' kutilgan", token.pos);
    }
  }
}

export interface CompiledExpression {
  readonly source: string;
  readonly ast: ExpressionNode;
  /** Free identifiers (excluding constants and function names). */
  readonly identifiers: ReadonlySet<string>;
  evaluate(scope: Readonly<Record<string, number>>): number;
}

function collectIdentifiers(node: ExpressionNode, out: Set<string>): void {
  switch (node.type) {
    case "identifier":
      if (!(node.name in EXPRESSION_CONSTANTS)) out.add(node.name);
      return;
    case "unary":
      collectIdentifiers(node.arg, out);
      return;
    case "binary":
      collectIdentifiers(node.left, out);
      collectIdentifiers(node.right, out);
      return;
    case "call":
      node.args.forEach((arg) => collectIdentifiers(arg, out));
      return;
    case "number":
      return;
  }
}

function evaluateNode(node: ExpressionNode, scope: Readonly<Record<string, number>>): number {
  switch (node.type) {
    case "number":
      return node.value;
    case "identifier": {
      const value = scope[node.name];
      if (value !== undefined) return value;
      const constant = EXPRESSION_CONSTANTS[node.name];
      if (constant !== undefined) return constant;
      return Number.NaN;
    }
    case "unary": {
      const value = evaluateNode(node.arg, scope);
      return node.op === "-" ? -value : value;
    }
    case "binary": {
      const a = evaluateNode(node.left, scope);
      const b = evaluateNode(node.right, scope);
      switch (node.op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
        case "^":
          return Math.pow(a, b);
      }
      return Number.NaN;
    }
    case "call": {
      const fn = EXPRESSION_FUNCTIONS[node.name];
      if (!fn) return Number.NaN;
      return fn.fn(...node.args.map((arg) => evaluateNode(arg, scope)));
    }
  }
}

export function compileExpression(source: string): CompiledExpression {
  const ast = new Parser(tokenize(source)).parse();
  const identifiers = new Set<string>();
  collectIdentifiers(ast, identifiers);
  return {
    source,
    ast,
    identifiers,
    evaluate: (scope) => evaluateNode(ast, scope),
  };
}

/** Returns an error message, or null when the expression is valid for the given variables. */
export function validateExpression(source: string, allowedIdentifiers: Iterable<string>): string | null {
  try {
    const compiled = compileExpression(source);
    const allowed = new Set(allowedIdentifiers);
    const unknown = [...compiled.identifiers].filter((name) => !allowed.has(name));
    if (unknown.length > 0) return `Noma’lum o‘zgaruvchi(lar): ${unknown.join(", ")}`;
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}
