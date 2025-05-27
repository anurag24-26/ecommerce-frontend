import { useContext, useState } from "react";
import WishlistContext from "../context/WishlistContext";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [message, setMessage] = useState("");

  const handleAddToWishlist = () => {
    // Use _id for uniqueness check, same as context
    const exists = wishlist.some((item) => item.id === product.id);

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
