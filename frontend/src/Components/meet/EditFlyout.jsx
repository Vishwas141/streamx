import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
    EuiTitle,
  } from "@elastic/eui";
  import moment from "moment";
  import React, { useEffect, useState } from "react";
  import useFetchUsers from "../../hooks/useFetchUsers";
  import useToast from "../../hooks/useToast";
  import axios from 'axios'
  import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
  import MeetingDateField from "./FormComponents/MeetingDateField";
  import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUsersField";
  import MeetingNameField from "./FormComponents/MeetingNameField";
  import MeetingUserField from "./FormComponents/MeetingUserField";
  
  export default function EditFlyout({
    closeFlyout,
    meeting,
    setMeetings
  }) {
    // console.log(meeting)
    const users = useFetchUsers();
    const [createToast] = useToast();
    const [meetingName, setMeetingName] = useState(meeting.meetingName);
    const [meetingType] = useState(meeting.meetingType);
    const [selectedUser, setSelectedUser] = useState([]);
    const [startDate, setStartDate] = useState(moment(meeting.meetingDate));
    const [size, setSize] = useState(1);
    const [status, setStatus] = useState(false);
    const onUserChange = (selectedOptions) => {
      setSelectedUser(selectedOptions);
    };
  
    useEffect(() => {
      if (users) {
        const foundUsers = [];
        meeting.invitedUsers.forEach((user) => {
          const findUser = users.find(
            (tempUser) => tempUser._id === user
          );
          if (findUser) foundUsers.push(findUser);
        });
        setSelectedUser(foundUsers);
      }
    }, [users, meeting]);
  
    const [showErrors] = useState({
      meetingName: {
        show: false,
        message: [],
      },
      meetingUsers: {
        show: false,
        message: [],
      },
    });
  
    const editMeeting = async () => {
      const editedMeeting = {
        createdBy: meeting.createdBy,
        meetingid: meeting.meetingid,
        meetingName,
        meetingType,
        invitedUsers: selectedUser.map((user) => user._id),
        meetingDate: startDate.format("L"),
        maxUsers: size,
        meetingStatus: !status,
      };
      try{
        const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/meetings/${editedMeeting.meetingid}`,editedMeeting,{withCredentials:true});
        if(res.data.success){
          setMeetings((prevMeetings) => {
            const meetingsClone = [...prevMeetings];
            const meetingIndex = meetingsClone.findIndex(
              (tempMeeting) => tempMeeting.meetingid === meeting.meetingid
            );
            meetingsClone[meetingIndex] = editedMeeting;
            return meetingsClone;
          });
          createToast({ title: "Meeting updated successfully.", type: "success" });
          closeFlyout(true);
        }
      }
      catch(err){
        console.log(err)
        createToast({ title: "Meeting updated failed.", type: "danger" });
      }
    };
  
    return (
      <EuiFlyout onFocus onClose={() => closeFlyout()}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>{meeting.meetingName}</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiForm>
            <MeetingNameField
              label="Meeting name"
              isInvalid={showErrors.meetingName.show}
              error={showErrors.meetingName.message}
              placeholder="Meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />
            {meetingType === "anyone-can-join" ? (
              <MeetingMaximumUsersField value={size} setSize={setSize} />
            ) : (
              <MeetingUserField
                label="Invite Users"
                isInvalid={showErrors.meetingUsers.show}
                error={showErrors.meetingUsers.message}
                options={users}
                onChange={onUserChange}
                selectedOptions={selectedUser}
                singleSelection={
                  meetingType === "video-conference" ? false :{ asPlainText: true }
                }
                isClearable={false}
                placeholder="Select a Users"
              />
            )}
            <MeetingDateField selected={startDate} setStartDate={setStartDate} />
            <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
              <EuiSwitch
                showLabel={false}
                label="Cancel Meeting"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </EuiFormRow>
            <EuiSpacer />
            <CreateMeetingButtons
              createMeeting={editMeeting}
              isEdit
              closeFlyout={closeFlyout}
              st={true}
            />
          </EuiForm>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }