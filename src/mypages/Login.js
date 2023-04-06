import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username,
        password,
      });

      const token = response.data.jwt; // extract the JWT token from the response

      // save the token to localStorage
      localStorage.setItem("token", token);

      console.log("Logged in successfully!");
      console.log("JWT:", token);
      // Redirect to locations page
      navigate("/location");
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleRegister = (event) => {
    navigate("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Nom d'utilisateur :
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Se connecter</button>
        <button type="button" onClick={handleRegister}>
          Pas de compte?
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
