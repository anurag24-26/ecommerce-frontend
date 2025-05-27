import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

const CartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: true,
  });

  const handleAddToCart = () => {
    try {
      addToCart(product);
      setPopup({
        show: true,
        message: "✅ Added to cart successfully!",
        success: true,
      });
    } catch (error) {
      console.error(error);
      setPopup({
        show: true,
        message: "❌ Failed to add to cart.",
        success: false,
      });
    }

    // Auto-close after 2 seconds
    setTimeout(() => setPopup({ ...popup, show: false }), 2000);
  };

  return (
    <div className="w-full relative">
      <button
        onClick={handleAddToCart}
        className="mt-4 w-60 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >
        🛒 Add to Cart
      </button>

      {/* Modal Popup */}
      {popup.show && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-72">
            <p
              className={`text-lg font-medium mb-4 ${
                popup.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {popup.message}
            </p>
            <button
              onClick={() => setPopup({ ...popup, show: false })}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartButton;
