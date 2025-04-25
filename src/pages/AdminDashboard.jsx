import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch Admin Profile
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("No admin token found! Please login again.");
        alert("No admin token found! Please login again.");
        return;
      }

      console.log("Admin Token Being Sent:", token); // Debugging Log

      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-h0uj.onrender.com/api/admin/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdmin(data);
      } catch (error) {
        console.error(
          "Error fetching admin profile:",
          error.response?.data || error.message
        );
        alert("Failed to fetch admin profile. Try logging in again.");
      }
    };

    // Fetch Products
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-h0uj.onrender.com/api/products"
        );
        setProducts(data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
        alert("Error fetching products.");
      }
    };

    fetchAdminData();
    fetchProducts();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-h0uj.onrender.com/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setNewProduct({ ...newProduct, image: data.imageUrl });
    } catch (error) {
      console.error(
        "Image upload error:",
        error.response?.data || error.message
      );
      alert("Failed to upload image.");
    }
  };

  // Handle New Product Submission
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ecommerce-backend-h0uj.onrender.com/api/products",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      alert("Product created successfully!");

      // Refresh product list
      const { data } = await axios.get(
        "https://ecommerce-backend-h0uj.onrender.com/api/products"
      );
      setProducts(data);
    } catch (error) {
      console.error(
        "Product creation error:",
        error.response?.data || error.message
      );
      alert("Failed to create product.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Dashboard
        </h2>

        {/* Admin Profile */}
        {admin ? (
          <div className="text-center mb-6 bg-gray-200 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              Name: {admin.name}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Email: {admin.email}
            </p>
          </div>
        ) : (
          <p className="text-center text-red-500">Loading admin profile...</p>
        )}

        {/* Create Product Form */}
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Create New Product
        </h3>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {newProduct.image && (
            <img
              src={
                newProduct.image.startsWith("http")
                  ? newProduct.image
                  : `https://ecommerce-backend-h0uj.onrender.com${newProduct.image}`
              }
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover mx-auto mt-4 rounded-md"
            />
          )}

          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Count in Stock"
            value={newProduct.countInStock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, countInStock: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Create Product
          </button>
        </form>

        {/* Product List */}
        <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
          All Products
        </h3>
        {products.length > 0 ? (
          <ul className="space-y-3">
            {products.map((product) => (
              <li
                key={product._id}
                className="p-4 border rounded-lg bg-gray-50 flex items-center gap-4 shadow-md"
              >
                <img
                  src={`https://ecommerce-backend-h0uj.onrender.com${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-medium">
                    {product.name} - ${product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.brand} | {product.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
