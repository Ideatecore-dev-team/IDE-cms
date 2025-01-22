import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";
import AuthenticatedRouter from "../components/AuthenticatedRouter";
import Dashboard from "../pages/dashboard";
import Article from "../pages/article";
import Auth from "../pages/auth";
import ChangePassword from "../pages/auth/ChangePassword";

const ListRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AuthenticatedRouter />,
    children: [
      {
        element: <App />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/article",
            element: <Article />,
          },
          {
            path: "/auth",
            element: <Auth />,
          },
          {
            path: "/auth/change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);
export default ListRouter;
