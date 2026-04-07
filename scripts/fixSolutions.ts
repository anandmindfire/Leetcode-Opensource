/**
 * Delete all old failing solutions (problems 1-20 original batch)
 * and replace them with correct standalone stdin/stdout programs.
 */
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

// ======================== CORRECTED SOLUTIONS ========================
// All solutions read from stdin and write to stdout matching expected output format.

const solutionsByProblem: Record<string, SolutionSeed[]> = {

  // ======= 1. Two Sum =======
  // Input: "2,7,11,15\n9"  Output: "0 1"
  "Two Sum": [
    {
      title: "Hash Map - O(n) Time Solution",
      tags: ["Hash Table", "Array", "Python"],
      explanation:
`## Approach: Hash Map

We iterate through the array and for each element, check if \`target - nums[i]\` already exists in our hash map.

- If it does, we've found our pair and return the indices.
- If not, we store the current element and its index in the map.

### Complexity
- **Time:** O(n) — single pass through the array
- **Space:** O(n) — hash map storage`,
      sourceCode:
`nums = list(map(int, input().split(',')))
target = int(input())
seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        print(seen[complement], i)
        break
    seen[num] = i`,
    },
    {
      title: "Brute Force - Nested Loops",
      tags: ["Array", "C++"],
      explanation:
`## Approach: Brute Force

Check every pair of numbers to see if they sum to the target.

### Complexity
- **Time:** O(n²)
- **Space:** O(1)`,
      sourceCode:
`#include <iostream>
#include <sstream>
#include <vector>
using namespace std;
int main() {
    string line;
    getline(cin, line);
    vector<int> nums;
    stringstream ss(line);
    string token;
    while (getline(ss, token, ',')) nums.push_back(stoi(token));
    int target;
    cin >> target;
    for (int i = 0; i < (int)nums.size(); i++) {
        for (int j = i + 1; j < (int)nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                cout << i << " " << j << endl;
                return 0;
            }
        }
    }
    return 0;
}`,
    },
  ],

  // ======= 2. Valid Parentheses =======
  // Input: "()"  Output: "true"
  "Valid Parentheses": [
    {
      title: "Stack-Based Solution",
      tags: ["Stack", "String", "Java"],
      explanation:
`## Approach: Stack

Use a stack to track opening brackets. For each closing bracket, check if it matches the top of the stack.

### Complexity
- **Time:** O(n)
- **Space:** O(n)`,
      sourceCode:
`import java.util.Scanner;
import java.util.Stack;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        Stack<Character> stack = new Stack<>();
        boolean valid = true;
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) { valid = false; break; }
        }
        if (valid && !stack.isEmpty()) valid = false;
        System.out.println(valid ? "true" : "false");
    }
}`,
    },
  ],

  // ======= 4. Best Time to Buy and Sell Stock =======
  // Input: "7,1,5,3,6,4"  Output: "5"
  "Best Time to Buy and Sell Stock": [
    {
      title: "One Pass - Track Minimum Price",
      tags: ["Array", "Dynamic Programming", "Python"],
      explanation:
`## Approach: Single Pass

Keep track of the minimum price seen so far. At each step, calculate the profit if we sold today and update the max profit.

### Complexity
- **Time:** O(n)
- **Space:** O(1)`,
      sourceCode:
`prices = list(map(int, input().split(',')))
min_price = float('inf')
max_profit = 0
for price in prices:
    min_price = min(min_price, price)
    max_profit = max(max_profit, price - min_price)
print(max_profit)`,
    },
  ],

  // ======= 5. Maximum Subarray =======
  // Input: "-2,1,-3,4,-1,2,1,-5,4"  Output: "6"
  "Maximum Subarray": [
    {
      title: "Kadane's Algorithm",
      tags: ["Array", "Dynamic Programming", "JavaScript"],
      explanation:
`## Approach: Kadane's Algorithm

Maintain a running sum. If the running sum becomes negative, reset it. Track the maximum sum seen.

### Complexity
- **Time:** O(n)
- **Space:** O(1)`,
      sourceCode:
`const input = await new Response(Deno.stdin.readable).text();
const nums = input.trim().split(',').map(Number);
let maxSum = nums[0];
let currentSum = 0;
for (const num of nums) {
    currentSum = Math.max(num, currentSum + num);
    maxSum = Math.max(maxSum, currentSum);
}
console.log(maxSum);`,
    },
  ],

  // ======= 6. Longest Substring Without Repeating Characters =======
  // Input: "abcabcbb"  Output: "3"
  "Longest Substring Without Repeating Characters": [
    {
      title: "Sliding Window with HashSet",
      tags: ["Hash Table", "Sliding Window", "Python"],
      explanation:
`## Approach: Sliding Window

Use two pointers and a set to maintain a window of unique characters. Expand the right pointer and shrink from the left when a duplicate is found.

### Complexity
- **Time:** O(n)
- **Space:** O(min(n, m)) where m is the charset size`,
      sourceCode:
`s = input().strip()
char_set = set()
left = 0
max_len = 0
for right in range(len(s)):
    while s[right] in char_set:
        char_set.remove(s[left])
        left += 1
    char_set.add(s[right])
    max_len = max(max_len, right - left + 1)
print(max_len)`,
    },
  ],

  // ======= 7. Container With Most Water =======
  // Input: "1,8,6,2,5,4,8,3,7"  Output: "49"
  "Container With Most Water": [
    {
      title: "Two Pointer Approach",
      tags: ["Array", "Two Pointers", "C++"],
      explanation:
`## Approach: Two Pointers

Start with pointers at both ends. Calculate area, then move the pointer pointing to the shorter line inward.

### Complexity
- **Time:** O(n)
- **Space:** O(1)`,
      sourceCode:
`#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    string line;
    getline(cin, line);
    vector<int> height;
    stringstream ss(line);
    string token;
    while (getline(ss, token, ',')) height.push_back(stoi(token));
    int left = 0, right = (int)height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int area = min(height[left], height[right]) * (right - left);
        maxWater = max(maxWater, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    cout << maxWater << endl;
    return 0;
}`,
    },
  ],

  // ======= 8. 3Sum =======
  // Input: "-1,0,1,2,-1,-4"  Output: "-1 -1 2\n-1 0 1"
  // Input: "0,1,1"  Output: ""
  // Input: "0,0,0"  Output: "0 0 0"
  "3Sum": [
    {
      title: "Sort + Two Pointers",
      tags: ["Array", "Two Pointers", "Sorting", "Python"],
      explanation:
`## Approach: Sort + Two Pointers

Sort the array. For each element, use two pointers to find pairs that sum to the negative of that element. Skip duplicates.

### Complexity
- **Time:** O(n²)
- **Space:** O(1) ignoring output`,
      sourceCode:
`nums = list(map(int, input().split(',')))
nums.sort()
result = []
for i in range(len(nums) - 2):
    if i > 0 and nums[i] == nums[i-1]:
        continue
    left, right = i + 1, len(nums) - 1
    while left < right:
        total = nums[i] + nums[left] + nums[right]
        if total < 0:
            left += 1
        elif total > 0:
            right -= 1
        else:
            result.append([nums[i], nums[left], nums[right]])
            while left < right and nums[left] == nums[left+1]: left += 1
            while left < right and nums[right] == nums[right-1]: right -= 1
            left += 1
            right -= 1
for triplet in result:
    print(' '.join(map(str, triplet)))`,
    },
  ],

  // ======= 12. Climbing Stairs =======
  // Input: "2"  Output: "2"
  "Climbing Stairs": [
    {
      title: "Dynamic Programming - Fibonacci Pattern",
      tags: ["Dynamic Programming", "Math", "Java"],
      explanation:
`## Approach: DP (Fibonacci)

The number of ways to reach step n is the sum of ways to reach step n-1 and step n-2. This is the Fibonacci sequence.

### Complexity
- **Time:** O(n)
- **Space:** O(1)`,
      sourceCode:
`import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        if (n <= 2) { System.out.println(n); return; }
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        System.out.println(prev1);
    }
}`,
    },
  ],

  // ======= 13. Coin Change =======
  // Input: "1,2,5\n11"  Output: "3"
  "Coin Change": [
    {
      title: "Bottom-Up DP",
      tags: ["Dynamic Programming", "Array", "Python"],
      explanation:
`## Approach: Bottom-Up DP

Create a dp array where dp[i] = fewest coins to make amount i. For each amount, try all coins and take the minimum.

### Complexity
- **Time:** O(amount × coins.length)
- **Space:** O(amount)`,
      sourceCode:
`coins = list(map(int, input().split(',')))
amount = int(input())
dp = [float('inf')] * (amount + 1)
dp[0] = 0
for i in range(1, amount + 1):
    for coin in coins:
        if coin <= i:
            dp[i] = min(dp[i], dp[i - coin] + 1)
print(dp[amount] if dp[amount] != float('inf') else -1)`,
    },
  ],

  // ======= 14. Product of Array Except Self =======
  // Input: "1,2,3,4"  Output: "24 12 8 6"
  "Product of Array Except Self": [
    {
      title: "Prefix and Suffix Products",
      tags: ["Array", "Prefix Sum", "JavaScript"],
      explanation:
`## Approach: Prefix & Suffix

First pass: compute prefix products. Second pass: multiply by suffix products from right to left.

### Complexity
- **Time:** O(n)
- **Space:** O(1) (output array not counted)`,
      sourceCode:
`const input = await new Response(Deno.stdin.readable).text();
const nums = input.trim().split(',').map(Number);
const n = nums.length;
const answer = new Array(n).fill(1);
let prefix = 1;
for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
}
let suffix = 1;
for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
}
console.log(answer.join(' '));`,
    },
  ],

  // ======= 16. Search in Rotated Sorted Array =======
  // Input: "4,5,6,7,0,1,2\n0"  Output: "4"
  "Search in Rotated Sorted Array": [
    {
      title: "Modified Binary Search",
      tags: ["Array", "Binary Search", "Java"],
      explanation:
`## Approach: Modified Binary Search

Determine which half is sorted, then check if target lies in that half to decide search direction.

### Complexity
- **Time:** O(log n)
- **Space:** O(1)`,
      sourceCode:
`import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().trim().split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int target = Integer.parseInt(sc.nextLine().trim());
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) { System.out.println(mid); return; }
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        System.out.println(-1);
    }
}`,
    },
  ],

  // ======= 17. Number of Islands =======
  // Input: "11110\n11010\n11000\n00000"  Output: "1"
  "Number of Islands": [
    {
      title: "DFS Flood Fill",
      tags: ["DFS", "Matrix", "Python"],
      explanation:
`## Approach: DFS

Iterate through each cell. When we find a '1', increment count and use DFS to mark all connected land cells as visited.

### Complexity
- **Time:** O(m × n)
- **Space:** O(m × n) recursion stack in worst case`,
      sourceCode:
`import sys
sys.setrecursionlimit(10000)
lines = sys.stdin.read().strip().split('\\n')
grid = [list(line) for line in lines]
if not grid:
    print(0)
else:
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    print(count)`,
    },
  ],

  // ======= 18. Merge Intervals =======
  // Input: "1,3\n2,6\n8,10\n15,18"  Output: "1 6\n8 10\n15 18"
  "Merge Intervals": [
    {
      title: "Sort and Merge",
      tags: ["Array", "Sorting", "C++"],
      explanation:
`## Approach: Sort + Merge

Sort intervals by start time. Iterate and merge overlapping intervals.

### Complexity
- **Time:** O(n log n) for sorting
- **Space:** O(n)`,
      sourceCode:
`#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<pair<int,int>> intervals;
    string line;
    while (getline(cin, line)) {
        if (line.empty()) continue;
        stringstream ss(line);
        string a, b;
        getline(ss, a, ',');
        getline(ss, b, ',');
        intervals.push_back({stoi(a), stoi(b)});
    }
    sort(intervals.begin(), intervals.end());
    vector<pair<int,int>> merged;
    for (auto& iv : intervals) {
        if (merged.empty() || merged.back().second < iv.first) {
            merged.push_back(iv);
        } else {
            merged.back().second = max(merged.back().second, iv.second);
        }
    }
    for (auto& m : merged) {
        cout << m.first << " " << m.second << "\\n";
    }
    return 0;
}`,
    },
  ],

  // ======= 20. Trapping Rain Water =======
  // Input: "0,1,0,2,1,0,1,3,2,1,2,1"  Output: "6"
  "Trapping Rain Water": [
    {
      title: "Two Pointer Approach",
      tags: ["Array", "Two Pointers", "Dynamic Programming", "Python"],
      explanation:
`## Approach: Two Pointers

Use left and right pointers with tracked max heights. Water at any position = min(leftMax, rightMax) - height[i].

### Complexity
- **Time:** O(n)
- **Space:** O(1)`,
      sourceCode:
`height = list(map(int, input().split(',')))
left, right = 0, len(height) - 1
left_max = right_max = water = 0
while left < right:
    if height[left] < height[right]:
        if height[left] >= left_max:
            left_max = height[left]
        else:
            water += left_max - height[left]
        left += 1
    else:
        if height[right] >= right_max:
            right_max = height[right]
        else:
            water += right_max - height[right]
        right -= 1
print(water)`,
    },
  ],
};

