import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 text-white">
        <h1 className="text-4xl font-bold">Featured Products</h1>
        <Link
          to="/dashboard"
          className="bg-white text-blue-600 px-5 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-white col-span-3 animate-pulse">
            Loading products...
          </p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src={`https://ecommerce-backend-h0uj.onrender.com${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition"
              />
              <h2 className="text-xl font-semibold mt-3 text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600">
                {product.brand} | {product.category}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ${product.price}
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-white col-span-3">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
