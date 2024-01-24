import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsInCategory } from "../../API/index.js";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import "./homePage.css"; // Import the shared CSS file

const Clothing = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [clothingProducts, setClothingProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const womenClothingPromise = getProductsInCategory("women's clothing");

    const menClothingPromise = getProductsInCategory("men's clothing");

    Promise.all([womenClothingPromise, menClothingPromise])
      .then(([womenClothing, menClothing]) => {
        const combinedClothing = [...womenClothing, ...menClothing];
        setClothingProducts(combinedClothing);
      })
      .catch((error) => {
        console.error("Error fetching clothing products:", error);
      });

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
        products={clothingProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
      <Checkout cart={cart} onCheckoutComplete={handleClearCart} />

      {/* Add a link to go back to the homepage */}
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Clothing;
