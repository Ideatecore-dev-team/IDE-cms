import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/apis/authApi";
import { Col, Container, Row, Spinner } from "react-bootstrap";
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
      <Container>
        <Row className="">
          <Col>
            <h3>{user?.data?.name}</h3>
            <h4>{user?.data?.email}</h4>
            <h5>{user?.data?.role}</h5>
            <Link className="btn btn-primary" to={"/user/change-password"}>
              Change Password
            </Link>
          </Col>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default Auth;
