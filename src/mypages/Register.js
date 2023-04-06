import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/register", {
        username,
        password,
      });

      console.log("Registered successfully!");
      console.log("JWT:", response.data.jwt);
      // Do something with the JWT here (e.g. save it to localStorage)

      // Redirect to locations page
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  const handleLogin = (event) => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Nom d'utilisateur :
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Mot de passe :
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Retaper le mot de passe :
          <input type="password" value={retypePassword} onChange={handleRetypePasswordChange} />
        </label>
        {!passwordsMatch && (
          <div style={{ color: "red" }}>Les mots de passe ne correspondent pas.</div>
        )}
        <br />
        <button type="submit">S'inscrire</button>
        <button type="button" onClick={handleLogin}>
          Déjà un compte?
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;

