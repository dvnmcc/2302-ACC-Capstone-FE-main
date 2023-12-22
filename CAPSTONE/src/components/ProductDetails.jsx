// ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../API/index.js";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

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
    <div>
      {/* Display product details */}
      {productDetails && (
        <div>
          <h2>{productDetails.title}</h2>
          <p>{productDetails.description}</p>
          <p>Price: ${productDetails.price}</p>
          <img
            src={productDetails.image}
            alt={productDetails.title}
            style={{ maxWidth: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
