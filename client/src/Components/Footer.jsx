import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌶️</span>
              <div>
                <span className="text-lg font-black text-white tracking-tight block">
                  MAHARASHTRA
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500 block">
                  Masala Store
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing authentic flavors of Maharashtra directly to your kitchen.
              Pure, hygienic, and traditional spices, masalas, and handmade pickles.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-orange-400 mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/products?category=Ready-made%20Masala" className="hover:text-white transition">
                  Ready-made Masala
                </Link>
              </li>
              <li>
                <Link to="/products?category=Loose%20Masala" className="hover:text-white transition">
                  Loose Spices & Masala
                </Link>
              </li>
              <li>
                <Link to="/products?category=Pickles" className="hover:text-white transition">
                  Traditional Pickles
                </Link>
              </li>
              <li>
                <Link to="/products?category=Akkha%20Masala" className="hover:text-white transition">
                  Akkha Masala (Whole Spices)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-orange-400 mb-4">
              Customer Area
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/products" className="hover:text-white transition">
                  Browse All Products
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition">
                  Track My Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-orange-400 transition text-xs font-semibold">
                  🔐 Store Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-orange-400 mb-4">
              Contact & Store
            </h3>
            <div className="space-y-2.5 text-sm text-gray-400">
              <p className="flex items-start gap-2">
                <span>📍</span>
                <span>Shop No. 12, Spice Bazaar, Raviwar Peth, Pune, Maharashtra 411002</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 98220 12345</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <span>contact@maharashtramasala.com</span>
              </p>
              <p className="text-xs text-green-400 pt-1">
                🟢 Mon - Sat: 9:00 AM - 8:30 PM
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Maharashtra Masala Store. All Rights Reserved.</p>
          <p>Full-Stack E-Commerce Project with MongoDB, Express, React & Node.js</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;