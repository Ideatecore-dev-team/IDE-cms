import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import ContentLayout from "../../components/layout/ContentLayout";
import { useGetProgramByIdQuery } from "../../services/apis/programApi";
import "quill/dist/quill.snow.css"; // Include the Quill stylesheet

const ProgramView = () => {
  const { id } = useParams();
  const { data: dataProgram, isLoading, isError } = useGetProgramByIdQuery(id);

  return (
    <ContentLayout>
      <Container style={{ maxWidth: "720px" }} className="rounded p-4">
        {dataProgram && (
          <>
            <Row className="mb-5">
              <Col className="d-flex justify-content-center">
                <Image src={dataProgram.data.image} fluid />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col className="px-0">
                <h4 className="text-center fw-semibold">
                  {dataProgram.data.title}
                </h4>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <h6 className="text-center fw-semibold text-primary">
                  {dataProgram.data.ProgramCategory.name.toUpperCase()}
                </h6>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <h6 className="text-decoration-none text-dark m-0">
                  {dataProgram.data.User.name}
                </h6>
                <small className="text-decoration-none text-dark m-0">
                  {format(new Date(dataProgram.data.createdAt), "dd MMM yyyy")}
                </small>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col className="px-0">
                <div
                  className="ql-container ql-snow"
                  style={{ border: "none", padding: 0 }}
                >
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(dataProgram.data.content),
                    }}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col>
            {isLoading && (
              <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
              </Container>
            )}
            {isError && <div>Error</div>}
          </Col>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default ProgramView;
