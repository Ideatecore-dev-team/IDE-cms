import { Container, Row } from "react-bootstrap";

const ContentLayout = ({ children }) => {
  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
    >
      <Row className="w-100 bg-white p-3 rounded-3 shadow">{children}</Row>
    </Container>
  );
};

export default ContentLayout;
