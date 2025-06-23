import { useState } from "react";
import { Home, Settings, Headphones, LogIn } from "lucide-react";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const handleClick_AD = () => {
    navigate("/home-ad");
  }
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="logo-container" onClick={() => setIsOpen(!isOpen)}>
        <img src="./logos.png" alt="Logo" className="logo" />
        <span className={`adsift-text ${isOpen ? "expanded" : "collapsed"}`}></span>
      </div>

      <div className="menu-items">
        <button className="sidebar-btn">
          <Home size={24} />
          {isOpen && <span>Home</span>}
        </button>
        <button className="sidebar-btn">
          <Settings size={24} />
          {isOpen && <span>Preferences</span>}
        </button>
        <button className="sidebar-btn" onClick={handleClick_AD}>
          <Headphones size={24} />
          {isOpen && <span>Ad-Listening</span>}
        </button>
        <button className="sign-in-btn">
          <LogIn size={24} />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
