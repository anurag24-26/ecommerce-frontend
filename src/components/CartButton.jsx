import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

const CartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    try {
      addToCart(product);
      setMessage("✅ Added to cart successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add to cart.");
    }

    // Clear message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAddToCart}
        className="mt-4 w-60 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >
        🛒 Add to Cart
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

export default CartButton;
