import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Home_AD from "./components/Home_AD"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home-ad" element={<Home_AD />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

