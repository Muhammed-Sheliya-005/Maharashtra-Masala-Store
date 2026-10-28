import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Ready-made Masala",
    description: "",
    image: "",
    price: "",
    unit: "pack",
    stock: "",
    available: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product not found");
        }

        setFormData({
          name: data.name || "",
          category: data.category || "Ready-made Masala",
          description: data.description || "",
          image: data.image ? data.image.trim() : "/images/red-chilli.jpg",
          price: data.price || "",
          unit: data.unit || "pack",
          stock: data.stock || "",
          available: data.available ?? true,
        });
      } catch (err) {
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      setSuccessToast(`Product "${formData.name}" updated successfully!`);

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);

    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update product");
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="p-10 max-w-4xl mx-auto text-center">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm">Loading product for editing...</p>
      </div>
    );
  }

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
            Edit Product
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Update pricing, stock availability, and information for {formData.name}.
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
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Product Image Path / URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
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

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 py-3.5 rounded-xl text-white font-bold transition shadow-md ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 shadow-orange-200"
              }`}
            >
              {saving ? "Saving Changes..." : "Update Product →"}
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

export default AdminEditProduct;