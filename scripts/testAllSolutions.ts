/**
 * Fetch all problems with test cases+solutions and test each solution
 * against the compiler API to verify correctness.
 */
import mongoose from "mongoose";
import axios from "axios";
import fs from "fs";
import path from "path";

const envPath = path.resolve(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const idx = line.indexOf("=");
  if (idx === -1) continue;
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  if (key && !process.env[key]) process.env[key] = value;
}

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "leetcode";
const COMPILER_API_URL = "https://api.onlinecompiler.io/api/run-code-sync/";
const API_KEY = process.env.Compiler_API_KEY || "";

const languageIdToCompiler: Record<string, string> = {
  "gcc-15": "gcc-15",
  "g++-15": "g++-15",
  "openjdk-25": "openjdk-25",
  "typescript-deno": "typescript-deno",
  "python-3.14": "python-3.14",
};

function guessCompiler(tags: string[]): string {
  const t = tags.map(t => t.toLowerCase());
  if (t.includes("python")) return "python-3.14";
  if (t.includes("c++")) return "g++-15";
  if (t.includes("c")) return "gcc-15";
  if (t.includes("java")) return "openjdk-25";
  if (t.includes("javascript") || t.includes("typescript")) return "typescript-deno";
  return "python-3.14"; // default
}

async function runCode(compiler: string, code: string, input: string): Promise<{ output: string; error: string; exitCode: number }> {
  try {
    const res = await axios.post(COMPILER_API_URL, { compiler, code, input }, {
      headers: { "Content-Type": "application/json", Authorization: API_KEY },
      timeout: 35000,
    });
    return {
      output: (res.data.output ?? "").trim(),
      error: res.data.error ?? "",
      exitCode: res.data.exit_code ?? 0,
    };
  } catch (e: any) {
    return { output: "", error: e.message, exitCode: -1 };
  }
}

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected.\n");

  const problemSchema = new mongoose.Schema({
    title: String,
    testCases: [{ input: String, output: String }],
    solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
  });
  const solutionSchema = new mongoose.Schema({
    title: String, tags: [String], sourceCode: String, problemId: mongoose.Schema.Types.ObjectId,
  });

  const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);
  const Solution = mongoose.models.Solution || mongoose.model("Solution", solutionSchema);

  // Fetch all solutions that are linked to problems
  const solutions = await Solution.find({});
  const problems = await Problem.find({});
  const problemMap = new Map<string, any>();
  for (const p of problems) problemMap.set(p._id.toString(), p);

  const failures: { problem: string; solution: string; tcIndex: number; expected: string; actual: string; error: string }[] = [];

  for (const sol of solutions) {
    const p = problemMap.get(sol.problemId?.toString());
    if (!p || !p.testCases || p.testCases.length === 0) continue;

    const compiler = guessCompiler(sol.tags || []);
    console.log(`Testing: "${sol.title}" for "${p.title}" [${compiler}]`);

    let allPassed = true;
    for (let i = 0; i < p.testCases.length; i++) {
      const tc = p.testCases[i];
      const expected = (tc.output ?? "").trim();
      const result = await runCode(compiler, sol.sourceCode, tc.input);

      if (result.exitCode !== 0) {
        console.log(`  TC ${i + 1}: ERROR — ${result.error.slice(0, 120)}`);
        failures.push({ problem: p.title, solution: sol.title, tcIndex: i + 1, expected, actual: result.output, error: result.error.slice(0, 200) });
        allPassed = false;
      } else if (result.output !== expected) {
        console.log(`  TC ${i + 1}: WRONG — expected "${expected}", got "${result.output}"`);
        failures.push({ problem: p.title, solution: sol.title, tcIndex: i + 1, expected, actual: result.output, error: "" });
        allPassed = false;
      }
    }
    if (allPassed) console.log(`  ✓ All ${p.testCases.length} test cases passed`);

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  console.log("\n========== SUMMARY ==========");
  if (failures.length === 0) {
    console.log("ALL SOLUTIONS PASS ALL TEST CASES!");
  } else {
    console.log(`${failures.length} FAILURES:\n`);
    for (const f of failures) {
      console.log(`  Problem: ${f.problem}`);
      console.log(`  Solution: ${f.solution}`);
      console.log(`  TC ${f.tcIndex}: expected "${f.expected}", got "${f.actual}"`);
      if (f.error) console.log(`  Error: ${f.error}`);
      console.log();
    }
  }

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
