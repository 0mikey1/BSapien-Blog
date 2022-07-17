import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from refresh on null submissions
    setError(false);
    try {
      const res = await axios.post("/auth/register/", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("login"); // if user succesfully registers, user is redirected to login page
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">Login</button>
      {error && (
        <span style={{ color: "red", marginTop: "5px" }}>
          Something went wrong.
        </span>
      )}
    </div>
  );
}
