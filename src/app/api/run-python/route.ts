import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { translateErrorToUzbek } from "@/lib/runner/error-translator";

export const dynamic = "force-dynamic";

interface TestCasePayload {
  id: string;
  descriptionUz: string;
  assertionCode: string;
}

interface RunRequestBody {
  code: string;
  timeoutMs?: number;
  testCases?: TestCasePayload[];
}

export async function POST(req: NextRequest) {
  try {
    const body: RunRequestBody = await req.json();
    const { code, timeoutMs = 5000, testCases = [] } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        {
          success: false,
          stdout: "",
          stderr: "Hech qanday Python kodi yuborilmadi.",
          error: "ValueError",
          errorName: "ValueError",
          errorDetailsUz: "Iltimos, ishga tushirish uchun Python kodini kiriting.",
          executionTimeMs: 0,
        },
        { status: 400 },
      );
    }

    // Wrap student code to capture prints and also print the last expression's value (like REPL)
    const runnerScript = `
import sys, json, ast

user_code = ${JSON.stringify(code)}
test_cases = ${JSON.stringify(testCases)}

test_results = []
all_passed = True
repl_output = ""

# Execute user code in isolated global scope
def _expect_value_error(fn, *args, **kwargs):
    try:
        fn(*args, **kwargs)
        return False
    except ValueError:
        return True
    except Exception:
        return False

scope = {"__name__": "__main__", "_expect_value_error": _expect_value_error}

try:
    # Try parsing AST to check if last statement is an expression
    parsed = ast.parse(user_code)
    last_expr = None
    if parsed.body and isinstance(parsed.body[-1], ast.Expr):
        last_expr = parsed.body.pop()
    
    if parsed.body:
        compiled_body = compile(parsed, "<user_code>", "exec")
        exec(compiled_body, scope)
    
    if last_expr:
        compiled_expr = compile(ast.Expression(last_expr.value), "<user_code>", "eval")
        val = eval(compiled_expr, scope)
        if val is not None:
            repl_output = repr(val)
except Exception as e:
    import traceback
    sys.stderr.write(traceback.format_exc())
    sys.exit(1)

# Run test cases if provided
if test_cases:
    for tc in test_cases:
        tc_id = tc.get("id", "")
        assertion = tc.get("assertionCode", "")
        desc = tc.get("descriptionUz", "")
        if not assertion:
            continue
        try:
            assert eval(assertion, scope)
            test_results.append({"id": tc_id, "descriptionUz": desc, "passed": True})
        except Exception as te:
            all_passed = False
            test_results.append({"id": tc_id, "descriptionUz": desc, "passed": False, "errorMessage": str(te)})

output_payload = {
    "test_results": test_results,
    "all_passed": all_passed if test_cases else True,
    "repl_output": repl_output
}
print("__META_PAYLOAD__:" + json.dumps(output_payload))
`;

    const startTime = Date.now();

    return await new Promise<NextResponse>((resolve) => {
      // Try python first, fallback to py
      const pythonExe = process.platform === "win32" ? "python" : "python3";
      const child = spawn(pythonExe, ["-c", runnerScript], {
        timeout: Math.min(timeoutMs, 10000),
      });

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (data) => {
        stdout += data.toString("utf-8");
      });

      child.stderr.on("data", (data) => {
        stderr += data.toString("utf-8");
      });

      child.on("error", (err) => {
        const errorStr = `Python interpretatorini ishga tushirishda xatolik: ${err.message}`;
        resolve(
          NextResponse.json({
            success: false,
            stdout: "",
            stderr: errorStr,
            error: "ProcessError",
            errorName: "ProcessError",
            errorDetailsUz: "Serverda Python 3 interpretatori topilmadi.",
            executionTimeMs: Date.now() - startTime,
          }),
        );
      });

      child.on("close", (exitCode, signal) => {
        const duration = Date.now() - startTime;

        if (signal === "SIGTERM" || duration >= timeoutMs) {
          resolve(
            NextResponse.json({
              success: false,
              stdout: "",
              stderr: "TimeoutError: Dastur belgilangan vaqtda (5 soniya) yakunlanmadi. Cheksiz sikl yoki ortiqcha yuklama.",
              error: "TimeoutError",
              errorName: "TimeoutError (Vaqt tugadi)",
              errorDetailsUz: "Kodingiz 5 soniyadan ko'p ishladi. Sikl (while/for) to'xtash shartini tekshiring.",
              executionTimeMs: duration,
              allTestsPassed: false,
            }),
          );
          return;
        }

        let replVal = "";
        let testResults = [];
        let allPassed = exitCode === 0;

        if (stdout.includes("__META_PAYLOAD__:")) {
          const parts = stdout.split("__META_PAYLOAD__:");
          stdout = parts[0] || "";
          try {
            const meta = JSON.parse(parts[1] || "{}");
            replVal = meta.repl_output || "";
            testResults = meta.test_results || [];
            allPassed = meta.all_passed ?? (exitCode === 0);
          } catch {
            // ignore JSON parse error
          }
        }

        // Clean user stdout
        let finalStdout = stdout.trim();
        if (!finalStdout && replVal) {
          finalStdout = replVal;
        }

        if (exitCode !== 0) {
          const tr = translateErrorToUzbek(stderr);
          resolve(
            NextResponse.json({
              success: false,
              stdout: finalStdout,
              stderr: stderr.trim(),
              error: stderr.trim(),
              errorName: tr.errorName,
              errorDetailsUz: `${tr.summaryUz} ${tr.suggestionUz}`,
              executionTimeMs: duration,
              allTestsPassed: false,
              testResults,
            }),
          );
        } else {
          resolve(
            NextResponse.json({
              success: true,
              stdout: finalStdout || "Kod muvaffaqiyatli bajarildi (stdout bo'sh).",
              stderr: "",
              executionTimeMs: duration,
              allTestsPassed: allPassed,
              testResults,
            }),
          );
        }
      });
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        stdout: "",
        stderr: errMessage,
        error: "InternalServerError",
        errorName: "InternalServerError",
        errorDetailsUz: "Serverda so'rovni qayta ishlashda kutilmagan xatolik yuz berdi.",
        executionTimeMs: 0,
      },
      { status: 500 },
    );
  }
}
