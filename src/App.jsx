import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
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
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
