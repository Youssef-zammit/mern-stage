"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { LogIn, User, UserPlus, ShoppingBag, Star, Cake } from "lucide-react"
import { Button } from "./ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function UserAuthNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full bg-pink-100">
            <span className="font-semibold text-pink-600">SL</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Sugar Lover</p>
              <p className="text-xs text-muted-foreground">sugarlover@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/account">
              <User className="mr-2 h-4 w-4" />
              <span>My Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/badges">
              <Star className="mr-2 h-4 w-4" />
              <span>My Badges</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/recipes">
              <Cake className="mr-2 h-4 w-4" />
              <span>My Recipes</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50">
          <LogIn className="h-4 w-4 mr-2" />
          <span>Sign In</span>
        </Button>
      </Link>

      <Link to="/register">
        <Button
          size="sm"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          <span>Sign Up</span>
        </Button>
      </Link>
    </div>
  )
}
