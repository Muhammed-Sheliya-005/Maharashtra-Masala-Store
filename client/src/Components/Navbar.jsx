import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../contex/CartContext";

function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedInUser);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("userLogin", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("userLogin", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userLogin"));
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
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

        {/* CENTER NAVIGATION */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
            }
          >
            Products
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

          {user && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"
              }
            >
              📦 My Orders
            </NavLink>
          )}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* Cart with count badge */}
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

          {/* User Authentication state */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl transition"
              >
                👤 {user.name?.split(" ")[0] || "Account"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-2"
                title="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-700 hover:text-orange-600 px-3 py-2 rounded-xl transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm shadow-orange-200"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Admin Login Portal shortcut */}
          <Link
            to="/admin/login"
            className="border border-gray-200 hover:border-gray-800 text-gray-600 hover:text-gray-900 text-xs font-semibold px-3 py-2 rounded-xl transition"
            title="Switch to Admin Panel"
          >
            Admin
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;