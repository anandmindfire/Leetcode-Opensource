import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Parse env.text (KEY = VALUE format)
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

interface SolutionSeed {
  title: string;
  tags: string[];
  explanation: string;
  sourceCode: string;
}

// Solutions mapped by problem title (without the index prefix)
const solutionsByProblem: Record<string, SolutionSeed[]> = {
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
`class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
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
`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target)
                    return {i, j};
            }
        }
        return {};
    }
};`,
    },
  ],
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
`class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    },
  ],
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
`class Solution:
    def maxProfit(self, prices):
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
    },
  ],
  "Maximum Subarray": [
    {
      title: "Kadane's Algorithm",
      tags: ["Array", "Dynamic Programming", "JavaScript"],
      explanation:
`## Approach: Kadane's Algorithm

Maintain a running sum. If the running sum becomes negative, reset it to 0. Track the maximum sum seen.

### Complexity
- **Time:** O(n)
- **Space:** O(1)`,
      sourceCode:
`var maxSubArray = function(nums) {
    let maxSum = nums[0];
    let currentSum = 0;
    for (const num of nums) {
        currentSum = Math.max(num, currentSum + num);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
};`,
    },
  ],
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
`class Solution:
    def lengthOfLongestSubstring(self, s):
        char_set = set()
        left = 0
        max_len = 0
        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            max_len = max(max_len, right - left + 1)
        return max_len`,
    },
  ],
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
`class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxWater = 0;
        while (left < right) {
            int area = min(height[left], height[right]) * (right - left);
            maxWater = max(maxWater, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
};`,
    },
  ],
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
`class Solution:
    def threeSum(self, nums):
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
        return result`,
    },
  ],
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
`class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
    },
  ],
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
`class Solution:
    def coinChange(self, coins, amount):
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`,
    },
  ],
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
`var productExceptSelf = function(nums) {
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
    return answer;
};`,
    },
  ],
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
`class Solution:
    def numIslands(self, grid):
        if not grid: return 0
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
        return count`,
    },
  ],
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
`class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        for (auto& interval : intervals) {
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }
        return merged;
    }
};`,
    },
  ],
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
`class Solution:
    def trap(self, height):
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
        return water`,
    },
  ],
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
`class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`,
    },
  ],
};

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected successfully.\n");

  // Define schemas inline to avoid import issues
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

  const User =
    mongoose.models.User ||
    mongoose.model(
      "User",
      new mongoose.Schema(
        {
          username: { type: String, required: true, trim: true },
          email: { type: String, required: true, unique: true },
          password: { type: String, required: true },
          userType: { type: String, default: "user" },
          bio: String,
          github: String,
          linkdin: String,
          university: String,
          country: String,
          avatar: { type: String, default: "" },
          verifyCode: String,
          verifyCodeExpiry: Date,
          isVerified: { type: Boolean, default: false },
          forgetPasswordExpiry: Date,
          solvedProblems: { type: Number, default: 0 },
          skills: [String],
          solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
          submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
          solvedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
        },
        { timestamps: true }
      )
    );

  const Solution =
    mongoose.models.Solution ||
    mongoose.model(
      "Solution",
      new mongoose.Schema(
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
          tags: [{ type: String, required: true }],
          title: { type: String, required: true, trim: true },
          explanation: { type: String, required: true },
          sourceCode: { type: String, required: true },
        },
        { timestamps: true }
      )
    );

  // Find or create a seed user to attach solutions to
  let seedUser = await User.findOne({ email: "seeduser@leetcode.com" });
  if (!seedUser) {
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash("SeedUser123!", 10);
    seedUser = await User.create({
      username: "LeetCoder",
      email: "seeduser@leetcode.com",
      password: hashedPassword,
      isVerified: true,
      verifyCode: "000000",
      verifyCodeExpiry: new Date(),
      avatar: "",
      solutions: [],
      submissions: [],
      solvedQuestions: [],
    });
    console.log(`Created seed user: ${seedUser.email}\n`);
  } else {
    console.log(`Using existing seed user: ${seedUser.email}\n`);
  }

  // Get all problems
  const problems = await Problem.find({});
  if (problems.length === 0) {
    console.log("No problems found. Run seedProblems.ts first.");
    await mongoose.disconnect();
    return;
  }

  let added = 0;
  let skipped = 0;

  for (const problem of problems) {
    // Extract the problem name without the index prefix (e.g. "1. Two Sum" -> "Two Sum")
    const problemName = problem.title.replace(/^\d+\.\s*/, "");
    const solutions = solutionsByProblem[problemName];

    if (!solutions) {
      console.log(`  SKIP: No solutions defined for "${problem.title}"`);
      skipped++;
      continue;
    }

    for (const sol of solutions) {
      // Check if this solution already exists
      const exists = await Solution.findOne({
        problemId: problem._id,
        title: sol.title,
      });

      if (exists) {
        console.log(`  SKIP: "${sol.title}" for "${problem.title}" already exists`);
        skipped++;
        continue;
      }

      const newSolution = await Solution.create({
        userId: seedUser._id,
        problemId: problem._id,
        tags: sol.tags,
        title: sol.title,
        explanation: sol.explanation,
        sourceCode: sol.sourceCode,
      });

      // Link solution to user and problem
      seedUser.solutions.push(newSolution._id);
      problem.solutions.push(newSolution._id);

      console.log(`  ADDED: "${sol.title}" for "${problem.title}"`);
      added++;
    }

    await problem.save();
  }

  await seedUser.save();

  console.log(`\nDone! Added ${added} solutions, skipped ${skipped}.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
