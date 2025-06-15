"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: "Rainbow Sprinkle Cupcake",
    price: 4.99,
    category: "cupcakes",
    description: "Vanilla cupcake topped with rainbow sprinkles and buttercream frosting",
    image: "/placeholder.svg?height=50&width=50",
    isFlavorOfTheDay: true,
    stock: 12,
  },
  {
    id: 2,
    name: "Chocolate Chip Cookie",
    price: 2.99,
    category: "cookies",
    description: "Warm, gooey chocolate chip cookies made with love",
    image: "/placeholder.svg?height=50&width=50",
    isFlavorOfTheDay: false,
    stock: 24,
  },
  {
    id: 3,
    name: "Glazed Donut",
    price: 3.49,
    category: "donuts",
    description: "Classic glazed donut with a perfect sweet coating",
    image: "/placeholder.svg?height=50&width=50",
    isFlavorOfTheDay: false,
    stock: 18,
  },
  {
    id: 4,
    name: "Red Velvet Cupcake",
    price: 5.49,
    category: "cupcakes",
    description: "Rich red velvet with cream cheese frosting",
    image: "/placeholder.svg?height=50&width=50",
    isFlavorOfTheDay: false,
    stock: 8,
  },
  {
    id: 5,
    name: "Sugar Cookie",
    price: 2.49,
    category: "cookies",
    description: "Soft sugar cookies with colorful icing",
    image: "/placeholder.svg?height=50&width=50",
    isFlavorOfTheDay: false,
    stock: 30,
  },
]

export function ProductsManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    isFlavorOfTheDay: false,
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      image: "/placeholder.svg?height=50&width=50",
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      stock: "",
      isFlavorOfTheDay: false,
    })
    setIsAddProductOpen(false)
  }

  const handleEditProduct = () => {
    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleMakeFlavorOfDay = (id) => {
    setProducts(
      products.map((product) => ({
        ...product,
        isFlavorOfTheDay: product.id === id,
      })),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to your catalog. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  value={newProduct.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cupcakes">Cupcakes</SelectItem>
                    <SelectItem value="cookies">Cookies</SelectItem>
                    <SelectItem value="donuts">Donuts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="flavor-of-day"
                  checked={newProduct.isFlavorOfTheDay}
                  onCheckedChange={(checked) => setNewProduct({ ...newProduct, isFlavorOfTheDay: checked })}
                />
                <Label htmlFor="flavor-of-day">Set as Flavor of the Day</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Make changes to the product details.</DialogDescription>
            </DialogHeader>
            {editingProduct && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price ($)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-stock">Stock</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                    value={editingProduct.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cupcakes">Cupcakes</SelectItem>
                      <SelectItem value="cookies">Cookies</SelectItem>
                      <SelectItem value="donuts">Donuts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-flavor-of-day"
                    checked={editingProduct.isFlavorOfTheDay}
                    onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, isFlavorOfTheDay: checked })}
                  />
                  <Label htmlFor="edit-flavor-of-day">Set as Flavor of the Day</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.isFlavorOfTheDay ? (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Flavor of the Day</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      Regular
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMakeFlavorOfDay(product.id)}>
                        <span className="mr-2">⭐</span> Make Flavor of the Day
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
