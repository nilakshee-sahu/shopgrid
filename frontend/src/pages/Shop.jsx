import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/shop.css";
const API_URL = process.env.REACT_APP_API_URL;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <span>OUR COLLECTION</span>
          <h1>Shop All Products</h1>
          <p>Explore our collection and find something you'll love.</p>
        </div>

        {loading && (
          <div className="shop-message">
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="shop-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="shop-message">
            <p>No products available right now.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="shop-products">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
