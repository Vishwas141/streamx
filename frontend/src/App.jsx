import React, { useState } from "react";
import { Route, RouterProvider, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Components/LandingPage"
import { createBrowserRouter } from "react-router-dom";
import EventForm from "../src/Components/EventForm";
import EventPage from "../src/Pages/EventPage";
import {EuiProvider} from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
function App() {
  const route = createBrowserRouter([
    { path: "/auth", element: <AuthPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/events",children:[
      {index:true,element:<LandingPage/>},
      {path:"create",element:<EventForm/>},
      {path:":id",element:<EventPage/>}
    ]}
    ])
  return (
    <EuiProvider>
      <RouterProvider router={route} />

    </EuiProvider>
  );
}

export default App;

