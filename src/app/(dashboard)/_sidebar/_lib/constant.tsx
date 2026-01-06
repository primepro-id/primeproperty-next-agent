import {
  LuHammer,
  LuHandshake,
  LuHouse,
  LuStar,
  LuUser,
  LuUsers,
} from "react-icons/lu";

export const ADMIN_SIDEBAR_MENU = [
  {
    title: "POPULAR",
    url: "/properties/popular",
    icon: <LuStar />,
  },
  {
    title: "PROPERTY",
    url: "/properties",
    icon: <LuHouse />,
  },
  {
    title: "LEADS",
    url: "/leads",
    icon: <LuHandshake />,
  },
  {
    title: "AGENTS",
    url: "/agents",
    icon: <LuUsers />,
  },
  {
    title: "DEVELOPERS",
    url: "/developers",
    icon: <LuHammer />,
  },
  {
    title: "ACCOUNT",
    url: "/account",
    icon: <LuUser />,
  },
];

export const AGENT_SIDEBAR_MENU = [
  {
    title: "PROPERTY",
    url: "/properties",
    icon: <LuHouse />,
  },
  {
    title: "LEADS",
    url: "/leads",
    icon: <LuHandshake />,
  },
  {
    title: "ACCOUNT",
    url: "/account",
    icon: <LuUser />,
  },
];
