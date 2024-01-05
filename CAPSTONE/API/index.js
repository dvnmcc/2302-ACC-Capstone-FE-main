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

export const fetchUserCart = async (userId) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/carts/user/${userId}`
    );

    if (!response.ok) {
      throw new Error("Error fetching user cart");
    }

    const cartData = await response.json();
    return cartData;
  } catch (error) {
    console.error("Error fetching user cart:", error.message);
    throw error;
  }
};
export const updateUserCart = async (userId, products) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        products,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating user cart: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
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
