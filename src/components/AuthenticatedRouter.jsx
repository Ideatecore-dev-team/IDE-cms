import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../services/apis/authApi";
import { removeUserInfo } from "../services/reducers/authSlice";
import { Spinner, Container } from "react-bootstrap";

const AuthenticatedRouter = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(null, {
    skip: !userInfo, // Skip the query if userInfo is not available
    credentials: "include",
  });

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  if (isError) {
    console.log("error fetching user data", isError);
    // dispatch(removeUserInfo());
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    console.log("error fetching user data", user);
    dispatch(removeUserInfo());
    return <Navigate to="/login" replace />;
  }

  if (
    user.data.id !== userInfo.id || // User ID mismatch
    user.data.role !== userInfo.role
  ) {
    console.log("error fetching user data", isError);
    dispatch(removeUserInfo());
    return <Navigate to="/login" replace />;
  }

  // console.log(userInfo);
  // Render Outlet if everything checks out
  return <Outlet />;
};
export default AuthenticatedRouter;
