import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css"; // Include the Quill stylesheet
import "./assets/css/bootstrap.css";
import "./assets/css/styles.css";
import "./assets/css/custom-fonts.css";

import ListRouter from "./routes/ListRouter.jsx";
import store from "./services/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={ListRouter} />
      <ToastContainer />
    </Provider>
  </StrictMode>,
);
