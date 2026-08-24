import React from "react";
import "../styles/FooterStyles/terms.css";

const Terms = () => {
  return (
    <main className="policy-page">
      {/* Terms Hero */}
      <section className="policy-hero">
        <span className="policy-tag">SHOPGRID POLICIES</span>
        <h1>Terms & Conditions</h1>
        <p>
          Please read these terms carefully before using the ShopGrid website
          and services.
        </p>
      </section>

      {/* Terms Content */}
      <section className="policy-content">
        <p className="policy-updated">Last updated: August 2026</p>

        <section className="policy-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ShopGrid, you agree to comply with these Terms
            & Conditions. If you do not agree with these terms, please do not
            use our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Account Registration</h2>
          <p>
            You may need to create an account to access certain features. You
            are responsible for providing accurate information and maintaining
            the security of your account credentials.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Products and Pricing</h2>
          <p>
            We make reasonable efforts to ensure that product descriptions,
            images, prices, and availability are accurate. However, errors or
            changes may occasionally occur.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Orders</h2>
          <p>
            Placing an order does not necessarily guarantee that the order will
            be fulfilled. ShopGrid reserves the right to cancel or modify an
            order in cases such as pricing errors, stock issues, or suspected
            fraudulent activity.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Payments</h2>
          <p>
            Orders must be paid using the payment methods made available during
            checkout. Payment information may be processed by third-party
            payment providers.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Shipping and Delivery</h2>
          <p>
            Delivery times are estimates and may vary depending on location,
            availability, logistics providers, and circumstances outside our
            control.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Returns and Refunds</h2>
          <p>
            Returns and refunds are subject to our Return Policy. Please review
            the Return Policy before making a purchase.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Prohibited Activities</h2>
          <p>
            You agree not to misuse the website, attempt to gain unauthorized
            access, interfere with our services, or use ShopGrid for unlawful
            purposes.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Intellectual Property</h2>
          <p>
            ShopGrid's website content, branding, graphics, design, and other
            materials are protected by applicable intellectual property laws and
            may not be reproduced without appropriate permission.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Limitation of Liability</h2>
          <p>
            To the extent permitted by applicable law, ShopGrid will not be
            responsible for indirect or consequential losses arising from the
            use of our website or services.
          </p>
        </section>

        <section className="policy-section">
          <h2>11. Changes to These Terms</h2>
          <p>
            We may update these Terms & Conditions when necessary. Updated terms
            will be posted on this page along with the revised date.
          </p>
        </section>

        <section className="policy-section">
          <h2>12. Contact Us</h2>
          <p>
            If you have questions regarding these terms, contact us at
            support@shopgrid.com.
          </p>
        </section>
      </section>
    </main>
  );
};

export default Terms;
