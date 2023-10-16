import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/Home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

