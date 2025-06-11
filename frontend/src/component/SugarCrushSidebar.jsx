import { Link, useLocation } from "react-router-dom"
import { Cake, Cookie, Donut, Heart, Home, Medal, ScrollText, Settings, ShoppingBag, Star, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "./ui/sidebar"

export function SugarCrushSidebar() {
  const location = useLocation()

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-pink-100">
      <SidebarHeader className="py-4">
        <div className="flex items-center px-2">
          <div className="flex items-center gap-2 px-2">
            <span className="text-2xl">🍰</span>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              SugarRush
            </span>
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/category/cupcakes"}>
                  <Link to="/category/cupcakes">
                    <Cake className="h-4 w-4" />
                    <span>Cupcakes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/category/cookies"}>
                  <Link to="/category/cookies">
                    <Cookie className="h-4 w-4" />
                    <span>Cookies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/category/donuts"}>
                  <Link to="/category/donuts">
                    <Donut className="h-4 w-4" />
                    <span>Donuts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/special-offers"}>
                  <Link to="/special-offers">
                    <Star className="h-4 w-4" />
                    <span>Special Offers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/account"}>
                  <Link to="/account">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/account/orders"}>
                  <Link to="/account/orders">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/account/favorites"}>
                  <Link to="/account/favorites">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/account/badges"}>
                  <Link to="/account/badges">
                    <Medal className="h-4 w-4" />
                    <span>Badges</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/account/recipes"}>
                  <Link to="/account/recipes">
                    <ScrollText className="h-4 w-4" />
                    <span>Recipes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/account/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
