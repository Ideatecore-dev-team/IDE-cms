import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { Link } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { useState } from "react";
import ProgramSearch from "./ProgramSearch";
import ProgramTable from "./ProgramTable";
import {
  useDeleteProgramMutation,
  useGetAllProgramQuery,
} from "../../services/apis/programApi";
import ProgramPagination from "./ProgramPagination";
import { toast } from "react-toastify";

const OurProgram = () => {
  const [programQuery, setProgramQuery] = useState({
    search: "",
    page: 1,
    size: 5,
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: dataProgram,
    isLoading: isLoadingProgram,
    isError: isErrorProgram,
  } = useGetAllProgramQuery(programQuery);
  const [deleteProgram, { isLoading: isLoadingDelete }] =
    useDeleteProgramMutation();

  const handleSearch = ({ search }) => {
    setProgramQuery({
      ...programQuery,
      page: 1,
      search,
    });
  };

  const handleShow = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };

  const handlePaginationChange = (page) => {
    setProgramQuery({
      ...programQuery,
      page,
    });
  };

  const handleDeleteProgram = async (id) => {
    try {
      await deleteProgram(id).unwrap();
      toast.success("Delete program success");
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
            <h1>Program</h1>
            <p>
              Kelola konten di page
              <span className="fw-bold"> “Program”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-4 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h3 className="mt-2">Program</h3>
          </Col>
          <Col className="align-self-center text-end">
            <Link to={"/ourprogram/addprogram"}>
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" />
              </Button>
            </Link>
          </Col>
        </Row>

        {isLoadingProgram && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isErrorProgram && <div>Error</div>}

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {dataProgram && <ProgramSearch handleSearch={handleSearch} />}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className=" p-0">
            {dataProgram && (
              <ProgramTable dataProgram={dataProgram} handleShow={handleShow} />
            )}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {dataProgram && (
              <ProgramPagination
                dataProgram={dataProgram}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>Confirm Delete User</Modal.Header>
          <Modal.Body>Are you sure want to delete this user</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDeleteProgram(selectedUserId)}
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
      </Container>
    </ContentLayout>
  );
};
export default OurProgram;
