import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";

const Shop = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      const grouped = groupByCategory(res.data);
      setProductsByCategory(grouped);
    };
    fetchProducts();
  }, []);

  // Group products by category
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🛍️ Shop by Category
        </h1>

        {Object.keys(productsByCategory).map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsByCategory[category].map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-indigo-600 font-extrabold text-xl">
                    ₹{product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
