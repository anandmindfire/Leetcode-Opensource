"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Trophy,
  Users,
  Zap,
  ChevronRight,
  BarChart3,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Problems", value: "20+", icon: Code2 },
  { label: "Languages", value: "5", icon: Zap },
  { label: "Topics", value: "15+", icon: BookOpen },
  { label: "Community", value: "Growing", icon: Users },
];

const features = [
  {
    icon: Code2,
    title: "Write & Run Code",
    description:
      "Write solutions in Python, C++, C, Java, or JavaScript with our built-in Monaco editor and get instant feedback.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Visualize your journey with detailed charts, submission history, and a personal dashboard.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Assistance",
    description:
      "Stuck on a problem? Get hints and explanations from our integrated AI assistant.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Trophy,
    title: "Compete & Learn",
    description:
      "Solve curated problems across Easy, Medium, and Hard difficulty levels to sharpen your skills.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

const topicTags = [
  "Array",
  "Hash Table",
  "String",
  "Dynamic Programming",
  "Two Pointers",
  "Binary Search",
  "Stack",
  "Tree",
  "Graph",
  "Sliding Window",
  "Backtracking",
  "Greedy",
  "Sorting",
  "BFS",
  "DFS",
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-3rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            {theme === "dark" ? (
              <img src="/logo dark.png" alt="Logo" className="h-10" />
            ) : (
              <img src="/logo.svg" alt="Logo" className="h-10" />
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            A New Way to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Learn & Code
            </span>
          </h1>

          <p
            className={`mt-6 text-lg sm:text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            Practice coding problems, track your progress, and get AI-powered
            hints. Built for developers who want to level up.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={session ? "/problems" : "/sign-up"}>
              <Button className="h-12 px-8 text-base font-semibold cursor-pointer gap-2">
                {session ? "Start Solving" : "Get Started Free"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/problems">
              <Button
                variant="outline"
                className="h-12 px-8 text-base font-semibold cursor-pointer gap-2"
              >
                Browse Problems
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="border-y"
        style={{ background: "var(--sidebar-accent)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10"
              >
                <stat.icon className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Everything You Need</h2>
            <p
              className={`mt-3 text-lg ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              All the tools to improve your coding skills in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border transition-colors hover:border-blue-500/30"
                style={{ background: "var(--card)" }}
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center ${f.bg} mb-4`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section
        className="py-16 px-6 border-t"
        style={{ background: "var(--sidebar-accent)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Popular Topics</h2>
          <p
            className={`mb-8 ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            Practice problems across the most important DSA topics.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {topicTags.map((tag) => (
              <Link
                key={tag}
                href="/problems"
                className="px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:border-blue-500/50 hover:text-blue-500"
                style={{ background: "var(--card)" }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p
            className={`text-lg mb-8 ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            Join the community and start solving problems today.
          </p>
          <Link href={session ? "/problems" : "/sign-up"}>
            <Button className="h-12 px-10 text-base font-semibold cursor-pointer gap-2">
              {session ? "Go to Problems" : "Create Free Account"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8 px-6"
        style={{ background: "var(--sidebar-accent)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {theme === "dark" ? (
              <img src="/navLogo dark.png" alt="" className="h-5" />
            ) : (
              <img src="/navLogo light.png" alt="" className="h-5" />
            )}
          </div>
          <div className="flex gap-6">
            <Link
              href="/problems"
              className={`text-sm ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              } hover:text-blue-500 transition-colors`}
            >
              Problems
            </Link>
            <Link
              href="/solution"
              className={`text-sm ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              } hover:text-blue-500 transition-colors`}
            >
              Discuss
            </Link>
            <Link
              href="/about"
              className={`text-sm ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              } hover:text-blue-500 transition-colors`}
            >
              Explore
            </Link>
          </div>
          <p
            className={`text-xs ${
              theme === "dark" ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            &copy; {new Date().getFullYear()} Leetcode Opensource. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
