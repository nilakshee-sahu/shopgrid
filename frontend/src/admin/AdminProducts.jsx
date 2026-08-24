import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminStyles/AdminProducts.css";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete Product Error:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <main className="admin-products-page">
        <div className="admin-products-container">
          <p className="admin-products-loading">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-products-page">
      <div className="admin-products-container">
        <div className="admin-products-header">
          <div>
            <span className="admin-section-label">ADMIN PANEL</span>
            <h1>Manage Products</h1>
            <p>View, edit, and manage all products in your store.</p>
          </div>

          <Link to="/admin/add-product" className="add-product-btn">
            + Add Product
          </Link>
        </div>

        {error && <div className="admin-products-error">{error}</div>}

        <div className="products-summary">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <h2>No Products Found</h2>
            <p>There are currently no products in your store.</p>
            <Link to="/admin/add-product" className="add-product-btn">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="products-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="admin-product-info">
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="admin-product-image"
                        />

                        <div>
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="product-category">
                        {product.category}
                      </span>
                    </td>

                    <td className="product-price">
                      ₹{Number(product.price).toFixed(2)}
                    </td>

                    <td>
                      <span
                        className={`product-stock ${
                          product.stock > 0 ? "stock-available" : "stock-empty"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td>
                      <div className="product-actions">
                        <button
                          className="edit-product-btn"
                          onClick={() =>
                            navigate(`/admin/edit-product/${product._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-product-btn"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminProducts;
