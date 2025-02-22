import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { Link } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import {
  useGetAllArticleQuery,
  useDeleteArticleMutation,
} from "../../services/apis/articleApi";
import { useState } from "react";

import ArticleSearch from "./ArticleSearch";
import ArticleTable from "./ArticleTable";
import { toast } from "react-toastify";
import PaginationData from "../../components/PaginationData";

const Article = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [articleQuery, setArticleQuery] = useState({
    search: "",
    page: 1,
    size: 10,
  });

  const {
    data: articles,
    isLoading,
    isError,
  } = useGetAllArticleQuery(articleQuery);

  const handlePaginationChange = (page) => {
    setArticleQuery({
      ...articleQuery,
      page,
    });
  };

  const handleSearch = ({ search }) => {
    setArticleQuery({
      ...articleQuery,
      page: 1,
      search,
    });
  };

  const [deleteArticle, { isLoading: isLoadingDelete }] =
    useDeleteArticleMutation();

  const handleShow = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticle(id).unwrap();
      toast.success("Delete article success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      if (!isLoadingDelete) {
        setShowModal(false);
      }
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Artikel</h1>
            <p>
              Kelola konten di page
              <span className="fw-bold"> “Artikel”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-4 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h3 className="mt-2">Artikel</h3>
          </Col>
          <Col className="align-self-center text-end">
            <Link to={"/article/addarticle"}>
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" />
              </Button>
            </Link>
          </Col>
        </Row>

        {isLoading && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isError && <div>Error</div>}

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {articles && <ArticleSearch handleSearch={handleSearch} />}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className=" p-0">
            {articles && (
              <ArticleTable articles={articles} handleShow={handleShow} />
            )}
          </Col>
        </Row>

        {/* <Row>
          <Col className="d-flex justify-content-end p-0">
            {articles && (
              <ArticlesPagination
                articles={articles}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </Col>
        </Row> */}

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {articles && (
              <PaginationData
                dataPagination={articles}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal for Deleting User */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Confirm Delete article</Modal.Header>
        <Modal.Body>Are you sure want to delete this article</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDeleteArticle(selectedUserId)}
            disabled={isLoadingDelete}
            className="w-15"
          >
            {isLoadingDelete ? (
              <Spinner animation="border" variant="outline" size="sm" />
            ) : (
              "Yes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </ContentLayout>
  );
};
export default Article;
