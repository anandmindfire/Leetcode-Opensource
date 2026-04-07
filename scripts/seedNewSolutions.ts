import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

interface SolutionSeed {
  title: string;
  tags: string[];
  explanation: string;
  sourceCode: string;
}

const solutionsByProblem: Record<string, SolutionSeed[]> = {
  "Hello World": [
    {
      title: "Simple Input/Output - Python",
      tags: ["String", "Basics", "Python"],
      explanation:
`## Approach

Read the name from stdin and print the greeting using an f-string.

### Complexity
- **Time:** O(n)
- **Space:** O(n)`,
      sourceCode: `print(f"Hello, {input()}!")`,
    },
    {
      title: "Simple Input/Output - JavaScript",
      tags: ["String", "Basics", "JavaScript"],
      explanation:
`## Approach

Read stdin using Deno's readable stream, trim whitespace, then print with string concatenation.

### Complexity
- **Time:** O(n)
- **Space:** O(n)`,
      sourceCode:
`const input = await new Response(Deno.stdin.readable).text();
const name = input.trim();
console.log("Hello, " + name + "!");`,
    },
  ],
  "Add Two Numbers (Simple)": [
    {
      title: "Read Two Lines and Sum - Python",
      tags: ["Math", "Basics", "Python"],
      explanation:
`## Approach

Read two integers from stdin (one per line) and print their sum.

### Complexity
- **Time:** O(1)
- **Space:** O(1)`,
      sourceCode: `print(int(input()) + int(input()))`,
    },
    {
      title: "Read Two Lines and Sum - C++",
      tags: ["Math", "Basics", "C++"],
      explanation:
`## Approach

Use \`cin\` to read two long long integers and output their sum.

### Complexity
- **Time:** O(1)
- **Space:** O(1)`,
      sourceCode:
`#include <iostream>
using namespace std;
int main() {
    long long a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
    },
  ],
  "Median of Two Sorted Arrays": [
    {
      title: "Binary Search - O(log(min(m,n)))",
      tags: ["Binary Search", "Array", "Python"],
      explanation:
`## Approach: Binary Search on Smaller Array

We binary search on the smaller array to find the correct partition point. At each step we check if the left halves of both arrays combined form the correct lower half of the merged array.

### Complexity
- **Time:** O(log(min(m,n)))
- **Space:** O(1)`,
      sourceCode:
`import sys

def findMedian(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        left1 = nums1[i-1] if i > 0 else float('-inf')
        right1 = nums1[i] if i < m else float('inf')
        left2 = nums2[j-1] if j > 0 else float('-inf')
        right2 = nums2[j] if j < n else float('inf')
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 1:
                return max(left1, left2)
            return (max(left1, left2) + min(right1, right2)) / 2
        elif left1 > right2:
            hi = i - 1
        else:
            lo = i + 1

line1 = input().strip()
line2 = input().strip()
nums1 = list(map(int, line1.split(','))) if line1 else []
nums2 = list(map(int, line2.split(','))) if line2 else []
print(f"{findMedian(nums1, nums2):.5f}")`,
    },
  ],
  "Regular Expression Matching": [
    {
      title: "Dynamic Programming - Bottom Up",
      tags: ["Dynamic Programming", "String", "Python"],
      explanation:
`## Approach: DP Table

Build a 2D DP table where \`dp[i][j]\` is True if \`s[0..i-1]\` matches \`p[0..j-1]\`.

- If \`p[j-1] == '*'\`, either skip the pattern pair (zero occurrences) or match one more character.
- If \`p[j-1] == '.'\` or matches \`s[i-1]\`, carry forward the diagonal.

### Complexity
- **Time:** O(m * n)
- **Space:** O(m * n)`,
      sourceCode:
`s = input().strip()
p = input().strip()

m, n = len(s), len(p)
dp = [[False] * (n + 1) for _ in range(m + 1)]
dp[0][0] = True

for j in range(1, n + 1):
    if p[j-1] == '*':
        dp[0][j] = dp[0][j-2]

for i in range(1, m + 1):
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[i][j] = dp[i][j-2]
            if p[j-2] == '.' or p[j-2] == s[i-1]:
                dp[i][j] = dp[i][j] or dp[i-1][j]
        elif p[j-1] == '.' or p[j-1] == s[i-1]:
            dp[i][j] = dp[i-1][j-1]

print("true" if dp[m][n] else "false")`,
    },
  ],
  "Merge k Sorted Lists": [
    {
      title: "Min Heap Approach",
      tags: ["Heap", "Linked List", "Python"],
      explanation:
`## Approach: Min Heap

Parse each line as a sorted list. Use a min heap to always extract the smallest element across all lists.

### Complexity
- **Time:** O(N log k) where N is total elements
- **Space:** O(k)`,
      sourceCode:
`import sys, heapq

lines = sys.stdin.read().strip().split('\\n')
lists = []
for line in lines:
    line = line.strip()
    if line:
        lists.append(list(map(int, line.split(','))))

heap = []
for i, lst in enumerate(lists):
    if lst:
        heapq.heappush(heap, (lst[0], i, 0))

result = []
while heap:
    val, li, idx = heapq.heappop(heap)
    result.append(str(val))
    if idx + 1 < len(lists[li]):
        heapq.heappush(heap, (lists[li][idx+1], li, idx+1))

print(' '.join(result))`,
    },
  ],
  "Longest Valid Parentheses": [
    {
      title: "Stack-Based Solution",
      tags: ["Stack", "String", "Python"],
      explanation:
`## Approach: Stack

Use a stack initialized with \`-1\`. For each \`(\`, push its index. For each \`)\`, pop the top:
- If stack is empty, push current index as new base.
- Otherwise, update max length as \`i - stack[-1]\`.

### Complexity
- **Time:** O(n)
- **Space:** O(n)`,
      sourceCode:
`s = input().strip()
stack = [-1]
max_len = 0
for i, c in enumerate(s):
    if c == '(':
        stack.append(i)
    else:
        stack.pop()
        if not stack:
            stack.append(i)
        else:
            max_len = max(max_len, i - stack[-1])
print(max_len)`,
    },
  ],
  "Minimum Window Substring": [
    {
      title: "Sliding Window + Hash Map",
      tags: ["Sliding Window", "Hash Table", "Python"],
      explanation:
`## Approach: Sliding Window

Maintain a window with two pointers. Expand the right pointer to include characters from \`t\`, then shrink from the left to find the minimum valid window.

### Complexity
- **Time:** O(m + n)
- **Space:** O(m + n)`,
      sourceCode:
`from collections import Counter

s = input().strip()
t = input().strip()

if not t or not s:
    print("NONE")
else:
    need = Counter(t)
    missing = len(t)
    left = 0
    best = (0, float('inf'))
    for right, c in enumerate(s):
        if need[c] > 0:
            missing -= 1
        need[c] -= 1
        while missing == 0:
            if right - left < best[1] - best[0]:
                best = (left, right)
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    if best[1] == float('inf'):
        print("NONE")
    else:
        print(s[best[0]:best[1]+1])`,
    },
  ],
};

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected.\n");

  const userSchema = new mongoose.Schema({
    username: String, email: String, password: String, avatar: String,
    userType: { type: String, default: "user" },
    isVerified: { type: Boolean, default: true },
    verifyCode: String, verifyCodeExpiry: Date,
    solvedProblems: { type: Number, default: 0 },
    skills: [String], linkdin: String, solutions: [{ type: mongoose.Schema.Types.ObjectId }],
    submissions: [{ type: mongoose.Schema.Types.ObjectId }],
    solvedQuestions: [{ type: mongoose.Schema.Types.ObjectId }],
  }, { timestamps: true });

  const solutionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    tags: [String], title: String, explanation: String, sourceCode: String,
  }, { timestamps: true });

  const problemSchema = new mongoose.Schema({
    title: String, solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
  });

  const User = mongoose.models.User || mongoose.model("User", userSchema);
  const Solution = mongoose.models.Solution || mongoose.model("Solution", solutionSchema);
  const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);

  // Get or create seed user
  let user = await User.findOne({ email: "seeduser@leetcode.com" });
  if (!user) {
    const hash = await bcrypt.hash("SeedUser123!", 10);
    user = await User.create({
      username: "seeduser", email: "seeduser@leetcode.com", password: hash,
      avatar: "/avatar.png", verifyCode: "000000",
      verifyCodeExpiry: new Date(Date.now() + 3600000),
      skills: [], solutions: [], submissions: [], solvedQuestions: [],
    });
    console.log("Created seed user.\n");
  } else {
    console.log("Using existing seed user.\n");
  }

  const problems = await Problem.find({});
  let added = 0, skipped = 0;

  for (const p of problems) {
    const baseTitle = p.title.replace(/^\d+\.\s*/, "");
    const sols = solutionsByProblem[baseTitle];
    if (!sols) { skipped++; continue; }

    for (const sol of sols) {
      const exists = await Solution.findOne({ title: sol.title, problemId: p._id });
      if (exists) {
        console.log(`  SKIP: "${sol.title}" for "${p.title}" already exists`);
        continue;
      }

      const newSol = await Solution.create({
        userId: user._id, problemId: p._id,
        title: sol.title, tags: sol.tags,
        explanation: sol.explanation, sourceCode: sol.sourceCode,
      });

      await Problem.updateOne({ _id: p._id }, { $push: { solutions: newSol._id } });
      await User.updateOne({ _id: user._id }, { $push: { solutions: newSol._id } });
      console.log(`  ADDED: "${sol.title}" for "${p.title}"`);
      added++;
    }
  }

  console.log(`\nDone! Added ${added} solutions, skipped ${skipped} problems without new solutions.`);
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
