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
import { Link } from "react-router-dom";
import {
  MdAddBox,
  // MdOpenInNew,
  MdOutlineDeleteForever,
  MdOutlineEdit,
} from "react-icons/md";
import {
  useGetAllTeamQuery,
  useDeleteTeamMutation,
} from "../../services/apis/teamApi";
import { useState } from "react";
import { toast } from "react-toastify";
import PaginationData from "../../components/PaginationData";

const AboutUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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
    data: dataTeam,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
  } = useGetAllTeamQuery(dataQuery);

  console.log(dataTeam);

  const [deleteTeam, { isLoading: isLoadingDelete }] = useDeleteTeamMutation();

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
      await deleteTeam(id).unwrap();
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
            <h1>About Us</h1>
            <p>
              Kelola konten di page
              <span className="fw-bold"> “About Us”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-4 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h3 className="mt-2">Our Team Card</h3>
          </Col>
          <Col className="align-self-center text-end">
            <Link to={"/aboutus/addaboutus"}>
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" />
              </Button>
            </Link>
          </Col>
        </Row>

        {isLoadingTeams && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isErrorTeams && <div>Error</div>}

        <Row className="mb-3">
          <Col className="p-0">
            {dataTeam && (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No.
                    </th>
                    <th scope="col">Nama</th>
                    <th scope="col">Divisi</th>
                    <th scope="col">Preview</th>
                    <th scope="col" className="text-center">
                      Manage
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dataTeam?.data?.map((team, index) => (
                    <tr key={team.id}>
                      <th scope="row" className="text-center align-middle">
                        {(dataTeam?.pagination?.currentPage - 1) *
                          dataTeam?.pagination?.perPage +
                          index +
                          1}
                      </th>
                      <td className="align-middle">{team.name}</td>
                      <td className="align-middle">{team.CategoryTeam.name}</td>
                      <td className="align-middle w-25">
                        <Image fluid src={team.image} alt={team.name} />
                      </td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center align-items-center">
                          <Row className="gap-2">
                            {/* <Col className="p-0">
                              <Link
                                // to={`/article/view/${team.id}`}
                                className="text-decoration-none"
                              >
                                <Button
                                  variant="success"
                                  className="btn-sm px-1"
                                >
                                  <MdOpenInNew className="fs-4" />
                                </Button>
                              </Link>
                            </Col> */}
                            <Col className="p-0">
                              <Link
                                to={`/aboutus/editaboutus/${team.id}`}
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
                                onClick={() => handleShow(team.id)}
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
            {dataTeam && (
              <PaginationData
                dataPagination={dataTeam}
                handlePaginationChange={handlePaginationChange}
              />
            )}
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
export default AboutUs;
