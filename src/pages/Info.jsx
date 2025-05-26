import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import CartButton from "../components/CartButton";
import WishlistButton from "../components/WishlistButton";

const Info = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const currentUser = "You"; // Simulated logged-in user

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

  const handleReviewSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide both a rating and comment.");
      return;
    }

    const newReview = {
      user: currentUser,
      rating,
      comment,
    };

    setSubmittingReview(true);

    setTimeout(() => {
      setProduct((prev) => ({
        ...prev,
        reviews: [newReview, ...(prev.reviews || [])],
      }));
      setRating(0);
      setComment("");
      setSubmittingReview(false);
      alert("✅ Review submitted!");
    }, 1000);
  };

  const handleReviewDelete = (indexToRemove) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    setProduct((prev) => {
      const updatedReviews = prev.reviews.filter((_, i) => i !== indexToRemove);
      return { ...prev, reviews: updatedReviews };
    });

    setTimeout(() => {
      alert("❌ Review deleted!");
    }, 500);
  };

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
              <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600 text-lg mt-2">{product.description}</p>
              <div className="mt-4 space-y-2">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
              </div>
              <p className="text-3xl text-indigo-600 font-extrabold mt-6">₹{product.price}</p>
              <p
                className={`text-lg font-semibold mt-3 ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.countInStock > 0
                  ? `In Stock (${product.countInStock})`
                  : "Out of Stock"}
              </p>

              {/* Button Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start flex-wrap gap-4 mt-6">
                <button
                  onClick={() => alert("Order Now functionality coming soon!")}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  🚀 Order Now
                </button>
                <CartButton product={product} />
                <WishlistButton product={product} />
              </div>

              {/* Review Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">⭐ Add a Review</h2>

                {/* Emoji Rating UI */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-1">Rating:</label>
                  <div className="flex gap-4 mb-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRating(r)}
                        className={`flex flex-col items-center text-xl p-2 rounded-lg transition duration-200 ${
                          rating === r ? "bg-yellow-100 scale-110" : "hover:bg-gray-100"
                        }`}
                      >
                        <span>{emojiMap[r]}</span>
                        <span className="text-sm">{labelMap[r]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Box */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-1">Comment:</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    rows={4}
                    placeholder="Write your review here..."
                  />
                </div>
                <button
                  onClick={handleReviewSubmit}
                  disabled={submittingReview}
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>

              {/* Review List */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Reviews</h2>
                  <div className="space-y-4">
                    {product.reviews.map((rev, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 p-4 rounded-xl shadow-md border border-gray-200"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <p className="font-semibold">{rev.user || "User"}</p>
                            <p className="text-2xl">
                              {emojiMap[rev.rating] || "⭐"}{" "}
                              <span className="text-gray-600 text-sm">
                                ({rev.rating}/5)
                              </span>
                            </p>
                          </div>
                          {rev.user === currentUser && (
                            <button
                              onClick={() => handleReviewDelete(idx)}
                              className="text-red-600 hover:text-red-800 font-bold text-sm"
                              title="Delete Review"
                            >
                              ❌
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
