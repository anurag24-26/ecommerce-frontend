import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import doodleImg from "../assets/doodle.svg"; // Add a doodle image inside /src/assets/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      role === "admin"
        ? "https://ecommerce-backend-h0uj.onrender.com/api/admin/login"
        : "https://ecommerce-backend-h0uj.onrender.com/api/users/login";

    try {
      const { data } = await axios.post(endpoint, { email, password });
      const tokenKey = role === "admin" ? "adminToken" : "userToken";
      localStorage.setItem(tokenKey, data.token);
      navigate(role === "admin" ? "/admin-dashboard" : "/home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
      {/* Background Doodles */}
      <img
        src={doodleImg}
        alt="doodle"
        className="absolute top-0 left-0 w-60 opacity-20 rotate-12 -translate-x-10 -translate-y-10"
      />
      <img
        src={doodleImg}
        alt="doodle"
        className="absolute bottom-0 right-0 w-60 opacity-20 -rotate-12 translate-x-10 translate-y-10"
      />

      <div className="w-full max-w-md p-8 bg-black bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-2xl relative z-10">
        {/* Small Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={doodleImg}
            alt="logo"
            className="w-16 h-16 rounded-full border-4 border-white bg-white shadow-md"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-md">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>

        {/* Role Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "user"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-300 text-gray-800 hover:scale-105"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "admin"
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-gray-300 text-gray-800 hover:scale-105"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white bg-opacity-40 text-gray-800 placeholder-gray-600 transition-all"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white bg-opacity-40 text-gray-800 placeholder-gray-600 transition-all"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-white text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-300 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
