import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dev from "./dev/page";
import Profile from "./profile/page";
import Rank from "./rank/page";
import Lounge from "./lounge/page";
import ErrorPage from "./error/page";
import ClubRank from "./rank/clubRank/page";
import OtherProfile from "./profile/OtherProfile";

const routers = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Navigate to="/rank" replace />,
        index: true,
      },
    ],
  },
  {
    path: "/profile",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Profile />,
        index: true,
      },
      {
        path: ":id",
        element: <OtherProfile />,
        index: true,
      },
    ],
  },
  {
    path: "/rank",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Rank />,
        index: true,
      },
      {
        path: "club-rank/:id",
        element: <ClubRank />,
      },
    ],
  },
  {
    path: "/lounge",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Lounge />,
        index: true,
      },
    ],
  },
  {
    path: "/dev",
    element: <Dev />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routers);
export default router;
