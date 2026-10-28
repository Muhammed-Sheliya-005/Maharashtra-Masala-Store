import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [adminName, setAdminName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid admin email or password");
        setLoading(false);
        return;
      }

      // Save admin token
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }

      // Save admin information
      if (data.data) {
        localStorage.setItem("admin", JSON.stringify(data.data));
        setAdminName(data.data.name || "Administrator");
      } else {
        setAdminName("Administrator");
      }

      // Trigger success notification
      setSuccess(true);

      // Wait 2 seconds with animated progress bar, then navigate to dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);

    } catch (err) {
      console.error("Admin login error:", err);
      setError("Unable to connect to backend server. Please verify backend is running.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12 relative">

      {/* ================= SUCCESS NOTIFICATION WITH 2S PROGRESS BAR ================= */}
      {success && (
        <div className="fixed top-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-in">
          <div className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl shrink-0">
              ✅
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Admin Login Successful
              </h3>
              <p className="text-gray-500 text-sm mt-0.5">
                Welcome back, {adminName}! Redirecting to control panel...
              </p>
            </div>
          </div>

          {/* 2-Second Progress Line */}
          <div className="h-1.5 bg-gray-100 w-full overflow-hidden">
            <div className="h-full bg-green-500 w-full animate-[loginProgress_2s_linear_forwards] origin-left"></div>
          </div>
        </div>
      )}

      {/* ================= LOGIN CARD ================= */}
      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">
            🌶️
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Maharashtra Masala Store Management
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@maharashtramasala.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition duration-300 ${
                loading || success
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-orange-600 shadow-gray-200"
              }`}
            >
              {loading ? "Authenticating..." : success ? "Verified! Redirecting..." : "Login to Control Panel →"}
            </button>

          </form>

          {/* Quick Info & Customer Site Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-gray-500 hover:text-orange-600 transition"
            >
              ← Return to Customer Storefront
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;