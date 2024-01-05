import React, { useState, useEffect } from "react";
import { fetchUserCart } from "../../API";

const Cart = ({ cart, handleRemoveFromCart }) => {
  console.log("Cart component rendered");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetchUserCart(userId)
        .then((cartData) => {
          console.log("Cart received in Cart component:", cartData);
          // Assuming fetchUserCart returns the cart data correctly

          // Add any other logic here based on the updated cartData
        })
        .catch((error) => {
          console.error("Error fetching user cart:", error.message);
        });
    }
  }, [cart]); // Include cart as a dependency

  if (!cart) {
    return (
      <div>
        <h2>Cart</h2>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            Item ID: {item.id} - Quantity: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
