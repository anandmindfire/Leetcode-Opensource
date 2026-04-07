# Contributing to LeetCode Clone

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/Leetcode-Clone.git
   cd Leetcode-Clone
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Copy `env.text` to `.env` and fill in your own values (MongoDB URI, API keys, etc.)
5. **Run the dev server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by **commitlint** and **Husky**.

Every commit message must follow this format:

```
<type>(optional scope): <description>
```

### Allowed types

| Type       | Description                                       |
| ---------- | ------------------------------------------------- |
| `feat`     | A new feature                                     |
| `fix`      | A bug fix                                         |
| `docs`     | Documentation-only changes                        |
| `style`    | Code style (formatting, missing semicolons, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvement                           |
| `test`     | Adding or updating tests                          |
| `build`    | Changes to the build system or dependencies       |
| `ci`       | CI configuration changes                          |
| `chore`    | Other changes that don't modify src or test files |
| `revert`   | Revert a previous commit                          |

### Examples

```bash
git commit -m "feat: add dark mode toggle to navbar"
git commit -m "fix: resolve empty avatar src warning"
git commit -m "docs: update API documentation"
git commit -m "refactor(auth): simplify token validation"
```

> Bad commits like `"fixed stuff"` or `"updates"` will be **rejected** by the pre-commit hook.

## Branch Naming

Use descriptive branch names:

```
feat/add-discussion-page
fix/compiler-timeout-issue
docs/update-readme
```

## Pull Request Process

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes and commit using the convention above.
3. Push to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
4. Open a **Pull Request** against the `main` branch.
5. Fill in the PR description explaining **what** you changed and **why**.
6. Wait for review — a maintainer will review and merge.

## Project Structure

```
src/
├── app/            # Next.js App Router pages & API routes
│   ├── (admin)/    # Admin pages (add/update problems)
│   ├── (app)/      # Main app pages (problems, profile, dashboard)
│   ├── (auth)/     # Auth pages (sign-in, sign-up, verify)
│   └── api/        # REST API endpoints
├── components/     # Reusable React components
├── context/        # React context providers
├── helpers/        # Utility functions
├── lib/            # Core libraries (auth, DB, compiler API)
├── models/         # Mongoose models
├── schemas/        # Zod validation schemas
└── types/          # TypeScript type definitions
```

## Code Guidelines

- **TypeScript** — all new code should be typed.
- **Formatting** — follow the existing code style; ESLint runs as a pre-commit hook.
- **No console.log** in production code — use it only for debugging.
- **Keep PRs focused** — one feature or fix per PR.

## Adding a New Problem

1. Log in as an admin (set `userType: "admin"` on your user document in MongoDB).
2. Navigate to `/add-problem`.
3. Fill in the title, description (Markdown), examples, constraints, test cases, topics, and difficulty.
4. Test cases must use **stdin/stdout format** — one value per line, comma-separated for arrays.

## Reporting Issues

- Use GitHub Issues to report bugs or request features.
- Include steps to reproduce, expected behavior, and screenshots if applicable.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
