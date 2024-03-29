import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsInCategory } from "../../API/index.js";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import "./homePage.css";

const Electronics = () => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getProductsInCategory("electronics").then((products) =>
      setElectronicsProducts(products)
    );
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleAddToCart = (productId) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      window.location.href = "/login";
      return;
    }

    const productInCart = cart.find((item) => item.id === productId);
    saveCartToLocalStorage();

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

  const saveCartToLocalStorage = () => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to local storage:", error.message);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleClearCart = () => {
    setCart([]);
    saveCartToLocalStorage();
  };

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
            <p className="product-title">{product.title}</p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>

            <Link to={`/products/${product.id}`} className="product-link">
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      <Cart
        cart={cart}
        products={electronicsProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
      <Checkout cart={cart} onCheckoutComplete={handleClearCart} />

      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Electronics;
