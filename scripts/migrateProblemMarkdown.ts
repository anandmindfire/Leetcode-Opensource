import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Parse .env
const envPath = path.resolve(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const idx = line.indexOf("=");
  if (idx === -1) continue;
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  if (key && !process.env[key]) {
    process.env[key] = value;
  }
}

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "leetcode";

function formatExamples(raw: string): string {
  const blocks = raw.split("---").map((b) => b.trim()).filter(Boolean);
  let md = "";

  blocks.forEach((block, idx) => {
    md += `#### Example ${idx + 1}\n`;
    const lines = block.split("\n");
    let section: "none" | "input" | "output" | "explanation" = "none";
    let inputLines: string[] = [];
    let outputLines: string[] = [];
    let explanationLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Input:")) {
        section = "input";
        inputLines.push(trimmed.replace(/^Input:\s*/, ""));
      } else if (trimmed.startsWith("Output:")) {
        section = "output";
        outputLines.push(trimmed.replace(/^Output:\s*/, ""));
      } else if (trimmed.startsWith("Explanation:")) {
        section = "explanation";
        explanationLines.push(trimmed.replace(/^Explanation:\s*/, ""));
      } else if (section === "input") {
        inputLines.push(trimmed);
      } else if (section === "output") {
        outputLines.push(trimmed);
      } else if (section === "explanation") {
        explanationLines.push(trimmed);
      }
    }

    md += `- **Input:**\n\`\`\`\n${inputLines.join("\n")}\n\`\`\`\n`;
    md += `- **Output:**\n\`\`\`\n${outputLines.join("\n")}\n\`\`\`\n`;
    if (explanationLines.length > 0 && explanationLines.some((l) => l.length > 0)) {
      md += `- **Explanation:** ${explanationLines.join(" ")}\n`;
    }
    md += "\n<br>\n\n";
  });

  return md;
}

function formatConstraints(raw: string): string {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  let md = "#### Constraints\n\n";
  for (const line of lines) {
    md += `- \`${line}\`\n`;
  }
  md += "\n<br>\n";
  return md;
}

function formatDescription(raw: string): string {
  // Already has inline markdown (backticks, bold). Just ensure it ends with spacing.
  return raw.trim() + "\n\n";
}

async function migrate() {
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
          testCases: [
            {
              input: { type: String, required: true },
              output: { type: String, required: true },
            },
          ],
          like: { type: Number, default: 0 },
          dislike: { type: Number, default: 0 },
          topics: { type: String, required: true },
          companies: { type: String },
          similarQuestions: [
            { type: mongoose.Schema.Types.ObjectId, ref: "SimilarQuestion" },
          ],
          solutions: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Solution" },
          ],
        },
        { timestamps: true }
      )
    );

  const problems = await Problem.find({});
  console.log(`Found ${problems.length} problems.\n`);

  let updated = 0;
  for (const p of problems) {
    // Skip if already formatted (contains markdown headers)
    if (p.examples.includes("#### Example")) {
      console.log(`  SKIP (already formatted): "${p.title}"`);
      continue;
    }

    const newDescription = formatDescription(p.description);
    const newExamples = formatExamples(p.examples);
    const newConstraints = formatConstraints(p.constraints);

    await Problem.updateOne(
      { _id: p._id },
      {
        $set: {
          description: newDescription,
          examples: newExamples,
          constraints: newConstraints,
        },
      }
    );

    console.log(`  UPDATED: "${p.title}"`);
    updated++;
  }

  console.log(`\nDone! Updated ${updated} problems, skipped ${problems.length - updated}.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
