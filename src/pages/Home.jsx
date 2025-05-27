import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const shuffledProducts = shuffleArray(res.data);
        setProducts(shuffledProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const isNewArrival = (createdAt) => {
    const productDate = new Date(createdAt);
    const currentDate = new Date();
    const diffDays = Math.floor(
      (currentDate - productDate) / (1000 * 60 * 60 * 24)
    );
    return diffDays <= 2;
  };

  // Calculate average rating
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return total / reviews.length;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-wide text-indigo-700">
            ✨ Featured Products ✨
          </h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-3 text-center text-gray-600 animate-pulse text-lg">
              🚀 Loading products...
            </p>
          ) : products.length > 0 ? (
            products.map((product) => {
              const avgRating = getAverageRating(product.reviews);
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-4 cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="w-full aspect-[4/3] bg-white rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          src={
                            product.image?.startsWith("https")
                              ? product.image
                              : product.images?.length > 0
                              ? product.images[0]
                              : "https://via.placeholder.com/150"
                          }
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      {/* New Arrival Badge */}
                      {isNewArrival(product.createdAt) && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full shadow-md">
                          New Arrival 🚀
                        </div>
                      )}

                      {/* +More Images Badge */}
                      {product.images?.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          +{product.images.length - 1} More
                        </div>
                      )}
                    </div>

                    <h2 className="text-lg font-bold mt-4 text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {product.brand} | {product.category}
                    </p>

                    {/* Review Section */}
                    {product.reviews?.length > 0 ? (
                      <div className="mt-2 flex items-center text-sm text-yellow-500 gap-1">
                        <span>
                          {"★".repeat(Math.round(avgRating))}
                          {"☆".repeat(5 - Math.round(avgRating))}
                        </span>
                        <span className="text-gray-500 ml-1 text-xs">
                          ({product.reviews.length} reviews)
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-gray-400 italic">
                        No reviews yet
                      </div>
                    )}

                    <p className="text-indigo-600 font-extrabold text-xl mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-gray-600 text-lg">
              ❌ No products available
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
