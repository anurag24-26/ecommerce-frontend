import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import CartButton from "../components/CartButton";
import WishlistButton from "../components/WishlistButton";

const ratingDescriptions = {
  1: { emoji: "😞", text: "Very Poor" },
  2: { emoji: "😐", text: "Poor" },
  3: { emoji: "😊", text: "Average" },
  4: { emoji: "👍", text: "Good" },
  5: { emoji: "🤩", text: "Excellent" },
};

const Info = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  // Rating & Review States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const data = res.data;
        setProduct(data);
        setSelectedImage(
          data.image?.startsWith("https")
            ? data.image
            : data.images?.[0] || "https://via.placeholder.com/150"
        );
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Submit Review Handler
  const handleSubmitReview = () => {
    if (rating === 0 || !review.trim()) {
      alert("Please provide both a rating and a review.");
      return;
    }
    const newReview = {
      id: Date.now(),
      rating,
      review: review.trim(),
      date: new Date().toLocaleDateString(),
    };
    setReviewsList([newReview, ...reviewsList]);
    setRating(0);
    setReview("");
    setHoverRating(0);
    alert("🎉 Thanks for your review!");
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-100 p-6 sm:p-12 flex items-center justify-center">
        {loading ? (
          <p className="text-center text-indigo-600 text-xl animate-pulse">
            Loading product...
          </p>
        ) : product ? (
          <section className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex flex-col items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-2xl cursor-pointer transition-transform hover:scale-105"
                onClick={() => setIsZoomed(true)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsZoomed(true);
                }}
              />

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
                {product.images?.length > 0 &&
                  product.images.map((img, i) => {
                    const isSelected = selectedImage === img;
                    return (
                      <img
                        key={i}
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded-lg object-cover cursor-pointer border-2 transition
                          ${isSelected ? "border-indigo-600" : "border-transparent hover:border-indigo-500"}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setSelectedImage(img);
                        }}
                      />
                    );
                  })}
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

              {/* Rating & Review Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  🌟 Rate this product:
                </h3>

                <div className="flex gap-4 mt-3 select-none">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const filled =
                      hoverRating >= num || (!hoverRating && rating >= num);
                    return (
                      <div
                        key={num}
                        onClick={() => setRating(num)}
                        onMouseEnter={() => setHoverRating(num)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`cursor-pointer text-4xl transition-transform ${
                          filled ? "scale-110" : "scale-90"
                        }`}
                        aria-label={`${num} star${num > 1 ? "s" : ""}`}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") setRating(num);
                        }}
                      >
                        {ratingDescriptions[num].emoji}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-1 text-indigo-600 font-semibold min-h-[1.5rem]">
                  {hoverRating
                    ? ratingDescriptions[hoverRating].text
                    : rating
                    ? ratingDescriptions[rating].text
                    : "Select a rating"}
                </p>

                <textarea
                  placeholder="📝 Share your thoughts..."
                  className="w-full mt-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={3}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />

                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || !review.trim()}
                  className={`mt-3 py-2 px-4 rounded-lg font-semibold transition ${
                    rating === 0 || !review.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  ✍️ Submit Review
                </button>
              </div>

              {/* Display submitted reviews */}
              {reviewsList.length > 0 && (
                <section className="mt-8 max-h-64 overflow-y-auto border-t border-gray-300 pt-4">
                  <h4 className="text-xl font-semibold mb-3 text-gray-700">
                    User Reviews ({reviewsList.length})
                  </h4>
                  <ul className="space-y-4">
                    {reviewsList.map(({ id, rating, review, date }) => (
                      <li
                        key={id}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">
                            {ratingDescriptions[rating].emoji}
                          </span>
                          <span className="font-semibold text-indigo-600">
                            {ratingDescriptions[rating].text}
                          </span>
                          <time className="ml-auto text-sm text-gray-500" dateTime={new Date(date).toISOString()}>
                            {date}
                          </time>
                        </div>
                        <p className="text-gray-700">{review}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => alert("🚀 Order Now functionality coming soon!")}
                  className="bg-green-500 w-60 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  🚀 Order Now
                </button>

                <CartButton product={product} />
                <WishlistButton product={product} />
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center text-red-500 text-xl">❌ Product not found</div>
        )}
      </main>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsZoomed(false);
          }}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Zoomed view"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-4xl focus:outline-none"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoomed image"
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
