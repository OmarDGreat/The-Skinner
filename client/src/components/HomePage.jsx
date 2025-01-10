import React from "react";

const HomePage = () => {
  const handleLogin = () => {
    // Redirect to Steam login
    window.location.href = "http://localhost:5000/auth/steam";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to The Skiner</h1>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login with Steam
      </button>
    </div>
  );
};

export default HomePage;
