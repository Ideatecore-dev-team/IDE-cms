import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { format } from "date-fns";

import {
  useGetAllSubscribeQuery,
  useDeleteSubscribeMutation,
} from "../../services/apis/subscribeApi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import PaginationData from "../../components/PaginationData";

const Subscibe = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataQuery, setDataQuery] = useState({
    page: 1,
    size: 15,
  });

  const handlePaginationChange = (page) => {
    setDataQuery({
      ...dataQuery,
      page,
    });
  };

  const {
    data: dataSubscribe,
    isLoading,
    isError,
  } = useGetAllSubscribeQuery(dataQuery);
  const [deleteSubscribe, { isLoading: isLoadingDelete }] =
    useDeleteSubscribeMutation();

  const handleShow = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };
  const handleDeleteArticle = async (id) => {
    try {
      await deleteSubscribe(id).unwrap();
      toast.success("Delete Subscribe success");
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
            <h1>Subscribe</h1>
            <p>
              Kelola
              <span className="fw-bold"> “Subscribe”</span> dari disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h2 className="mt-2">List of Subscribe</h2>
          </Col>
        </Row>

        {isLoading && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isError && <div>Error</div>}

        <Row>
          <Col className="p-0">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center w-5">
                    No.
                  </th>
                  <th scope="col" className="text-center w-20">
                    Date
                  </th>

                  <th scope="col" className="text-center">
                    Email
                  </th>

                  <th scope="col" className="text-center w-15">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSubscribe?.data?.map((subscribe, index) => (
                  <tr key={subscribe.id}>
                    <th scope="row" className="text-center align-middle">
                      {(dataSubscribe?.pagination?.currentPage - 1) *
                        dataSubscribe?.pagination?.perPage +
                        index +
                        1}
                    </th>
                    <td className="align-middle text-center">
                      {format(new Date(subscribe.createdAt), "dd MMM yyyy")}
                    </td>

                    <td className="align-middle text-center">
                      {subscribe.email}
                    </td>

                    <td className="align-middle text-center">
                      <div>
                        <Row className="gap-2">
                          <Col className="p-0">
                            <Button
                              variant="secondary"
                              className="btn-sm px-2"
                              onClick={() => handleShow(subscribe.id)}
                            >
                              <MdOutlineDeleteForever className="fs-4" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {dataSubscribe && (
              <PaginationData
                dataPagination={dataSubscribe}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Confirm Delete Subscribe</Modal.Header>
        <Modal.Body>Are you sure want to delete this subscribe</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDeleteArticle(selectedId)}
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
export default Subscibe;
