import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateMeetingButtons from "../Components/meet/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../Components/meet/FormComponents/MeetingDateField";
import MeetingNameField from "../Components/meet/FormComponents/MeetingNameField";
import MeetingUserField from "../Components/meet/FormComponents/MeetingUserField";
import useFetchUsers from "../hooks/useFetchUsers";
import { generateMeetingID } from "../utils/generateMeetingId";
import useToast from "../hooks/useToast";

import Header from "../Components/meet/Header";
export default function OneOnOneMeeting() {
  const users = useFetchUsers();
  const [createToast] = useToast();
  const uid =localStorage.getItem("uid");
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      const meetingData={
        createdBy: uid,
        meetingid:meetingId,
        meetingName:meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUser[0]._id],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        meetingStatus: true,
      }
      try{
        const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/meetings`,meetingData,{withCredentials:true})
        console.log(res.data)
      }
      catch(err){
        console.log(err)
        if(err.message==="undefined behaviour"){
          navigate("/auth")
        }
      }
      createToast({
        title: "One on One Meeting Created Successfully",
        type: "success",
      });
      navigate("/createmeet");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          <MeetingUserField
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} onClickCancel="/createmeet"/>
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}