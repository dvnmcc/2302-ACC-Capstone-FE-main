import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsInCategory } from "../../API/index.js";
import "./homePage.css"; // Import the shared CSS file

const Clothing = () => {
  const [clothingProducts, setClothingProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch clothing products for women
    const womenClothingPromise = getProductsInCategory("women's clothing");

    // Fetch clothing products for men
    const menClothingPromise = getProductsInCategory("men's clothing");

    // Combine the results when both promises resolve
    Promise.all([womenClothingPromise, menClothingPromise])
      .then(([womenClothing, menClothing]) => {
        // Concatenate the arrays
        const combinedClothing = [...womenClothing, ...menClothing];
        setClothingProducts(combinedClothing);
      })
      .catch((error) => {
        console.error("Error fetching clothing products:", error);
      });

    // Check user's login status
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container">
      <h2>Clothing Products</h2>

      {/* Navigation Buttons */}
      <div className="category-buttons">
        <Link to={isLoggedIn ? "/logout" : "/login"}>
          <button>{isLoggedIn ? "Logout" : "Login"}</button>
        </Link>
        <Link to="/products">
          <button>All Products</button>
        </Link>
        <Link to="/category/electronics">
          <button>Electronics</button>
        </Link>

        {/* Add more category buttons as needed */}
      </div>

      {/* Remove the search bar */}
      <div className="featured-products">
        {clothingProducts.map((product) => (
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

export default Clothing;
