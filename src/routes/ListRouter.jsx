import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";
import AuthenticatedRouter from "./AuthenticatedRouter";
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
import SuperAdminRouter from "./SuperAdminRouter";
import AddArticle from "../pages/article/AddArticle";
import NotFound from "../pages/notFound";
import AddCategory from "../pages/article/AddCategory";
import ArticleView from "../pages/article/ArticleView";
import EditArticle from "../pages/article/EditArticle";
import AddAboutUs from "../pages/aboutUs/AddAboutUs";
import AddCategoryTeam from "../pages/aboutUs/AddCategoryTeam";
import EditAboutUs from "../pages/aboutUs/EditAboutUs";

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
            path: "/aboutus/addaboutus",
            element: <AddAboutUs />,
          },
          {
            path: "/aboutus/addcategoryteam",
            element: <AddCategoryTeam />,
          },
          {
            path: "/aboutus/editaboutus/:id",
            element: <EditAboutUs />,
          },
          {
            path: "/ourprogram",
            element: <OurProgram />,
          },
          {
            path: "/umum",
            element: <Umum />,
          },
          // Article Pages
          {
            path: "/article",
            element: <Article />,
          },
          {
            path: "/article/addarticle",
            element: <AddArticle />,
          },
          {
            path: "/article/addcategory",
            element: <AddCategory />,
          },
          {
            path: "/article/view/:id",
            element: <ArticleView />,
          },
          {
            path: "/article/editarticle/:id",
            element: <EditArticle />,
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

  // not found
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default ListRouter;
