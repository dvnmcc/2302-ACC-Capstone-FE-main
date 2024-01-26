import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../API/index.js";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import Checkout from "./Checkout.jsx";
import "./homePage.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    handleGetAllProducts();
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

  const handleGetAllProducts = () => {
    getAllProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>All Products</h2>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="category-buttons">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button onClick={handleLogin}>Login</button>
          </Link>
        )}
        <Link to="/category/electronics">
          <button>Electronics</button>
        </Link>
        <Link to="/category/clothing">
          <button>Clothing</button>
        </Link>
      </div>

      <div className="featured-products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-title">{product.title}</h3>

            <p className="product-price">Price: ${product.price}</p>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
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
      <Cart
        cart={cart}
        products={products}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
      <Checkout cart={cart} onCheckoutComplete={handleClearCart} />
    </div>
  );
};

export default Products;
