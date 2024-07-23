import LoginForm from "../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div id="loginContainer">
      <h1>Login Page</h1>
      <LoginForm></LoginForm>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
    </div>
  );
}

export default Login;
