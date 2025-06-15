import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

export function Dashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12%",
      icon: DollarSign,
      description: "Revenue this month",
    },
    {
      title: "Orders",
      value: "356",
      change: "+8%",
      icon: ShoppingCart,
      description: "Orders this month",
    },
    {
      title: "Products",
      value: "48",
      change: "+2",
      icon: Package,
      description: "Active products",
    },
    {
      title: "Customers",
      value: "1,205",
      change: "+15%",
      icon: Users,
      description: "Active customers",
    },
  ]

  // Mock data for recent orders
  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", date: "2023-06-15", status: "Delivered", total: "$49.99" },
    { id: "ORD-002", customer: "Jane Smith", date: "2023-06-14", status: "Processing", total: "$35.50" },
    { id: "ORD-003", customer: "Robert Johnson", date: "2023-06-14", status: "Shipped", total: "$72.25" },
    { id: "ORD-004", customer: "Emily Davis", date: "2023-06-13", status: "Delivered", total: "$24.99" },
    { id: "ORD-005", customer: "Michael Brown", date: "2023-06-13", status: "Processing", total: "$89.75" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500">Welcome back to your SugarRush admin dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
            <CardFooter>
              <p className="text-xs flex items-center gap-1 text-green-600">
                {stat.change} <ArrowUpRight className="h-3 w-3" />
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have {recentOrders.length} orders this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-xs font-medium text-gray-500">
                <div>Order</div>
                <div>Customer</div>
                <div>Date</div>
                <div>Status</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-5 items-center text-sm">
                    <div className="font-medium">{order.id}</div>
                    <div>{order.customer}</div>
                    <div>{order.date}</div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right font-medium">{order.total}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Orders
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Top selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Rainbow Sprinkle Cupcake", sales: 124, revenue: "$619.76" },
                { name: "Chocolate Chip Cookie", sales: 98, revenue: "$293.02" },
                { name: "Glazed Donut", sales: 86, revenue: "$300.14" },
                { name: "Red Velvet Cupcake", sales: 72, revenue: "$395.28" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="font-medium">{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Products
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
