import { useContext, useState } from "react";
import WishlistContext from "../context/WishlistContext";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [message, setMessage] = useState("");

  const handleAddToWishlist = () => {
    // Check if product already in wishlist by id or unique identifier
    const exists = wishlist.some(item => item.id === product.id);

    if (exists) {
      setMessage("❌ Item already exists in wishlist");
    } else {
      try {
        addToWishlist(product);
        setMessage("✅ Added to wishlist successfully!");
      } catch (error) {
        console.error(error);
        setMessage("❌ Failed to add to wishlist.");
      }
    }

    // Clear message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAddToWishlist}
        className="mt-4 w-60 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
      >
        ❤️ Add to Wishlist
      </button>

      {/* Show success or error message */}
      {message && (
        <p
          className={`mt-2 text-center text-sm font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default WishlistButton;
