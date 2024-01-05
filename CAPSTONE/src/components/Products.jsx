import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../API/index.js";
import Cart from "./Cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  useEffect(() => {
    console.log("Cart has been updated:", cart);

    saveCartToLocalStorage();
  }, [cart]);

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

  const handleRemoveFromCart = (productId) => {};

  const saveCartToLocalStorage = () => {};

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
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
};

export default Products;
