import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartButton from "../components/CartButton";
import WishlistContext from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";

const API_BASE = "https://ecommerce-backend-h0uj.onrender.com/api";

const emojiMap = {
  1: "😢",
  2: "😔",
  3: "😐",
  4: "😊",
  5: "😄",
};

const labelMap = {
  1: "Poor",
  2: "Below avg",
  3: "Average",
  4: "Good",
  5: "Impressive",
};

const Info = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const { wishlist, addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(
          data.image?.startsWith("https")
            ? data.image
            : data.images?.[0] || "https://via.placeholder.com/150"
        );
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToWishlist = () => {
    if (wishlist.some((item) => item.id === product.id)) {
      setMessage("❌ Already in wishlist");
    } else {
      try {
        addToWishlist(product);
        setMessage("✅ Added to wishlist");
      } catch {
        setMessage("❌ Failed to add to wishlist");
      }
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const handleReviewSubmit = async () => {
    if (!rating || !comment.trim()) {
      return alert("Please provide both rating and comment");
    }

    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      alert("Login required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/products/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) {
        throw new Error("Review submission failed");
      }

      const updatedProduct = await res.json();
      setProduct(updatedProduct);
      setRating(0);
      setComment("");
      alert("✅ Review submitted!");
    } catch (err) {
      alert("❌ Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex items-center justify-center text-xl text-gray-700">
          Loading product...
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex items-center justify-center text-xl text-red-500">
          ❌ Product not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 sm:p-12 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
          {/* Left: Images */}
          <div className="md:w-1/2 p-6 flex flex-col items-center">
            <img
              src={selectedImage}
              alt={product.name}
              onClick={() => setIsZoomed(true)}
              className="w-full h-[400px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
            />
            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumb ${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="w-16 h-16 rounded-lg object-cover cursor-pointer border-2 border-transparent hover:border-indigo-500"
                />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="md:w-1/2 p-8 flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>
              <button onClick={handleAddToWishlist}>
                <FaHeart className="text-pink-500 text-3xl" />
              </button>
            </div>
            {message && (
              <p
                className={`text-sm mt-1 font-medium ${
                  message.startsWith("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-3 space-y-1 text-gray-700">
              <p>
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
            </div>

            <p className="text-3xl text-indigo-600 font-extrabold mt-6">
              ₹{product.price}
            </p>
            <p
              className={`mt-2 font-semibold ${
                product.countInStock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.countInStock > 0
                ? `In Stock (${product.countInStock})`
                : "Out of Stock"}
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => alert("Order feature coming soon!")}
                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
              >
                🚀 Order Now
              </button>
              <CartButton product={product} />
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">⭐ Add a Review</h2>
              <div className="flex gap-4 mb-3">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRating(r)}
                    className={`flex flex-col items-center text-xl p-2 rounded ${
                      rating === r
                        ? "bg-yellow-100 scale-110"
                        : "hover:bg-gray-100"
                    } transition`}
                  >
                    <span>{emojiMap[r]}</span>
                    <span className="text-sm">{labelMap[r]}</span>
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Write your review..."
                className="w-full border rounded px-4 py-2 mb-4"
              />
              <button
                onClick={handleReviewSubmit}
                disabled={submitting}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>

              {/* Display Reviews */}
              {product.reviews?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3">📝 Reviews</h3>
                  <div className="space-y-4">
                    {product.reviews.map((rev, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 p-4 rounded-xl border"
                      >
                        <p className="font-semibold">
                          {rev.user?.name || "User"}
                        </p>
                        <p className="text-xl">
                          {emojiMap[rev.rating]}{" "}
                          <span className="text-sm text-gray-500">
                            ({rev.rating}/5)
                          </span>
                        </p>
                        <p>{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
