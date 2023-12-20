// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Products from "./Products"; // Import your main component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Header or Navigation Bar can be added here */}

        {/* Use the "element" prop to directly render a component */}
        <Route path="/products" element={<Products />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
