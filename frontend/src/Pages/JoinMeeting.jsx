import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { generateMeetingID } from "../utils/generateMeetingId";
import axios from "axios";

export default function JoinMeeting() {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(true);
  const [user, setUser] = useState(undefined);
  const [name,setName]=useState(undefined)
  const [userLoaded, setUserLoaded] = useState(false);
  const [limit,setLimit]=useState(50);
  useEffect(()=>{
    const uid=localStorage.getItem("uid");
    const name=localStorage.getItem("name");
    setUser(uid)
    setName(name)
    setUserLoaded(true)
  },[user,name])
  useEffect(() => {
    const getMeetingData = async () => {
        if (params.id && userLoaded) {
            let fetchedMeetings;
        try{
          const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/meet/${params.id}`,{withCredentials:true})
            fetchedMeetings=res.data.data
        }
        catch(err){
            console.log(err)
            if(err.message==="undefined behaviour"){
              navigate("/auth")
            }
        }
          if (fetchedMeetings) {
            const meeting = fetchedMeetings;
            const isCreator = meeting.createdBy === user;
            if (meeting.meetingType === "1-on-1") {
                setLimit(1);
              if (meeting.invitedUsers[0] === user || isCreator) {
                if (moment(meeting.meetingDate).format('MM/DD/YYYY') === moment().format("L")) {
                  setIsAllowed(true);
                } else if (
                  moment(meeting.meetingDate).isBefore(moment().format("L"))
                ) {
                  setIsAllowed(false);
                  createToast({ title: "Meeting has ended.", type: "danger" });
                  navigate(user ? "/meetsection" : "/");
                } else if (moment(meeting.meetingDate).isAfter(moment().format("L"))) {
                  createToast({ 
                    title: `Meeting is on ${moment(meeting.meetingDate).format('MM/DD/YYYY')}`,
                    type: "warning",
                  });
                  setIsAllowed(false);
                  navigate(user ? "/meetsection" : "/");
                } 
                }
                else {
                  createToast({
                    title: `You are not invited to the meeting.`,
                    type: "danger",
                  });
                  navigate(user ? "/meetsection" : "/");
                  setIsAllowed(false);
                }
            } else if (meeting.meetingType === "video-conference") {
                setLimit(100)
              const index = meeting.invitedUsers.findIndex(
                (invitedUser) => invitedUser === user
              );
              if (index !== -1 || isCreator) {
                if (moment(meeting.meetingDate).format('MM/DD/YYYY') === moment().format("L")) {
                  setIsAllowed(true);
                } else if (
                  moment(meeting.meetingDate).isBefore(moment().format("L"))
                  ) {
                    setIsAllowed(false)
                  createToast({ title: "Meeting has ended.", type: "danger" });
                  navigate(user ? "/meetsection" : "/");
                } else if (moment(meeting.meetingDate).isAfter(moment().format("L"))) {
                  createToast({
                    title: `Meeting is on ${moment(meeting.meetingDate).format('MM/DD/YYYY')}`,
                    type: "warning",
                  });
                  setIsAllowed(false)
                }
              } else {
                createToast({
                  title: `You are not invited to the meeting.`,
                  type: "danger",
                });
                navigate(user ? "/meetsection" : "/");
                setIsAllowed(false)
              }
            } else {
              setLimit(150)
              setIsAllowed(true);
            }
          }
        }
      }
      getMeetingData();
  }, [params.id, user, userLoaded, createToast, navigate]);
  const myMeeting = (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(import.meta.env.VITE_MEET_ID),
      import.meta.env.VITE_MEET_SECRET,
      params.id,
      Date.now().toString(),
      user?name:"Anonymous"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      maxUsers: limit,
      sharedLinks: [
        {
          name: "Personal link",
          url: `${window.location.origin}/join/${params.id}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return isAllowed?(
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100%", height: "100vh" }}
      />
    </div>):navigate(user ? "/meetsection" : "/"); 
    
}