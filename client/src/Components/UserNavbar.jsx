import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../contex/CartContext";

function UserNavbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLogin"));
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">🌶️</span>
          <div>
            <span className="text-xl font-black text-gray-900 tracking-tight block leading-tight">
              MAHARASHTRA
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600 block -mt-0.5">
              Masala Store
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            Shop Spices
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            📦 My Orders
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative bg-orange-50 hover:bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 border border-orange-100"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-orange-600 text-white text-xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile Pill */}
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl">
            👤 {user?.name || "Customer"}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}

export default UserNavbar;