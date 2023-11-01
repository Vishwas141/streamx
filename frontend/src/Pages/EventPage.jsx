import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar'
import '../Styles/EventPage.css';
import { MdArrowForward } from "react-icons/md"
import { Link } from 'react-router-dom';
import { FaCalendar, FaCalendarTimes, FaGlobe, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EventPage = () => {
  const [event, setEvent] = useState(null);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  }


  const { id } = useParams();
  
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const res= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/getsingleevent/${id}`);
      console.log(res.data);
      setEvent(res.data.data);
    }
    fetchData();
  },[id])

  return (
<div className='bg'> 
<Navbar/>
    <div className="event-page">
      <h1 className="event-name">{event?.eventName}</h1>
      <div className="poster-section">
        <img src={event?.posterImage} alt="Event Poster" className="poster-image" />
        <div className="event-info-card ">
          <div className='h-[50px]'>


            <p>Registration Date :</p>

            {formatDate(event?.registrationDate)}
          </div>
          <div className='h-[50px]'>


            <p>Closing Date :</p>

                 {formatDate(event?.closingDate)}
          </div>
          <div className='h-[50px]'>


            <p>Venue :</p>

              {event?.venue}
          </div>
          <div className='h-[50px]'>


            <p>Mode :</p>

            {event?.modeOfConduction}
          </div>
          
          <Link to="https://www.facebook.com/">
            <button className=" flex items-center mt-[20px] justify-center text-white  bg-[#288CEF]  w-[160px] h-[40px] rounded-md  " onClick={() => navigate("/registerevent")}>
              <p>Register Now</p> <MdArrowForward size={20} />
            </button>
          </Link>
        
        </div>
      </div>
     <div className="event-description"> 
        <h2 className='text-white text-[35px] mt-[20px] font-bold '>About Us</h2>
        <p>{event?.eventDescription}</p>
      </div> 
      

      <div className='text-[30px] mt-7 font-bold'>
          Organized By :<p className='text-[25px] font-semibold'>{event?.organisation}</p>
      </div>
    </div>
    </div>    
  );
};

export default EventPage;
