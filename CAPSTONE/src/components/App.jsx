// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
import HomePage from "./HomePage";
import Electronics from "./Electronics";
import Clothing from "./Clothing";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Header or Navigation Bar will be added here */}
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/category/electronics" element={<Electronics />} />
        <Route path="/category/clothing" element={<Clothing />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
