import React from "react";

const Cart = ({
  cart,
  products,
  handleRemoveFromCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  console.log("Cart received in Cart component:", cart);

  if (!cart || !products) {
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
            Product Name:{" "}
            {products.find((product) => product.id === item.id)?.title} -
            Quantity: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
