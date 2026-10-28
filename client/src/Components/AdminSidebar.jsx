import { NavLink, useNavigate, Link } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "📦",
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: "➕",
    },
    {
      name: "Customer Orders",
      path: "/admin/orders",
      icon: "🛒",
    },
  ];

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-gray-900 text-white flex flex-col justify-between shrink-0 shadow-xl">
      <div>
        {/* LOGO */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <span className="text-3xl">🌶️</span>
            <div>
              <h1 className="text-lg font-black text-white tracking-wide">
                MAHARASHTRA
              </h1>
              <p className="text-xs text-orange-400 font-semibold tracking-wider uppercase">
                Masala Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* LOGGED IN BADGE */}
        <div className="px-6 py-4 bg-gray-800/40 border-b border-gray-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center font-bold text-sm text-white">
            {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-200 truncate">
              {admin?.name || "Administrator"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {admin?.email || "admin@maharashtramasala.com"}
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">
            Navigation
          </p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                  isActive
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <span>🌐</span>
          <span>View Customer Store ↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;