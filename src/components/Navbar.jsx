import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
} from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png"; // Your logo image

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-h0uj.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-white text-2xl font-bold tracking-wide">
            EShop
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/shop" className="hover:text-yellow-300 transition">
            Shop
          </Link>
          <Link to="/about" className="hover:text-yellow-300 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white">Hi, {user.name}</span>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition"
              >
                <FaUser size={22} />
              </Link>
            </div>
          ) : (
            <div className=" space-x-4">
              <Link
                to="/login"
                className="flex items-center hover:text-yellow-300 transition"
              >
                <FaSignInAlt size={20} />
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-yellow-300 transition"
              >
                <FaUserPlus size={20} />
                <span className="ml-2">Register</span>
              </Link>
            </div>
          )}

          <Link to="/cart" className="hover:text-yellow-300 transition">
            <FaShoppingCart size={24} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={26} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-500 p-4 space-y-4 text-white text-lg">
          <Link
            to="/"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/dashboard"
                className="ml-2 hover:text-yellow-300"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="flex items-center hover:text-yellow-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaSignInAlt size={20} className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-yellow-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserPlus size={20} className="mr-2" />
                Register
              </Link>
            </div>
          )}

          <Link
            to="/cart"
            className="flex items-center hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart size={24} className="mr-2" />
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
