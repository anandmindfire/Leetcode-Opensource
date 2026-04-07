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

/**
 * Test cases need stdin-style input (raw values, one per line)
 * and stdout-style output (what the program should print).
 *
 * Old format: { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
 * New format: { input: "2,7,11,15\n9", output: "0 1" }
 */

// Map of problem title (without number prefix) -> new test cases
const testCaseUpdates: Record<string, { input: string; output: string }[]> = {
  "Two Sum": [
    { input: "2,7,11,15\n9", output: "0 1" },
    { input: "3,2,4\n6", output: "1 2" },
    { input: "3,3\n6", output: "0 1" },
  ],
  "Valid Parentheses": [
    { input: "()", output: "true" },
    { input: "()[]{}", output: "true" },
    { input: "(]", output: "false" },
  ],
  "Merge Two Sorted Lists": [
    { input: "1,2,4\n1,3,4", output: "1 1 2 3 4 4" },
    { input: "\n", output: "" },
    { input: "\n0", output: "0" },
  ],
  "Best Time to Buy and Sell Stock": [
    { input: "7,1,5,3,6,4", output: "5" },
    { input: "7,6,4,3,1", output: "0" },
  ],
  "Maximum Subarray": [
    { input: "-2,1,-3,4,-1,2,1,-5,4", output: "6" },
    { input: "1", output: "1" },
    { input: "5,4,-1,7,8", output: "23" },
  ],
  "Longest Substring Without Repeating Characters": [
    { input: "abcabcbb", output: "3" },
    { input: "bbbbb", output: "1" },
    { input: "pwwkew", output: "3" },
  ],
  "Container With Most Water": [
    { input: "1,8,6,2,5,4,8,3,7", output: "49" },
    { input: "1,1", output: "1" },
  ],
  "3Sum": [
    { input: "-1,0,1,2,-1,-4", output: "-1 -1 2\n-1 0 1" },
    { input: "0,1,1", output: "" },
    { input: "0,0,0", output: "0 0 0" },
  ],
  "Group Anagrams": [
    { input: "eat,tea,tan,ate,nat,bat", output: "bat\nnat tan\nate eat tea" },
    { input: "", output: "" },
    { input: "a", output: "a" },
  ],
  "Binary Tree Level Order Traversal": [
    { input: "3,9,20,null,null,15,7", output: "3\n9 20\n15 7" },
    { input: "1", output: "1" },
    { input: "", output: "" },
  ],
  "Validate Binary Search Tree": [
    { input: "2,1,3", output: "true" },
    { input: "5,1,4,null,null,3,6", output: "false" },
  ],
  "Climbing Stairs": [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "5", output: "8" },
  ],
  "Coin Change": [
    { input: "1,2,5\n11", output: "3" },
    { input: "2\n3", output: "-1" },
    { input: "1\n0", output: "0" },
  ],
  "Product of Array Except Self": [
    { input: "1,2,3,4", output: "24 12 8 6" },
    { input: "-1,1,0,-3,3", output: "0 0 9 0 0" },
  ],
  "Linked List Cycle": [
    { input: "3,2,0,-4\n1", output: "true" },
    { input: "1,2\n0", output: "true" },
    { input: "1\n-1", output: "false" },
  ],
  "Search in Rotated Sorted Array": [
    { input: "4,5,6,7,0,1,2\n0", output: "4" },
    { input: "4,5,6,7,0,1,2\n3", output: "-1" },
    { input: "1\n0", output: "-1" },
  ],
  "Number of Islands": [
    { input: "11110\n11010\n11000\n00000", output: "1" },
    { input: "11000\n11000\n00100\n00011", output: "3" },
  ],
  "Merge Intervals": [
    { input: "1,3\n2,6\n8,10\n15,18", output: "1 6\n8 10\n15 18" },
    { input: "1,4\n4,5", output: "1 5" },
  ],
  "Word Search": [
    { input: "ABCE,SFCS,ADEE\nABCCED", output: "true" },
    { input: "ABCE,SFCS,ADEE\nSEE", output: "true" },
    { input: "ABCE,SFCS,ADEE\nABCB", output: "false" },
  ],
  "Trapping Rain Water": [
    { input: "0,1,0,2,1,0,1,3,2,1,2,1", output: "6" },
    { input: "4,2,0,3,2,5", output: "9" },
  ],
};

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
          testCases: [{ input: { type: String }, output: { type: String } }],
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

  const problems = await Problem.find({});
  let updated = 0;

  for (const p of problems) {
    // Extract base title (remove "1. " prefix)
    const baseTitle = p.title.replace(/^\d+\.\s*/, "");
    const newTestCases = testCaseUpdates[baseTitle];
    if (!newTestCases) {
      console.log(`  SKIP: "${p.title}" — no mapping found`);
      continue;
    }

    await Problem.updateOne(
      { _id: p._id },
      { $set: { testCases: newTestCases } }
    );
    console.log(`  UPDATED: "${p.title}" (${newTestCases.length} test cases)`);
    updated++;
  }

  console.log(`\nDone! Updated ${updated} problems.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
