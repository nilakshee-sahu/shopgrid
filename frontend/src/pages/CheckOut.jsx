import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import "../styles/checkout.css";
const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Place order
  // const handlePlaceOrder = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (!user) {
  //     navigate("/login");
  //     return;
  //   }

  //   if (cartItems.length === 0) {
  //     setError("Your cart is empty.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // Create Razorpay order
  //     const orderRes = await fetch("/api/payment/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: totalAmount,
  //       }),
  //     });

  //     const orderData = await orderRes.json();

  //     if (!orderRes.ok) {
  //       throw new Error(orderData.message || "Payment initialization failed");
  //     }

  //     // Razorpay checkout options
  //     const options = {
  //       key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //       amount: orderData.amount,
  //       currency: orderData.currency,
  //       name: "ShopGrid",
  //       description: "ShopGrid Order",
  //       order_id: orderData.id,

  //       handler: async function (response) {
  //         try {
  //           // Verify Razorpay payment
  //           const verifyRes = await fetch("/api/payment/verify", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(response),
  //           });

  //           const verifyData = await verifyRes.json();

  //           if (!verifyRes.ok) {
  //             throw new Error(
  //               verifyData.message || "Payment verification failed",
  //             );
  //           }

  //           // Save order
  //           const saveOrderRes = await fetch("/api/orders", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${user.token}`,
  //             },
  //             body: JSON.stringify({
  //               items: cartItems.map((item) => ({
  //                 product: item._id,
  //                 quantity: item.qty,
  //                 price: item.price,
  //               })),
  //               totalAmount,
  //               shippingAddress: {
  //                 fullname: formData.fullname,
  //                 phone: Number(formData.phone),
  //                 email: formData.email,
  //                 street: formData.street,
  //                 city: formData.city,
  //                 state: formData.state,
  //                 country: formData.country,
  //                 pinCode: Number(formData.pinCode),
  //               },
  //               paymentId: response.razorpay_payment_id,
  //             }),
  //           });

  //           const saveOrderData = await saveOrderRes.json();

  //           if (!saveOrderRes.ok) {
  //             throw new Error(saveOrderData.message || "Order saving failed");
  //           }

  //           dispatch(clearCart());
  //           navigate("/ordersuccess");
  //         } catch (error) {
  //           setError(error.message);
  //         }
  //       },

  //       prefill: {
  //         name: formData.fullname || user.name,
  //         email: formData.email || user.email,
  //         contact: formData.phone,
  //       },

  //       theme: {
  //         color: "#365f76",
  //       },
  //     };

  //     const razorpay = new window.Razorpay(options);
  //     razorpay.open();

  //     razorpay.on("payment.failed", function () {
  //       setError("Payment failed. Please try again.");
  //       setLoading(false);
  //     });

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.qty,
            price: item.price,
          })),
          totalAmount,
          shippingAddress: {
            fullname: formData.fullname,
            phone: Number(formData.phone),
            email: formData.email,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pinCode: Number(formData.pinCode),
          },
          paymentId: `DEMO_PAYMENT_${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order creation failed");
      }

      dispatch(clearCart());
      navigate("/ordersuccess");
    } catch (error) {
      console.error("Order Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Add products to your cart before proceeding to checkout.</p>
          <Link to="/shop" className="checkout-shop-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <span>CHECKOUT</span>
          <h1>Complete Your Order</h1>
          <p>Enter your shipping details and review your order.</p>
        </div>

        {error && <div className="checkout-error">{error}</div>}

        <div className="checkout-content">
          <form className="shipping-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-section">
              <h2>Shipping Information</h2>

              <div className="form-grid">
                <div className="checkout-form-group full-width">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group full-width">
                  <label htmlFor="street">Street Address</label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Enter your street address"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Enter country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="pinCode">PIN Code</label>
                  <input
                    id="pinCode"
                    name="pinCode"
                    type="text"
                    placeholder="Enter PIN code"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="payment-section">
              <h2>Payment Method</h2>
              <div className="payment-option">
                <div className="payment-icon">💳</div>
                <div>
                  <h3>Online Payment</h3>
                  <p>Secure payment through Razorpay</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cartItems.map((item) => (
                <div className="checkout-item" key={item._id}>
                  <div className="checkout-item-image">
                    <img src={item.imageURL} alt={item.name} />
                  </div>

                  <div className="checkout-item-info">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.qty}</p>
                  </div>

                  <span>₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="checkout-divider"></div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="checkout-divider"></div>

            <div className="checkout-total">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <Link to="/cart" className="back-cart-link">
              ← Back to Cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
