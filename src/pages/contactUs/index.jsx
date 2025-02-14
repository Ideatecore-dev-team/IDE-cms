import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import {
  useGetAllContactUsQuery,
  useDeleteContactUsMutation,
} from "../../services/apis/contactUsApi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: dataContactUs, isLoading, isError } = useGetAllContactUsQuery();
  const [deleteContactUs, { isLoading: isLoadingDelete }] =
    useDeleteContactUsMutation();

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
      await deleteContactUs(id).unwrap();
      toast.success("Delete Contact Us success");
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
            <h1>Contact Us</h1>
            <p>
              Kelola pesan dari
              <span className="fw-bold"> “Contact Us”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h2 className="mt-2">Akun Admin</h2>
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
                  <th scope="col" className="text-center w-15">
                    First Name
                  </th>
                  <th scope="col" className="text-center w-15">
                    Last Name
                  </th>
                  <th scope="col" className="text-center w-15">
                    Email
                  </th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {dataContactUs?.data?.map((contact, index) => (
                  <tr key={contact.id}>
                    <th scope="row" className="text-center align-middle">
                      {index + 1}
                    </th>
                    <td className="align-middle text-center">
                      {contact.firstName}
                    </td>
                    <td className="align-middle text-center">
                      {contact.lastName}
                    </td>
                    <td className="align-middle text-center">
                      {contact.email}
                    </td>
                    <td className="align-middle small">{contact.message}</td>

                    <td className="align-middle">
                      <div>
                        <Row className="gap-2">
                          <Col className="p-0">
                            <Button
                              variant="secondary"
                              className="btn-sm px-2"
                              onClick={() => handleShow(contact.id)}
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
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Confirm Delete Contact Us</Modal.Header>
        <Modal.Body>Are you sure want to delete this contact us</Modal.Body>
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
export default ContactUs;
