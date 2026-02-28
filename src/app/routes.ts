import { createBrowserRouter } from "react-router";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AppLayout from "./components/AppLayout";
import ProtectedApp from "./components/ProtectedApp";

import Dashboard from "./pages/Dashboard";
import TextScan from "./pages/TextScan";
import ImageScan from "./pages/ImageScan";
import LinkCheck from "./pages/LinkCheck";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },

  // 🔐 PROTECTED TREE
  {
    path: "/app",
    Component: ProtectedApp,
    children: [
      {
        Component: AppLayout,
        children: [
          { index: true, Component: Dashboard },
          { path: "text-scan", Component: TextScan },
          { path: "image-scan", Component: ImageScan },
          { path: "link-check", Component: LinkCheck },
          { path: "reports", Component: Reports },
          { path: "profile", Component: Profile },
          { path: "settings", Component: Settings },
        ],
      },
    ],
  },
]);