# Bug Tracker — Leetcode Opensource

This document contains 12 known bugs across the platform. Each is described with reproduction steps, expected vs actual behavior, and the affected area. Use these to create GitHub Issues.

---

## Bug #1 — Problem Difficulty Colors Are Swapped on Problems List Page

**Type:** UI Bug  
**Severity:** Medium  
**Affected Page:** `/problems`  
**Affected File:** `src/app/(app)/problems/page.tsx`

### Description

On the problems listing page, the difficulty badge colors are swapped — **Easy** problems are displayed with a **red** badge (which should be for Hard), and **Hard** problems are displayed with a **green** badge (which should be for Easy). Medium remains yellow and is unaffected.

### Steps to Reproduce

1. Navigate to `/problems`
2. Look at the difficulty badges next to each problem title
3. Notice Easy problems show red text and Hard problems show green text

### Expected Behavior

- Easy → Green (`text-green-500`)
- Medium → Yellow (`text-yellow-400`)
- Hard → Red (`text-red-500`)

### Actual Behavior

- Easy → Red (`text-red-500`)
- Medium → Yellow (`text-yellow-400`)
- Hard → Green (`text-green-500`)

---

## Bug #2 — Code Editor Always Renders in Light Theme

**Type:** UI Bug  
**Severity:** Medium  
**Affected Page:** `/problem/[problemId]`  
**Affected File:** `src/components/ProblemPageCodeEditor.tsx`

### Description

The Monaco code editor always renders with a light theme (`vs-light`) regardless of the user's selected theme (dark/light/system). Users who prefer dark mode will see a jarring white editor background while the rest of the app is dark.

### Steps to Reproduce

1. Set the application to dark mode using the theme toggle
2. Navigate to any problem page (e.g., `/problem/<id>`)
3. Observe the code editor panel

### Expected Behavior

The editor should use `vs-dark` theme to match the application's dark mode, providing a consistent dark background in the editor.

### Actual Behavior

The editor always uses `vs-light` theme, showing a white/light background even when the app is in dark mode.

---

## Bug #3 — Navigation Links Active State Is Inverted

**Type:** UI Bug  
**Severity:** Medium  
**Affected Component:** Top navigation bar  
**Affected File:** `src/components/NavLinks.tsx`

### Description

The active/highlighted state of navigation links in the top navbar is inverted. The currently active page link appears dimmed/inactive, while all other non-active links appear fully highlighted. This makes it impossible for users to tell which page they are currently on from the nav.

### Steps to Reproduce

1. Navigate to `/problems`
2. Look at the navigation links (Problems, Discuss, Explore, Store)
3. Notice that "Problems" appears dimmed while other links appear bright/highlighted
4. Click on "Discuss" — now "Discuss" appears dimmed and "Problems" appears highlighted

### Expected Behavior

The link corresponding to the current page should be highlighted (bright/white in dark mode) and other links should be dimmed.

### Actual Behavior

The link corresponding to the current page is dimmed and all other links are highlighted — the exact opposite of expected behavior.

---

## Bug #4 — Test Case Tabs Show Zero-Based Numbering

**Type:** UI Bug  
**Severity:** Low  
**Affected Page:** `/problem/[problemId]` — Test Result panel  
**Affected File:** `src/components/ProblemPageTestResult.tsx`

### Description

After running code, the test case result tabs display zero-based numbering (Case0, Case1, Case2) instead of the expected one-based numbering (Case1, Case2, Case3). This is confusing for users who expect test cases to start from 1.

### Steps to Reproduce

1. Navigate to any problem page
2. Write some code and click "Run"
3. Wait for the results to appear in the test result panel
4. Look at the test case tabs

### Expected Behavior

Tabs should read: **Case1**, **Case2**, **Case3**

### Actual Behavior

Tabs read: **Case0**, **Case1**, **Case2**

---

## Bug #5 — Profile Page Left Sidebar Is Too Narrow / Content Overflows

**Type:** UI Bug  
**Severity:** Medium  
**Affected Page:** `/dashboard/[userId]`  
**Affected File:** `src/components/ProfilePageLeftSection.tsx`

### Description

The left sidebar on the user's dashboard/profile page is too narrow, causing user information (avatar, username, bio, community stats, skills, languages) to overflow or be severely truncated. The sidebar takes only ~12% of the viewport width instead of the intended ~20%, making text unreadable and the layout broken.

### Steps to Reproduce

1. Log in and navigate to your dashboard (`/dashboard/<userId>`)
2. Observe the left sidebar panel
3. Notice that text is truncated, avatar is squeezed, and the layout appears broken

### Expected Behavior

The left sidebar should occupy approximately 20% of the page width, with enough room to display the user's avatar, name, bio, stats, and skills properly.

### Actual Behavior

