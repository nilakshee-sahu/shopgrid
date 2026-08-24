import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/AdminStyles/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Failed to fetch analytics",
          );
        }

        setStats(data);
      } catch (error) {
        console.error("Analytics Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <main className="admin-dashboard">
      <section className="admin-header">
        <div>
          <span className="admin-tag">ADMIN PANEL</span>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name || "Admin"}.</p>
        </div>
      </section>

      {error && <div className="admin-error">{error}</div>}

      <section className="admin-stats">
        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <span>Total Users</span>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">📦</div>
          <div>
            <span>Total Products</span>
            <h2>{stats.totalProducts}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">🛒</div>
          <div>
            <span>Total Orders</span>
            <h2>{stats.totalOrders}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">₹</div>
          <div>
            <span>Total Revenue</span>
            <h2>₹{Number(stats.totalRevenue).toLocaleString("en-IN")}</h2>
          </div>
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <span className="admin-tag">MANAGEMENT</span>
            <h2>Quick Actions</h2>
          </div>
        </div>

        <div className="admin-actions">
          <Link to="/admin/products" className="admin-action-card">
            <span>📦</span>
            <h3>Manage Products</h3>
            <p>Add, edit, and remove products.</p>
          </Link>

          <Link to="/admin/orders" className="admin-action-card">
            <span>🛒</span>
            <h3>Manage Orders</h3>
            <p>View and update customer orders.</p>
          </Link>

          <Link to="/admin/users" className="admin-action-card">
            <span>👥</span>
            <h3>Manage Users</h3>
            <p>View registered customers.</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
