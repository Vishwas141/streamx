import {
    EuiButtonIcon,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHeader,
    EuiText,
    EuiTextColor,
  } from "@elastic/eui";
  import { useEffect, useState } from "react";
  import {MdLightMode,MdDarkMode,MdArrowForward} from "react-icons/md"
  import { Link, useLocation, useNavigate } from "react-router-dom";
 import { useSelector,useDispatch } from "react-redux";
  import { changeTheme } from "../../store/slice/AuthSlice";
  import cookies from 'react-cookies'
  import {
    getCreateMeetingBreadCrumbs,
    getDashboardBreadCrumbs,
    getMeetingsBreadCrumbs,
    getMyMeetingsBreadCrumbs,
    getOneOnOneMeetingBreadCrumbs,
    getVideoConferenceBreadCrumbs,
  } from "../../utils/BreadCrumbs";

  
  export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState("user");
    const isDarkTheme = useSelector((state) => state.auth.isDarkTheme);
    const [breadCrumbs, setBreadCrumbs] = useState([
      {
        text: "Dashboard",
      },
    ]);
    const dispatch = useDispatch();
    const [isResponsive, setIsResponsive] = useState(false);
    useEffect(() => {
      const name=localStorage.getItem("name")
      setUserName(name);
    }, []);
    useEffect(() => {
      const { pathname } = location;
      if (pathname === "/meetsection") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
      else if (pathname === "/createmeet")
        setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
      else if (pathname === "/create1on1")
        setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
      else if (pathname === "/videoconference")
        setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
      else if (pathname === "/mymeetings")
        setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
      else if (pathname === "/meetings") {
        setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
      }
    }, [location, navigate]);
  
    const logout = () => {
      navigate('..')
    };
  
    const invertTheme = () => {
      const theme = localStorage.getItem("zoom-theme");
      localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
      dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
    };
  
    const section = [
      {
        items: [
          <Link to="/">
            <EuiText>
              <h2 style={{ padding: "0 1vw" }}>
                <EuiTextColor color="#0b5cff">StreamX</EuiTextColor>
              </h2>
            </EuiText>
          </Link>,
        ],
      },
      {
        items: [
          <>
            {userName ? (
              <EuiText>
                <h3>
                  <EuiTextColor color="white">Hello, </EuiTextColor>
                  <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
                </h3>
              </EuiText>
            ) : null}
          </>,
        ],
      },
      {
        items: [
          <EuiFlexGroup
            justifyContent="center"
            alignItems="center"
            direction="row"
            style={{ gap: "2vw" }}
          >
            <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
              {isDarkTheme ? (
               <div style={{padding:"0.4rem",backgroundColor:"#fae54b",borderRadius:"7px",cursor:"pointer"}} onClick={invertTheme}>
               <MdLightMode color="black" size="22px"/>
             </div>
              ) : (
                <div style={{padding:"0.4rem",backgroundColor:"#c9c5c5",borderRadius:"7px",cursor:"pointer"}} onClick={invertTheme}>
                  <MdDarkMode color="black" size="22px"/>
                </div>
              )}
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
              <div style={{padding:"0.4rem",backgroundColor:"#57a7c2",borderRadius:"7px",cursor:"pointer"}} onClick={logout}>
                  <MdArrowForward color="black" size="22px"/>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>,
        ],
      },
    ];
  
    const responsiveSection = [
      {
        items: [
          <Link to="/">
            <EuiText>
              <h2 style={{ padding: "0 1vw" }}>
                <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
              </h2>
            </EuiText>
          </Link>,
        ],
      },
      {
        items: [
          <EuiFlexGroup
            justifyContent="center"
            alignItems="center"
            direction="row"
            style={{ gap: "2vw" }}
          >
            <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
               <div style={{padding:"0.4rem",backgroundColor:"#fae54b",borderRadius:"7px",cursor:"pointer"}} onClick={invertTheme}>
               <MdLightMode color="black" size="22px"/>
             </div>
              ) : (
                <div style={{padding:"0.4rem",backgroundColor:"#c9c5c5",borderRadius:"7px",cursor:"pointer"}} onClick={invertTheme}>
                  <MdDarkMode color="black" size="22px"/>
                </div>
              )}
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
              <div style={{padding:"0.4rem",backgroundColor:"#57a7c2",borderRadius:"7px",cursor:"pointer"}} onClick={logout}>
                  <MdArrowForward color="black" size="22px"/>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>,
        ],
      },
    ];
  
    useEffect(() => {
      if (window.innerWidth < 480) {
        setIsResponsive(true);
      }
    }, []);
  
    return (
      <>
        <EuiHeader
          style={{ minHeight: "8vh" }}
          theme="dark"
          sections={isResponsive ? responsiveSection : section}
        />
        <EuiHeader
          style={{ minHeight: "8vh" }}
          sections={[
            {
              breadcrumbs: breadCrumbs,
            },
          ]}
        />
      </>
    );
  }