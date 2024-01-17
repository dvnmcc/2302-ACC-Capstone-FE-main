import React, { useState } from "react";

const Checkout = ({ cart, onCheckoutComplete }) => {
  console.log("Cart in Checkout component:", cart);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const displayDummyForm = () => {
    return (
      <div>
        <h3>Checkout Form</h3>

        <form>
          <label>
            Full Name:
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </label>
          <br />

          <label>
            Address:
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Card Number:
            <input
              type="number"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Expiration Date:
            <input
              type="number"
              value={formData.expirationDate}
              onChange={(e) =>
                setFormData({ ...formData, expirationDate: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            CVV:
            <input
              type="number"
              value={formData.cvv}
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
            />
          </label>
        </form>
      </div>
    );
  };

  const handleCheckout = () => {
    console.log("Cart cleared. Implement your clearCart logic here.");
  };

  const handleCompletePurchase = () => {
    setFormData({
      fullName: "",
      address: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    });
    onCheckoutComplete();

    window.alert(
      "Thank you for ordering with us! Your order will be shipped shortly!"
    );
  };

  return (
    <div>
      <h2>Checkout</h2>

      <div>{displayDummyForm()}</div>
      <button
        onClick={() => {
          handleCheckout();
          handleCompletePurchase();
        }}
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
