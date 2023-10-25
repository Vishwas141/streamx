import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

import { BiSolidUserCircle } from "react-icons/bi"

function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  // const [showLoginMenu, setShowLoginMenu] = useState(false);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('user');
  //   if (loggedInUser) {
  //     setUserLoggedIn(!showLogoutMenu);
  //   }
  // }, [showLogoutMenu]);
  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };
  // const logout=()=>{
  //   localStorage.removeItem("user");
  //   handleLogout();
  // }
  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-name">STREAMX</div>
      </div>
      <div className="nav-links">
        <Link to="/events">
          <div className='menu'>Events</div>
        </Link>
        <Link to="">
          <div className='menu'>Meet</div>
        </Link>
        <div className="user-section" onClick={userLoggedIn ? toggleLogoutMenu : handleLogin}>
          {userLoggedIn ? (
            <BiSolidUserCircle size={35}/>
          ) : (
            <button className="register-button">
              Register
            </button>
          )}
         
        </div>
      </div>
    </div>
  );
}

export default Navbar;