The sidebar only occupies approximately 12% of the page width, causing all content inside to overflow, wrap incorrectly, or be cut off.

---

## Bug #6 — Submission Runtime Display Shows Incorrect Value

**Type:** UI Bug / Data Display Bug  
**Severity:** Medium  
**Affected Page:** `/problem/[problemId]` — Submissions tab  
**Affected File:** `src/components/ProblemPageSubmission.tsx`

### Description

In the submissions list for a problem, the runtime value displayed for each accepted submission is incorrect. The time value (stored in seconds) is being **divided** by 1000 instead of **multiplied** by 1000 to convert to milliseconds. This results in extremely small and misleading runtime values (e.g., showing `0.00 ms` instead of `150.00 ms`).

### Steps to Reproduce

1. Navigate to any problem page
2. Click on the "Submissions" tab in the left panel
3. Look at the "Runtime" column for any accepted submission

### Expected Behavior

Runtime should display the value in milliseconds. For example, if `time = 0.15` (seconds), it should display `150.00 ms`.

### Actual Behavior

Runtime displays `0.00 ms` (or a near-zero value) because the seconds value is divided by 1000 instead of multiplied.

---

## Bug #7 — Off-by-One Error in Code Submission Causes Last Test Case to Be Silently Skipped

**Type:** Critical / Logic Bug  
**Severity:** Critical  
**Affected Endpoint:** `POST /api/code/submit-code`  
**Affected File:** `src/app/api/code/submit-code/route.ts`

### Description

The code submission API has a subtle off-by-one error in the loop that evaluates test case results. The loop iterates using `i < apiResponse.result.length - 1` instead of `i < apiResponse.result.length`, which means the **last test case is never evaluated**.

This causes multiple cascading issues:
- If a user's code fails **only** on the last test case, the submission is incorrectly marked as "Accepted"
- The average runtime and memory calculations are skewed because they exclude the last test case's metrics
- User progress data gets corrupted — problems are marked as solved even when the solution doesn't pass all test cases
- The bug is intermittent from the user's perspective: solutions that happen to fail on earlier test cases are correctly rejected, but edge-case failures on the final test case slip through

### Steps to Reproduce

1. Navigate to any problem that has 3 test cases
2. Write code that produces correct output for the first 2 test cases but fails on the 3rd
3. Click "Submit"
4. Observe the submission is marked as "Accepted" even though the last test case fails
5. The "Run Code" feature (which runs all test cases in the frontend) will correctly show the 3rd case as failed — creating confusion between Run vs Submit results

### Expected Behavior

All test cases (indices 0 through `length - 1`) should be evaluated. The loop should use `i < apiResponse.result.length`.

### Actual Behavior

The loop uses `i < apiResponse.result.length - 1`, skipping the final test case entirely. The `length - 1` looks like it could be an intentional bounds check, making it very easy to overlook during code review.

---

## Bug #8 — Insecure Direct Object Reference (IDOR) in Update User API via Fallback Pattern

**Type:** Critical / Security Vulnerability  
**Severity:** Critical  
**Affected Endpoint:** `POST /api/user/update-user`  
**Affected File:** `src/app/api/user/update-user/route.ts`

### Description

The update user API endpoint uses `body._id || token._id` to determine which user document to update. This looks like a safe "fallback" pattern — use the body field if present, otherwise fall back to the authenticated user's token. However, this is actually an **Insecure Direct Object Reference (IDOR)** vulnerability.

In normal usage, the frontend doesn't send `_id` in the request body, so the fallback to `token._id` works correctly. But a malicious authenticated user can include a `_id` field in the request body pointing to **any other user's ID**, allowing them to modify that user's profile (bio, avatar, skills, university, github, linkedin, etc.).

This bug is particularly hard to find because:
- In normal usage via the app's frontend, the bug never manifests
- The `||` fallback pattern looks intentional and defensive
- Zod schema validation (`updateUserValidation`) validates the profile fields but likely doesn't strip unknown fields like `_id`
- Unit tests that only test the happy path won't catch this

### Steps to Reproduce

1. Log in as User A
2. Open browser dev tools or use curl
3. Send a POST request to `/api/user/update-user` with:
   ```json
   {
     "_id": "<User B's MongoDB ObjectId>",
     "bio": "Profile hijacked"
   }
   ```
4. Check User B's profile — their bio is now "Profile hijacked"
5. Normal profile updates for User A still work correctly (since `body._id` is absent, it falls back to `token._id`)

### Expected Behavior

The API should always use the authenticated user's ID from the JWT token (`token._id`). The user-supplied request body should never influence which document gets updated.

### Actual Behavior

The `body._id || token._id` pattern allows any authenticated user to update any other user's profile by including a `_id` field in the request body.

---

## Bug #9 — Database Connection Fails Silently Due to Environment Variable Typo

