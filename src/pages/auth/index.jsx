import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/apis/authApi";
import { Spinner } from "react-bootstrap";

const Auth = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h1>Auth</h1>
      <p>{user?.data?.name}</p>
      <p>{user?.data?.email}</p>
      <p>{user?.data?.role}</p>
      <Link to={"/auth/change-password"}>Change Password</Link>
    </div>
  );
};
export default Auth;
