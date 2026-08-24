const Order = require("../models/Order.js");
const sendEmail = require("../utils/sendEmail.js");

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentId } = req.body;

    if (!items || !totalAmount || !shippingAddress || !paymentId) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentId,
      });
      await order.save();
      const orderItems = items
        .map(
          (item, index) =>
            `${index + 1}. ${item.name || "Product"} × ${item.quantity} - ₹${Number(
              item.price * item.quantity,
            ).toLocaleString("en-IN")}`,
        )
        .join("\n");
      const message = `Hi ${req.user.name},

Thank you for shopping with ShopGrid! 🎉

We're happy to confirm that your order has been placed successfully.


Order ID:
${order._id}

ORDER ITEMS
${orderItems}

Total Amount:
₹${Number(totalAmount).toLocaleString("en-IN")}

Shipping Address:
${shippingAddress}

Payment ID:
${paymentId}


Your order is now being processed. You can check your order status anytime from your ShopGrid account.

If you have any questions or need help with your order, please contact our support team.

Thank you for choosing ShopGrid. ❤️

Best regards,
Team ShopGrid

Your trusted online shopping destination`;
      await sendEmail(req.user.email, "Order Placed", message);
      res.status(201).json({ message: "Order created successfully", order });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my orders
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name imageURL price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  myOrders,
  updateOrderStatus,
};
