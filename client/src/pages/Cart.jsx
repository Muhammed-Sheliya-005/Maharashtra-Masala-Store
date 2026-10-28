import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../contex/CartContext.jsx";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // =========================
  // PRICE CALCULATION
  // =========================
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = 0;
  const total = subtotal + delivery;

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async () => {
    setErrorMessage("");

    if (!user?._id) {
      setErrorMessage("Please log in to your account before placing an order.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    if (!address.trim()) {
      setErrorMessage("Please enter your complete delivery address.");
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage("Your shopping cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image ? item.image.trim() : "/images/red-chilli.jpg",
      }));

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers,
        body: JSON.stringify({
          user: user._id,
          items: orderItems,
          totalAmount: total,
          shippingAddress: address.trim(),
          contactPhone: phone.trim() || user?.phone || "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to place order");
      }

      // Empty cart
      if (clearCart) {
        clearCart();
      } else {
        cartItems.forEach((item) => removeFromCart(item._id));
      }

      // Set confirmed order to display the Tailwind success modal
      setConfirmedOrder(data.order || { _id: "ORD" + Date.now(), totalAmount: total, shippingAddress: address });

    } catch (error) {
      console.error("Place order error:", error);
      setErrorMessage(
        error.message || "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // ORDER CONFIRMATION MODAL
  // =========================
  if (confirmedOrder) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5 shadow-sm">
            ✓
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
            Order Confirmed
          </span>

          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">
            Thank You For Your Order!
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Your authentic Maharashtra spices will be packed fresh and dispatched soon.
          </p>

          <div className="mt-6 bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-semibold text-gray-800">
                {confirmedOrder._id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid:</span>
              <span className="font-bold text-orange-600 text-base">
                ₹{confirmedOrder.totalAmount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {confirmedOrder.status || "Pending"}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <span className="text-gray-500 block text-xs">Shipping Address:</span>
              <span className="text-gray-700 font-medium text-xs mt-0.5 block">
                {confirmedOrder.shippingAddress}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/orders"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md shadow-orange-200"
            >
              📦 Track My Orders
            </Link>
            <Link
              to="/products"
              className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition"
            >
              Shop More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-[2rem] border border-orange-100 shadow-xl p-10 md:p-14 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-5xl">
              🛒
            </div>

            <p className="text-orange-600 font-bold text-sm tracking-[0.2em] uppercase mt-7">
              Your Shopping Cart
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Your Cart is Empty
            </h1>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Looks like you haven't added any masalas or spices to your cart yet.
              Explore our products and discover your favourite authentic flavours.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              🛍️ Browse Spices
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // CART PAGE
  // =========================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <p className="text-orange-600 font-bold text-sm tracking-[0.2em] uppercase">
            Order Review
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-3">
                Review your items and enter shipping details to checkout.
              </p>
            </div>

            <div className="bg-white border border-orange-100 shadow-sm rounded-2xl px-5 py-3">
              <p className="text-sm text-gray-500">Items in cart</p>
              <p className="text-xl font-extrabold text-orange-600">
                {cartItems.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CART CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center justify-between text-sm animate-shake">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span className="font-medium">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 hover:text-red-800 text-lg leading-none"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT - CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => {
              const itemImg = item.image ? item.image.trim() : "/images/red-chilli.jpg";
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 p-5"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* PRODUCT IMAGE */}
                    <div className="relative shrink-0">
                      <img
                        src={itemImg}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/red-chilli.jpg";
                        }}
                        className="w-full sm:w-32 h-32 object-cover rounded-2xl bg-gray-100"
                      />
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold text-green-600 px-2.5 py-1 rounded-full shadow-sm">
                        ✓ In Cart
                      </span>
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                            {item.category || "Authentic Masala"}
                          </p>
                          <h2 className="text-xl font-extrabold text-gray-900 mt-1">
                            {item.name}
                          </h2>
                          <p className="text-gray-500 text-sm mt-2">
                            ₹{item.price} / {item.unit || "pack"}
                          </p>
                        </div>

                        {/* REMOVE BUTTON */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="shrink-0 text-gray-400 hover:text-red-600 transition text-xl p-1"
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* QUANTITY & SUB-TOTAL */}
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mt-6">
                        <div>
                          <p className="text-xs text-gray-400 font-semibold uppercase mb-2">
                            Quantity
                          </p>
                          <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => decreaseQuantity(item._id)}
                              className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition"
                            >
                              −
                            </button>
                            <div className="w-12 h-10 flex items-center justify-center bg-white border-x border-gray-200 font-bold text-gray-900">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => increaseQuantity(item._id)}
                              className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs text-gray-400 font-semibold uppercase">
                            Item Total
                          </p>
                          <p className="text-2xl font-extrabold text-orange-600 mt-1">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}
            <div className="flex justify-between items-center pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-red-600 transition"
              >
                ← Continue Shopping
              </Link>
              {clearCart && (
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-500 font-medium transition"
                >
                  Clear Entire Cart
                </button>
              )}
            </div>
          </div>

          {/* RIGHT - ORDER SUMMARY & CHECKOUT */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 lg:sticky lg:top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                  🧾
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">
                    Order Summary
                  </h2>
                  <p className="text-sm text-gray-400">
                    Trusted checkout calculation
                  </p>
                </div>
              </div>

              {/* CONTACT PHONE */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  📞 Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98220 12345"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* DELIVERY ADDRESS */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  📍 Delivery Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Flat No., Street, Landmark, City, Pincode..."
                  rows="3"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping & Delivery</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="border-t border-dashed border-gray-200 mt-5 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Total Payable
                    </p>
                    <p className="text-3xl font-black text-gray-900 mt-1">
                      ₹{total}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    ✓
                  </div>
                </div>
              </div>

              {/* PLACE ORDER BUTTON */}
              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className={`w-full mt-6 py-4 rounded-xl text-white font-bold text-base shadow-lg transition-all duration-300 ${
                  placingOrder
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-xl hover:from-orange-700 hover:to-red-700"
                }`}
              >
                {placingOrder ? "Placing Order..." : "🛍️ Place Order Now"}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                <span>🔒</span>
                <span>Direct DB verified pricing • Cash / Card on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;