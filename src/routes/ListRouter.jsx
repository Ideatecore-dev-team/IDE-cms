import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";
import AuthenticatedRouter from "../components/AuthenticatedRouter";
import Dashboard from "../pages/dashboard";
import Article from "../pages/article";

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
        ],
      },
    ],
  },
]);
export default ListRouter;
