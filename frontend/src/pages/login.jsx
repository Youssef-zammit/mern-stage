"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../component/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../component/ui/card"
import { Input } from "../component/ui/input"
import { Label } from "../component/ui/label"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login logic
    console.log("Login attempt:", { email, password })
    // Redirect to home page after login
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md border-pink-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="text-6xl">🍰</div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your SugarRush account to continue your sweet journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="sweetlover@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Sign In 🍭
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link to="/forgot-password" className="text-sm text-pink-600 hover:text-pink-700 hover:underline">
              Forgot your password?
            </Link>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span>Don't have an account?</span>
              <Link to="/register" className="text-pink-600 hover:text-pink-700 font-semibold hover:underline">
                Sign up here! 🧁
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
