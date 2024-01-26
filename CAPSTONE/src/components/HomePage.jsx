import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRandomProducts } from "../../API/index.js";
import { getAllUsers } from "../../API/index.js";
import "./homePage.css";

const fetchAllUsers = () => {
  getAllUsers()
    .then((users) => {})
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
};

fetchAllUsers();

const HomePage = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getRandomProducts(9).then((products) => setRandomProducts(products));

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container">
      <h1>Welcome to My Store!</h1>

      <div className="category-buttons">
        {isLoggedIn ? (
          <button onClick={() => localStorage.removeItem("authToken")}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/products">
          <button>All Products</button>
        </Link>
        <Link to="/category/electronics">
          <button>Electronics</button>
        </Link>
        <Link to="/category/clothing">
          <button>Clothing</button>
        </Link>
      </div>

      <div>
        <h2 className="featured-title">Featured Products</h2>
        <div className="featured-products">
          {randomProducts.map((product) => (
            <div key={product.id} className="product-card">
              <p className="product-title">{product.title}</p>
              <img
                src={product.image}
                className="product-image"
                alt={product.title}
              />
              <Link to={`/products/${product.id}`} className="product-link">
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
