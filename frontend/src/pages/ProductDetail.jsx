import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && cartItems) {
      const productInCart = cartItems.some((item) => item._id === product._id);

      setAddedToCart(productInCart);
    }
  }, [product, cartItems]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL,
        qty: 1,
      }),
    );

    setAddedToCart(true);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return <div className="product-loading">Loading Product...</div>;
  }

  if (!product) {
    return <div className="product-not-found">Product Not Found</div>;
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        {product.category} / {product.name}
      </div>

      <div className="product-detail">
        <div className="detail-image-container">
          <img
            src={product.imageURL}
            alt={product.name}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>

          <h2>{product.name}</h2>

          <p className="detail-price">₹{product.price.toFixed(2)}</p>

          <div className="detail-description">
            <h4>Product Description</h4>
            <p>{product.description}</p>
          </div>

          <div className="detail-actions">
            {addedToCart ? (
              <button onClick={handleGoToCart} className="detail-go-cart-btn">
                Go to Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="detail-cart-btn"
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            )}
          </div>

          <p
            className={`detail-stock ${
              product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : "● Temporarily Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
