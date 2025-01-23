import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/apis/authApi";
import { Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";

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
    <ContentLayout>
      <div className="border border-1 border-primary">
        test
        <h1>User</h1>
        <p>{user?.data?.name}</p>
        <p>{user?.data?.email}</p>
        <p>{user?.data?.role}</p>
        <Link to={"/user/change-password"}>Change Password</Link>
      </div>
    </ContentLayout>
  );
};
export default Auth;
