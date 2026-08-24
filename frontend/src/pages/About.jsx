import React from "react";
import { Link } from "react-router-dom";
import "../styles/FooterStyles/about.css";

const About = () => {
  return (
    <main className="about-page">
      {/* About Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">ABOUT SHOPGRID</span>
          <h1>
            Shopping Made
            <span> Simple & Better.</span>
          </h1>
          <p>
            ShopGrid is an online shopping platform built to make discovering
            and purchasing products simple, convenient, and reliable.
          </p>
        </div>

        <div className="about-hero-decoration">
          <div className="about-logo-icon">🛍️</div>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="about-section-content">
          <span className="section-tag">OUR STORY</span>
          <h2>Welcome to ShopGrid</h2>
          <p>
            ShopGrid was created with a simple idea: online shopping should be
            easy, enjoyable, and accessible to everyone.
          </p>
          <p>
            We bring a growing collection of products together in one convenient
            place, allowing customers to discover products, compare options, and
            shop with confidence.
          </p>
          <p>
            From browsing products to placing an order, our goal is to provide a
            smooth shopping experience from start to finish.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="about-mission">
        <div className="mission-content">
          <div className="mission-text">
            <span className="section-tag">OUR MISSION</span>
            <h2>Making Every Shopping Experience Better</h2>
            <p>
              Our mission is to create a reliable e-commerce platform where
              customers can find quality products at competitive prices without
              unnecessary complexity.
            </p>
            <p>
              We focus on simplicity, convenience, security, and customer
              satisfaction in everything we build.
            </p>
          </div>

          <div className="mission-highlight">
            <div className="mission-icon">💙</div>
            <h3>Shop with Confidence</h3>
            <p>
              A simple and reliable shopping experience is at the heart of
              ShopGrid.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-values">
        <div className="section-heading centered">
          <span className="section-tag">Our Values</span>
          <h2>What We Value</h2>
          <p>The principles that shape the ShopGrid experience.</p>
        </div>

        <div className="value-cards">
          <div className="value-card">
            <div className="value-icon">🛒</div>
            <h3>Simple Shopping</h3>
            <p>Browse, discover, and shop without unnecessary complications.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">🔒</div>
            <h3>Secure Experience</h3>
            <p>
              We prioritize a safe and trustworthy experience for our customers.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">⭐</div>
            <h3>Quality First</h3>
            <p>
              We aim to provide products that offer genuine value to our
              customers.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Customer Focus</h3>
            <p>
              Every part of ShopGrid is designed with the customer experience in
              mind.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="about-social">
        <div className="about-social-content">
          <span className="section-tag">STAY CONNECTED</span>
          <h2>Connect With ShopGrid</h2>
          <p>
            Follow us on social media for new products, updates, offers, and
            more.
          </p>

          <div className="social-links">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i class="fa-brands fa-instagram"></i> Instagram
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i class="fa-brands fa-facebook"></i> Facebook
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <i class="fa-brands fa-x-twitter"></i> Twitter
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i class="fa-brands fa-youtube"></i> YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="about-cta">
        <div>
          <h2>Ready to Explore ShopGrid?</h2>
          <p>Discover products you'll love and start shopping today.</p>
        </div>
        <Link to="/products" className="about-cta-btn">
          Start Shopping
        </Link>
      </section>

    </main>
  );
};

export default About;
