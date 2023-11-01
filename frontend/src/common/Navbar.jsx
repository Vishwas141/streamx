import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import {FiLogOut} from "react-icons/fi"
import cookies from 'react-cookies'
import { BiSolidUserCircle } from "react-icons/bi"

function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage?.getItem('email');
    if (loggedInUser) {
      setUserLoggedIn(true); 
    }
  }, [userLoggedIn]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('email');
    cookies.remove("token");
    setUserLoggedIn(false);
    // navigate('/auth');
  };
  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-name">StreamX</div>
      </div>
      <div className="nav-links">
        <Link to={(userLoggedIn)?"/events":"/auth"}>
          <div className='menu'>Events</div>
        </Link>
        <Link to={(userLoggedIn)?"/meetsection":"/auth"}>
          <div className='menu'>Meet</div>
        </Link>
        <div className="user-section">
          {userLoggedIn ? (
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"1.5rem"}}>
              <BiSolidUserCircle color='white' onClick={()=>{navigate('/')}}  size={30}/>
              <button style={{cursor:"pointer"}} onClick={handleLogout}>
                <FiLogOut color="white" size={30}/>
              </button>
            </div>
          ) : (
            <button className="register-button" onClick={()=>navigate("/auth")}>
              Register
            </button>
          )}         
        </div>
      </div>
    </div>
  );
}

export default Navbar;