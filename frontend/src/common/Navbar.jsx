import React, { useState } from 'react';
import '../Styles/Navbar.css';

import { BiSolidUserCircle } from "react-icons/bi"

function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-name">Streamers</div>
      </div>
      <div className="nav-links">
        <div className='menu'>Events</div>
        <div className='menu'>Meet</div>
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
