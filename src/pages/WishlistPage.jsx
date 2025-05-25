import { useContext } from "react";
import { Link } from "react-router-dom";
import WishlistContext from "../context/WishlistContext";
import Navbar from "../components/Navbar";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-gradient-to-br from-pink-500 to-purple-700">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            💖 Your Wishlist
          </h1>

          {wishlist.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="space-y-6">
              {wishlist.map((product) => (
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
                      className="w-20 h-20 object-cover rounded-md border hover:border-purple-600 transition"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 text-sm">₹{product.price}</p>
                    </div>
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
