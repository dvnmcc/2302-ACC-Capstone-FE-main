// Login.jsx

import React, { useState } from "react";
import loginUser from "../../API";

import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(credentials);
      console.log("Login Response:", response);

      localStorage.setItem("authToken", response.token);

      window.location.href = "/products";
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
