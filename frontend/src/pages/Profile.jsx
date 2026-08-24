import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-login">
          <div className="profile-login-icon">👤</div>
          <h2>Please Login</h2>
          <p>You need to login to view your profile.</p>
          <Link to="/login" className="profile-btn">
            Login
          </Link>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <span>MY ACCOUNT</span>
          <h1>My Profile</h1>
          <p>Manage your ShopGrid account and personal information.</p>
        </div>

        <div className="profile-content">
          <section className="profile-card profile-user-card">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2>{user.name}</h2>
            <p>{user.email}</p>

            {user.role && (
              <span className="profile-role">
                {user.role === "admin" ? "Administrator" : "User"}
              </span>
            )}
          </section>

          <section className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              <span>ACCOUNT</span>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info">
                <label>Full Name</label>
                <p>{user.name || "Not available"}</p>
              </div>

              <div className="profile-info">
                <label>Email Address</label>
                <p>{user.email || "Not available"}</p>
              </div>

              <div className="profile-info">
                <label>Account Type</label>
                <p>{user.role === "admin" ? "Administrator" : "User"}</p>
              </div>

              <div className="profile-info">
                <label>Account Status</label>
                <p className="profile-status">● Active</p>
              </div>
            </div>
          </section>

          <section className="profile-card profile-actions-card">
            <h2>Quick Actions</h2>

            <div className="profile-actions">
              <Link to="/shop" className="profile-action">
                <span>🛍️</span>
                <div>
                  <h3>Continue Shopping</h3>
                  <p>Browse our latest products.</p>
                </div>
              </Link>

              <Link to="/cart" className="profile-action">
                <span>🛒</span>
                <div>
                  <h3>View Cart</h3>
                  <p>Check the items in your cart.</p>
                </div>
              </Link>

              <Link to="/myorders" className="profile-action">
                <span>📦</span>
                <div>
                  <h3>My Orders</h3>
                  <p>View your previous orders.</p>
                </div>
              </Link>
            </div>
          </section>

          <button onClick={handleLogout} className="profile-logout">
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
