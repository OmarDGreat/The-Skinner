import React from "react";

const HomePage = () => {
  const handleLogin = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!apiBaseUrl) {
      alert("API base URL is not defined in the environment variables.");
      return;
    }

    window.location.href = `${apiBaseUrl}/auth/steam`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to The Skinner</h1>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#1b2838",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
        }}
        aria-label="Login with Steam"
      >
        Login with Steam
      </button>
    </div>
  );
};

export default HomePage;
