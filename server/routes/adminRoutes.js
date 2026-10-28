const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const { verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password",
      });
    }

    // Verify password: check bcrypt hash or plain text (auto-migrate to bcrypt)
    let isMatch = false;
    if (admin.password.startsWith("$2a$") || admin.password.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, admin.password);
    } else {
      // Plain text match - auto hash with bcrypt
      if (admin.password === password) {
        isMatch = true;
        const hashed = await bcrypt.hash(password, 10);
        admin.password = hashed;
        await admin.save();
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password",
      });
    }

    // Create Admin JWT token
    const token = jwt.sign(
      {
        userId: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET || "maharashtra_masala_secret_2026",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Admin login successful",
      token,
      data: {
        id: admin._id,
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error.message,
    });
  }
});

// GET DASHBOARD STATS (Total products, total orders, total customers, pending orders, recent orders)
router.get("/stats", verifyAdmin, async (req, res) => {
  try {
    const [
      totalProducts,
      availableProducts,
      outOfStockProducts,
      totalOrders,
      pendingOrders,
      totalCustomers,
      recentOrders,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ available: true, stock: { $gt: 0 } }),
      Product.countDocuments({
        $or: [{ available: false }, { stock: { $lte: 0 } }],
      }),
      Order.countDocuments(),
      Order.countDocuments({ status: "Pending" }),
      User.countDocuments({ role: { $ne: "admin" } }),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name email phone")
        .populate("items.product", "name price image"),
    ]);

    res.json({
      success: true,
      stats: {
        totalProducts,
        availableProducts,
        outOfStockProducts,
        totalOrders,
        pendingOrders,
        totalCustomers,
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
});

module.exports = router;