import React, { useState } from "react";
import { registerUser } from "../../API";
import "./register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleRegistration = async () => {
    try {
      const response = await registerUser(userData);
      const newUserId = response.id;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-form">Registration Form</h2>
      <form className="register-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
