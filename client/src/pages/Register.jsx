import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate inputs
    if (username === "") {
      setUsernameError("Please enter a username");
    } else {
      setUsernameError("");
    }
    if (password === "") {
      setPasswordError("Please enter a password");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (password.length > 30) {
      setPasswordError("Password must be less than 30 characters long");
    } else {
      setPasswordError("");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
    if (email === "") {
      setEmailError("Please enter an email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    // submit form if no errors
    if (
      usernameError === "" &&
      passwordError === "" &&
      confirmPasswordError === "" &&
      emailError === ""
    ) {
      // submit form
    }
  };

  return (
    <div className="registerPage">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <span className="error">{usernameError}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <span className="error">{confirmPasswordError}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}
