import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsInCategory } from "../../API/index.js";

const Electronics = () => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  useEffect(() => {
    // Fetch electronic products when the component mounts
    getProductsInCategory("electronics").then((products) =>
      setElectronicsProducts(products)
    );
  }, []);

  return (
    <div>
      <h2>Electronic Products</h2>
      <input type="text" placeholder="Search products" />
      <div>
        {electronicsProducts.map((product) => (
          <div key={product.id}>
            <img
              src={product.image}
              style={{ maxWidth: "100px" }}
              alt={product.title}
            />
            <Link to={`/products/${product.id}`}>
              <button>View Details</button>
            </Link>
            <p>{product.title}</p>
          </div>
        ))}
      </div>

      {/* Add a link to go back to the homepage */}
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Electronics;
