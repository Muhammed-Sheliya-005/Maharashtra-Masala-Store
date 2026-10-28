const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// =====================================================
// ADMIN - GET ALL ORDERS (Supports both / and /admin/all)
// =====================================================
const getAllOrdersHandler = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone address")
      .populate("items.product", "name price category image unit")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

router.get("/", verifyAdmin, getAllOrdersHandler);
router.get("/admin/all", verifyAdmin, getAllOrdersHandler);

// =====================================================
// ADMIN - UPDATE ORDER STATUS (Supports PATCH & PUT)
// =====================================================
const updateOrderStatusHandler = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("user", "name email phone address")
      .populate("items.product", "name price category image unit");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

router.patch("/:id/status", verifyAdmin, updateOrderStatusHandler);
router.put("/admin/:id/status", verifyAdmin, updateOrderStatusHandler);
router.put("/:id/status", verifyAdmin, updateOrderStatusHandler);

// =====================================================
// CUSTOMER - GET AUTHENTICATED USER'S ORDERS
// =====================================================
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("items.product", "name price category image unit")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// GET USER ORDERS BY ID (Compatibility route)
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product", "name price category image unit")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get user orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// =====================================================
// CREATE NEW ORDER (Calculates trusted total on server)
// =====================================================
router.post("/", async (req, res) => {
  try {
    // Check authorization header or body.user
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const jwt = require("jsonwebtoken");
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "maharashtra_masala_secret_2026"
        );
        userId = decoded.userId;
      } catch (e) {
        // Fall back to body user if token invalid
      }
    }

    const { user, items, shippingAddress, contactPhone } = req.body;
    const finalUserId = userId || user;

    if (!finalUserId) {
      return res.status(401).json({
        success: false,
        message: "Please login to place an order.",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty. Please add items to your cart.",
      });
    }

    if (!shippingAddress || !shippingAddress.trim()) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required.",
      });
    }

    // Verify each item against real MongoDB products & compute server-side trusted total
    let calculatedTotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const productId = item.product || item._id;
      const dbProduct = await Product.findById(productId);

      if (!dbProduct) {
        return res.status(400).json({
          success: false,
          message: `Product "${item.name || productId}" was not found in our catalog.`,
        });
      }

      if (!dbProduct.available || (dbProduct.stock !== undefined && dbProduct.stock <= 0)) {
        return res.status(400).json({
          success: false,
          message: `"${dbProduct.name}" is currently out of stock.`,
        });
      }

      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const itemTotal = dbProduct.price * quantity;
      calculatedTotal += itemTotal;

      verifiedItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price, // Trusted DB price
        quantity: quantity,
        image: dbProduct.image || "",
      });

      // Deduct stock if available
      if (dbProduct.stock >= quantity) {
        dbProduct.stock -= quantity;
        if (dbProduct.stock === 0) {
          dbProduct.available = false;
        }
        await dbProduct.save();
      }
    }

    const newOrder = await Order.create({
      user: finalUserId,
      items: verifiedItems,
      totalAmount: calculatedTotal,
      shippingAddress: shippingAddress.trim(),
      contactPhone: contactPhone ? contactPhone.trim() : "",
      status: "Pending",
    });

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("user", "name email phone")
      .populate("items.product", "name price category image unit");

    res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order. Please try again.",
      error: error.message,
    });
  }
});

module.exports = router;