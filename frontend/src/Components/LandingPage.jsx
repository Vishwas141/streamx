import "../Styles/LandingPage.css"
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md"
import axios from "axios";

const LandingPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [events, setevents] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/getevents");
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/getAdmin", { withCredentials: true });
                console.log("response", response);
                setevents(response.data.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const sendMail = async (event) => {
        const message = await axios.post("http://localhost:4000/api/v1/sendmail", event);
        console.log(message);
    }


    const role = "Admin";

    return (
        <div className=" event_section">
            <div className="mb-[70px]">
                {
                    role === "Admin" ? (

                        <button className="create-event-button flex items-center justify-center gap-3 bg-[#ea580c] w-[160px] h-[40px] rounded-md font-bold  " onClick={() => navigate("create")}>
                            <p>Create Event </p> <MdArrowForward size={20} />
                        </button>
                    ) : (
                        <></>
                    )
                }
            </div>
            <div className=" font-bold text-center gradient-text event_section_heading mt-5  text-white">
                Upcoming Events
            </div>



            <div className="flex flex-wrap  justify-center mt-2 event_section_events">
                {data?.map((event, i) => {
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
                                to={`/eventdescription/${event._id}`}
                                className="bg-[#288CEF] h-[40px] px-3 py-2 text-white font-semibold rounded-lg cursor-pointer"
                            >
                                Know More
                            </Link>

                        </div>
                    );
                })}
            </div>

            {
                role == "Admin" ? (
                    <>
                        <div className=" font-bold text-center gradient-text event_section_heading mt-[55px]  text-white">
                            Your's Created Event
                        </div>



                        <div className="flex flex-wrap  justify-center mt-2 event_section_events">
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

                                        <div className="font-bold text-2xl gtext my-2 text-center">
                                            {event.eventName}
                                        </div>
                                        <div>
                                            <p className="text-gray-100 text-sm mb-4 description">
                                                {event.eventDescription.substring(0, 240) + " ..."}
                                            </p>
                                        </div>

                                        <div
                                            onClick={() => { sendMail(event) }}
                                            className="bg-[#288CEF]  h-[40px] px-3 py-2 text-white font-semibold rounded-lg cursor-pointer">

                                            Send Notifications
                                        </div>

                                    </div>
                                );
                            })}
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
