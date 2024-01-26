import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProductById } from "../../API/index.js";
import "./details.css";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  useEffect(() => {
    getProductById(productId)
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);

        navigate("/products");
      });
  }, [productId, navigate]);

  return (
    <div className="product-details-container">
      <div className="category-buttons">
        {isLoggedIn ? (
          <button onClick={() => localStorage.removeItem("authToken")}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/products">
          <button>All Products</button>
        </Link>
        <Link to="/category/electronics">
          <button>Electronics</button>
        </Link>
        <Link to="/category/clothing">
          <button>Clothing</button>
        </Link>
      </div>

      {productDetails && (
        <div>
          <h2>{productDetails.title}</h2>
          <p className="description">{productDetails.description}</p>
          <p>Price: ${productDetails.price}</p>
          <img
            src={productDetails.image}
            alt={productDetails.title}
            style={{ maxWidth: "30%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
