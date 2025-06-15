"use client"

import { useState } from "react"
import { Calendar, Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { Badge } from "../ui/badge"

// Mock special offers data
const initialOffers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get 20% off on all summer-themed desserts!",
    discountType: "percentage",
    discountValue: 20,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    isActive: true,
    appliesTo: "category",
    categoryOrProduct: "cupcakes",
  },
  {
    id: 2,
    title: "Buy One Get One Free",
    description: "Buy any cookie and get another one free!",
    discountType: "bogo",
    discountValue: 100,
    startDate: "2023-06-15",
    endDate: "2023-07-15",
    isActive: true,
    appliesTo: "category",
    categoryOrProduct: "cookies",
  },
  {
    id: 3,
    title: "New Customer Discount",
    description: "10% off your first order!",
    discountType: "percentage",
    discountValue: 10,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    isActive: true,
    appliesTo: "all",
    categoryOrProduct: "",
  },
  {
    id: 4,
    title: "Donut Day Special",
    description: "$1 off all donuts!",
    discountType: "fixed",
    discountValue: 1,
    startDate: "2023-06-02",
    endDate: "2023-06-02",
    isActive: false,
    appliesTo: "category",
    categoryOrProduct: "donuts",
  },
]

export function SpecialOffersManagement() {
  const [offers, setOffers] = useState(initialOffers)
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    endDate: "",
    isActive: true,
    appliesTo: "all",
    categoryOrProduct: "",
  })

  const handleAddOffer = () => {
    const offerToAdd = {
      ...newOffer,
      id: offers.length + 1,
      discountValue: Number.parseFloat(newOffer.discountValue),
    }

    setOffers([...offers, offerToAdd])
    setNewOffer({
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      startDate: "",
      endDate: "",
      isActive: true,
      appliesTo: "all",
      categoryOrProduct: "",
    })
    setIsAddOfferOpen(false)
  }

  const handleEditOffer = () => {
    setOffers(offers.map((offer) => (offer.id === editingOffer.id ? editingOffer : offer)))
    setEditingOffer(null)
  }

  const handleDeleteOffer = (id) => {
    setOffers(offers.filter((offer) => offer.id !== id))
  }

  const handleToggleActive = (id) => {
    setOffers(offers.map((offer) => (offer.id === id ? { ...offer, isActive: !offer.isActive } : offer)))
  }

  const formatDiscountValue = (offer) => {
    switch (offer.discountType) {
      case "percentage":
        return `${offer.discountValue}% off`
      case "fixed":
        return `$${offer.discountValue.toFixed(2)} off`
      case "bogo":
        return "Buy One Get One Free"
      default:
        return `${offer.discountValue}% off`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
          <p className="text-gray-500">Create and manage special offers and promotions</p>
        </div>
        <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
          <DialogTrigger asChild>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Plus className="mr-2 h-4 w-4" /> Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create Special Offer</DialogTitle>
              <DialogDescription>Create a new special offer or promotion for your products.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <Select
                    onValueChange={(value) => setNewOffer({ ...newOffer, discountType: value })}
                    value={newOffer.discountType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newOffer.discountType !== "bogo" && (
                  <div className="grid gap-2">
                    <Label htmlFor="discount-value">
                      {newOffer.discountType === "percentage" ? "Percentage (%)" : "Amount ($)"}
                    </Label>
                    <Input
                      id="discount-value"
                      type="number"
                      step={newOffer.discountType === "percentage" ? "1" : "0.01"}
                      value={newOffer.discountValue}
                      onChange={(e) => setNewOffer({ ...newOffer, discountValue: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newOffer.startDate}
                    onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newOffer.endDate}
                    onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="applies-to">Applies To</Label>
                <Select
                  onValueChange={(value) => setNewOffer({ ...newOffer, appliesTo: value })}
                  value={newOffer.appliesTo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="category">Specific Category</SelectItem>
                    <SelectItem value="product">Specific Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newOffer.appliesTo !== "all" && (
                <div className="grid gap-2">
                  <Label htmlFor="category-product">{newOffer.appliesTo === "category" ? "Category" : "Product"}</Label>
                  <Select
                    onValueChange={(value) => setNewOffer({ ...newOffer, categoryOrProduct: value })}
                    value={newOffer.categoryOrProduct}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${newOffer.appliesTo}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {newOffer.appliesTo === "category" ? (
                        <>
                          <SelectItem value="cupcakes">Cupcakes</SelectItem>
                          <SelectItem value="cookies">Cookies</SelectItem>
                          <SelectItem value="donuts">Donuts</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="1">Rainbow Sprinkle Cupcake</SelectItem>
                          <SelectItem value="2">Chocolate Chip Cookie</SelectItem>
                          <SelectItem value="3">Glazed Donut</SelectItem>
                          <SelectItem value="4">Red Velvet Cupcake</SelectItem>
                          <SelectItem value="5">Sugar Cookie</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newOffer.isActive}
                  onCheckedChange={(checked) => setNewOffer({ ...newOffer, isActive: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOfferOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOffer}>Create Offer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Offer Dialog */}
        <Dialog open={!!editingOffer} onOpenChange={(open) => !open && setEditingOffer(null)}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Special Offer</DialogTitle>
              <DialogDescription>Make changes to the special offer.</DialogDescription>
            </DialogHeader>
            {editingOffer && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Offer Title</Label>
                  <Input
                    id="edit-title"
                    value={editingOffer.title}
                    onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingOffer.description}
                    onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-discount-type">Discount Type</Label>
                    <Select
                      onValueChange={(value) => setEditingOffer({ ...editingOffer, discountType: value })}
                      value={editingOffer.discountType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="bogo">Buy One Get One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {editingOffer.discountType !== "bogo" && (
                    <div className="grid gap-2">
                      <Label htmlFor="edit-discount-value">
                        {editingOffer.discountType === "percentage" ? "Percentage (%)" : "Amount ($)"}
                      </Label>
                      <Input
                        id="edit-discount-value"
                        type="number"
                        step={editingOffer.discountType === "percentage" ? "1" : "0.01"}
                        value={editingOffer.discountValue}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, discountValue: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-start-date">Start Date</Label>
                    <Input
                      id="edit-start-date"
                      type="date"
                      value={editingOffer.startDate}
                      onChange={(e) => setEditingOffer({ ...editingOffer, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-end-date">End Date</Label>
                    <Input
                      id="edit-end-date"
                      type="date"
                      value={editingOffer.endDate}
                      onChange={(e) => setEditingOffer({ ...editingOffer, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-applies-to">Applies To</Label>
                  <Select
                    onValueChange={(value) => setEditingOffer({ ...editingOffer, appliesTo: value })}
                    value={editingOffer.appliesTo}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="category">Specific Category</SelectItem>
                      <SelectItem value="product">Specific Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingOffer.appliesTo !== "all" && (
                  <div className="grid gap-2">
                    <Label htmlFor="edit-category-product">
                      {editingOffer.appliesTo === "category" ? "Category" : "Product"}
                    </Label>
                    <Select
                      onValueChange={(value) => setEditingOffer({ ...editingOffer, categoryOrProduct: value })}
                      value={editingOffer.categoryOrProduct}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${editingOffer.appliesTo}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {editingOffer.appliesTo === "category" ? (
                          <>
                            <SelectItem value="cupcakes">Cupcakes</SelectItem>
                            <SelectItem value="cookies">Cookies</SelectItem>
                            <SelectItem value="donuts">Donuts</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="1">Rainbow Sprinkle Cupcake</SelectItem>
                            <SelectItem value="2">Chocolate Chip Cookie</SelectItem>
                            <SelectItem value="3">Glazed Donut</SelectItem>
                            <SelectItem value="4">Red Velvet Cupcake</SelectItem>
                            <SelectItem value="5">Sugar Cookie</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={editingOffer.isActive}
                    onCheckedChange={(checked) => setEditingOffer({ ...editingOffer, isActive: checked })}
                  />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingOffer(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditOffer}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer.id} className={offer.isActive ? "" : "opacity-70"}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{offer.title}</CardTitle>
                <Badge className={offer.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {offer.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">{offer.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="font-medium">Discount:</div>
                  <div className="ml-auto">{formatDiscountValue(offer)}</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span className="font-medium">Period:</span>
                  </div>
                  <div className="ml-auto">
                    {offer.startDate} to {offer.endDate}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium">Applies to:</div>
                  <div className="ml-auto capitalize">
                    {offer.appliesTo === "all"
                      ? "All Products"
                      : offer.appliesTo === "category"
                        ? `${offer.categoryOrProduct} category`
                        : `Specific Product`}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-3 border-t">
              <Button variant="ghost" size="sm" onClick={() => handleToggleActive(offer.id)}>
                {offer.isActive ? "Deactivate" : "Activate"}
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingOffer(offer)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteOffer(offer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
