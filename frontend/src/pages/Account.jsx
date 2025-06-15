"use client"

import { useState } from "react"
import { Cake, Edit, Medal, ScrollText, ShoppingBag, Donut, Cookie } from "lucide-react"
import { Button } from "../component/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../component/ui/card"
import { Input } from "../component/ui/input"
import { Label } from "../component/ui/label"
import { Separator } from "../component/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../component/ui/tabs"

export default function Account() {
  const [user, setUser] = useState({
    name: "Sugar Lover",
    email: "sugarlover@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    joined: "June 2023",
    badges: ["First Order", "Donut Enthusiast", "Cookie Monster"],
    unlockedRecipes: ["Rainbow Sprinkle Cupcake", "Chocolate Chip Cookie"],
    orders: [
      { id: "ORD-123", date: "2023-06-15", status: "Delivered", total: 24.99 },
      { id: "ORD-456", date: "2023-05-22", status: "Delivered", total: 18.5 },
    ],
  })

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        My Account
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="border-pink-100">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-pink-200"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-white border-pink-200"
                >
                  <Edit className="h-4 w-4 text-pink-500" />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500">Member since {user.joined}</p>
              </div>
            </div>

            <Separator className="my-4" />

            {isEditing ? (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.email} />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500"
                    onClick={() => setIsEditing(false)}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-pink-200"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-500">Email</Label>
                  <p>{user.email}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-pink-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-5 w-5 text-pink-500" />
                      <CardTitle className="text-base">Orders</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{user.orders.length}</p>
                    <p className="text-sm text-gray-500">Total orders placed</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Medal className="h-5 w-5 text-pink-500" />
                      <CardTitle className="text-base">Badges</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{user.badges.length}</p>
                    <p className="text-sm text-gray-500">Badges earned</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <ScrollText className="h-5 w-5 text-pink-500" />
                      <CardTitle className="text-base">Recipes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{user.unlockedRecipes.length}</p>
                    <p className="text-sm text-gray-500">Recipes unlocked</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View all your past orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-pink-100 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-green-600">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges">
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle>My Badges</CardTitle>
                  <CardDescription>Achievements you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-4 border border-pink-100 rounded-lg bg-pink-50"
                      >
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center mb-3">
                          {index === 0 && <ShoppingBag className="h-8 w-8 text-white" />}
                          {index === 1 && <Donut className="h-8 w-8 text-white" />}
                          {index === 2 && <Cookie className="h-8 w-8 text-white" />}
                        </div>
                        <p className="font-medium text-center">{badge}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recipes">
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle>My Cookbook</CardTitle>
                  <CardDescription>Secret recipes you've unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.unlockedRecipes.map((recipe, index) => (
                      <div key={index} className="border border-pink-100 rounded-lg overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center">
                          <Cake className="h-16 w-16 text-white" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{recipe}</h3>
                          <p className="text-sm text-gray-600">
                            You've unlocked this secret recipe! Click to view the full instructions.
                          </p>
                          <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500">
                            View Recipe
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
