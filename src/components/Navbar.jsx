import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png"; // Your logo image

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-h0uj.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
      setMenuOpen(false); // Close menu if mobile
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border-1 object-cover"
          />
          <span className="text-indigo-600 text-2xl font-bold tracking-wide">
            EShop
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent focus:outline-none w-48 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 text-lg">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <Link to="/shop" className="hover:text-indigo-600 transition">
            Shop
          </Link>
          <Link to="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">
            Contact
          </Link>
          <Link to="/cart" className="hover:text-indigo-600 transition">
            <FaShoppingCart size={24} />
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 text-sm">Hi, {user.name}</span>
              <Link
                to="/dashboard"
                className="hover:text-indigo-600 transition"
              >
                <FaUser size={22} />
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center hover:text-indigo-600 transition"
              >
                <FaSignInAlt size={20} />
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-indigo-600 transition"
              >
                <FaUserPlus size={20} />
                <span className="ml-2">Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-indigo-600 md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 p-4 space-y-4 text-gray-700 text-lg">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent focus:outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="text-indigo-600">
              <FaSearch />
            </button>
          </form>

          <Link
            to="/"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <Link
              to="/dashboard"
              className="block hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="block hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
