import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Settings, LogOut, Sparkles, BarChart3 } from "lucide-react"
import { cn } from "../../lib/utils"

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Special Offers",
    href: "/admin/special-offers",
    icon: Sparkles,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <div className="h-full flex flex-col border-r bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 rounded-md">
            <span className="text-white text-xl">🍰</span>
          </div>
          <h1 className="font-bold text-lg">SugarRush Admin</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors",
                location.pathname === item.href ? "bg-gray-100 text-pink-600" : "text-gray-700",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t mt-auto">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Exit Admin
        </Link>
      </div>
    </div>
  )
}
