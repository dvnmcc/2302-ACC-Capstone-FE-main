const apiBaseURL = "https://fakestoreapi.com";

export const getAllProducts = () => {
  return fetch(`${apiBaseURL}/products`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
};

export const getProductById = (productId) => {
  return fetch(`${apiBaseURL}/products/${productId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
};
