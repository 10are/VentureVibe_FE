import React from "react";
import axios from "axios";

const LogoutForm = () => {
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/dj-rest-auth/logout/");
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutForm;
