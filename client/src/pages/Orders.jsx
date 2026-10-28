import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?._id) {
          setLoading(false);
          return;
        }

        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Try /api/orders/my-orders or fallback to /api/orders/user/:id
        let response = await fetch("http://localhost:5000/api/orders/my-orders", {
          headers,
        });

        if (!response.ok) {
          response = await fetch(`http://localhost:5000/api/orders/user/${user._id}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (Array.isArray(data)) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id, token]);

  // Get status step
  const getStatusStep = (status) => {
    const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];
    return steps.indexOf(status);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg font-medium mt-4">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user?._id) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🔐</div>

          <h2 className="text-2xl font-bold text-gray-800">
            Please Login
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Sign in to your Maharashtra Masala account to view and track your orders.
          </p>

          <Link
            to="/login"
            className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            Login to Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              📦 My Orders
            </h1>
            <p className="text-gray-500 mt-1">
              View your orders and track their delivery progression in real-time.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-600 transition shadow-xs"
          >
            🛍️ Browse More Spices
          </Link>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛍️</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
              You haven't placed any spice orders yet. Browse our authentic masalas and whole spices to place your first order!
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-orange-600 text-white px-7 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-md shadow-orange-200"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getStatusStep(order.status);
              const isCancelled = order.status === "Cancelled";

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {/* ORDER HEADER */}
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                          Order Identifier
                        </p>
                        <p className="font-mono font-bold text-gray-800 break-all text-sm mt-0.5">
                          #{order._id}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-xs text-gray-400">Date Placed</p>
                          <p className="font-semibold text-gray-700 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">Total</p>
                          <p className="font-extrabold text-orange-600 text-base mt-0.5">
                            ₹{order.totalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ORDER TRACKING */}
                  <div className="p-6 bg-gray-50/30 border-b border-gray-100">
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">
                      Status: <span className="text-orange-600 font-extrabold">{order.status}</span>
                    </h2>

                    {isCancelled ? (
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl shrink-0">
                          ❌
                        </div>
                        <div>
                          <h3 className="font-bold text-red-700">
                            Order Cancelled
                          </h3>
                          <p className="text-xs text-red-600 mt-0.5">
                            This order was cancelled by the administrator or customer.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative max-w-3xl mx-auto py-2">
                        {/* Desktop Progress Bar Line */}
                        <div className="hidden md:block absolute top-5 left-12 right-12 h-1 bg-gray-200">
                          <div
                            className="h-1 bg-orange-600 transition-all duration-500"
                            style={{
                              width:
                                currentStep === 0
                                  ? "0%"
                                  : currentStep === 1
                                  ? "33%"
                                  : currentStep === 2
                                  ? "66%"
                                  : "100%",
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-4 gap-2 relative">
                          {[
                            { name: "Pending", icon: "📝" },
                            { name: "Confirmed", icon: "✅" },
                            { name: "Shipped", icon: "🚚" },
                            { name: "Delivered", icon: "📦" },
                          ].map((step, index) => {
                            const completed = index <= currentStep;
                            return (
                              <div
                                key={step.name}
                                className="flex flex-col items-center text-center"
                              >
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base border-4 border-white shadow-sm transition ${
                                    completed
                                      ? "bg-orange-600 text-white"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {step.icon}
                                </div>
                                <p
                                  className={`mt-2 text-xs font-semibold ${
                                    completed
                                      ? "text-orange-600"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {step.name}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="p-6">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      Items Ordered ({order.items?.length || 0})
                    </h2>

                    <div className="space-y-4">
                      {order.items?.map((item, index) => {
                        const itemImg = item.image ? item.image.trim() : "/images/red-chilli.jpg";
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={itemImg}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/images/red-chilli.jpg";
                                }}
                                className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-100"
                              />

                              <div>
                                <h3 className="font-bold text-gray-900 text-sm">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  ₹{item.price} × {item.quantity}
                                </p>
                              </div>
                            </div>

                            <p className="font-extrabold text-gray-900 text-sm">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ORDER FOOTER / SHIPPING */}
                  <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                          Delivery Destination
                        </p>
                        <p className="font-medium text-gray-800 mt-0.5">
                          {order.shippingAddress || "Standard delivery address"}
                        </p>
                        {order.contactPhone && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            📞 Contact: {order.contactPhone}
                          </p>
                        )}
                      </div>

                      <div className="text-left md:text-right">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">
                          Payment Mode
                        </span>
                        <span className="font-semibold text-gray-700">
                          Cash / UPI on Delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;