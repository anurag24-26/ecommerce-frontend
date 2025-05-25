import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Info from "./pages/Info";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import WishlistPage from "./pages/WishlistPage"; // <-- Import WishlistPage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} /> {/* Added wishlist route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<Info />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
