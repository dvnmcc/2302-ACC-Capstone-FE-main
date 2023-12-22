import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRandomProducts } from "../../API/index.js";

const HomePage = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Fetch random products when the component mounts
    getRandomProducts(9).then((products) => setRandomProducts(products));
  }, []);

  return (
    <div>
      <h1>Welcome to the Fake Store!</h1>

      {/* Search Bar  */}
      <input type="text" placeholder="Search products" />

      {/* Category Buttons */}
      <div>
        <Link to="/category/electronics">
          <button>Electronics</button>
        </Link>
        <Link to="/category/clothing">
          <button>Clothing</button>
        </Link>
        {/* Add more category buttons as needed */}
      </div>

      {/* Display Random Featured Products */}
      <div>
        <h2>Featured Products</h2>
        <div>
          {randomProducts.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
              <img
                src={product.image}
                style={{ maxWidth: "100px" }}
                alt={product.title}
              />
              <Link to={`/products/${product.id}`}>
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
