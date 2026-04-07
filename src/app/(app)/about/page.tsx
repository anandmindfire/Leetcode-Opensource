import { Button } from '@/components/ui/button'
import { BookOpen, BrainCircuit, Code2, Flame, Github, GraduationCap, Linkedin, Rocket, Trophy, Youtube, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const exploreCards = [
  {
    title: "Top Interview 150",
    description: "Must-do list for interview preparation. Curated from the most frequently asked questions.",
    icon: <Trophy className="w-6 h-6 text-yellow-500" />,
    tag: "150 Questions",
    color: "from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    href: "/problems",
  },
  {
    title: "LeetCode 75",
    description: "Ace coding interviews with 75 carefully selected questions covering all key topics.",
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    tag: "75 Questions",
    color: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5",
    border: "border-blue-500/20 hover:border-blue-500/40",
    href: "/problems",
  },
  {
    title: "Introduction to Pandas",
    description: "Learn and practice Pandas with 15 beginner-friendly exercises on DataFrame manipulation.",
    icon: <BookOpen className="w-6 h-6 text-green-500" />,
    tag: "15 Questions",
    color: "from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5",
    border: "border-green-500/20 hover:border-green-500/40",
    href: "/problems",
  },
  {
    title: "30 Days of JavaScript",
    description: "Learn and practice JavaScript fundamentals with 30 exercises for building a solid foundation.",
    icon: <Code2 className="w-6 h-6 text-amber-500" />,
    tag: "30 Questions",
    color: "from-amber-500/10 to-yellow-500/10 dark:from-amber-500/5 dark:to-yellow-500/5",
    border: "border-amber-500/20 hover:border-amber-500/40",
    href: "/problems",
  },
  {
    title: "SQL 50",
    description: "Boost your SQL skills with 50 hands-on problems, from basics to advanced queries.",
    icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
    tag: "50 Questions",
    color: "from-purple-500/10 to-violet-500/10 dark:from-purple-500/5 dark:to-violet-500/5",
    border: "border-purple-500/20 hover:border-purple-500/40",
    href: "/problems",
  },
  {
    title: "Programming Skills",
    description: "Strengthen core programming skills with a mix of problems from various difficulty levels.",
    icon: <GraduationCap className="w-6 h-6 text-rose-500" />,
    tag: "Varies",
    color: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/5 dark:to-pink-500/5",
    border: "border-rose-500/20 hover:border-rose-500/40",
    href: "/problems",
  },
]

const features = [
  { icon: <Code2 className="w-5 h-5" />, text: "Monaco Code Editor with 5 languages" },
  { icon: <Rocket className="w-5 h-5" />, text: "Real-time code execution via Compiler API" },
  { icon: <BrainCircuit className="w-5 h-5" />, text: "AI-powered Leet Bot assistant" },
  { icon: <Flame className="w-5 h-5" />, text: "Track progress with visual analytics" },
]

export default function page() {
  return (
    <div className="w-full min-h-[calc(100vh-3rem)] bg-background">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-muted/50 to-background border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Explore</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Start Exploring
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
              Explore is a well-organized tool that helps you get the most out of LeetCode by providing
              structure to guide your progress towards the next step in your programming career.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 text-sm text-muted-foreground">
                  {f.icon}
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explore Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exploreCards.map((card, idx) => (
            <Link key={idx} href={card.href}>
              <div className={`group relative rounded-lg border ${card.border} bg-gradient-to-br ${card.color} p-5 transition-all duration-200 hover:shadow-md cursor-pointer h-full`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-background/80 border border-border/50">
                    {card.icon}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-background/80 px-2.5 py-1 rounded-full border border-border/50">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1.5 group-hover:text-foreground transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      </div>
  )
}
