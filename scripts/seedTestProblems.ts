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

const problems = [
  {
    title: "Hello World",
    level: "Easy",
    description:
      'Write a program that reads a name from input and prints `Hello, <name>!`.\n\nIf the input is `World`, the output should be `Hello, World!`.\n\n### Input format\n\n- A single line containing a string (the name).\n\n```\nWorld\n```\n\n### Output format\n\n- A single line: `Hello, <name>!`\n\n```\nHello, World!\n```\n\n',
    examples:
      '#### Example 1\n- **Input:**\n```\nWorld\n```\n- **Output:**\n```\nHello, World!\n```\n\n<br>\n\n#### Example 2\n- **Input:**\n```\nLeetCode\n```\n- **Output:**\n```\nHello, LeetCode!\n```\n\n<br>\n\n#### Example 3\n- **Input:**\n```\nAlice\n```\n- **Output:**\n```\nHello, Alice!\n```\n\n<br>\n\n',
    constraints:
      "#### Constraints\n\n- `1 <= name.length <= 100`\n- The name consists of English letters only.\n\n<br>\n",
    testCases: [
      { input: "World", output: "Hello, World!" },
      { input: "LeetCode", output: "Hello, LeetCode!" },
      { input: "Alice", output: "Hello, Alice!" },
    ],
    topics: "String,Basics",
    companies: "",
    like: 542,
    dislike: 12,
  },
  {
    title: "Add Two Numbers (Simple)",
    level: "Easy",
    description:
      "Write a program that reads two integers from input and prints their sum.\n\n### Input format\n\n- The first line contains the first integer `a`.\n- The second line contains the second integer `b`.\n\n```\n3\n5\n```\n\n### Output format\n\n- A single integer: the sum of `a` and `b`.\n\n```\n8\n```\n\n",
    examples:
      "#### Example 1\n- **Input:**\n```\n3\n5\n```\n- **Output:**\n```\n8\n```\n\n<br>\n\n#### Example 2\n- **Input:**\n```\n-1\n1\n```\n- **Output:**\n```\n0\n```\n\n<br>\n\n#### Example 3\n- **Input:**\n```\n100\n200\n```\n- **Output:**\n```\n300\n```\n\n<br>\n\n",
    constraints:
      "#### Constraints\n\n- `-10^9 <= a, b <= 10^9`\n\n<br>\n",
    testCases: [
      { input: "3\n5", output: "8" },
      { input: "-1\n1", output: "0" },
      { input: "100\n200", output: "300" },
    ],
    topics: "Math,Basics",
    companies: "",
    like: 389,
    dislike: 8,
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected.\n");

  const Problem =
    mongoose.models.Problem ||
    mongoose.model(
      "Problem",
      new mongoose.Schema(
        {
          title: { type: String, unique: true, required: true, trim: true },
          level: { type: String, required: true },
          description: { type: String, required: true },
          examples: { type: String, required: true },
          constraints: { type: String, required: true },
          testCases: [{ input: { type: String, required: true }, output: { type: String, required: true } }],
          like: { type: Number, default: 0 },
          dislike: { type: Number, default: 0 },
          topics: { type: String, required: true },
          companies: { type: String },
          similarQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "SimilarQuestion" }],
          solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
        },
        { timestamps: true }
      )
    );

  const existingCount = await Problem.countDocuments();
  let added = 0;

  for (const p of problems) {
    const idx = existingCount + added + 1;
    const titleWithIndex = `${idx}. ${p.title}`;
    const exists = await Problem.findOne({ title: titleWithIndex });
    if (exists) {
      console.log(`  SKIP: "${titleWithIndex}"`);
      continue;
    }
    await Problem.create({ ...p, title: titleWithIndex, similarQuestions: [], solutions: [] });
    console.log(`  ADDED: "${titleWithIndex}" [${p.level}]`);
    added++;
  }

  console.log(`\nDone! Added ${added} problems (total: ${existingCount + added}).`);
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
