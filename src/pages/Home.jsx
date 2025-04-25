import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import for navigation
import API from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        {/* Link to User Dashboard */}
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <img
                src={`https://ecommerce-backend-h0uj.onrender.com${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">
                {product.brand} | {product.category}
              </p>
              <p className="text-xl font-bold text-blue-600">
                ${product.price}
              </p>
              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
