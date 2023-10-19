import React, { useState } from "react";
import { Route, RouterProvider, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Components/LandingPage"
import { createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    { path: "/", element: <AuthPage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/events", element: <LandingPage /> }
  ])
  return (
    <>
      <RouterProvider router={route} />

    </>
  );
}

export default App;

