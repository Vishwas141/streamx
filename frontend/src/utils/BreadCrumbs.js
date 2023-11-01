export const getDashboardBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
  },
];

export const getCreateMeetingBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/meetsection");
    },
  },
  {
    text: "Create Meeting",
  },
];

export const getOneOnOneMeetingBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/meetsection");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/createmeet");
    },
  },
  {
    text: "Create 1 on 1 Meeting",
  },
];

export const getVideoConferenceBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/meetsection");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/createmeet");
    },
  },
  {
    text: "Create Video Conference",
  },
];

export const getMyMeetingsBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/meetsection");
    },
  },
  {
    text: "My Meetings",
  },
];

export const getMeetingsBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/meetsection");
    },
  },
  {
    text: "Meetings",
  },
];
