import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";

const Info = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(""); // Selected image state
  const [isZoomed, setIsZoomed] = useState(false); // Lightbox zoom state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(
          res.data.image?.startsWith("https")
            ? res.data.image
            : res.data.images?.length > 0
            ? res.data.images[0]
            : "https://via.placeholder.com/150"
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
      <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-12">
        {loading ? (
          <p className="text-center text-white text-lg">Loading product details...</p>
        ) : product ? (
          <div className="flex flex-col sm:flex-row items-center bg-white p-8 rounded-xl shadow-lg mx-auto max-w-6xl">
            {/* Left Column: Image Display */}
            <div className="flex flex-col items-center sm:w-1/2">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4 cursor-pointer transition-transform duration-300 transform hover:scale-105"
                onClick={() => setIsZoomed(true)} // Open zoom
              />

              {/* Thumbnail Selection */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {product.images?.length > 1 ? (
                  product.images.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Preview ${idx}`}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-indigo-600 transition-colors"
                      onClick={() => setSelectedImage(imgUrl)}
                    />
                  ))
                ) : (
                  <img
                    src={selectedImage} // Default single image
                    alt="Single Image"
                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="sm:w-1/2 sm:pl-12 mt-6 sm:mt-0">
              <h1 className="text-4xl font-semibold text-gray-800">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl text-gray-700 mt-4">Brand: {product.brand}</p>
              <p className="text-xl text-gray-700">Category: {product.category}</p>
              <p className="text-3xl font-extrabold text-indigo-600 mt-6">₹{product.price}</p>

              {/* Stock Status */}
              <p
                className={`text-lg font-semibold mt-3 ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.countInStock > 0
                  ? `In Stock (${product.countInStock})`
                  : "Out of Stock"}
              </p>

              {/* Add to Cart Button */}
              <button className="mt-6 w-full sm:w-72 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-white text-lg">❌ Product not found</p>
        )}
      </div>

      {/* Lightbox / Fullscreen Image Zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={selectedImage}
            alt="Zoomed Product"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsZoomed(false)}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default Info;
