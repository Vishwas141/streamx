import React,{useEffect,useRef,useState} from "react";
import Navbar from "../common/Navbar";
import lottie from "lottie-web";
import "../Styles/HomePage.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const HomePage = () => {
  const animationRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Load and initialize the Lottie animation
    const animation = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg", // Choose the appropriate renderer (svg, canvas, html)
      loop: true,
      autoplay: true,
      path: "https://lottie.host/fad3f366-5539-4230-92ac-59a5cf02bc0e/v0bamhG8v9.json", // Replace with your animation's JSON file
    });

    // Optionally, you can control the animation properties here

    return () => {
      // Cleanup or stop the animation if needed when the component unmounts
      animation.destroy();
    };
  }, []);
  return (
    
    <div className="Home">
      <Navbar />
      <div className="Hero">
        <div className="Hero_Image"  ref= {animationRef}   style={{ width: "900px", height: "900px"}}>
          </div>
          <div className="Hero_text">
         
            <p className="text">Your Gateway To</p>
            <p className="text">Endless Streaming and Event Publicity</p>
          </div>
        </div>
      </div>
  );
};

export default HomePage;

