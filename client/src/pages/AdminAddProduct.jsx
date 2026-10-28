import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminAddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Ready-made Masala",
    description: "",
    image: "/images/garam-masala.jpg",
    price: "",
    unit: "pack",
    stock: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setSuccessToast(`Product "${formData.name}" added successfully!`);

      // Clear form
      setFormData({
        name: "",
        category: "Ready-made Masala",
        description: "",
        image: "/images/garam-masala.jpg",
        price: "",
        unit: "pack",
        stock: "",
        available: true,
      });

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);

    } catch (err) {
      console.error("Add product error:", err);
      setError(err.message || "Failed to add new product. Please check server.");
    } finally {
      setLoading(false);
    }
  };

  const sampleImages = [
    { label: "Garam Masala", path: "/images/garam-masala.jpg" },
    { label: "Goda Masala", path: "/images/goda-masala.jpg" },
    { label: "Red Chilli", path: "/images/red-chilli.jpg" },
    { label: "Turmeric", path: "/images/turmeric.jpg" },
    { label: "Mango Pickle", path: "/images/mango-pickle.jpg" },
    { label: "Bay Leaf", path: "/images/bay-leaf.jpg" },
    { label: "Cumin / Jeera", path: "/images/cumin.jpg" },
    { label: "Kasuri Methi", path: "/images/dried-fenugreek.jpg" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">

      {/* SUCCESS TOAST */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in font-semibold text-sm">
          <span>✅</span>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Add New Product
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add a new spice, masala, or pickle to your online store catalog.
          </p>
        </div>

        <Link
          to="/admin/products"
          className="text-sm font-semibold text-gray-500 hover:text-orange-600 transition"
        >
          ← Back to Catalog
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Kolhapuri Special Masala"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="Ready-made Masala">Ready-made Masala</option>
                <option value="Loose Masala">Loose Masala</option>
                <option value="Pickles">Pickles</option>
                <option value="Akkha Masala">Akkha Masala</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Unit of Measure *
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="e.g. 500g, 1kg, bottle, pack"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="250"
                min="1"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Available Stock Count *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="50"
                min="0"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the authentic taste, ingredients, and recommended usage..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          {/* Image URL & Presets */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Product Image Path / URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/garam-masala.jpg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition mb-3"
            />

            <p className="text-xs text-gray-500 mb-2">Or choose from store assets:</p>
            <div className="flex flex-wrap gap-2">
              {sampleImages.map((img) => (
                <button
                  key={img.path}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: img.path })}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                    formData.image === img.path
                      ? "border-orange-500 bg-orange-50 text-orange-700 font-bold"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
            />
            <label htmlFor="available" className="text-sm font-semibold text-gray-800">
              Mark product as Available for purchase
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3.5 rounded-xl text-white font-bold transition shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 shadow-orange-200"
              }`}
            >
              {loading ? "Adding Product to Database..." : "Save and Publish Product →"}
            </button>
            <Link
              to="/admin/products"
              className="px-6 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition text-sm"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
}

export default AdminAddProduct;