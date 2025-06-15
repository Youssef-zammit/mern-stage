import { ShoppingCart } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/Button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { SugarCrushSidebar } from "./SugarCrushSidebar"
import { MainNav } from "./Mainnavbar"
import { UserAuthNav } from "./UserAuthNav"

export default function Layout({ children }) {
  // Mock cart data for demonstration
  const cartItems = [
    { id: 1, name: "Rainbow Sprinkle Cupcake", price: 4.99, quantity: 2, image: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "Chocolate Chip Cookie", price: 2.99, quantity: 3, image: "/placeholder.svg?height=50&width=50" },
  ]

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      <SugarCrushSidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-pink-200 bg-white/80 backdrop-blur-md">
          <div className="container flex h-16 items-center px-4">
            <MainNav />

            <div className="ml-auto flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative border-pink-200 hover:bg-pink-50">
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-pink-500 text-white text-xs">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Your Sweet Cart
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-pink-600 font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            +
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        Checkout 🎉
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <UserAuthNav />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-pink-100 to-purple-100 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-4xl mb-4">🍰</div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              SugarRush
            </h3>
            <p className="text-gray-600 mb-4">Making life sweeter, one dessert at a time! 💕</p>
            <div className="flex justify-center gap-4 text-2xl">
              <span>🧁</span>
              <span>🍪</span>
              <span>🍩</span>
              <span>🎂</span>
              <span>🍰</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
