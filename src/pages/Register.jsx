import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import doodle from "../assets/doodle.svg"; // 🖼️ Imported doodle

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const endpoint =
      role === "admin"
        ? "https://ecommerce-backend-h0uj.onrender.com/api/admin/register"
        : "https://ecommerce-backend-h0uj.onrender.com/api/users/register";

    try {
      await axios.post(endpoint, { name, email, password });
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Doodle Images from assets */}
      <img
        src={doodle}
        alt="Doodle Top Left"
        className="absolute top-0 left-0 w-36 opacity-20 rotate-12"
      />
      <img
        src={doodle}
        alt="Doodle Bottom Right"
        className="absolute bottom-0 right-0 w-36 opacity-20 -rotate-12"
      />

      <div className="relative z-10 w-full max-w-md p-8 bg-black bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl">
        {" "}
        <div className="flex justify-center mb-4">
          <img
            src={doodle}
            alt="logo"
            className="w-16 h-16 rounded-full border-4 border-white bg-white shadow-md"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide">
          {role === "admin" ? "Admin Register" : "User Register"}
        </h2>
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setRole("user")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "user"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-300 text-gray-700 hover:bg-blue-100"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "admin"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-300 text-gray-700 hover:bg-blue-100"
            }`}
          >
            Admin
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-400 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-70 transition-all"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-400 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-70 transition-all"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-400 bg-white bg-opacity-40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-70 transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-xl`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-white text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-300 font-semibold hover:underline hover:text-white"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
