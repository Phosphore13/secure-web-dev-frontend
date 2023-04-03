import React from "react";
import { Routes, Route } from 'react-router-dom';
import RegisterPage from "./mypages/Register";
import Location from "./mypages/Locations";
import LoginPage from "./mypages/Login"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Location/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} /> 
      </Routes>
    </div>
  );
}

export default App;