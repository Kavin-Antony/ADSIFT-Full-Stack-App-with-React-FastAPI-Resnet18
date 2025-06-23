import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (username.length < 5) {
      setError("Username must be at least 5 characters.");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address ending with @gmail.com.");
      return;
    } else if (!passwordRegex.test(password)) {
      setError("Password must be 8+ chars with uppercase, lowercase, and a number.");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const body = new URLSearchParams();
      body.append("user_email", email);
      body.append("user_name", username);
      body.append("password", password);

      const response = await fetch("https://goshawk-musical-liger.ngrok-free.app/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (data.success) {
        try {
          const loginBody = new URLSearchParams();
          loginBody.append("user_email", email); 
          loginBody.append("password", password);

          setLoading(true);
          setError("");

          const loginResponse = await fetch("https://goshawk-musical-liger.ngrok-free.app/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: loginBody.toString(),
          });

          const loginData = await loginResponse.json();
          console.log("Login response after signup:", loginData);

          if (loginData.success) {
            localStorage.setItem("token", loginData.token); 
            navigate("/home", { replace: true });
          } else {
            setError(loginData.message || "Login failed after signup.");
          }
        } catch (err) {
          console.error(err);
          setError("An error occurred during login.");
        } finally {
          setLoading(false);
        }
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign up</h2>
        <input type="text" placeholder="Username" className="signup-input" ref={usernameRef} />
        <input type="email" placeholder="Email Address" className="signup-input" ref={emailRef} />
        <input type="password" placeholder="Password" className="signup-input" ref={passwordRef} />
        <input type="password" placeholder="Confirm Password" className="signup-input" ref={confirmPasswordRef} />
        <button className="signup-button" onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <p className="signup-footer">
          Already have an account?
          <Link to="/login"> Log in.</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
