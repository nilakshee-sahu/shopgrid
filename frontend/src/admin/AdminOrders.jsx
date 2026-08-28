import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminStyles/adminOrders.css";
const API_URL = process.env.REACT_APP_API_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to fetch orders");
      }

      setOrders(data);
    } catch (error) {
      console.error("Orders Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to update order");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error("Update Order Error:", error);
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <main className="admin-orders">
        <div className="admin-orders-loading">Loading orders...</div>
      </main>
    );
  }

  return (
    <main className="admin-orders">
      <section className="orders-header">
        <div>
          <span className="admin-tag">ADMIN PANEL</span>
          <h1>Manage Orders</h1>
          <p>View and manage customer orders.</p>
        </div>

        <Link to="/admin" className="back-admin-btn">
          ← Dashboard
        </Link>
      </section>

      {error && <div className="orders-error">{error}</div>}

      <section className="orders-card">
        <div className="orders-card-header">
          <div>
            <span className="admin-tag">ORDERS</span>
            <h2>All Orders</h2>
          </div>

          <span className="order-count">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">🛒</div>
            <h3>No Orders Found</h3>
            <p>There are currently no customer orders.</p>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="order-id">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </td>

                    <td>
                      <div className="customer-info">
                        <strong>{order.user?.name || "Unknown User"}</strong>
                        <span>{order.user?.email || "No email"}</span>
                      </div>
                    </td>

                    <td>
                      <span className="items-count">
                        {order.items?.reduce(
                          (total, item) => total + item.quantity,
                          0,
                        ) || 0}
                      </span>
                    </td>

                    <td>
                      <strong className="order-total">
                        ₹
                        {Number(order.totalAmount || 0).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </strong>
                    </td>

                    <td>
                      <span className="payment-id">
                        {order.paymentId
                          ? order.paymentId.length > 15
                            ? `${order.paymentId.slice(0, 15)}...`
                            : order.paymentId
                          : "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`status-select status-${order.status}`}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={updatingId === order._id}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminOrders;
