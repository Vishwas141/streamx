import "../Styles/LandingPage.css"
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { AiOutlineDelete } from "react-icons/ai"
import axios from "axios";
import Navbar from "../common/Navbar";

const LandingPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [events, setevents] = useState([]);
    const [userRole,setUserRole]=useState("User");


    const editEvent = async(event) =>
    {
        try
        {
            navigate(`/events/edit/${event._id}`);
           

        }
        catch (err)
        {
            console.log("error while editing event")
        }
    }
    const deleteEvent = async (event) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/delete/${event._id}`, {
                withCredentials:true
            });
            window.location.reload();

        }
        catch (err) {
            console.log("error while deleteing event")
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/getevents`);

                setData(response.data.data);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/getAdmin`,{withCredentials:true});

                setUserRole(res.data.role)
                setevents(res.data.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const sendMail = async(event) =>
    {
        const message = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sendmail`, event);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/getAdmin`, { withCredentials: true });
                console.log("response", response);
                setevents(response.data.data);
                setUserRole(response.data.role);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    }





    return (
        <div className=" event_section min-h-[100vh]">
            <div className="mb-[70px]">
                <Navbar/>
             
            </div>
            {
                data.length === 0 ? (
                    <div className="h-[100vh] w-[100vw] flex justify-center items-center font-bold text-[40px] text-white">
                        No event is Scheduled in college At This Moment.
                    </div>
                ): (
                    <div className = " font-bold text-center gradient-text event_section_heading mt-5  text-white">
                Upcoming Events
            </div>
                )
            
            }
            



            <div className="flex flex-wrap  justify-center mt-2 event_section_events">
                
                {data.length>0 && data?.map((event, i) => {
                    return (
                        <div
                            key={i}
                            className="w-[100%] md:w-[45%] lg:w-[30%] xl:w-[25%] p-3 mt-4 bg-gradient-to-b from-0E2032 to-ADEFD1 flex flex-col items-center rounded-[10px] poster bg-[#0e2032e5] mx-[15px]"
                        >
                            <div className="mt-2">
                                <img
                                    src={event.posterImage}
                                    alt="Events dont have poster"
                                    className="w-[40em] h-[200px] rounded-[10px] poster_img"
                                    style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", border: "1px solid #0e2032e5" }}
                                />
                            </div>
                            <div className="font-bold text-2xl gtext my-2 text-center text-white">
                                {event.eventName}
                            </div>
                            <div>
                                <p className="text-gray-100 text-sm mb-4 description">
                                    {event.eventDescription.substring(0, 240) + " ..."}
                                </p>
                            </div>

                            <Link
                                to={`/eventS/${event._id}`}
                                className="bg-[#288CEF] h-[40px] px-3 py-3 text-white font-semibold rounded-lg cursor-pointer"
                            >
                                Know More
                            </Link>

                        </div>
                    );
                })}
            </div>

            {
                userRole== "Admin" ? (
                    <>
                        <div className=" font-bold text-center gradient-text event_section_heading mt-[55px]  text-white">
                             Created Events
                        </div>



                        <div className="flex flex-wrap  justify-center mt-2  event_section_events">
                            {events && events?.map((event, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="w-[100%] md:w-[45%] lg:w-[30%] xl:w-[25%] p-3 mt-4 bg-gradient-to-b from-0E2032 to-ADEFD1 flex flex-col items-center rounded-[10px] poster bg-[#0e2032e5] mx-[15px]"
                                    >
                                        <div className="mt-2">
                                            <img
                                                src={event.posterImage}
                                                alt="Events dont have poster"
                                                className="w-[40em] h-[200px] rounded-[10px] poster_img"
                                                style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", border: "1px solid #0e2032e5" }}
                                            />
                                        </div>

                                        <div className="font-bold text-2xl text-white my-2 text-center">
                                            {event.eventName}
                                        </div>
                                        <div>
                                            <p className="text-gray-100 text-sm mb-4 description">
                                                {event.eventDescription.substring(0, 150) + " ..."}
                                            </p>
                                        </div>

                                        
                                        <div className="flex flex-row justify-between items-center gap-5">
                                            <div>
                                                 <FaEdit size={25} color="white" onClick={()=>editEvent(event)}/>
                                            </div>
                                            <div>
                                                <AiOutlineDelete size={25} color="white" onClick={()=>deleteEvent(event)}/>
                                            </div>
                                            <div
                                                onClick={() => { sendMail(event) }}
                                                className="bg-[#288CEF]  h-[40px] px-3 py-3 text-white font-semibold rounded-lg cursor-pointer">

                                                Send Notifications
                                            </div>
                                        </div>
                                       

                                    </div>
                                );
                            })}


                             {
                    

                        <button className="create-event-button flex items-center justify-center gap-3   bg-[#288CEF]  text-white font-semibold  w-[160px] h-[40px] rounded-md font-bold  " onClick={() => navigate("create")}>
                            <p>Create Event </p> <MdArrowForward size={20} />
                        </button>
                   
                }
                        </div>
                    </>


                ) : (
                    <>

                    </>
                )

            }
        </div>
    );
};

export default LandingPage;