async function main() {
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
    title: String,
    solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
  });

  const User = mongoose.models.User || mongoose.model("User", userSchema);
  const Solution = mongoose.models.Solution || mongoose.model("Solution", solutionSchema);
  const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);

  // Get seed user
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
  let deleted = 0, added = 0;

  // Only touch problems that have corrected solutions
  const targetTitles = Object.keys(solutionsByProblem);

  for (const p of problems) {
    const baseTitle = p.title.replace(/^\d+\.\s*/, "");
    if (!targetTitles.includes(baseTitle)) continue;

    // Delete existing solutions for this problem (from seed user)
    const existingSols = await Solution.find({ problemId: p._id, userId: user._id });
    for (const sol of existingSols) {
      await Solution.deleteOne({ _id: sol._id });
      await Problem.updateOne({ _id: p._id }, { $pull: { solutions: sol._id } });
      await User.updateOne({ _id: user._id }, { $pull: { solutions: sol._id } });
      console.log(`  DELETED: "${sol.title}" from "${p.title}"`);
      deleted++;
    }

    // Add corrected solutions
    const newSols = solutionsByProblem[baseTitle];
    for (const sol of newSols) {
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

  console.log(`\nDone! Deleted ${deleted} old solutions, added ${added} corrected solutions.`);
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
