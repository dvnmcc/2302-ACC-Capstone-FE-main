const apiBaseURL = "https://fakestoreapi.com";

// Function to get all products
export const getAllProducts = async () => {
  const response = await fetch(`${apiBaseURL}/products`);
  return response.json();
};
