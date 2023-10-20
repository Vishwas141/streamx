import React from "react";
import "./App.css";

const eventData = {
  eventName: "TechFusion 2.0",
  eventDescription:
    "TechFusion 2.0 is a National Level Technical Symposium where students participate in various technical and non technical competitions. TechFusion 2.0 is a platform to enhance technical, professional and soft skills",
  registrationLink: "https://www.techfusion2k23.in/",
  registrationDate: "05",
  closingDate: "17/10/23",
  venue: "Walchand College Of Engineering",
  organisation: "SAIT",
  modeOfConduction: "Online",
  posterImage: {
    posterUrl:
      "https://i0.wp.com/roboticsindia.live/wp-content/uploads/2023/01/20230110_094622.jpg?fit=1280%2C720&ssl=1",
  },
  prizePool: "Rs 50000",
  openForAll: true,
  contact: {
    email: "wcesait@walchandsangli.ac.in",
    phone: "+1 (123) 456-7890",
  },
};

const EventPage = () => {
  return (
    <div className="bg-black">
      {/* Header Section */}
      <div className="bg-black text-white font-bold text-center py-5 gtext">
        WCE Live
      </div>
      <div
        style={{ width: "100%", height: "100%", border: "3px white solid" }}
      ></div>
      {/* Event Name */}
      <div className="text-[40px] font-bold text-center py-5 gtext">
        {eventData.eventName}
      </div>

      {/* Event Description and Poster */}
      <div className="flex w-full mt-5 justify-center item-center align_image_card">
        <div className="flex w-[60%] flex-col gap-5 image_description_org_div">
          <img
            src={eventData.posterImage.posterUrl}
            alt="Event Poster"
            className="w-[90%] h-[435px] rounded-t-lg object-cover"
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              color: "white",
              fontSize: 48,
              fontFamily: "Koulen",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            About this event
          </div>
          <div
            style={{
              width: "100%",
              color: "white",
              fontSize: 24,
              fontFamily: "Kadwa",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {eventData.eventDescription}
          </div>

          <div className="text-lg font-medium organizer_text wtext">
            Organizer: {eventData.organisation}
          </div>
        </div>

        {/* Event Details Card */}
        <div className="w-[376px] h-[454px] shadow-lg rounded-lg overflow-hidden event_detail_card wbox">
          <div className="p-6 wbox">
            <div className="text-xl font-bold text-gray-400 mb-2 maintext">
              📅 DATE
            </div>
            <div
              style={{ fontSize: "20px" }}
              className="text-black font-bold mb-4"
            >{`${eventData.registrationDate} - ${eventData.closingDate}`}</div>
            <div className="text-xl font-bold text-gray-400 mb-2 maintext">
              📍 VENUE
            </div>
            <div
              style={{ fontSize: "20px" }}
              className="text-black font-bold mb-2"
            >
              {eventData.venue}
            </div>
            <div className="text-xl font-bold text-gray-400 mb-2 maintext">
              📳 MODE
            </div>
            <div
              style={{ fontSize: "20px" }}
              className="text-black font-bold font-bold mb-2"
            >
              {eventData.modeOfConduction}
            </div>
            <div className="text-xl font-bold text-gray-400 mb-2 maintext">
              🏆 PRIZE POOL
            </div>

            <div
              style={{ fontSize: "20px" }}
              className="text-black  font-bold mb-2"
            >
              {eventData.prizePool}
            </div>
            {eventData.openForAll && (
              <div className="text-xl font-bold text-gray-400 mb-2 maintext">
                OPEN FOR ALL
              </div>
            )}
            <div>
              <a
                href={eventData.registrationLink}
                className="block bg-blue-500 font-bold text-white py-2 text-center rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8 rounded-lg shadow-lg mx-[50px] pb-[30px] contact_us_div wbox pbox">
        <div className="text-2xl font-bold mb-4 gtext2">Contact Us</div>
        {/* Email */}
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22 3H2c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 2l-8 5-8-5h16zm0 14H4V8h16v10z" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-medium maintext">Email</div>
            <div className="text-black">
              <a href={`mailto:${eventData.contact.email}`}>
                {eventData.contact.email}
              </a>
            </div>
          </div>
        </div>
        {/* Phone */}
        <div className="flex items-center">
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M2 4v16h20V4H2zm18 14H4V8h16v10z" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-medium maintext">Phone</div>
            <div className="text-black">{eventData.contact.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventPage;
