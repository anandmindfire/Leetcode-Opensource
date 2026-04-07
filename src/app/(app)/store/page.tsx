"use client";
import { Button } from '@/components/ui/button'
import { CircleDollarSign, CirclePlus, Gift, Package, ShoppingCart, Star, Sparkles } from 'lucide-react'
import React from 'react'
import { useTheme } from 'next-themes'

const products = [
  {
    image: "/timeTravel.jpg",
    title: "Time Travel Ticket",
    subtitle: "For Daily Coding Challenge",
    price: 70,
    badge: "Popular",
    badgeColor: "bg-blue-500",
  },
  {
    image: "/premium.png",
    title: "30 Day Premium",
    subtitle: "Premium Subscription",
    price: 6000,
    badge: "Best Value",
    badgeColor: "bg-purple-500",
  },
  {
    image: "/tshirt.png",
    title: "LeetCode T-Shirt",
    subtitle: "High Quality Cotton Tee",
    price: 7200,
    badge: null,
    badgeColor: "",
  },
  {
    image: "/cap.png",
    title: "LeetCode Cap",
    subtitle: "Comes in Black and White",
    price: 6500,
    badge: "New",
    badgeColor: "bg-green-500",
  },
];

export default function page() {
  const { theme } = useTheme();

  return (
    <div className="w-full min-h-[calc(100vh-3rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        {/* Points Badge */}
        <div className="absolute top-4 right-8 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ background: "var(--card)" }}>
            <span className={`text-sm ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>Your Points:</span>
            <span className="font-bold text-yellow-500">1,362</span>
            <CircleDollarSign className="w-4 h-4 text-yellow-500" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-16 px-6 text-center">
          <div className="w-20 h-20 mb-6 bg-[url(/navLogo-light.png)] dark:bg-[url(/navLogo-dark.png)] bg-cover bg-center rounded-2xl" />

          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">LeetCode</span>{" "}
            Store
          </h1>
          <p className={`mt-3 max-w-md text-base ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
            Redeem products for free using LeetCoins or shop our exclusive merch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button variant="outline" className="rounded-full cursor-pointer h-10 px-5 gap-2 font-medium">
              <Gift className="w-4 h-4" /> Redeem
            </Button>
            <Button variant="outline" className="rounded-full cursor-pointer h-10 px-5 gap-2 font-medium">
              <CirclePlus className="w-4 h-4" /> Earn LeetCoins
            </Button>
            <Button variant="outline" className="rounded-full cursor-pointer h-10 px-5 gap-2 font-medium text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10">
              <Star className="w-4 h-4" fill="currentColor" /> Premium
            </Button>
            <Button variant="outline" className="rounded-full cursor-pointer h-10 px-5 gap-2 font-medium">
              <Package className="w-4 h-4" /> Orders
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 pb-20 pt-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Featured Products</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((item, index) => (
              <div
                key={index}
                className="group rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-yellow-500/30 cursor-pointer"
                style={{ background: "var(--card)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                    {item.subtitle}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <CircleDollarSign className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-yellow-500">{item.price.toLocaleString()}</span>
                    </div>
                    <Button size="sm" className="h-8 px-4 text-xs font-semibold cursor-pointer gap-1">
                      <Sparkles className="w-3 h-3" /> Redeem
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
