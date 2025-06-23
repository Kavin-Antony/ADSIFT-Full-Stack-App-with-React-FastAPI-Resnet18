import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill out both fields.");
      return;
    }

    const body = new URLSearchParams();
    body.append("user_email", username);
    body.append("password", password);

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://goshawk-musical-liger.ngrok-free.app/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/home", { replace: true });
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  function renderError() {
    if (!error) return null;
    return <div className="error-message">{error}</div>;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>
          Welcome to <span style={{ color: "#e50914" }}>AdSift</span>
        </h2>
        <input
          className="login-input"
          type="email"
          placeholder="UserID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        {renderError()}

        <div className="login-footer">
          Don't have an account? <Link to="/signup">Sign up.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;