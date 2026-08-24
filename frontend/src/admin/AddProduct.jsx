import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminStyles/addProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!image && !imageURL.trim()) {
      setError("Please upload an image or enter an image URL.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      if (image) {
        data.append("image", image);
      }
      if (imageURL.trim()) {
        data.append("imageURL", imageURL.trim());
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Failed to add product");
      }

      setSuccess("Product added successfully.");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImage(null);
      setImageURL("");
      document.getElementById("product-image").value = "";

      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);
    } catch (error) {
      console.error("Add Product Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-add-product">
      <section className="add-product-header">
        <h1>Add Product</h1>
        <Link to="/admin/products" className="back-products-btn">
          ← Back to Products
        </Link>
      </section>

      <section className="add-product-card">
        {error && <div className="admin-form-error">{error}</div>}
        {success && <div className="admin-form-success">{success}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
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
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={handleChange}
                min="0"
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
              placeholder="e.g. Electronics"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-image">Product Image</label>
            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <span className="selected-image">{image.name}</span>}
          </div>

          <div className="image-divider">
            <span>OR</span>
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">Image URL</label>
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              placeholder="https://example.com/product-image.jpg"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <Link to="/admin/products" className="cancel-btn">
              Cancel
            </Link>

            <button
              type="submit"
              className="add-product-btn"
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddProduct;
