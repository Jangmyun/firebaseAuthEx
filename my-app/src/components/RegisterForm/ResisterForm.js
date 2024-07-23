import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("localhost:3001/auth/register", {
        username,
        password,
      });
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  return (
    <form className={styles.formBox} onSubmit={handleRegister}>
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
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
