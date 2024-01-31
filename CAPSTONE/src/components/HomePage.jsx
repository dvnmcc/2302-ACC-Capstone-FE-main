import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRandomProducts } from "../../API/index.js";
import { getAllUsers } from "../../API/index.js";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import "./homePage.css";
//added cart
const HomePage = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getRandomProducts(9).then((products) => setRandomProducts(products));

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const fetchAllUsers = () => {
    getAllUsers()
      .then((users) => {})
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
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

  fetchAllUsers();

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
      </div>
      <Cart
        cart={cart}
        products={randomProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
      <Checkout cart={cart} onCheckoutComplete={handleClearCart} />
    </div>
  );
};

export default HomePage;
