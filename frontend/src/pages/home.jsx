"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Heart, Star, Sparkles } from "lucide-react"
import { Button } from "../component/ui/Button"
import { Badge } from "../component/ui/badge"
import { Card, CardContent } from "../component/ui/card"

// Sample product data
const products = [
  {
    id: 1,
    name: "Rainbow Sprinkle Cupcake",
    price: 4.99,
    category: "cupcakes",
    description: "Vanilla cupcake topped with rainbow sprinkles and buttercream frosting",
    image: "/placeholder.svg?height=200&width=200",
    isFlavorOfTheDay: true,
    stock: 12,
    recipe: "Secret vanilla recipe with magical sprinkles!",
  },
  {
    id: 2,
    name: "Chocolate Chip Cookie",
    price: 2.99,
    category: "cookies",
    description: "Warm, gooey chocolate chip cookies made with love",
    image: "/placeholder.svg?height=200&width=200",
    isFlavorOfTheDay: false,
    stock: 24,
    recipe: "Grandma's secret chocolate chip recipe",
  },
  {
    id: 3,
    name: "Glazed Donut",
    price: 3.49,
    category: "donuts",
    description: "Classic glazed donut with a perfect sweet coating",
    image: "/placeholder.svg?height=200&width=200",
    isFlavorOfTheDay: false,
    stock: 18,
    recipe: "Traditional glazed donut perfection",
  },
  {
    id: 4,
    name: "Red Velvet Cupcake",
    price: 5.49,
    category: "cupcakes",
    description: "Rich red velvet with cream cheese frosting",
    image: "/placeholder.svg?height=200&width=200",
    isFlavorOfTheDay: false,
    stock: 8,
    recipe: "Southern red velvet tradition",
  },
  {
    id: 5,
    name: "Sugar Cookie",
    price: 2.49,
    category: "cookies",
    description: "Soft sugar cookies with colorful icing",
    image: "/placeholder.svg?height=200&width=200",
    isFlavorOfTheDay: false,
    stock: 30,
    recipe: "Classic sugar cookie magic",
  },
  {
    id: 6,
    name: "Strawberry Frosted Donut",
    price: 3.99,
    category: "donuts",
    description: "Fluffy donut with strawberry frosting and sprinkles",
    image: "/placeholder.svg?height=200&width=200",
    isFlavorOfTheDay: false,
    stock: 15,
    recipe: "Berry delicious donut recipe",
  },
]

const categories = [
  { id: "all", name: "All Treats", emoji: "🍰" },
  { id: "cupcakes", name: "Cupcakes", emoji: "🧁" },
  { id: "cookies", name: "Cookies", emoji: "🍪" },
  { id: "donuts", name: "Donuts", emoji: "🍩" },
]

export default function Home() {
  const { category } = useParams()
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [favorites, setFavorites] = useState([])

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (product) => {
    // Mock add to cart functionality
    console.log("Added to cart:", product)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Sweet Dreams Come True! ✨
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Indulge in our handcrafted desserts made with love and the finest ingredients. Every bite is a celebration! 🎉
        </p>
      </section>

      {/* Flavor of the Day Banner */}
      {products.find((p) => p.isFlavorOfTheDay) && (
        <section className="py-6 bg-gradient-to-r from-yellow-200 to-orange-200 border-y-2 border-yellow-300 rounded-lg mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-yellow-600" />
              <h3 className="text-2xl font-bold text-yellow-800">Flavor of the Day!</h3>
              <Sparkles className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-yellow-700">
              {products.find((p) => p.isFlavorOfTheDay)?.name} - Get 10% off today only! 🌟
            </p>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                  : "border-pink-200 hover:bg-pink-50 hover:scale-105"
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-pink-100 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                  </Button>
                  {product.isFlavorOfTheDay && (
                    <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 animate-pulse">
                      ⭐ Flavor of the Day!
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        ${product.isFlavorOfTheDay ? (product.price * 0.9).toFixed(2) : product.price.toFixed(2)}
                      </span>
                      {product.isFlavorOfTheDay && (
                        <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{product.stock} in stock</span>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-4 py-2 transition-all duration-300 hover:scale-105"
                      disabled={product.stock === 0}
                    >
                      Add to Cart 🛒
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
