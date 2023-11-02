import React, { useState,useEffect } from "react";
import { Route, RouterProvider, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Components/LandingPage"
import { createBrowserRouter } from "react-router-dom";
import EventForm from "../src/Components/EventForm";
import EventPage from "../src/Pages/EventPage";
import {EuiProvider} from "@elastic/eui"
import EditForm from "./Components/EditForm";
import Dashboard from "./Pages/Dashboard";
import { useDispatch,useSelector } from "react-redux";
import { EuiGlobalToastList,EuiThemeProvider } from "@elastic/eui";
import ThemeSelector from "./Components/meet/ThemeSelector";
import CreateMeeting from "./Pages/CreateMeet";
import OneOnOneMeeting from "./Pages/OneOnOneMeeting";
import { setToasts } from "./store/slice/MeetingSlice";
import VideoConference from "./Pages/VideoConference";
import MyMeetings from "./Pages/MyMeetings";
import Meeting from "./Pages/Meeting";
import JoinMeeting from "./Pages/JoinMeeting";

function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.auth.isDarkTheme);
  const [theme, setTheme] = useState("light");
  const [initialTheme, setInitialTheme] = useState(true);
  const toasts = useSelector((zoom) => zoom.meetings.toasts);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);
  const removeToast = (removedToast) => {
    dispatch(
      setToasts(
        toasts.filter((toast) => toast.id !== removedToast.id)
      )
    );
  };
  useEffect(() => {
    if (initialTheme) {
      setInitialTheme(false);
    }
    else{
      setTheme(isDarkTheme ? "light" : "dark");
    }
  }, [isDarkTheme]);

  const route = createBrowserRouter([
    { path: "/auth", element: <AuthPage /> },
    { path: "/", element: <HomePage /> },

    { path: "/events",children:[
      {index:true,element:<LandingPage/>},
      {path:"create",element:<EventForm/>},
      {path:":id",element:<EventPage/>}
    ]},
    {path:'/events/edit/:id',element:<EditForm/>},
    {path:'/meetsection',element:<Dashboard/>},
    {path:'/createmeet',element:<CreateMeeting/>},
    {path:'/create1on1',element:<OneOnOneMeeting/>},
    {path:'/videoconference',element:<VideoConference/>},
    {path:'/mymeetings',element:<MyMeetings/>},
    {path:'/meetings',element:<Meeting/>},
    {path:'/join/:id',element:<JoinMeeting/>},
    { path: "*", element: <Dashboard /> },

    ])
  return (
    <ThemeSelector>
    <EuiProvider colorMode={theme}>
      <RouterProvider router={route} />
      <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
    </EuiProvider>
    </ThemeSelector>
  );
}

export default App;

