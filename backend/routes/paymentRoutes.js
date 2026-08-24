const express = require("express");
const router = express.Router();
const { processPayment, verifyPayment } = require("../controllers/paymentController.js");

router.post("/order", processPayment);
router.post("/verify", verifyPayment);

module.exports = router;