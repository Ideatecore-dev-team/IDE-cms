import { Container, Row, Col, Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import FormEditName from "./FormEditName";
import FormEditPassword from "./FormEditPassword";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../services/apis/userApi";

const EditUser = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-1">
          <Col className="px-0">
            <h3>Update Name Admin</h3>
            <p>Masukkan data pada field yang tertera.</p>
          </Col>
        </Row>
        <Row className="mb-3 py-3">
          {user && <FormEditName id={id} name={user?.data?.name} />}
        </Row>

        <Row className="border-bottom border-secondary mb-1">
          <Col className="px-0">
            <h3>Update Password Admin</h3>
            <p>Masukkan data pada field yang tertera.</p>
          </Col>
        </Row>
        <Row className="mb-3 py-3">{user && <FormEditPassword id={id} />}</Row>
      </Container>

      {isLoading && (
        <Container className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      )}
      {isError && <div>Error</div>}
    </ContentLayout>
  );
};
export default EditUser;
