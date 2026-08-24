import React from "react";
import { Link } from "react-router-dom";
import "../styles/ComponentStyles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ShopGrid
          </Link>
          <p>
            Your trusted destination for quality products, great prices, and a
            better shopping experience.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/return">Return Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopGrid. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
