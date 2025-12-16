import "../styles.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://ddas.onrender.com/api/auth/signup", {
        name,
        email,
        password,
      });

      setMessage("Signup successful! Please login.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        
        <h2 className="auth-title">DDAS</h2>
        <p className="auth-subtitle">DDoS Attack Detection System</p>

        <input
          className="auth-input"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn" type="submit">
          Create Account
        </button>

        {message && <p className="auth-text">{message}</p>}

        <p className="auth-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>
    </div>
  );
}
