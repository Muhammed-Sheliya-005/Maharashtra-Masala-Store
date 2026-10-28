import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
        "http://localhost:5000/api/users/signup",
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
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Show success notification
      setSuccess(true);

      // After 2 seconds go to Login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Signup error:", error);
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

            {/* Icon */}
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
              ✅
            </div>

            {/* Message */}
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Account Created Successfully
              </h3>

              <p className="text-gray-500 mt-1">
                Welcome to Maharashtra Masala!
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Redirecting to Login...
              </p>
            </div>

          </div>

          {/* Progress Line */}
          <div className="h-1 bg-gray-100">
            <div className="h-full bg-green-500 animate-[signupProgress_2s_linear_forwards]"></div>
          </div>

        </div>
      )}

      {/* ================= SIGNUP CARD ================= */}

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-5xl mb-3">
            🌶️
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join Maharashtra Masala
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            ❌ {error}
          </div>
        )}

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              disabled={loading || success}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
            />
          </div>

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
              placeholder="Create a password"
              required
              minLength="6"
              disabled={loading || success}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
            />

            <p className="text-xs text-gray-400 mt-1">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={loading || success}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="3"
              disabled={loading || success}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 resize-none disabled:bg-gray-100"
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
          >
            {loading
              ? "Creating Account..."
              : success
              ? "Account Created ✓"
              : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-6">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="text-red-600 font-semibold hover:text-red-700"
          >
            Login here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;