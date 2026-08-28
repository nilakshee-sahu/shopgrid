import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/myOrders.css";
const API_URL = process.env.REACT_APP_API_URL;

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data);
      } catch (error) {
        console.error("Orders Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <main className="my-orders-page">
        <div className="orders-login">
          <div className="orders-login-icon">👤</div>
          <h2>Please Login</h2>
          <p>You need to login to view your orders.</p>
          <Link to="/login" className="orders-btn">
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="my-orders-page">
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="my-orders-page">
      <div className="my-orders-container">
        <div className="orders-header">
          <span>MY ACCOUNT</span>
          <h1>My Orders</h1>
          <p>Track and view all your ShopGrid orders.</p>
        </div>

        {error && <div className="orders-error">{error}</div>}

        {!error && orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>
              You haven't placed any orders yet. Start shopping and your orders
              will appear here.
            </p>
            <Link to="/shop" className="orders-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-card-header">
                  <div>
                    <span className="order-label">ORDER ID</span>
                    <h3>{order._id}</h3>
                  </div>

                  <span className={`order-status ${order.status}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-meta">
                  <div>
                    <span>Order Date</span>
                    <strong>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>

                  <div>
                    <span>Items</span>
                    <strong>{order.items.length}</strong>
                  </div>

                  <div>
                    <span>Total</span>
                    <strong>₹{order.totalAmount.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="order-products">
                  {order.items.map((item, index) => (
                    <div className="order-product" key={item._id || index}>
                      <div className="order-product-image">
                        {item.product?.imageURL ? (
                          <img
                            src={item.product.imageURL}
                            alt={item.product.name}
                          />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>

                      <div className="order-product-info">
                        <h4>{item.product?.name || "Product"}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{item.price.toFixed(2)}</p>
                      </div>

                      <strong>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <span>Payment ID: {order.paymentId}</span>

                  <span>Total: ₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to="/shop" className="continue-shopping">
          ← Continue Shopping
        </Link>
      </div>
    </main>
  );
};

export default MyOrders;
