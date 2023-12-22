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

export const getRandomProducts = (count) => {
  return fetch(`${apiBaseURL}/products`)
    .then((response) => response.json())
    .then((json) => {
      const shuffledProducts = json.sort(() => Math.random() - 0.5);

      const randomProducts = shuffledProducts.slice(0, count);

      console.log(randomProducts);
      return randomProducts;
      r;
    });
};
export const getProductsInCategory = (category) => {
  return fetch(`${apiBaseURL}/products/category/${category}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
};
