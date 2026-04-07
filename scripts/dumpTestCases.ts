import mongoose from "mongoose";
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

async function main() {
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  const problemSchema = new mongoose.Schema({ title: String, testCases: [{ input: String, output: String }] });
  const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);
  const problems = await Problem.find({}).sort({ title: 1 });
  for (const p of problems) {
    const num = p.title.match(/^(\d+)\./)?.[1];
    if (!num) continue;
    const n = parseInt(num);
    // Only show failing ones: 1,2,4,5,6,7,8,12,13,14,16,17,18,20
    if (![1,2,4,5,6,7,8,12,13,14,16,17,18,20].includes(n)) continue;
    console.log(`\n=== ${p.title} ===`);
    for (let i = 0; i < p.testCases.length; i++) {
      console.log(`  TC${i+1} input: ${JSON.stringify(p.testCases[i].input)}`);
      console.log(`  TC${i+1} output: ${JSON.stringify(p.testCases[i].output)}`);
    }
  }
  await mongoose.disconnect();
}
main();
