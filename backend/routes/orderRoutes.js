const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware.js");
const admin = require("../middleware/adminMiddleware.js");
const {
  createOrder,
  getOrders,
  myOrders,
  updateOrderStatus,
} = require("../controllers/orderController.js");

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);

router.route("/myorders").get(protect, myOrders);

router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
