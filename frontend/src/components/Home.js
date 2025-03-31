import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Home.css"


const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token); // Use jwt_decode function
      setUsername(decoded.name);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="app-title">Airify</h1>
        <ul className="nav-links">
          <li>User Account</li>
          <li>Chatbot</li>
          <li>Tools</li>
          <li>Community</li>
        </ul>
      </nav>
      <div className="welcome-section">
        <h2>Welcome to Airify</h2>
        <div className="greeting">
          Hello, <span className="username">{username}</span>!
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="dashboard">
        {/* Placeholder for real-time air quality data and visualizations */}
        <h3>Real-Time Air Quality Data</h3>
        {/* Add components for data visualization here */}
      </div>
    </div>
  );
};

export default Home;
