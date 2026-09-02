import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/AdminStyles/editProduct.css";
const API_URL = process.env.REACT_APP_API_URL;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          stock: data.stock || "",
        });

        setCurrentImage(data.imageURL || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.token) {
      setError("You are not authorized. Please login again.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("stock", product.stock);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Server returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      setSuccess("Product updated successfully.");

      setCurrentImage(data.imageURL || currentImage);

      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);
    } catch (error) {
      console.error("Update Product Error:", error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="edit-product-page">
        <div className="edit-product-loading">
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="edit-product-page">
      <div className="edit-product-header">
        <div>
          <span className="admin-tag">ADMIN PANEL</span>
          <h1>Edit Product</h1>
          <p>Update product information and inventory.</p>
        </div>

        <Link to="/admin/products" className="back-products-btn">
          ← Back to Products
        </Link>
      </div>

      {error && <div className="edit-product-error">{error}</div>}

      {success && <div className="edit-product-success">{success}</div>}

      <form className="edit-product-form" onSubmit={handleSubmit}>
        <div className="edit-product-main">
          <div className="form-section">
            <h2>Product Information</h2>

            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="6"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                value={product.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Product Image</h2>

            {currentImage && (
              <div className="current-image">
                <p>Current Image</p>
                <img src={currentImage} alt={product.name} />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="image">Change Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {image && (
                <p className="selected-image">Selected: {image.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="edit-product-actions">
          <Link to="/admin/products" className="cancel-btn">
            Cancel
          </Link>

          <button type="submit" className="save-product-btn" disabled={saving}>
            {saving ? "Updating Product..." : "Update Product"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProduct;
