import React from "react";
import "../styles/FooterStyles/return.css";

const Return = () => {
  return (
    <main className="policy-page">
      {/* Return Policy Hero */}
      <section className="policy-hero">
        <span className="policy-tag">SHOP WITH CONFIDENCE</span>
        <h1>Return Policy</h1>
        <p>
          We want you to be satisfied with your purchase. Here's how our return
          process works.
        </p>
      </section>

      {/* Return Policy Content */}
      <section className="policy-content">
        <p className="policy-updated">Last updated: August 2026</p>

        <section className="policy-section">
          <h2>1. Return Eligibility</h2>
          <p>
            Products may be eligible for return if they are unused, in their
            original condition, and returned with their original packaging and
            accessories.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Return Period</h2>
          <p>
            Return requests should generally be submitted within 7 days of
            receiving the order. Requests submitted after this period may not be
            accepted.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Damaged or Incorrect Products</h2>
          <p>
            If you receive a damaged, defective, or incorrect product, please
            contact our support team as soon as possible with your order details
            and relevant photographs.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Non-Returnable Products</h2>
          <p>
            Certain products may not be eligible for return due to their nature,
            hygiene requirements, customization, or other applicable
            restrictions.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Return Process</h2>
          <p>
            To request a return, contact our support team with your order ID,
            product details, and reason for the return. Our team will provide
            the next steps if the request is eligible.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Refunds</h2>
          <p>
            Once an approved return is received and inspected, eligible refunds
            will be processed through the applicable payment method. The time
            required for the refund to appear may depend on your payment
            provider.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Shipping Costs</h2>
          <p>
            Return shipping costs may depend on the reason for the return. If
            the product was damaged, defective, or incorrectly supplied,
            ShopGrid may cover applicable return shipping costs.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Exchange Requests</h2>
          <p>
            Exchanges may be available for eligible products, depending on
            product availability and the condition of the returned item.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Contact Us</h2>
          <p>
            For return or refund questions, contact us at support@shopgrid.com
            with your order details.
          </p>
        </section>
      </section>
    </main>
  );
};

export default Return;
