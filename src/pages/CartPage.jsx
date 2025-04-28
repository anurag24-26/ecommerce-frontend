import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-gradient-to-br from-blue-500 to-indigo-800">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            🛒 Your Cart
          </h1>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    {/* Product Image & Link */}
                    <Link
                      to={`/product/${product._id}`}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          product.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md border hover:border-indigo-600 transition"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          ₹{product.price} × {quantity} = ₹
                          {(product.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      ❌ Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Price & Checkout Button */}
              <div className="text-right mt-10 border-t pt-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Total: ₹{totalPrice.toFixed(2)}
                </h2>
                <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition text-lg font-semibold">
                  🚀 Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
