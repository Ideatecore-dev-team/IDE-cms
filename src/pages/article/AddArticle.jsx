import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { Link } from "react-router-dom";
import { MdAddBox } from "react-icons/md";

const AddArticle = () => {
  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Tambah Artikel</h1>
            <p className="lead">Masukan data pada field yang tertera</p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 py-2">
          <Col className="align-self-center text-end">
            <Link
              to={"/article/addcategory"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" /> Tambah Kategori
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>form satu</Form.Label>
                <Form.Control type="text" placeholder="Masukan judul artikel" />
                <Form.Text>form text satu</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>form dua</Form.Label>
                <Form.Control type="text" placeholder="Masukan judul artikel" />
                <Form.Text>form text dua</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>form dua</Form.Label>
                <Form.Control type="text" placeholder="Masukan judul artikel" />
                <Form.Text>form text dua</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>form dua</Form.Label>
                <Form.Control type="text" placeholder="Masukan judul artikel" />
                <Form.Text>form text dua</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>form dua</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Masukan judul artikel"
                />
                <Form.Text>form text dua</Form.Text>
              </Form.Group>

              <Button type="submit">Simpan</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default AddArticle;
