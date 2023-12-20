// api/index.js
const apiBaseURL = "https://fakestoreapi.com";

export const getAllProducts = () => {
  return fetch(`${apiBaseURL}/products`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json); // You can remove this line if you don't want to log the result
      return json; // Return the products to the caller
    });
};
