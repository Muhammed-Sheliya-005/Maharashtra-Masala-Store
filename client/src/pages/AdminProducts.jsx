import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModalProduct, setDeleteModalProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    if (!deleteModalProduct) return;

    try {
      setIsDeleting(true);
      const adminToken = localStorage.getItem("adminToken");
      const headers = {};
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const response = await fetch(
        `http://localhost:5000/api/products/${deleteModalProduct._id}`,
        {
          method: "DELETE",
          headers,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setToastMessage({
        type: "success",
        text: `Product "${deleteModalProduct.name}" deleted successfully!`,
      });

      // Update state without full refetch
      setProducts((current) =>
        current.filter((p) => p._id !== deleteModalProduct._id)
      );

      setDeleteModalProduct(null);
    } catch (error) {
      console.error("Delete error:", error);
      setToastMessage({
        type: "error",
        text: error.message || "Failed to delete product",
      });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 relative min-h-screen">

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl shadow-xl border text-sm font-semibold flex items-center gap-3 animate-fade-in ${
            toastMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span>{toastMessage.type === "success" ? "✅" : "⚠️"}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              🗑️
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              Are you sure you want to permanently delete{" "}
              <strong className="text-gray-800 font-semibold">"{deleteModalProduct.name}"</strong>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Products Catalog
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all spices, masalas, and inventory in your store.
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="bg-orange-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-md shadow-orange-200 text-center"
        >
          ➕ Add New Product
        </Link>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search catalog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="text-xs font-semibold text-gray-500">
          Total Products: <span className="text-gray-900 font-bold">{products.length}</span> (Showing {filteredProducts.length})
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading products catalog...</p>
        </div>
      )}

      {/* No Products */}
      {!loading && filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-gray-500">No products found matching your search.</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredProducts.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const itemImg = product.image ? product.image.trim() : "/images/red-chilli.jpg";
                  const isAvail = product.available && Number(product.stock) > 0;

                  return (
                    <tr key={product._id} className="hover:bg-gray-50/60 transition">
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={itemImg}
                            alt={product.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/red-chilli.jpg";
                            }}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-gray-900 leading-tight">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {product.unit}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-gray-600">
                        <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-bold text-orange-600">
                        ₹{product.price}
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {product.stock} {product.unit}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isAvail ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                            Available
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                            Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/products/${product._id}`}
                            target="_blank"
                            className="text-gray-400 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
                            title="View product on storefront"
                          >
                            👁️
                          </Link>
                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 transition"
                          >
                            ✏️ Edit
                          </Link>
                          <button
                            onClick={() => setDeleteModalProduct(product)}
                            className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;