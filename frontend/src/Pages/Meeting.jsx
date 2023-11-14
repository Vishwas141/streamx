import {
    EuiBadge,
    EuiBasicTable,
    EuiButtonIcon,
    EuiCopy,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPanel,
  } from "@elastic/eui";
  import axios from 'axios'
  import moment from "moment";
  import React, { useEffect, useState,useCallback } from "react";
  import { Link,useNavigate } from "react-router-dom";
  import Header from "../Components/meet/Header";
  
  export default function Meeting() {
    // useAuth();
    const uid = localStorage.getItem("uid");
    const [meetings, setMeetings] = useState([]);
    const navigate=useNavigate()
    const getMyMeetings = useCallback(async () => {
      try{
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/invitemeetings/${uid}`)
      const myMeetings=res.data.data
      console.log(myMeetings);
      const meetingsdemo = myMeetings.map((meeting) => {
          return {
              createdBy: meeting.createdBy,
              meetingName: meeting.meetingName,
              meetingType: meeting.meetingType,
              meetingDate: moment(meeting.meetingDate).format("L"),
              meetingStatus: meeting.meetingStatus,
              invitedUsers: meeting.invitedUsers,
              meetingid: meeting.meetingid,
              maxUsers: meeting.maxUsers,
          };
          });
      setMeetings(meetingsdemo);
      }
      catch(err){
          console.log(err)
          if(err.message==="undefined behavior"){
            navigate("/auth")
          }
      }
  }, [uid]);
  console.log(meetings)
  useEffect(() => {
    if (uid) getMyMeetings();
  }, [uid, getMyMeetings]);

  
    const meetingColumns = [
      {
        field: "meetingName",
        name: "Meeting Name",
      },
      {
        field: "meetingType",
        name: "Meeting Type",
      },
      {
        field: "meetingDate",
        name: "Meeting Date",
      },
      {
        field: "",
        name: "Status",
  
        render: (meeting) => {
          if (meeting.meetingStatus) {
            if (meeting.meetingDate === moment().format("L")) {
              return (
                <EuiBadge color="success">
                  <Link
                    to={`/join/${meeting.meetingid}`}
                    style={{ color: "black" }}
                  >
                    Join Now
                  </Link>
                </EuiBadge>
              );
            } else if (
              moment(meeting.meetingDate).isBefore(moment().format("L"))
            ) {
              return <EuiBadge color="default">Ended</EuiBadge>;
            } else if (moment(meeting.meetingDate).isAfter()) {
              return <EuiBadge color="primary">Upcoming</EuiBadge>;
            }
          } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
        },
      },
      {
        field: "meetingId",
        name: "Copy Link",
        width: "10%",
        render: (meetingId) => {
          return (
            <EuiCopy
              textToCopy={`${import.meta.env.VITE_BACKEND_URL}/join/${meetingId}`}
            >
              {(copy) => (
                <EuiButtonIcon
                  iconType="copy"
                  onClick={copy}
                  display="base"
                  aria-label="meeting-copy"
                />
              )}
            </EuiCopy>
          );
        },
      },
    ];
  
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
          <EuiFlexItem>
            <EuiPanel>
              <EuiBasicTable items={meetings} columns={meetingColumns} />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }