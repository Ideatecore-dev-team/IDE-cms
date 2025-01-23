import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";
import AuthenticatedRouter from "../components/AuthenticatedRouter";
import Home from "../pages/home";
import Article from "../pages/article";
import Auth from "../pages/user";
import ChangePassword from "../pages/user/ChangePassword";
import Akun from "../pages/akun";
import Umum from "../pages/umum";
import AboutUs from "../pages/aboutUs";
import OurProgram from "../pages/ourProgram";
import Gallery from "../pages/gallery";
import Media from "../pages/media";
import AddUser from "../pages/akun/AddUser";
import EditUser from "../pages/akun/EditUser";
import SuperAdminRouter from "../components/SuperAdminRouter";

const ListRouter = createBrowserRouter([
  // Public Routes
  {
    path: "/login",
    element: <Login />,
  },

  // Protected Routes
  {
    element: <AuthenticatedRouter />,
    children: [
      {
        element: <App />,
        children: [
          // Dashboard (Home)
          {
            path: "/",
            element: <Home />,
          },

          // User Pages
          {
            path: "/user",
            element: <Auth />,
          },
          {
            path: "/user/change-password",
            element: <ChangePassword />,
          },

          // Informational Pages
          {
            path: "/aboutus",
            element: <AboutUs />,
          },
          {
            path: "/ourprogram",
            element: <OurProgram />,
          },
          {
            path: "/umum",
            element: <Umum />,
          },
          {
            path: "/article",
            element: <Article />,
          },

          // Media Pages
          {
            path: "/gallery",
            element: <Gallery />,
          },
          {
            path: "/media",
            element: <Media />,
          },
          // Route for Super Admin
          {
            element: <SuperAdminRouter />,
            children: [
              // User Account Pages
              {
                path: "/acount",
                element: <Akun />,
              },
              {
                path: "/acount/adduser",
                element: <AddUser />,
              },
              {
                path: "/acount/edituser/:id",
                element: <EditUser />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default ListRouter;
