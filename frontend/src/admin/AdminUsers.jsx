import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/AdminStyles/adminUsers.css";
const API_URL = process.env.REACT_APP_API_URL;

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/users`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Failed to fetch users",
          );
        }

        setUsers(data);
      } catch (error) {
        console.error("Users Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) {
    return (
      <main className="admin-users">
        <div className="admin-users-loading">Loading users...</div>
      </main>
    );
  }

  return (
    <main className="admin-users">
      <section className="users-header">
        <div>
          <span className="admin-tag">ADMIN PANEL</span>
          <h1>Manage Users</h1>
          <p>View registered users and their account details.</p>
        </div>

        <Link to="/admin" className="back-admin-btn">
          ← Dashboard
        </Link>
      </section>

      {error && <div className="users-error">{error}</div>}

      <section className="users-card">
        <div className="users-card-header">
          <div>
            <span className="admin-tag">USERS</span>
            <h2>All Users</h2>
          </div>

          <span className="user-count">
            {users.length} {users.length === 1 ? "User" : "Users"}
          </span>
        </div>

        {users.length === 0 ? (
          <div className="no-users">
            <div className="no-users-icon">👥</div>
            <h3>No Users Found</h3>
            <p>There are currently no registered users.</p>
          </div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((currentUser) => (
                  <tr key={currentUser._id}>
                    <td>
                      <span className="user-id">
                        {currentUser._id || "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="user-name">
                        {currentUser.name || "Unknown User"}
                      </span>
                    </td>

                    <td>
                      <span className="user-email">
                        {currentUser.email || "No email"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`role-badge ${
                          currentUser.role === "admin"
                            ? "role-admin"
                            : "role-user"
                        }`}
                      >
                        {currentUser.role || "user"}
                      </span>
                    </td>

                    <td>
                      <span className="user-date">
                        {currentUser.createdAt
                          ? new Date(currentUser.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </span>
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

export default AdminUsers;
