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

const hardProblems = [
  {
    title: "Median of Two Sorted Arrays",
    level: "Hard",
    description:
      "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the **median** of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`.\n\n### Input format\n\n- The first line contains elements of `nums1`, separated by commas.\n- The second line contains elements of `nums2`, separated by commas.\n\n```\n1,3\n2\n```\n\n### Output format\n\n- A single decimal number\n\n```\n2.00000\n```\n\n",
    examples:
      "#### Example 1\n- **Input:**\n```\nnums1 = [1,3], nums2 = [2]\n```\n- **Output:**\n```\n2.00000\n```\n- **Explanation:** Merged array = [1,2,3] and median is 2.\n\n<br>\n\n#### Example 2\n- **Input:**\n```\nnums1 = [1,2], nums2 = [3,4]\n```\n- **Output:**\n```\n2.50000\n```\n- **Explanation:** Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\n<br>\n\n",
    constraints:
      "#### Constraints\n\n- `nums1.length == m`\n- `nums2.length == n`\n- `0 <= m <= 1000`\n- `0 <= n <= 1000`\n- `1 <= m + n <= 2000`\n- `-10^6 <= nums1[i], nums2[i] <= 10^6`\n\n<br>\n",
    testCases: [
      { input: "1,3\n2", output: "2.00000" },
      { input: "1,2\n3,4", output: "2.50000" },
    ],
    topics: "Array,Binary Search,Divide and Conquer",
    companies: "Amazon,Google,Apple,Microsoft,Goldman Sachs",
    like: 2567,
    dislike: 134,
  },
  {
    title: "Regular Expression Matching",
    level: "Hard",
    description:
      "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'` where:\n\n- `'.'` Matches any single character.\n- `'*'` Matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).\n\n### Input format\n\n- The first line contains the string `s`.\n- The second line contains the pattern `p`.\n\n```\naa\na\n```\n\n### Output format\n\n- `true` or `false`\n\n```\nfalse\n```\n\n",
    examples:
      '#### Example 1\n- **Input:**\n```\ns = "aa", p = "a"\n```\n- **Output:**\n```\nfalse\n```\n- **Explanation:** "a" does not match the entire string "aa".\n\n<br>\n\n#### Example 2\n- **Input:**\n```\ns = "aa", p = "a*"\n```\n- **Output:**\n```\ntrue\n```\n- **Explanation:** \'*\' means zero or more of the preceding element, \'a\'. Therefore, by repeating \'a\' once, it becomes "aa".\n\n<br>\n\n#### Example 3\n- **Input:**\n```\ns = "ab", p = ".*"\n```\n- **Output:**\n```\ntrue\n```\n- **Explanation:** ".*" means zero or more (*) of any character (.).\n\n<br>\n\n',
    constraints:
      "#### Constraints\n\n- `1 <= s.length <= 20`\n- `1 <= p.length <= 20`\n- `s` contains only lowercase English letters.\n- `p` contains only lowercase English letters, `'.'`, and `'*'`.\n- It is guaranteed for each appearance of `'*'`, there will be a previous valid character to match.\n\n<br>\n",
    testCases: [
      { input: "aa\na", output: "false" },
      { input: "aa\na*", output: "true" },
      { input: "ab\n.*", output: "true" },
    ],
    topics: "String,Dynamic Programming,Recursion",
    companies: "Amazon,Google,Facebook,Microsoft",
    like: 1876,
    dislike: 198,
  },
  {
    title: "Merge k Sorted Lists",
    level: "Hard",
    description:
      "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n### Input format\n\n- Each line contains a comma-separated sorted list.\n\n```\n1,4,5\n1,3,4\n2,6\n```\n\n### Output format\n\n- A single line of space-separated merged values.\n\n```\n1 1 2 3 4 4 5 6\n```\n\n",
    examples:
      "#### Example 1\n- **Input:**\n```\nlists = [[1,4,5],[1,3,4],[2,6]]\n```\n- **Output:**\n```\n[1,1,2,3,4,4,5,6]\n```\n- **Explanation:** Merging all sorted lists produces [1,1,2,3,4,4,5,6].\n\n<br>\n\n#### Example 2\n- **Input:**\n```\nlists = [[1,2,3]]\n```\n- **Output:**\n```\n[1,2,3]\n```\n\n<br>\n\n",
    constraints:
      "#### Constraints\n\n- `k == lists.length`\n- `0 <= k <= 10^4`\n- `0 <= lists[i].length <= 500`\n- `-10^4 <= lists[i][j] <= 10^4`\n- `lists[i]` is sorted in ascending order.\n- The sum of `lists[i].length` will not exceed `10^4`.\n\n<br>\n",
    testCases: [
      { input: "1,4,5\n1,3,4\n2,6", output: "1 1 2 3 4 4 5 6" },
      { input: "1,2,3", output: "1 2 3" },
    ],
    topics: "Linked List,Divide and Conquer,Heap (Priority Queue),Merge Sort",
    companies: "Amazon,Google,Facebook,Microsoft,Bloomberg,Uber",
    like: 1943,
    dislike: 87,
  },
  {
    title: "Longest Valid Parentheses",
    level: "Hard",
    description:
      "Given a string containing just the characters `'('` and `')'`, return the length of the longest valid (well-formed) parentheses substring.\n\n### Input format\n\n- A single line containing the parentheses string.\n\n```\n(()\n```\n\n### Output format\n\n- A single integer.\n\n```\n2\n```\n\n",
    examples:
      '#### Example 1\n- **Input:**\n```\ns = "(()"\n```\n- **Output:**\n```\n2\n```\n- **Explanation:** The longest valid parentheses substring is "()".\n\n<br>\n\n#### Example 2\n- **Input:**\n```\ns = ")()())"\n```\n- **Output:**\n```\n4\n```\n- **Explanation:** The longest valid parentheses substring is "()()".\n\n<br>\n\n#### Example 3\n- **Input:**\n```\ns = "()()(()"\n```\n- **Output:**\n```\n4\n```\n\n<br>\n\n',
    constraints:
      "#### Constraints\n\n- `0 <= s.length <= 3 * 10^4`\n- `s[i]` is `'('`, or `')'`.\n\n<br>\n",
    testCases: [
      { input: "(()", output: "2" },
      { input: ")()())", output: "4" },
      { input: "()()()", output: "6" },
    ],
    topics: "String,Dynamic Programming,Stack",
    companies: "Amazon,Google,Bloomberg,Facebook",
    like: 1654,
    dislike: 76,
  },
  {
    title: "Minimum Window Substring",
    level: "Hard",
    description:
      'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.\n\nThe testcases will be generated such that the answer is **unique**.\n\n### Input format\n\n- The first line contains string `s`.\n- The second line contains string `t`.\n\n```\nADOBECODEBANC\nABC\n```\n\n### Output format\n\n- The minimum window substring, or empty line if none.\n\n```\nBANC\n```\n\n',
    examples:
      '#### Example 1\n- **Input:**\n```\ns = "ADOBECODEBANC", t = "ABC"\n```\n- **Output:**\n```\n"BANC"\n```\n- **Explanation:** The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.\n\n<br>\n\n#### Example 2\n- **Input:**\n```\ns = "a", t = "a"\n```\n- **Output:**\n```\n"a"\n```\n- **Explanation:** The entire string s is the minimum window.\n\n<br>\n\n#### Example 3\n- **Input:**\n```\ns = "a", t = "aa"\n```\n- **Output:**\n```\n""\n```\n- **Explanation:** Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.\n\n<br>\n\n',
    constraints:
      "#### Constraints\n\n- `m == s.length`\n- `n == t.length`\n- `1 <= m, n <= 10^5`\n- `s` and `t` consist of uppercase and lowercase English letters.\n\n<br>\n\n#### Follow-up\nCould you find an algorithm that runs in `O(m + n)` time?\n",
    testCases: [
      { input: "ADOBECODEBANC\nABC", output: "BANC" },
      { input: "a\na", output: "a" },
      { input: "a\naa", output: "NONE" },
    ],
    topics: "Hash Table,String,Sliding Window",
    companies: "Amazon,Google,Facebook,Microsoft,Bloomberg,Uber",
    like: 2134,
    dislike: 102,
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
  console.log(`Existing problems: ${existingCount}`);

  let added = 0;
  for (const p of hardProblems) {
    const idx = existingCount + added + 1;
    const titleWithIndex = `${idx}. ${p.title}`;

    const exists = await Problem.findOne({ title: titleWithIndex });
    if (exists) {
      console.log(`  SKIP: "${titleWithIndex}"`);
      continue;
    }

    await Problem.create({
      ...p,
      title: titleWithIndex,
      similarQuestions: [],
      solutions: [],
    });
    console.log(`  ADDED: "${titleWithIndex}" [Hard]`);
    added++;
  }

  console.log(`\nDone! Added ${added} hard problems (total: ${existingCount + added}).`);
  await mongoose.disconnect();
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
