import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { FiLogOut } from "react-icons/fi"

import { BiSolidUserCircle } from "react-icons/bi"

function Navbar()
{
  //to check user is logged in or not 
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  //store the userData 
  const [userData, setUserData] = useState(null);



  useEffect(() =>
  {
    const check = async () => {
      const res = await axios.get("http://localhost:4000/user/validate", { withCredentials: true });
      console.log("res", res);
      setUserLoggedIn(res.data.success);
      setUserData(res.data);
    }
    check();
      
  }, []);


  const navigate = useNavigate();

 //when we click on logout this function get called
  const handleLogout = () =>
  {
    navigate("/auth");
    setUserLoggedIn(false);
  };


  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-name">STREAMX</div>
      </div>
      <div className="nav-links">
        <Link to={(userLoggedIn) ? "/events" : "/auth"}>
          <div className='menu'>Events</div>
        </Link>
        <Link to={(userLoggedIn) ? "/" : "/auth"}>
          <div className='menu'>Meet</div>
        </Link>
        <div className="user-section">
          {userLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
              <BiSolidUserCircle color='white' onClick={() => { navigate('/') }} size={30} />
              <button style={{ cursor: "pointer" }} onClick={handleLogout}>
                <FiLogOut color="white" size={30} />
              </button>
            </div>
          ) : (
            <button className="register-button" onClick={() => navigate("/auth")}>
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;