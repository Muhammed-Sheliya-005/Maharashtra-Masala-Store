import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const adminToken = localStorage.getItem("adminToken");
      const headers = {};
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      let response = await fetch("http://localhost:5000/api/orders/admin/all", {
        headers,
      });

      if (!response.ok) {
        response = await fetch("http://localhost:5000/api/orders", {
          headers,
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || (Array.isArray(data) ? data : []));
    } catch (err) {
      console.error("Fetch admin orders error:", err);
      setError("Unable to load orders from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (adminToken) {
        headers["Authorization"] = `Bearer ${adminToken}`;
      }

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update order status");
      }

      // Update state locally
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order?.status || newStatus }
            : order
        )
      );

      setToastMessage({
        type: "success",
        text: `Order status updated to "${newStatus}"`,
      });
    } catch (err) {
      console.error("Update status error:", err);
      setToastMessage({
        type: "error",
        text: err.message || "Unable to update order status",
      });
    } finally {
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filteredOrders = orders.filter((o) =>
    statusFilter === "All" ? true : o.status === statusFilter
  );

  const statuses = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="p-6 md:p-10 min-h-screen">

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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Customer Orders
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage incoming spice orders, fulfillments, and delivery stages.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-orange-500 hover:text-orange-600 transition shadow-xs flex items-center gap-2 self-start md:self-auto"
        >
          🔄 Refresh Orders
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8 shadow-xs flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                statusFilter === s
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-gray-500">
          Total: <span className="text-gray-900 font-bold">{orders.length}</span> (Showing {filteredOrders.length})
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading customer orders...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredOrders.length === 0 && (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
          <div className="text-5xl mb-3">🛒</div>
          <h3 className="text-xl font-bold text-gray-800">No Orders Found</h3>
          <p className="text-gray-500 text-sm mt-1">
            There are currently no orders in status "{statusFilter}".
          </p>
        </div>
      )}

      {/* Orders List */}
      {!loading && filteredOrders.length > 0 && (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 bg-gray-50/60 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-gray-900 text-sm">
                      #{order._id}
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-bold ${
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
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Placed on: {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Change Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-gray-200 bg-white rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 grid md:grid-cols-3 gap-6">
                {/* Customer Details */}
                <div className="space-y-1 text-sm border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Customer Information
                  </p>
                  <p className="font-bold text-gray-900">
                    👤 {order.user?.name || "Customer"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    ✉️ {order.user?.email || "No email"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    📞 {order.contactPhone || order.user?.phone || "No phone provided"}
                  </p>
                  <div className="pt-2">
                    <p className="text-xs text-gray-400">Shipping Address:</p>
                    <p className="text-gray-700 font-medium text-xs mt-0.5 leading-relaxed">
                      {order.shippingAddress || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="md:col-span-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Items In This Order ({order.items?.length || 0})
                  </p>

                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image ? item.image.trim() : "/images/red-chilli.jpg"}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/red-chilli.jpg";
                            }}
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 text-xs">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              ₹{item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="font-extrabold text-gray-900 text-xs">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      Total Order Amount:
                    </span>
                    <span className="text-xl font-black text-orange-600">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AdminOrders;