import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Container fluid id="main">
        <Row>
          <Sidebar />

          <Col id="content" className="content-bg-color">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
