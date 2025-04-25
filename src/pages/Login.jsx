import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default login as user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      role === "admin"
        ? "https://ecommerce-backend-h0uj.onrender.com/api/admin/login"
        : "https://ecommerce-backend-h0uj.onrender.com/api/users/login";

    try {
      const { data } = await axios.post(endpoint, { email, password });

      // Store token correctly based on role
      const tokenKey = role === "admin" ? "adminToken" : "userToken";
      localStorage.setItem(tokenKey, data.token);

      console.log(`Stored ${tokenKey}:`, localStorage.getItem(tokenKey)); // Debugging log

      // Navigate to the correct dashboard after login
      navigate(role === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-15 backdrop-blur-md shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>

        {/* Role Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-md font-semibold transition-all ${
              role === "user"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-300 text-gray-800"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`px-6 py-2 rounded-md font-semibold transition-all ${
              role === "admin"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-300 text-gray-800"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-white bg-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-50"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-white bg-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-50"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Register Redirect */}
        <p className="text-white text-center mt-5">
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
