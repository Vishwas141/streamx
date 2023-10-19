import "../Styles/LandingPage.css"
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md"

const events = [
    {
        poster_url: "https://img.freepik.com/free-psd/digital-marketing-live-webinar-corporate-social-media-post-template_202595-415.jpg?size=626&ext=jpg",
        event_name: "Techfusion 2k23",
        description: "Coding event: A competitive hackathon where programmers collaborate to solve real-world problems, showcasing innovation, teamwork, and coding skills.",
        registration_date: "21-10-2023",
        closing_date: "27-10-2023",
        mode: "online",
        organiser: "Student's Association of Technology ,WCE Sangli",
        contact_us: "9309320694",
        official_gmail: "sait@gmail.com",
        link: "https://www.facebook.com/"

    },
    {
        poster_url: "https://img.freepik.com/free-psd/digital-marketing-live-webinar-corporate-social-media-post-template_202595-415.jpg?size=626&ext=jpg",
        event_name: "Techfusion 2k23",
        description: "Coding event: A competitive hackathon where programmers collaborate to solve real-world problems, showcasing innovation, teamwork, and coding skills.",
        registration_date: "21-10-2023",
        closing_date: "27-10-2023",
        mode: "online",
        organiser: "Student's Association of Technology ,WCE Sangli",
        contact_us: "9309320694",
        official_gmail: "sait@gmail.com",
        link: "https://www.facebook.com/"

    },
    {
        poster_url: "https://img.freepik.com/free-psd/digital-marketing-live-webinar-corporate-social-media-post-template_202595-415.jpg?size=626&ext=jpg",
        event_name: "Techfusion 2k23",
        description: "Coding event: A competitive hackathon where programmers collaborate to solve real-world problems, showcasing innovation, teamwork, and coding skills.",
        registration_date: "21-10-2023",
        closing_date: "27-10-2023",
        mode: "online",
        organiser: "Student's Association of Technology ,WCE Sangli",
        contact_us: "9309320694",
        official_gmail: "sait@gmail.com",
        link: "https://www.facebook.com/"

    },
    {
        poster_url: "https://img.freepik.com/free-psd/digital-marketing-live-webinar-corporate-social-media-post-template_202595-415.jpg?size=626&ext=jpg",
        event_name: "Techfusion 2k23",
        description: "Coding event: A competitive hackathon where programmers collaborate to solve real-world problems, showcasing innovation, teamwork, and coding skills.",
        registration_date: "21-10-2023",
        closing_date: "27-10-2023",
        mode: "online",
        organiser: "Student's Association of Technology ,WCE Sangli",
        contact_us: "9309320694",
        official_gmail: "sait@gmail.com",
        link: "https://www.facebook.com/"

    },
    {
        poster_url: "https://img.freepik.com/free-psd/digital-marketing-live-webinar-corporate-social-media-post-template_202595-415.jpg?size=626&ext=jpg",
        event_name: "Techfusion 2k23",
        description: "Coding event: A competitive hackathon where programmers collaborate to solve real-world problems, showcasing innovation, teamwork, and coding skills.",
        registration_date: "21-10-2023",
        closing_date: "27-10-2023",
        mode: "online",
        organiser: "Student's Association of Technology ,WCE Sangli",
        contact_us: "9309320694",
        official_gmail: "sait@gmail.com",
        link: "https://www.facebook.com/"

    },

]
const LandingPage = () => {

    const role = "Admin";
    return (
        <div className=" event_section">
            <div className="mb-[70px]">
                {
                    role === "Admin" ? (

                        <button className="create-event-button flex items-center justify-center gap-3 bg-[#ea580c] w-[160px] h-[40px] rounded-md font-bold  ">
                            <p>Create Event </p> <MdArrowForward size={20}/>
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
                {events.map((event, i) => {
                    return (
                        <div
                            key={i}
                            className="w-[100%] md:w-[45%] lg:w-[30%] xl:w-[25%] p-3 mt-4 bg-gradient-to-b from-0E2032 to-ADEFD1 flex flex-col items-center rounded-[10px] poster bg-[#0e2032e5] mx-[15px]"
                        >
                            <div className="mt-2">
                                <img
                                    src={event.poster_url}
                                    alt="Events dont have poster"
                                    className="w-[40em] h-[200px] rounded-[10px] poster_img"
                                />
                            </div>

                            <div className="font-bold text-2xl gtext my-2 text-center">
                                {event.event_name}
                            </div>
                            <div>
                                <p className="text-gray-100 text-sm mb-4 description">
                                    {event.description.substring(0, 240) + " ..."}
                                </p>
                            </div>
                            
                                <Link
                                    to={"https://www.techfusion2k23.in/"}
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
                            {events.map((event, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="w-[100%] md:w-[45%] lg:w-[30%] xl:w-[25%] p-3 mt-4 bg-gradient-to-b from-0E2032 to-ADEFD1 flex flex-col items-center rounded-[10px] poster bg-[#0e2032e5] mx-[15px]"
                                    >
                                        <div className="mt-2">
                                            <img
                                                src={event.poster_url}
                                                alt="Events dont have poster"
                                                className="w-[40em] h-[200px] rounded-[10px] poster_img"
                                            />
                                        </div>

                                        <div className="font-bold text-2xl gtext my-2 text-center">
                                            {event.event_name}
                                        </div>
                                        <div>
                                            <p className="text-gray-100 text-sm mb-4 description">
                                                {event.description.substring(0, 240) + " ..."}
                                            </p>
                                        </div>

                                        <Link
                                            to={"https://www.techfusion2k23.in/"}
                                            className="bg-[#288CEF]  h-[40px] px-3 py-2 text-white font-semibold rounded-lg cursor-pointer"
                                        >
                                            Send Notifications
                                        </Link>

                                    </div>
                                );
                            })}
                        </div>
                    </>
          
            
            ):(
                        <>
                           
                        </>
                )
            
            }
        </div>
    );
};

export default LandingPage;
