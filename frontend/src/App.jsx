import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "./components/ui/sidebar"
import Layout from "./components/Layout"
import Home from "../pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from "../pages/Account"
import "./App.css"

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<Account />} />
            <Route path="/account/badges" element={<Account />} />
            <Route path="/account/recipes" element={<Account />} />
            <Route path="/category/:category" element={<Home />} />
          </Routes>
        </Layout>
      </SidebarProvider>
    </Router>
  )
}

export default App
