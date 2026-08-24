import React from "react";
import { Link } from "react-router-dom";
import "../styles/ComponentStyles/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageURL}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-bottom">
          <p className="product-price">₹{Number(product.price).toFixed(2)}</p>

          <Link to={`/product/${product._id}`} className="product-details-link">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
