import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Container fluid className="p-0">
        <Row>
          <Col md={2} className="sidebar vh-100">
            navigation
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
