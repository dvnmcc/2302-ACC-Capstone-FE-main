import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../API/index.js";
import Cart from "./Cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = () => {
    getAllProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleAddToCart = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);

    if (productInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { id: productId, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  console.log("Products Cart:", cart); // Move it here

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

            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Link to="/cart">Go to Cart</Link>

      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
};

export default Products;
