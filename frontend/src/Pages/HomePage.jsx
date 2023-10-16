import React from "react";
import Navbar from "../common/Navbar";
import "../Styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="Home">
      <Navbar />
      <div className="Hero">
        <div className="Hero_Image">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="image"
          />
          <div className="Hero_text">
            <span className="animated-text">
              Your Gateway To
            </span>
            <span className="animated-text">
              Endless Streaming and Event Publicity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
