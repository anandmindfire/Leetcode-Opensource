import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Parse env.text (KEY = VALUE format)
const envPath = path.resolve(__dirname, "../env.text");
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

interface ITestCase {
  input: string;
  output: string;
}

interface IProblemSeed {
  title: string;
  level: string;
  description: string;
  examples: string;
  constraints: string;
  testCases: ITestCase[];
  topics: string;
  companies: string;
  like: number;
  dislike: number;
}

const problems: IProblemSeed[] = [
  {
    title: "Two Sum",
    level: "Easy",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples:
      'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n---\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n---\nInput: nums = [3,3], target = 6\nOutput: [0,1]',
    constraints:
      "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    topics: "Array,Hash Table",
    companies: "Google,Amazon,Microsoft,Apple,Facebook",
    like: 1842,
    dislike: 87,
  },
  {
    title: "Valid Parentheses",
    level: "Easy",
    description:
      "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples:
      'Input: s = "()"\nOutput: true\n---\nInput: s = "()[]{}"\nOutput: true\n---\nInput: s = "(]"\nOutput: false',
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    testCases: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    topics: "String,Stack",
    companies: "Amazon,Google,Facebook,Bloomberg",
    like: 1523,
    dislike: 65,
  },
  {
    title: "Merge Two Sorted Lists",
    level: "Easy",
    description:
      "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    examples:
      "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n---\nInput: list1 = [], list2 = []\nOutput: []\n---\nInput: list1 = [], list2 = [0]\nOutput: [0]",
    constraints:
      "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
    testCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    topics: "Linked List,Recursion",
    companies: "Amazon,Microsoft,Apple",
    like: 1345,
    dislike: 54,
  },
  {
    title: "Best Time to Buy and Sell Stock",
    level: "Easy",
    description:
      "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
    examples:
      "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n---\nInput: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: In this case, no transactions are done and the max profit = 0.",
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    topics: "Array,Dynamic Programming",
    companies: "Amazon,Facebook,Microsoft,Goldman Sachs",
    like: 2103,
    dislike: 92,
  },
  {
    title: "Maximum Subarray",
    level: "Medium",
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.",
    examples:
      "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n---\nInput: nums = [1]\nOutput: 1\nExplanation: The subarray [1] has the largest sum 1.\n---\nInput: nums = [5,4,-1,7,8]\nOutput: 23\nExplanation: The subarray [5,4,-1,7,8] has the largest sum 23.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    topics: "Array,Divide and Conquer,Dynamic Programming",
    companies: "Amazon,Microsoft,Apple,LinkedIn",
    like: 1765,
    dislike: 73,
  },
  {
    title: "Longest Substring Without Repeating Characters",
    level: "Medium",
    description:
      "Given a string `s`, find the length of the **longest substring** without repeating characters.",
    examples:
      'Input: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.\n---\nInput: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.\n---\nInput: s = "pwwkew"\nOutput: 3\nExplanation: The answer is "wke", with the length of 3.',
    constraints:
      "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    testCases: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" },
    ],
    topics: "Hash Table,String,Sliding Window",
    companies: "Amazon,Google,Bloomberg,Facebook,Microsoft",
    like: 2210,
    dislike: 110,
  },
  {
    title: "Container With Most Water",
    level: "Medium",
    description:
      "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\n**Notice** that you may not slant the container.",
    examples:
      "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.\n---\nInput: height = [1,1]\nOutput: 1",
    constraints:
      "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    topics: "Array,Two Pointers,Greedy",
    companies: "Amazon,Google,Facebook,Goldman Sachs",
    like: 1598,
    dislike: 88,
  },
  {
    title: "3Sum",
    level: "Medium",
    description:
      "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    examples:
      "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\nExplanation: nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2].\n---\nInput: nums = [0,1,1]\nOutput: []\nExplanation: The only possible triplet does not sum up to 0.\n---\nInput: nums = [0,0,0]\nOutput: [[0,0,0]]",
    constraints:
      "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    topics: "Array,Two Pointers,Sorting",
    companies: "Amazon,Facebook,Microsoft,Bloomberg",
    like: 1890,
    dislike: 95,
  },
  {
    title: "Group Anagrams",
    level: "Medium",
    description:
      'Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples:
      'Input: strs = ["eat","tea","tan","ate","nat","bat"]\nOutput: [["bat"],["nat","tan"],["ate","eat","tea"]]\n---\nInput: strs = [""]\nOutput: [[""]]\n---\nInput: strs = ["a"]\nOutput: [["a"]]',
    constraints:
      "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
    testCases: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    topics: "Array,Hash Table,String,Sorting",
    companies: "Amazon,Google,Facebook,Goldman Sachs",
    like: 1432,
    dislike: 62,
  },
  {
    title: "Binary Tree Level Order Traversal",
    level: "Medium",
    description:
      "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    examples:
      "Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n---\nInput: root = [1]\nOutput: [[1]]\n---\nInput: root = []\nOutput: []",
    constraints:
      "The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000",
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
      { input: "root = []", output: "[]" },
    ],
    topics: "Tree,Breadth-First Search,Binary Tree",
    companies: "Amazon,Microsoft,Facebook,Bloomberg",
    like: 1298,
    dislike: 45,
  },
  {
    title: "Validate Binary Search Tree",
    level: "Medium",
    description:
      "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA **valid BST** is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node's key.\n- The right subtree of a node contains only nodes with keys **greater than** the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    examples:
      "Input: root = [2,1,3]\nOutput: true\n---\nInput: root = [5,1,4,null,null,3,6]\nOutput: false\nExplanation: The root node's value is 5 but its right child's value is 4.",
    constraints:
      "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
    testCases: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" },
    ],
    topics: "Tree,Depth-First Search,Binary Search Tree,Binary Tree",
    companies: "Amazon,Facebook,Microsoft,Bloomberg",
    like: 1156,
    dislike: 52,
  },
  {
    title: "Climbing Stairs",
    level: "Easy",
    description:
      "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    examples:
      "Input: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n---\nInput: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    constraints: "1 <= n <= 45",
    testCases: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" },
      { input: "n = 5", output: "8" },
    ],
    topics: "Math,Dynamic Programming,Memoization",
    companies: "Amazon,Google,Apple",
    like: 1678,
    dislike: 44,
  },
  {
    title: "Coin Change",
    level: "Medium",
    description:
      "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    examples:
      "Input: coins = [1,2,5], amount = 11\nOutput: 3\nExplanation: 11 = 5 + 5 + 1\n---\nInput: coins = [2], amount = 3\nOutput: -1\n---\nInput: coins = [1], amount = 0\nOutput: 0",
    constraints:
      "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    testCases: [
      { input: "coins = [1,2,5], amount = 11", output: "3" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1], amount = 0", output: "0" },
    ],
    topics: "Array,Dynamic Programming,Breadth-First Search",
    companies: "Amazon,Google,Microsoft,Apple",
    like: 1534,
    dislike: 67,
  },
  {
    title: "Product of Array Except Self",
    level: "Medium",
    description:
      "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
    examples:
      "Input: nums = [1,2,3,4]\nOutput: [24,12,8,6]\n---\nInput: nums = [-1,1,0,-3,3]\nOutput: [0,0,9,0,0]",
    constraints:
      "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    testCases: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    topics: "Array,Prefix Sum",
    companies: "Amazon,Facebook,Microsoft,Apple",
    like: 1423,
    dislike: 55,
  },
  {
    title: "Linked List Cycle",
    level: "Easy",
    description:
      "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.",
    examples:
      "Input: head = [3,2,0,-4], pos = 1\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n---\nInput: head = [1,2], pos = 0\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 0th node.\n---\nInput: head = [1], pos = -1\nOutput: false\nExplanation: There is no cycle in the linked list.",
    constraints:
      "The number of the nodes in the list is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5\npos is -1 or a valid index in the linked-list.",
    testCases: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true" },
      { input: "head = [1,2], pos = 0", output: "true" },
      { input: "head = [1], pos = -1", output: "false" },
    ],
    topics: "Hash Table,Linked List,Two Pointers",
    companies: "Amazon,Microsoft,Bloomberg",
    like: 1267,
    dislike: 38,
  },
  {
    title: "Search in Rotated Sorted Array",
    level: "Medium",
    description:
      "There is an integer array `nums` sorted in ascending order (with **distinct** values).\n\nPrior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed).\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    examples:
      "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\n---\nInput: nums = [4,5,6,7,0,1,2], target = 3\nOutput: -1\n---\nInput: nums = [1], target = 0\nOutput: -1",
    constraints:
      "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
    testCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
      { input: "nums = [1], target = 0", output: "-1" },
    ],
    topics: "Array,Binary Search",
    companies: "Amazon,Google,Facebook,Microsoft,Bloomberg",
    like: 1678,
    dislike: 78,
  },
  {
    title: "Number of Islands",
    level: "Medium",
    description:
      "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    examples:
      'Input: grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]\nOutput: 1\n---\nInput: grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]\nOutput: 3',
    constraints:
      "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
    testCases: [
      {
        input:
          'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
      },
      {
        input:
          'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
      },
    ],
    topics: "Array,Depth-First Search,Breadth-First Search,Union Find,Matrix",
    companies: "Amazon,Google,Microsoft,Facebook,Bloomberg",
    like: 1789,
    dislike: 69,
  },
  {
    title: "Merge Intervals",
    level: "Medium",
    description:
      "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples:
      "Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\nExplanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].\n---\nInput: intervals = [[1,4],[4,5]]\nOutput: [[1,5]]\nExplanation: Intervals [1,4] and [4,5] are considered overlapping.",
    constraints:
      "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= start_i <= end_i <= 10^4",
    testCases: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
      },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    topics: "Array,Sorting",
    companies: "Amazon,Google,Facebook,Microsoft,Bloomberg",
    like: 1567,
    dislike: 72,
  },
  {
    title: "Word Search",
    level: "Medium",
    description:
      'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
    examples:
      'Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"\nOutput: true\n---\nInput: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"\nOutput: true\n---\nInput: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"\nOutput: false',
    constraints:
      "m == board.length\nn = board[i].length\n1 <= m, n <= 6\n1 <= word.length <= 15\nboard and word consists of only lowercase and uppercase English letters.",
    testCases: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
      },
    ],
    topics: "Array,Backtracking,Matrix",
    companies: "Amazon,Microsoft,Bloomberg",
    like: 1345,
    dislike: 58,
  },
  {
    title: "Trapping Rain Water",
    level: "Hard",
    description:
      "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    examples:
      "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n---\nInput: height = [4,2,0,3,2,5]\nOutput: 9",
    constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    topics: "Array,Two Pointers,Dynamic Programming,Stack,Monotonic Stack",
    companies: "Amazon,Google,Facebook,Microsoft,Goldman Sachs,Bloomberg",
    like: 2345,
    dislike: 115,
  },
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
      "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n### Input format\n\n- Each line contains a comma-separated sorted list. Empty line for empty list.\n\n```\n1,4,5\n1,3,4\n2,6\n```\n\n### Output format\n\n- A single line of space-separated merged values.\n\n```\n1 1 2 3 4 4 5 6\n```\n\n",
    examples:
      "#### Example 1\n- **Input:**\n```\nlists = [[1,4,5],[1,3,4],[2,6]]\n```\n- **Output:**\n```\n[1,1,2,3,4,4,5,6]\n```\n- **Explanation:** Merging all sorted lists produces [1,1,2,3,4,4,5,6].\n\n<br>\n\n#### Example 2\n- **Input:**\n```\nlists = []\n```\n- **Output:**\n```\n[]\n```\n\n<br>\n\n#### Example 3\n- **Input:**\n```\nlists = [[]]\n```\n- **Output:**\n```\n[]\n```\n\n<br>\n\n",
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
      '#### Example 1\n- **Input:**\n```\ns = "(()"\n```\n- **Output:**\n```\n2\n```\n- **Explanation:** The longest valid parentheses substring is "()".\n\n<br>\n\n#### Example 2\n- **Input:**\n```\ns = ")()())"\n```\n- **Output:**\n```\n4\n```\n- **Explanation:** The longest valid parentheses substring is "()()".\n\n<br>\n\n#### Example 3\n- **Input:**\n```\ns = ""\n```\n- **Output:**\n```\n0\n```\n\n<br>\n\n',
    constraints:
      "#### Constraints\n\n- `0 <= s.length <= 3 * 10^4`\n- `s[i]` is `'('`, or `')'`.\n\n<br>\n",
    testCases: [
      { input: "(()", output: "2" },
      { input: ")()())", output: "4" },
      { input: "", output: "0" },
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
      "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.\n\nThe testcases will be generated such that the answer is **unique**.\n\n### Input format\n\n- The first line contains string `s`.\n- The second line contains string `t`.\n\n```\nADOBECODEBANC\nABC\n```\n\n### Output format\n\n- The minimum window substring, or empty line if none.\n\n```\nBANC\n```\n\n",
    examples:
      '#### Example 1\n- **Input:**\n```\ns = "ADOBECODEBANC", t = "ABC"\n```\n- **Output:**\n```\n"BANC"\n```\n- **Explanation:** The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.\n\n<br>\n\n#### Example 2\n- **Input:**\n```\ns = "a", t = "a"\n```\n- **Output:**\n```\n"a"\n```\n- **Explanation:** The entire string s is the minimum window.\n\n<br>\n\n#### Example 3\n- **Input:**\n```\ns = "a", t = "aa"\n```\n- **Output:**\n```\n""\n```\n- **Explanation:** Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.\n\n<br>\n\n',
    constraints:
      "#### Constraints\n\n- `m == s.length`\n- `n == t.length`\n- `1 <= m, n <= 10^5`\n- `s` and `t` consist of uppercase and lowercase English letters.\n\n<br>\n\n#### Follow-up\nCould you find an algorithm that runs in `O(m + n)` time?\n",
    testCases: [
      { input: "ADOBECODEBANC\nABC", output: "BANC" },
      { input: "a\na", output: "a" },
      { input: "a\naa", output: "" },
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
  console.log("Connected successfully.\n");

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

  const existingCount = await Problem.countDocuments();
  console.log(`Existing problems in DB: ${existingCount}`);

  let added = 0;
  for (let i = 0; i < problems.length; i++) {
    const p = problems[i];
    const index = existingCount + added + 1;
    const titleWithIndex = `${index}. ${p.title}`;

    const exists = await Problem.findOne({ title: titleWithIndex });
    if (exists) {
      console.log(`  SKIP: "${titleWithIndex}" already exists`);
      continue;
    }

    await Problem.create({
      title: titleWithIndex,
      level: p.level,
      description: p.description,
      examples: p.examples,
      constraints: p.constraints,
      testCases: p.testCases,
      topics: p.topics,
      companies: p.companies,
      like: p.like,
      dislike: p.dislike,
      similarQuestions: [],
      solutions: [],
    });

    console.log(`  ADDED: "${titleWithIndex}" [${p.level}]`);
    added++;
  }

  console.log(`\nDone! Added ${added} new problems (total: ${existingCount + added}).`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
