import { useEffect, useState } from "react";
import axios from "axios";
import adminimage from "../assets/admin.jpg"
const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: [],
    brand: "",
    category: "",
    countInStock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch Admin Profile & Products
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("No admin token found! Please login again.");
        return;
      }

      try {
        const [adminRes, productsRes] = await Promise.all([
          axios.get(
            "https://ecommerce-backend-h0uj.onrender.com/api/admin/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get("https://ecommerce-backend-h0uj.onrender.com/api/products"),
        ]);
        setAdmin(adminRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        alert("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e, isEditing = false) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const formData = new FormData();

    files.forEach((file) => formData.append("images", file)); // ✅ Append multiple files

    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-h0uj.onrender.com/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Uploaded Images:", data.imageUrls); // ✅ Debugging Log

      if (isEditing) {
        setEditingProduct((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...data.imageUrls],
        }));
      } else {
        setNewProduct((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...data.imageUrls],
        }));
      }
    } catch (error) {
      alert("Failed to upload images.");
      console.error("Upload Error:", error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.images || newProduct.images.length === 0) {
      // ✅ Check for empty array
      alert("Please upload at least one image.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-h0uj.onrender.com/api/products",
        newProduct, // ✅ No need to spread object
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      console.log("Created Product:", data); // ✅ Debugging Log

      setProducts([...products, data]);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        images: [], // ✅ Reset properly
        brand: "",
        category: "",
        countInStock: "",
      });
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      alert("Failed to create product.");
    }
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Handle Update Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://ecommerce-backend-h0uj.onrender.com/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      alert("Product updated successfully!");
      setProducts(products.map((p) => (p._id === data._id ? data : p)));
      setEditingProduct(null);
    } catch (error) {
      alert("Failed to update product.");
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce-backend-h0uj.onrender.com/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      alert("Product deleted successfully!");
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
  <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
    {/* Heading */}
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
      <p className="text-gray-500 text-md">Manage your products and settings</p>
    </div>

    {/* Admin Profile */}
    {admin && (
      <div className="flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
        <div className="w-24 h-24 mb-4">
          <img
            src={adminimage} // You can add a default avatar here
            alt="Admin Avatar"
            className="rounded-full object-cover w-full h-full shadow-lg"
          />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800">{admin.name}</h3>
          <p className="text-gray-600">{admin.email}</p>
        </div>
      </div>
    )}


        {/* New Product Form */}
       <form
  onSubmit={handleCreateProduct}
  className="bg-white p-8 rounded-lg shadow-lg space-y-6"
>
  <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
    Add New Product
  </h3>

  {/* Product Name */}
  <div className="flex flex-col">
    <label className="text-gray-700 mb-2 font-semibold">Product Name</label>
    <input
      type="text"
      placeholder="Enter product name"
      value={newProduct.name}
      onChange={(e) =>
        setNewProduct({ ...newProduct, name: e.target.value })
      }
      className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>

  {/* Price and Stock (Grouped) */}
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="text-gray-700 mb-2 font-semibold">Price (₹)</label>
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="text-gray-700 mb-2 font-semibold">Stock</label>
      <input
        type="number"
        placeholder="Stock Qty"
        value={newProduct.countInStock}
        onChange={(e) =>
          setNewProduct({ ...newProduct, countInStock: e.target.value })
        }
        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
  </div>

  {/* Brand and Category (Grouped) */}
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="text-gray-700 mb-2 font-semibold">Brand</label>
      <input
        type="text"
        placeholder="Brand name"
        value={newProduct.brand}
        onChange={(e) =>
          setNewProduct({ ...newProduct, brand: e.target.value })
        }
        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="text-gray-700 mb-2 font-semibold">Category</label>
      <input
        type="text"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
        className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
  </div>

  {/* Description */}
  <div className="flex flex-col">
    <label className="text-gray-700 mb-2 font-semibold">Description</label>
    <textarea
      placeholder="Product Description"
      value={newProduct.description}
      onChange={(e) =>
        setNewProduct({ ...newProduct, description: e.target.value })
      }
      className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 h-28"
      required
    ></textarea>
  </div>

  {/* Image Upload */}
  <div className="flex flex-col">
    <label className="text-gray-700 mb-2 font-semibold">Product Images</label>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => handleImageUpload(e, false)}
      className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Preview Uploaded Images */}
  {newProduct.images && newProduct.images.length > 0 && (
    <div className="flex flex-wrap gap-3 mt-4">
      {newProduct.images.map((imgUrl, idx) => (
        <img
          key={idx}
          src={imgUrl}
          alt={`Uploaded ${idx}`}
          className="w-20 h-20 object-cover rounded-md border"
        />
      ))}
    </div>
  )}

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
  >
    Create Product
  </button>
</form>
{/* Product List */}
<h3 className="text-3xl font-bold mt-8 mb-6 text-gray-800 text-center">
  All Products
</h3>

{products.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {products.map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-lg shadow-lg p-5 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition"
      >
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={
              product.image?.startsWith("https")
                ? product.image
                : product.images?.length > 0
                ? product.images[0]
                : "https://via.placeholder.com/150"
            }
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 w-full">
          <h4 className="text-xl font-semibold text-gray-800 mb-1">
            {product.name}
          </h4>
          <p className="text-gray-500 mb-2">
            {product.brand} | {product.category}
          </p>
          <p className="text-lg font-bold text-blue-600 mb-4">₹{product.price}</p>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleEditProduct(product)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-center text-gray-500 text-lg">No products available</p>
)}



        {/* Edit Product Form */}
        {editingProduct && (
          <form onSubmit={handleUpdateProduct} className="space-y-4 mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Product
            </h3>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, true)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {editingProduct.image && (
              <img
                src={editingProduct.image}
                alt="Uploaded Preview"
                className="w-32 h-32 object-cover mx-auto mt-4 rounded-md"
              />
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
