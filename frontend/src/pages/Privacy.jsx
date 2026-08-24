import React from "react";
import "../styles/FooterStyles/privacy.css";

const Privacy = () => {
  return (
    <main className="policy-page">
      {/* Privacy Hero */}
      <section className="policy-hero">
        <span className="policy-tag">YOUR PRIVACY</span>
        <h1>Privacy Policy</h1>
        <p>
          We respect your privacy and are committed to protecting your personal
          information.
        </p>
      </section>

      {/* Privacy Content */}
      <section className="policy-content">
        <p className="policy-updated">Last updated: August 2026</p>

        <section className="policy-section">
          <h2>1. Information We Collect</h2>
          <p>
            When you use ShopGrid, we may collect information such as your name,
            email address, phone number, shipping address, account details, and
            information related to your orders.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process orders, provide customer support,
            manage your account, communicate with you, and improve our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Account Information</h2>
          <p>
            You are responsible for keeping your account credentials secure.
            Please notify us if you believe that your account has been accessed
            without your permission.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Payment Information</h2>
          <p>
            Payment information is processed through our payment service
            providers. ShopGrid does not intentionally store complete payment
            card details on its own servers.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Cookies</h2>
          <p>
            ShopGrid may use cookies or similar technologies to maintain
            sessions, remember preferences, and improve the functionality of the
            website.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
            However, no online service can guarantee complete security.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Third-Party Services</h2>
          <p>
            ShopGrid may use trusted third-party services for payments, email
            communication, analytics, hosting, and other business operations.
            These services may process information according to their own
            policies.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Your Rights</h2>
          <p>
            Depending on applicable laws, you may have the right to request
            access to, correction of, or deletion of your personal information.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Policy Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated revision date.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at support@shopgrid.com.
          </p>
        </section>
      </section>
    </main>
  );
};

export default Privacy;
