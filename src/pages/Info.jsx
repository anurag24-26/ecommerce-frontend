import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";

const Info = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-cyan-500 p-8">
        {loading ? (
          <p className="text-center text-white text-lg">
            🚀 Loading product details...
          </p>
        ) : product ? (
          <div className="relative z-10 flex flex-col items-center bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-lg mx-auto max-w-3xl">
            <img
              src={
                product.image?.startsWith("https")
                  ? product.image
                  : "https://via.placeholder.com/150"
              }
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl text-gray-700 mt-2 font-medium">
              Brand: {product.brand}
            </p>
            <p className="text-xl text-gray-700 mt-2">
              Category: {product.category}
            </p>
            <p className="text-2xl font-extrabold text-indigo-600 mt-4">
              ₹{product.price}
            </p>
            <p
              className={`text-lg font-semibold mt-3 ${
                product.countInStock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.countInStock > 0
                ? `In Stock (${product.countInStock})`
                : "Out of Stock"}
            </p>
            <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
              🛒 Add to Cart
            </button>
          </div>
        ) : (
          <p className="text-center text-white text-lg">❌ Product not found</p>
        )}
      </div>
    </>
  );
};

export default Info;
