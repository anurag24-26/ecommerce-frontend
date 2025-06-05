import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: "All",
    brand: "All",
    priceRange: "All",
  });
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-h0uj.onrender.com/api/products"
        );
        setProducts(data);
        setLoading(false);

        // Extract unique categories and brands
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        const uniqueBrands = [...new Set(data.map((p) => p.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      let filtered = products.filter((product) => {
        const lowerQuery = query.toLowerCase();
        return (
          product.name?.toLowerCase().includes(lowerQuery) ||
          product.category?.toLowerCase().includes(lowerQuery) ||
          product.brand?.toLowerCase().includes(lowerQuery) ||
          product.description?.toLowerCase().includes(lowerQuery)
        );
      });

      // Apply additional filters
      if (filters.category !== "All") {
        filtered = filtered.filter((product) => product.category === filters.category);
      }

      if (filters.brand !== "All") {
        filtered = filtered.filter((product) => product.brand === filters.brand);
      }

      if (filters.priceRange !== "All") {
        filtered = filtered.filter((product) => {
          const price = product.price;
          switch (filters.priceRange) {
            case "Under 500": return price < 500;
            case "500-1000": return price >= 500 && price <= 1000;
            case "Above 1000": return price > 1000;
            default: return true;
          }
        });
      }

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Search Results for "{query}"
        </h1>

        {/* Filter Controls */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300 shadow-md hover:shadow-lg transition"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300 shadow-md hover:shadow-lg transition"
          >
            <option value="All">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300 shadow-md hover:shadow-lg transition"
          >
            <option value="All">All Prices</option>
            <option value="Under 500">Under ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="Above 1000">Above ₹1000</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-gray-500 text-lg">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-4"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mt-2">₹{product.price}</p>
                  <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition">
                    View Product
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
