import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-cyan-500 p-8">
        {/* Blurred Decorative Background */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-96 h-96 bg-white opacity-30 blur-3xl rounded-full"></div>
          <div className="w-72 h-72 bg-cyan-300 opacity-20 blur-2xl absolute top-20 right-40"></div>
          <div className="w-64 h-64 bg-pink-400 opacity-20 blur-2xl absolute bottom-20 left-40"></div>
        </div>

        {/* Header Section */}
        <div className="relative z-10 flex justify-between items-center mb-10 text-white">
          <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
            ✨ Featured Products ✨
          </h1>
        </div>

        {/* Product Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading ? (
            <p className="text-center text-white col-span-3 animate-pulse text-lg">
              🚀 Loading products...
            </p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    {/* ✅ Keeps earlier logic for single images while incorporating schema changes */}
                    <img
                      src={
                        product.image?.startsWith("https") // ✅ Earlier logic (single image support)
                          ? product.image
                          : product.images?.length > 0 // ✅ New schema logic (multiple images)
                          ? product.images[0] // Show first image if multiple exist
                          : "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                      className="w-full h-52 object-cover rounded-md hover:scale-105 transition duration-300"
                    />

                    {/* Indicate more images if available */}
                    {product.images?.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        +{product.images.length - 1} More
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mt-4 text-gray-800">{product.name}</h2>
                  <p className="text-gray-500 text-sm">{product.brand} | {product.category}</p>
                  <p className="text-3xl font-extrabold text-indigo-600 mt-2">₹{product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-white col-span-3 text-lg">
              ❌ No products available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
