import { useState } from "react";
import { Container, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import {
  useGetAllUserQuery,
  useDeleteUserByIdMutation,
} from "../../services/apis/userApi";
import {
  MdAddBox,
  MdOutlineDeleteForever,
  MdOutlineEdit,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Akun = () => {
  // Open and close modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data: allUser, isLoading, isError } = useGetAllUserQuery();

  const [deleteUser, { isLoading: isLoadingDelete }] =
    useDeleteUserByIdMutation();

  const handleShow = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("Delete user success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      // Close the modal only if delete is not loading
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
            <h1>Kelola Akun</h1>
            <p>
              Kelola akun admin anda disini, hanya untuk akun
              <span className="fw-bold"> “Super Admin”</span>.
            </p>
          </Col>
        </Row>
        <Row className="mb-3 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h2 className="mt-2">Akun Admin</h2>
          </Col>
          <Col className="align-self-center text-end">
            <Link to={"/acount/adduser"}>
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
          <Col className="p-0">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    No.
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col" className="text-center">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUser?.data?.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row" className="text-center align-middle">
                      {index + 1}
                    </th>
                    <td className="align-middle">{user.name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle small">{user.role}</td>
                    <td className="d-flex justify-content-evenly">
                      <Row className="gap-2">
                        <Col className="p-0">
                          <Link
                            to={`/acount/edituser/${user.id}`}
                            className="text-decoration-none"
                          >
                            <Button variant="primary" className="btn-sm px-2">
                              <MdOutlineEdit className="fs-4" />
                            </Button>
                          </Link>
                        </Col>
                        <Col className="p-0">
                          <Button
                            variant="secondary"
                            className="btn-sm px-2"
                            onClick={() => handleShow(user.id)}
                          >
                            <MdOutlineDeleteForever className="fs-4" />
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

      {/* Modal for Deleting User */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Confirm Delete User</Modal.Header>
        <Modal.Body>Are you sure want to delete this user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDeleteUser(selectedUserId)}
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
export default Akun;
