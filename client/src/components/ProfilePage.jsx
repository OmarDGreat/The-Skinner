import React, { useState, useEffect } from "react"; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use import.meta.env for environment variables in Vite
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';

    fetch(`${apiBaseUrl}/api/profile`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile data:", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return <Profile user={user} />;
};

export default ProfilePage;
