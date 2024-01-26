import React from "react";
import "./cart.css";

const Cart = ({
  cart,
  products,
  handleRemoveFromCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  if (!cart || !products) {
    return (
      <div>
        <h2>Cart</h2>
        <p>Loading cart...</p>
      </div>
    );
  }
  const total = cart.reduce((acc, item) => {
    const product = products.find((product) => product.id === item.id);
    return acc + (product ? item.quantity * product.price : 0);
  }, 0);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => {
          const product = products.find((product) => product.id === item.id);

          return (
            <li key={item.id} className="cart-item">
              {product && (
                <>
                  <div className="cart-item-details">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="cart-item-image"
                    />
                    <div>
                      <p>Product Name: {product.title}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-button"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
      <div className="cart-total">
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
