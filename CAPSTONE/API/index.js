const apiBaseURL = "https://fakestoreapi.com";
const tokenKey = "authToken";

export const getAllUsers = () => {
  return fetch(`${apiBaseURL}/users`)
    .then((response) => response.json())
    .then((json) => {
      console.log("All users:", json);
      return json;
    })
    .catch((error) => {
      console.error("Error fetching all users:", error);
      throw error;
    });
};

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
export const getCartData = () => {
  return fetch(`${apiBaseURL}/carts`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
};

export const getUserCartData = (userId) => {
  const finalUserId = userId || generateUniqueUserId();

  return fetch(`${apiBaseURL}/cart/user/${finalUserId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((error) => {
      console.error("Error fetching user cart data:", error);
      throw error;
    });
};
export const registerUser = async (userData) => {
  try {
    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default loginUser;
