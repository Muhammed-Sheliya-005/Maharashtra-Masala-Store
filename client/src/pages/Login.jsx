import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user
      if (data.user) {
        const loggedInUser = {
          _id: data.user._id || data.user.id,
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          address: data.user.address || "",
        };

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        setSuccessName(loggedInUser.name || "Customer");

        window.dispatchEvent(new Event("userLogin"));
      }

      // Show success notification
      setSuccess(true);

      // Wait 2 seconds, then dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

      {/* ================= SUCCESS NOTIFICATION ================= */}
      {success && (
        <div className="fixed top-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

          <div className="p-5 flex items-start gap-4">

            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
              ✅
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Login Successful
              </h3>

              <p className="text-gray-500 mt-1">
                Welcome back, {successName}!
              </p>
            </div>

          </div>

          {/* Progress line */}
          <div className="h-1 bg-gray-100">
            <div className="h-full bg-green-500 animate-[loginProgress_2s_linear_forwards]"></div>
          </div>

        </div>
      )}

      {/* ================= LOGIN CARD ================= */}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-5xl mb-3">
            🌶️
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to Maharashtra Masala
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading || success}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading || success}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
          >
            {loading
              ? "Logging in..."
              : success
              ? "Login Successful ✓"
              : "Login"}
          </button>

        </form>

        {/* Signup */}
        <div className="text-center mt-6">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/signup"
            className="text-red-600 font-semibold hover:text-red-700"
          >
            Create an account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;