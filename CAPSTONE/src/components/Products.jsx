import { getAllProducts } from "../../API/index.js";
import React from "react";
import { useState, useEffect } from "react";
// Use the function in your React component
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products when the component mounts
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = () => {
    getAllProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2>All Products</h2>

      {/* Display all products */}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "100px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
