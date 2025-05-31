import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        isInWishlist ? "bg-red-500" : "bg-indigo-500"
      } text-white w-60 py-2 rounded-lg font-semibold hover:opacity-90 transition`}
    >
      {isInWishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
