import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      console.log("Products received:", data);
      console.log("Is array:", Array.isArray(data));
      console.log("Number of products:", data.length);

      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">SHOP SMART. LIVE BETTER.</span>
          <h1>
            Everything You Need,
            <span> All in One Place.</span>
          </h1>
          <p>
            Discover quality products at great prices. Shop your favorites and
            enjoy a simple, reliable shopping experience with ShopGrid.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="hero-btn primary-btn">
              Shop Now
            </Link>
            <Link to="/shop" className="hero-btn secondary-btn">
              Explore Products
            </Link>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="hero-circle"></div>
          <div className="hero-card hero-card-one">
            <span>🛍️</span>
            <p>Quality Products</p>
          </div>
          <div className="hero-card hero-card-two">
            <span>💙</span>
            <p>Shop with Confidence</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="section-tag">OUR COLLECTION</span>
            <h2>Featured Products</h2>
            <p>Explore some of our most popular products.</p>
          </div>

          <Link to="/shop" className="view-all-btn">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="product-cards">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <p>No products available right now.</p>
          </div>
        )}
      </section>

      <section className="why-shopgrid">
        <div className="section-heading centered">
          <span className="section-tag">WHY SHOPGRID?</span>
          <h2>Shopping Made Simple</h2>
          <p>Everything you need for a better online shopping experience.</p>
        </div>

        <div className="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your orders delivered quickly and safely to your doorstep.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Secure Shopping</h3>
            <p>
              Your information and payments are protected with secure
              technology.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">💳</div>
            <h3>Easy Payments</h3>
            <p>Enjoy a simple and convenient checkout experience.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">⭐</div>
            <h3>Quality Products</h3>
            <p>
              Shop from a carefully selected collection of quality products.
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <h2>Ready to Start Shopping?</h2>
          <p>Find something you'll love today.</p>
        </div>

        <Link to="/shop" className="cta-btn">
          Browse Products
        </Link>
      </section>
    </main>
  );
};

export default Home;
