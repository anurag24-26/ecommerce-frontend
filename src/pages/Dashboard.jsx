import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <Link
        to="/home"
        className="mb-6 bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition"
      >
        View Products
      </Link>

      <div className="w-full max-w-md p-6 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-lg">
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
