import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png"; // Replace with your logo image URL
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    axios
      .get("https://ecommerce-backend-h0uj.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Assuming token is saved in localStorage
        },
      })
      .then((response) => {
        setUser(response.data); // Save user data
      })
      .catch((error) => {
        console.log(error); // Handle errors (e.g., user is not logged in)
      });
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center space-x-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo} // Replace with your logo image URL
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-white text-3xl font-bold">EShop</span>
        </Link>

        {/* Navbar Links */}
        <div className="flex space-x-8 text-white text-lg">
          <Link to="/" className="hover:text-yellow-300 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="hover:text-yellow-300 transition-colors">
            Shop
          </Link>
          <Link to="/about" className="hover:text-yellow-300 transition-colors">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition-colors"
          >
            Contact
          </Link>

          {/* User/Profile or Login/Register */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg">Welcome, {user.name}</span>
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition-colors"
              >
                <FaUser size={24} />
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center hover:text-yellow-300 transition-colors"
              >
                <FaSignInAlt size={24} />
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-yellow-300 transition-colors"
              >
                <FaUserPlus size={24} />
                <span className="ml-2">Register</span>
              </Link>
            </div>
          )}

          {/* Shopping Cart */}
          <Link
            to="/cart"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            <FaShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