**Type:** Critical / Configuration Bug  
**Severity:** Critical  
**Affected Module:** Database connection utility  
**Affected File:** `src/lib/dbConnect.ts`

### Description

The database connection utility references `process.env.MONGODB_URL` instead of the correct `process.env.MONGODB_URI`. Since the `.env` file defines `MONGODB_URI` (not `MONGODB_URL`), the environment variable lookup returns `undefined`, which falls back to the empty string `''`.

This causes `mongoose.connect('')` to be called, which throws a connection error. On the first request the app calls `process.exit(1)` and crashes. On subsequent restarts, the same crash repeats.

This bug is extremely hard to diagnose because:
- `MONGODB_URL` looks perfectly valid — it's a common env var name used by many platforms (Heroku, Railway, etc.)
- The error message from Mongoose says "connection failed" with no mention of the variable name
- Developers will check their `.env` file, verify the MongoDB server is running, check network/firewall settings, and test the connection string manually — all of which will work fine
- The actual issue is a single character difference: `URL` vs `URI` in the code, not in the configuration
- The connection caching check (`if(connection.isConnected)`) means the bug won't manifest if you somehow get a successful connection first

### Steps to Reproduce

1. Ensure `.env` file has `MONGODB_URI=mongodb+srv://...` (the standard variable name)
2. Start the application
3. Make any API request that calls `connectToDb()`
4. Observe the server crashes with a database connection error
5. Check `.env` — the connection string is correct
6. Check MongoDB server — it's running fine
7. The actual issue: the code reads `MONGODB_URL` but the env var is named `MONGODB_URI`

### Expected Behavior

The code should read `process.env.MONGODB_URI` to match the environment variable defined in `.env`.

### Actual Behavior

The code reads `process.env.MONGODB_URL` which is `undefined`, causing the connection to fail with an empty string.

---

## Bug #10 — Operator Precedence Bug in Middleware Causes Authenticated Users to Be Redirected

**Type:** Critical / Security & Logic Bug  
**Severity:** Critical  
**Affected Routes:** Multiple protected routes  
**Affected File:** `src/middleware.ts`

### Description

The middleware's protected route check has a critical **operator precedence bug**. The condition is missing parentheses around the OR-chained pathname checks, causing JavaScript's operator precedence to evaluate the expression incorrectly.

The current code:
```js
if (!token && url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/add-problem") || url.pathname.startsWith("/update-problem") || ...)
```

JavaScript evaluates `&&` before `||`, so this becomes:
```js
if ((!token && url.pathname.startsWith("/dashboard")) || url.pathname.startsWith("/add-problem") || url.pathname.startsWith("/update-problem") || ...)
```

This means:
- `/dashboard` is correctly protected — only redirects if `!token` (unauthenticated)
- **ALL other routes** (`/add-problem`, `/update-problem`, `/add-solution`, `/profile`, `/all-submissions`, `/submission`) redirect to `/sign-in` **regardless of authentication status**
- Even logged-in admin users cannot access `/add-problem` or `/update-problem` — they get stuck in an infinite redirect loop
- Authenticated users cannot view their profile, submissions, or add solutions

This bug is very hard to diagnose because:
- The `/dashboard` route works perfectly fine, creating a false sense of correctness
- The redirect happens at the middleware level, so no component code runs — React DevTools shows nothing
- The browser shows a redirect loop or keeps bouncing to `/sign-in`
- Developers will suspect session/token issues, check auth configuration, clear cookies, etc.
- The actual fix is simply adding parentheses: `if (!token && (url.pathname.startsWith("/dashboard") || ...))`

### Steps to Reproduce

1. Log in as an admin user
2. Navigate to `/add-problem`
3. Observe you are redirected to `/sign-in` even though you are authenticated
4. Log in again — you're redirected back to dashboard, then try `/add-problem` again — same redirect
5. Try `/profile/<userId>` — same issue
6. Only `/dashboard/<userId>` works correctly

### Expected Behavior

The `!token` check should apply to ALL the paths in the condition. The paths should be wrapped in parentheses: `if (!token && (path1 || path2 || path3 || ...))`. All authenticated users should be able to access protected routes.

### Actual Behavior

Due to missing parentheses, `!token` only applies to the first path (`/dashboard`). All other paths unconditionally redirect to `/sign-in`, even for authenticated users.

---

## Bug #11 — Authentication Always Fails — bcrypt Compares Email Instead of Password

**Type:** Critical / Security & Authentication Bug  
**Severity:** Critical  
**Affected Flow:** User login / sign-in  
**Affected File:** `src/lib/authOptions.ts`

### Description

The authentication flow has a subtle but devastating bug: `bcrypt.compare()` is called with `credentials.email` instead of `credentials.password` as the first argument. This means the system compares the user's **email address** against the stored password hash, which will always return `false` (since an email string will never match a bcrypt hash of the password).

