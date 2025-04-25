import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-h0uj.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        alert("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link
        to="/home"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Products
      </Link>
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          User Dashboard
        </h2>
        {user ? (
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Name: {user.name}</p>
            <p className="text-lg font-medium">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
