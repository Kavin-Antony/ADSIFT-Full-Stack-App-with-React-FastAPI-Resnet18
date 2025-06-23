import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css";

const Splash = () => {
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const body = new URLSearchParams();
        body.append("Authorization", token);

        const response = await fetch("https://goshawk-musical-liger.ngrok-free.app/jwt_login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: body
        });

        const data = await response.json();
        console.log("JWT validation response:", data);

        if (data.success) {
          setTokenValid(true); 
        }
      } catch (error) {
        console.error("JWT validation error:", error);
      }
    };

    validateToken();
  }, []);

  const handleLogin = () => {
    if (tokenValid) {
      navigate("/home", { replace: true }); 
    } else {
      navigate("/login", { replace: true }); 
    }
  };

  const handleSignup = () => {
    navigate("/signup", { replace: true }); 
  };

  return (
    <div className="splash-container">
      <div className="splash-box">
        <img src="/logos.png" alt="AdSift Logo" className="splash-logo" />
        <h1 className="splash-title">
          <span className="title-red">Ad</span>Sift
        </h1>
        <div className="splash-buttons">
          <button className="splash-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="splash-btn" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
