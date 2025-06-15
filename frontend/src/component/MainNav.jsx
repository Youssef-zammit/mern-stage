"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cake, Cookie, Donut, Home, ShoppingBag, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Cupcakes",
    href: "/category/cupcakes",
    icon: Cake,
  },
  {
    name: "Cookies",
    href: "/category/cookies",
    icon: Cookie,
  },
  {
    name: "Donuts",
    href: "/category/donuts",
    icon: Donut,
  },
  {
    name: "Special Offers",
    href: "/special-offers",
    icon: Star,
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: ShoppingBag,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-pink-600",
              isActive ? "text-pink-600 font-semibold" : "text-gray-600",
            )}
          >
            <Icon className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
