import {  Home, Globe  ,Book,PlusCircle , UserPlus,Users, FilePlus,Calendar,Send ,Edit3,    } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },

  {
    id: "courses",
    title: "Courses ",
    icon: <Book size={20} />,
    children: [
      {
        id: "courses",
        title: "Courses",
        icon: <Book   size={12} />,
        navLink: "/courses-page",
      },
            {
        id: "courses-add",
        title: "Add Courses",
        icon: <FilePlus   size={12} />,
        navLink: "/courses/add",
      },
    ],
  },
    {
    id: "Users",
    title: "Users ",
    icon: <Users size={20} />,
    children: [
      {
        id: "users",
        title: "users",
        icon: <Users size={12} />,
        navLink: "/users",
      },
            {
        id: "add-courses",
        title: "Add Users",
        icon: <UserPlus size={12} />,
        navLink: "/users/add",
      },
    ],
  },
      {
    id: "News",
    title: "News ",
    icon: <Globe  size={20} />,
    children: [
      {
        id: "News",
        title: "News",
        icon: < Globe size={12} />,
        navLink: "/news",
      },
            {
        id: "add-news",
        title: "Add News",
        icon: <Edit3   size={12} />,
        navLink: "/news/add",
      },
    ],
  },
        {
    id: "Reserve",
    title: "Reserve ",
    icon: <Calendar   size={20} />,
    children: [
      {
        id: "Reserve",
        title: "Reserve",
        icon: < Calendar  size={12} />,
        navLink: "/reserve",
      },

    ],
  },
];
