import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import ContentLayout from "../../components/layout/ContentLayout";

const index = () => {
  return (
    <Container fluid id="main">
      <Row>
        <Col
          id="sidebar"
          md={"auto"}
          className="d-flex flex-column bg-white vh-100"
        >
          <Sidebar />
        </Col>

        <Col id="content" className="d-flex flex-column p-0">
          <ContentLayout>Not Found 404</ContentLayout>
        </Col>
      </Row>
    </Container>
  );
};
export default index;
