import React from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "//localhost:3001/auth/login",
        { username, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login Failed: ", error);
    }
  };

  return (
    <form className={styles.formBox} onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
