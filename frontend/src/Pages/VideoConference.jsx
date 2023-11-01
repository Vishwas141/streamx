import {
    EuiFlexGroup,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
  } from "@elastic/eui";
  import moment from "moment";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import CreateMeetingButtons from "../Components/meet/FormComponents/CreateMeetingButtons";
  import MeetingDateField from "../Components/meet/FormComponents/MeetingDateField";
  import MeetingMaximumUsersField from "../Components/meet/FormComponents/MeetingMaximumUsersField";
  import MeetingNameField from "../Components/meet/FormComponents/MeetingNameField";
  import MeetingUserField from "../Components/meet/FormComponents/MeetingUserField";
  import axios from "axios";
  import Header from "../Components/meet/Header";
  import useFetchUsers from "../hooks/useFetchUsers";
  import useToast from "../hooks/useToast";
  import { generateMeetingID } from "../utils/generateMeetingId";

  
  export default function VideoConference() {
    // useAuth();
    const users = useFetchUsers();
    const [createToast] = useToast();
    const uid = localStorage.getItem("uid");
    const navigate = useNavigate();
  
    const [meetingName, setMeetingName] = useState("");
    const [selectedUser, setSelectedUser] = useState([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
    const [showErrors, setShowErrors] = useState({
      meetingName: {
        show: false,
        message: [],
      },
      meetingUsers: {
        show: false,
        message: [],
      },
    });
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
  
    const onUserChange = (selectedOptions)=> {
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
      if (!selectedUser.length && !anyoneCanJoin) {
        showErrorsClone.meetingUsers.show = true;
        showErrorsClone.meetingUsers.message = ["Please Select a User"];
        errors = true;
      } else {
        showErrorsClone.meetingUsers.show = false;
        showErrorsClone.meetingUsers.message = [];
      }
      setShowErrors(showErrorsClone);
      return errors;
    };
  
    const createMeeting = async () => {
      if (!validateForm()) {
        const meetingId = generateMeetingID();
        const meetData={
            createdBy: uid,
            meetingid:meetingId,
            meetingName:meetingName,
          meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
          invitedUsers: anyoneCanJoin
            ? []
            : selectedUser.map((user) => user._id),
          meetingDate: startDate.format("L"),
          maxUsers: anyoneCanJoin ? size : 50,
          meetingStatus: true,
        }
        try{
            const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/meetings`,meetData,{withCredentials:true})
            console.log(res.data)
          }
          catch(err){
            console.log(err)
          }
        createToast({
          title: anyoneCanJoin
            ? "Anyone can join meeting created successfully"
            : "Video Conference created successfully.",
          type: "success",
        });
        navigate("/meetsection");
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
            <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
              <EuiSwitch
                showLabel={false}
                label="Anyone Can Join"
                checked={anyoneCanJoin}
                onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                compressed
              />
            </EuiFormRow>
  
            <MeetingNameField
              label="Meeting name"
              isInvalid={showErrors.meetingName.show}
              error={showErrors.meetingName.message}
              placeholder="Meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />
  
            {anyoneCanJoin ? (
              <MeetingMaximumUsersField value={size} setSize={setSize} />
            ) : (
              <MeetingUserField
                label="Invite Users"
                isInvalid={showErrors.meetingUsers.show}
                error={showErrors.meetingUsers.message}
                options={users}
                onChange={onUserChange}
                selectedOptions={selectedUser}
                isClearable={false}
                placeholder="Select a Users"
              />
            )}
            <MeetingDateField selected={startDate} setStartDate={setStartDate} />
            <EuiSpacer />
            <CreateMeetingButtons createMeeting={createMeeting} onClickCancel="/createmeet"/>
          </EuiForm>
        </EuiFlexGroup>
      </div>
    );
  }