// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Products from "./Products";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Header or Navigation Bar can be added here */}
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
