# Leetcode Opensource – Competitive Programming Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview
This Leetcode Opensource is a high-performance platform designed for developers to practice coding problems, execute code in real-time, and share detailed solutions. By integrating the Monaco Editor (the engine behind VS Code) and [OnlineCompiler API](https://onlinecompiler.io/docs), it provides a production-grade environment for mastering Data Structures and Algorithms.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multi-Language Execution:** Support for **C, C++, Python, JavaScript, and Java** using a secure remote execution engine.
- **Advanced Code Editor:** Integrated **Monaco-React Editor** providing a VS Code-like experience with syntax highlighting and indentation.
- **Real-Time Code Running:** Leverage **[OnlineCompiler API](https://onlinecompiler.io/docs)** to run code against test cases and receive instant feedback on performance and errors.
- **Solution Sharing:** A dedicated space for users to write and share their logic using **React-MD Editor** for beautiful Markdown formatting.
- **AI Leet Bot:** A built-in chat assistant to help users brainstorm algorithms, explain time complexity, or debug code logic.
- **Progress Tracking:** Personalized dashboard displaying the total count of solved problems and a comprehensive history of all user submissions.
- **Secure Authentication:** Robust sign-up flow with **email verification** via **Resend Mail** and schema validation using **Zod**.

## Technologies Used

- **Next.js:** Full-stack React framework for optimized routing and server-side rendering.
- **Tailwind CSS:** For a sleek, responsive, and developer-centric UI/UX.
- **MongoDB:** Database for managing users, coding problems, and shared solutions.
- **TypeScript:** Ensuring end-to-end type safety and better developer experience.
- **[OnlineCompiler API](https://onlinecompiler.io/docs):** External API for compiling and executing code in a sandboxed environment.
- **Monaco-React:** The industry-standard web code editor.
- **React-MD Editor:** A powerful Markdown editor for community solution posts.
- **Resend:** Professional email API for handling account verification.
- **React Hook Form & Zod:** For efficient form management and strict data validation.

## Project Setup

### Getting Started

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**
```bash
 https://github.com/anandmindfire/Leetcode-Opensource.git
```
2. **Add all the .env variables**
- Make sure to update the values (like API keys, Mongo URI, etc.) inside both .env files according to .env.txt file local setup or environment.
3. **Install Dependencies**
```bash
npm install
```
4. **Run the Development Server**
```bash
npm run dev
```
The application will be accessible at http://localhost:3000.

## API Documentation
 For API documentation [**click here**](https://github.com/anandmindfire/Leetcode-Opensource/tree/main/src/app/api)

## Usage

### For Users:

1. **Account Verification:** Sign up and verify your email through the link sent by **Resend**.
2. **Solve Problems:** Choose a challenge, select your preferred language (C, C++, Python, JS, Java), and write code in the **Monaco Editor**.
3. **Run & Submit:** Use the **Run** button to test your logic against sample cases via **[OnlineCompiler API](https://onlinecompiler.io/docs)** and **Submit** to permanently save your progress and update your solved count.
4. **Chat with Bot:** Use the **Leet Bot** to get hints, clarify problem statements, or brainstorm logic when stuck.

### For Community & Sharing:

1. **Post Solutions:** Navigate to the solution tab and use the **Markdown Editor** (React-MD) to explain your approach with formatted code blocks and text.
2. **Track Growth:** View your profile to see the total count of problems solved and review your entire submission history.

## Contributing

Contributions are welcome! This project uses **Husky** + **commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

