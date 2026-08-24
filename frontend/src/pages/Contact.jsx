import React from "react";
import { Link } from "react-router-dom";
import "../styles/FooterStyles/contact.css";

const Contact = () => {
  return (
    <main className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-tag">GET IN TOUCH</span>
          <h1>
            We'd Love to
            <span> Hear From You.</span>
          </h1>
          <p>
            Have a question or need help with your order? Our team is here to
            help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <span className="section-tag">CONTACT US</span>
            <h2>How Can We Help?</h2>
            <p className="contact-intro">
              Whether you have a question about our products, your order, or
              anything else, feel free to reach out to us.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>support@shopgrid.com</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>ShopGrid, India</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">🕐</div>
                <div>
                  <h3>Support Hours</h3>
                  <p>Monday - Saturday, 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-support">
            <div className="support-icon">💙</div>
            <h2>We're Here to Help</h2>
            <p>
              Our support team is available to assist you with orders, products,
              payments, returns, and any other questions you may have.
            </p>

            <a href="mailto:support@shopgrid.com" className="email-btn">
              Email Support
            </a>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="contact-help">
        <div className="contact-help-content">
          <span className="section-tag">NEED HELP?</span>
          <h2>Looking for Something Else?</h2>
          <p>
            You can also explore our policies and frequently needed information.
          </p>

          <div className="contact-help-links">
            <Link to="/return">Return Policy</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
