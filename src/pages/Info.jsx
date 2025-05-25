import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import CartButton from "../components/CartButton";
import WishlistButton from "../components/WishlistButton";  // <--- Import WishlistButton

const Info = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(
          res.data.image?.startsWith("https")
            ? res.data.image
            : res.data.images?.[0] || "https://via.placeholder.com/150"
        );
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
      <div className="relative min-h-screen bg-gray-100 p-6 sm:p-12 flex items-center justify-center">
        {loading ? (
          <p className="text-center text-white text-xl animate-pulse">
            Loading product...
          </p>
        ) : product ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex flex-col items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-2xl cursor-pointer transition-all hover:scale-105"
                onClick={() => setIsZoomed(true)}
              />
              <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
                {product.images?.length > 0 &&
                  product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i}`}
                      onClick={() => setSelectedImage(img)}
                      className="w-16 h-16 rounded-lg object-cover cursor-pointer border-2 border-transparent hover:border-indigo-500 transition"
                    />
                  ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mt-2">
                {product.description}
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category}
                </p>
              </div>
              <p className="text-3xl text-indigo-600 font-extrabold mt-6">
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

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => alert("Order Now functionality coming soon!")}
                  className="bg-green-500 mt-4 w-60 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  🚀 Order Now
                </button>
                <CartButton product={product} />
                <WishlistButton product={product} />  {/* <--- Added WishlistButton here */}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white text-center">
            <p className="text-2xl">❌ Product not found</p>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Zoomed view"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-4xl"
              onClick={() => setIsZoomed(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
