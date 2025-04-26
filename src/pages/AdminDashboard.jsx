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
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-h0uj.onrender.com/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (isEditing) {
        setEditingProduct({ ...editingProduct, image: data.imageUrl });
      } else {
        setNewProduct({ ...newProduct, image: data.imageUrl });
      }
    } catch (error) {
      alert("Failed to upload image.");
    }
  };
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const finalImage = newProduct.image || "default_image_url"; // Ensure a valid image is sent
    setNewProduct({ ...newProduct, image: finalImage });

    console.log("Creating product with image:", finalImage); // Debugging Log

    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-h0uj.onrender.com/api/products",
        { ...newProduct, image: finalImage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("Product created successfully!");
      setProducts([...products, data]);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: "",
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
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Dashboard
        </h2>

        {/* Admin Profile */}
        {admin && (
          <div className="text-center mb-6 bg-gray-200 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              Name: {admin.name}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Email: {admin.email}
            </p>
          </div>
        )}

        {/* New Product Form */}
        <form
          onSubmit={handleCreateProduct}
          className="space-y-4 bg-white p-6 shadow-md rounded-md"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Create New Product
          </h3>

          {/* Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Product Price */}
          <input
            type="number"
            placeholder="Price ($)"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Product Description */}
          <textarea
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-24"
            required
          ></textarea>

          {/* Brand */}
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Count in Stock */}
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.countInStock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, countInStock: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Product Image Upload */}
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, false)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover mx-auto mt-4 rounded-md"
            />
          )}

          {/* Submit Button */}
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
                className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between shadow-md"
              >
                <div>
                  <p className="text-lg font-medium">
                    {product.name} - ${product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.brand} | {product.category}
                  </p>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No products available</p>
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
