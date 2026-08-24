import React from "react";
import { Link } from "react-router-dom";
import "../styles/orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with ShopGrid. Your order has been placed
          successfully.
        </p>

        <p className="success-info">
          You will receive your order details and confirmation on your
          registered email.
        </p>

        <div className="success-actions">
          <Link to="/shop" className="success-btn primary">
            Continue Shopping
          </Link>

          <Link to="/myorders" className="success-btn secondary">
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
