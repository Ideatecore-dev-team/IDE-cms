import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";

import {
  useGetAllPartnerQuery,
  useDeletePartnerMutation,
} from "../../services/apis/partnerApi";
import {
  MdAddBox,
  MdOutlineDeleteForever,
  MdOutlineEdit,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PaginationData from "../../components/PaginationData";

const Partner = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [dataQuery, setDataQuery] = useState({
    page: 1,
    size: 10,
  });

  const handlePaginationChange = (page) => {
    setDataQuery({
      ...dataQuery,
      page,
    });
  };

  const {
    data: dataPartner,
    isLoading: isLoadingPartner,
    isError: isErrorPartner,
  } = useGetAllPartnerQuery(dataQuery);

  const [deletePartner, { isLoading: isLoadingDelete }] =
    useDeletePartnerMutation();

  const handleShow = (id) => {
    setSelectedPartnerId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };

  const handleDeletePartner = async (id) => {
    try {
      await deletePartner(id).unwrap();
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
            <h1>Partner</h1>
            <p>
              Kelola konten di page
              <span className="fw-bold"> “Partner”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-4 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h3 className="mt-2">Partner</h3>
          </Col>
          <Col className="align-self-center text-end">
            <Link to={"/partner/addpartner"}>
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" />
              </Button>
            </Link>
          </Col>
        </Row>

        {isLoadingPartner && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isErrorPartner && <div>Error</div>}

        <Row className="mb-3">
          <Col className="p-0">
            {dataPartner && (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No.
                    </th>
                    <th scope="col">Nama</th>
                    <th scope="col">Preview</th>
                    <th scope="col" className="text-center">
                      Manage
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dataPartner?.data?.map((partner, index) => (
                    <tr key={partner.id}>
                      <th scope="row" className="text-center align-middle">
                        {(dataPartner?.pagination?.currentPage - 1) *
                          dataPartner?.pagination?.perPage +
                          index +
                          1}
                      </th>
                      <td className="align-middle">
                        <Link
                          className="text-dark text-decoration-none"
                          to={partner.link}
                          target="blank"
                        >
                          {partner.name}
                        </Link>
                      </td>
                      <td className="align-middle w-10">
                        <Image fluid src={partner.image} alt={partner.name} />
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center align-items-center">
                          <Row className="gap-2">
                            <Col className="p-0">
                              <Link
                                to={`/partner/editpartner/${partner.id}`}
                                className="text-decoration-none"
                              >
                                <Button
                                  variant="primary"
                                  className="btn-sm px-1"
                                >
                                  <MdOutlineEdit className="fs-4" />
                                </Button>
                              </Link>
                            </Col>
                            <Col className="p-0">
                              <Button
                                variant="secondary"
                                className="btn-sm px-1"
                                onClick={() => handleShow(partner.id)}
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
            )}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {dataPartner && (
              <PaginationData
                dataPagination={dataPartner}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Confirm Delete Partner</Modal.Header>
        <Modal.Body>Are you sure want to delete this Partner</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDeletePartner(selectedPartnerId)}
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

export default Partner;
