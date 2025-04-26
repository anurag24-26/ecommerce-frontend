import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        console.error("No user token found! Please login again.");
        alert("No user token found! Please login again.");
        setLoading(false);
        return;
      }

      console.log("User Token Being Sent:", token);

      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-h0uj.onrender.com/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(data);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
        alert("Failed to fetch user profile. Try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 overflow-hidden">
      {/* Blurred animated blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-ping"></div>
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-green-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>

      {/* Top Buttons */}
      <div className="flex gap-4 mb-6 relative z-10">
        <Link
          to="/home"
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition"
        >
          View Products
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* User Card */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Dashboard
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">
            Loading profile...
          </p>
        ) : user ? (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-gray-700">
              👤 {user.name}
            </p>
            <p className="text-lg font-medium text-gray-700">📧 {user.email}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">Failed to load profile.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
