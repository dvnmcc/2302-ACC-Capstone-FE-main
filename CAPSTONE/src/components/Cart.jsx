import React, { useState, useEffect } from "react";
import { getUserCartData } from "../../API/index.js";

const Cart = ({ userId, handleRemoveFromCart }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const userCart = await getUserCartData(userId);
        setCart(userCart);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    fetchUserCart();
  }, [userId]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            Product {item.id} - Quantity: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
