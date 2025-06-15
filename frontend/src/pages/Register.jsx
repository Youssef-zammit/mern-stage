"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../component/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../component/ui/card"
import { Input } from "../component/ui/input"
import { Label } from "../component/ui/label"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Mock registration logic
    console.log("Registration attempt:", formData)
    // Redirect to login page after registration
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md border-pink-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="text-6xl">🧁</div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Join SugarRush!
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create your account and start collecting sweet treats and badges
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Sugar Lover"
                value={formData.name}
                onChange={handleChange}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="sweetlover@example.com"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Create Account 🎉
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span>Already have an account?</span>
              <Link to="/login" className="text-pink-600 hover:text-pink-700 font-semibold hover:underline">
                Sign in here! 🍪
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
