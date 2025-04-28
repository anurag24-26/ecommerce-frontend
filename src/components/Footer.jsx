import React from "react";
import { Link } from "react-router-dom"; // Importing Link for internal navigation
import logo from "../assets/logo.png"; // Importing logo image
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-300 text-white py-8 px-4 rounded-t-3xl">
      <div className="flex justify-center items-center mb-10">
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
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side - Links */}
        <div className="flex flex-col gap-4">
          <Link
            to="/about"
            className="hover:text-blue-500 text-black transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 text-black transition-all duration-300"
          >
            Contact Us
          </Link>
          <Link
            to="/privacy"
            className="hover:text-blue-500 text-black transition-all duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/returns"
            className="hover:text-blue-500 text-black transition-all duration-300"
          >
            Returns & Refunds
          </Link>
        </div>

        {/* Right Side - Social Media & Newsletter */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6 mb-4">
            <a
              href="#"
              className="text-blue-600 hover:text-indigo-500 transition-all duration-300"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-indigo-500 transition-all duration-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-indigo-500 transition-all duration-300"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>

          <div className="flex items-center bg-gray-500 p-4 rounded-lg shadow-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-400 text-sm mt-6">
        © 2025 EShop. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
