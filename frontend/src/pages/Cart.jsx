import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../redux/cartSlice";
import "../styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate cart total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  // Increase quantity
  const increaseQuantity = (item) => {
    dispatch(
      addToCart({
        ...item,
        qty: item.qty + 1,
      }),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (item) => {
    if (item.qty > 1) {
      dispatch(
        addToCart({
          ...item,
          qty: item.qty - 1,
        }),
      );
    } else {
      dispatch(removeFromCart(item._id));
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Add some products to your cart and they will appear here.</p>
          <Link to="/shop" className="shop-now-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <span className="cart-tag">SHOPPING CART</span>
            <h1>Your Cart</h1>
            <p>{cartItems.length} item(s) in your cart</p>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-image">
                  <img src={item.imageURL} alt={item.name} />
                </div>

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">
                    ₹{Number(item.price).toFixed(2)}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item)}>−</button>

                  <span>{item.qty}</span>

                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>

                <div className="cart-item-total">
                  ₹{(item.price * item.qty).toFixed(2)}
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/shop" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
