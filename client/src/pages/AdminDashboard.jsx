import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    outOfStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const adminToken = localStorage.getItem("adminToken");
      const headers = {};
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const response = await fetch("http://localhost:5000/api/admin/stats", {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to load dashboard metrics");
      }

      const data = await response.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading store statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <span className="text-orange-600 font-bold text-xs tracking-widest uppercase bg-orange-100/60 px-3 py-1 rounded-md">
              Overview Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Welcome back, {admin.name || "Admin"}! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Live operational metrics for Maharashtra Masala Store.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardStats}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-semibold text-sm text-gray-700 hover:border-orange-500 hover:text-orange-600 transition shadow-xs"
            >
              🔄 Refresh Data
            </button>
            <Link
              to="/admin/add-product"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-700 transition shadow-md shadow-orange-200"
            >
              ➕ Add Product
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* ========================= */}
        {/* METRICS GRID */}
        {/* ========================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">

          {/* Total Products */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl mb-3">
              📦
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Items
            </p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {stats.totalProducts}
            </p>
          </div>

          {/* In Stock */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl mb-3">
              🟢
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              In Stock
            </p>
            <p className="text-2xl font-black text-green-600 mt-1">
              {stats.availableProducts}
            </p>
          </div>

          {/* Out of Stock */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl mb-3">
              🔴
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Out of Stock
            </p>
            <p className="text-2xl font-black text-red-600 mt-1">
              {stats.outOfStockProducts}
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-3">
              🛒
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Orders
            </p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {stats.totalOrders}
            </p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-3">
              ⏳
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Pending
            </p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {stats.pendingOrders}
            </p>
          </div>

          {/* Customers */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-3">
              👥
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Customers
            </p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {stats.totalCustomers}
            </p>
          </div>

        </div>

        {/* ========================= */}
        {/* RECENT ORDERS TABLE */}
        {/* ========================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Customer Orders
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Latest transactions placed on Maharashtra Masala Store.
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Order ID</th>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Items</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentOrders && stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/60 transition">
                      <td className="px-6 py-4 font-mono font-medium text-xs text-gray-800">
                        #{order._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {order.user?.name || "Walk-in Customer"}
                      </td>
                      <td className="px-6 py-4 font-black text-orange-600">
                        ₹{order.totalAmount}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {order.items?.length || 0} items
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to="/admin/orders"
                          className="text-xs font-bold text-orange-600 hover:underline"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                      No customer orders have been placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;