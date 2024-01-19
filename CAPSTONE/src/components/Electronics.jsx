import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsInCategory } from "../../API/index.js";
import "./homePage.css";

const Electronics = () => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state

  useEffect(() => {
    getProductsInCategory("electronics").then((products) =>
      setElectronicsProducts(products)
    );
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container">
      <h2>Electronic Products</h2>

      <div className="category-buttons">
        {isLoggedIn ? (
          <Link to="/logout">
            <button>Logout</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/products">
          <button>All Products</button>
        </Link>

        <Link to="/category/clothing">
          <button>Clothing</button>
        </Link>
      </div>

      <div className="featured-products">
        {electronicsProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              className="product-image"
              alt={product.title}
            />
            <Link to={`/products/${product.id}`} className="product-link">
              <button>View Details</button>
            </Link>
            <p className="product-title">{product.title}</p>
          </div>
        ))}
      </div>

      {/* Add a link to go back to the homepage */}
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Electronics;
