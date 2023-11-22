import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Đăng nhập | Shop BB";
  },[]);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    if (email !== "" && password !== "") {
      login(email, password);
      navigate("/");
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleRegister = () => {
    // Handle register logic here
    navigate("/register");
    console.log("Redirecting to register page...");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <label style={{ color: "red" }}>{error}</label>}
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Login;