As a result, **no user can ever log in** — every login attempt fails with "Incorrect Password" regardless of whether the password is correct.

This bug is extremely difficult to diagnose because:
- The error message says "Incorrect Password" — developers will focus on password-related issues
- Checking the database shows the password hash looks correct
- Manually hashing and comparing the password works fine outside the app
- The `.email` vs `.password` difference is a single word change on a long line of code
- Developers will suspect bcrypt version incompatibility, hashing rounds mismatch, encoding issues, or database corruption before spotting the wrong property name
- The surrounding code structure (variable name `isPasswordCorrect`, the error message, the `if/else` flow) all look perfectly correct

### Steps to Reproduce

1. Register a new user account and verify it
2. Navigate to `/sign-in`
3. Enter the correct email and correct password
4. Observe that login fails with "Incorrect Password"
5. Try with any other password — also fails with "Incorrect Password"
6. Check the database — user exists, password hash is present and correct
7. Test `bcrypt.compare("correct-password", storedHash)` manually — returns `true`
8. The actual issue: code passes `credentials.email` not `credentials.password` to `bcrypt.compare()`

### Expected Behavior

`bcrypt.compare(credentials.password, user.password)` should be used to compare the user-supplied password against the stored hash.

### Actual Behavior

`bcrypt.compare(credentials.email, user.password)` is used, comparing the email address against the password hash, which always returns `false`.

---

## Bug #12 — Code Run API Blocks Authenticated Users and Allows Unauthenticated Access

**Type:** Critical / Security Bug  
**Severity:** Critical  
**Affected Endpoint:** `POST /api/code/run-code`  
**Affected File:** `src/app/api/code/run-code/route.ts`

### Description

The code run API endpoint has an inverted authentication check: `if (token)` instead of `if (!token)`. This means:
- **Authenticated users** (who have a valid JWT token) receive a 400 "Unauthorized" response and **cannot run code**
- **Unauthenticated users** (no token) bypass the check and **can run code freely**

This creates a confusing situation where:
- Logged-in users click "Run" on the problem page and get an "Unauthorized" error, despite being logged in
- The submit endpoint works fine (it has its own separate auth check), so users can submit but not run code
- Developers will check the frontend code, session state, token refresh logic, and API request headers — all of which look correct
- The actual issue is a single missing `!` character in the auth guard condition
- Unauthenticated users/bots can also abuse the endpoint to execute arbitrary code, consuming compiler API resources

### Steps to Reproduce

1. Log in to the application
2. Navigate to any problem page
3. Write some code and click "Run"
4. Observe the toast error: "Unauthorized"
5. Open Network tab — the `/api/code/run-code` request returns a 400 status
6. Log out and send the same request via curl without cookies — it succeeds
7. Check the auth guard: `if (token)` should be `if (!token)`

### Expected Behavior

The endpoint should check `if (!token)` — block unauthenticated users and allow authenticated users to run code.

### Actual Behavior

The endpoint checks `if (token)` — blocks authenticated users and allows unauthenticated users to run code.

---

## Summary Table

| # | Title | Type | Severity | File |
|---|-------|------|----------|------|
| 1 | Problem Difficulty Colors Swapped | UI | Medium | `src/app/(app)/problems/page.tsx` |
| 2 | Code Editor Always Light Theme | UI | Medium | `src/components/ProblemPageCodeEditor.tsx` |
| 3 | Nav Links Active State Inverted | UI | Medium | `src/components/NavLinks.tsx` |
| 4 | Test Case Tabs Zero-Based Numbering | UI | Low | `src/components/ProblemPageTestResult.tsx` |
| 5 | Profile Sidebar Too Narrow | UI | Medium | `src/components/ProfilePageLeftSection.tsx` |
| 6 | Submission Runtime Incorrect Value | UI / Data | Medium | `src/components/ProblemPageSubmission.tsx` |
| 7 | Off-by-One: Last Test Case Skipped on Submit | Critical | Critical | `src/app/api/code/submit-code/route.ts` |
| 8 | IDOR via Fallback Pattern in Update User | Critical / Security | Critical | `src/app/api/user/update-user/route.ts` |
| 9 | DB Connect Env Var Typo (MONGODB_URL vs URI) | Critical / Config | Critical | `src/lib/dbConnect.ts` |
| 10 | Operator Precedence Bug in Middleware Auth | Critical / Security | Critical | `src/middleware.ts` |
| 11 | bcrypt Compares Email Instead of Password | Critical / Auth | Critical | `src/lib/authOptions.ts` |
| 12 | Inverted Auth Check Blocks Logged-in Users | Critical / Security | Critical | `src/app/api/code/run-code/route.ts` |
