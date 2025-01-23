import { Button, Col, Row, Spinner, Modal, Image } from "react-bootstrap";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "../services/apis/authApi";
import { removeUserInfo } from "../services/reducers/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IDELogo from "../assets/images/IDELogo.png";
import {
  MdPeople,
  MdDashboard,
  MdHome,
  MdInfo,
  MdEmojiPeople,
  MdImage,
  MdArticle,
  MdOutlinePhotoSizeSelectActual,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    // data: user,
    isLoading,
  } = useGetUserQuery();
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Open and close modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    if (!isLoadingLogout) {
      setShowModal(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(removeUserInfo());
      toast.success("Logout success");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      if (!isLoadingLogout) {
        setShowModal(false);
      }
    }
  };

  const confirmLogout = () => {
    handleLogout(); // Call the logout function
    // handleClose(); // Close the modal
  };

  const handleActiveNav = ({ isActive }) => {
    return `d-flex align-items-center text-decoration-none py-2 px-3 my-1 text-dark fw-semibold ${
      isActive ? "isActiveNav" : ""
    }`;
  };

  return (
    <Row className="d-flex flex-column flex-grow-1 justify-content-between">
      <Col id="sidebarNav" className="d-flex flex-column p-0">
        <Link to="/" aria-label="Logo" className="mb-2 mt-3">
          <Image
            src={IDELogo}
            fluid
            alt="IDELogo"
            className="w-75 ms-3"
          ></Image>
        </Link>
        <NavLink to="/" className={handleActiveNav} aria-label="Home">
          <MdHome className="me-2 fs-4" />
          Home
        </NavLink>
        <NavLink
          to="/aboutus"
          className={handleActiveNav}
          aria-label="About Us"
        >
          <MdInfo className="me-2 fs-4" />
          About Us
        </NavLink>
        {userInfo?.role === "SUPER_ADMIN" && (
          <NavLink to="/acount" className={handleActiveNav} aria-label="Akun">
            <MdPeople className="me-2 fs-4" />
            Akun
          </NavLink>
        )}
        <NavLink to="/article" className={handleActiveNav} aria-label="Artikel">
          <MdArticle className="me-2 fs-4" />
          Artikel
        </NavLink>
        <NavLink to="/gallery" className={handleActiveNav} aria-label="Gallery">
          <MdImage className="me-2 fs-4" />
          Gallery
        </NavLink>

        <NavLink to="/media" className={handleActiveNav} aria-label="Media">
          <MdOutlinePhotoSizeSelectActual className="me-2 fs-4" />
          Media
        </NavLink>
        <NavLink
          to="/ourprogram"
          className={handleActiveNav}
          aria-label="Our Program"
        >
          <MdEmojiPeople className="me-2 fs-4" />
          Our Program
        </NavLink>
        <NavLink to="/umum" className={handleActiveNav} aria-label="Umum">
          <MdDashboard className="me-2 fs-4" />
          Umum
        </NavLink>
      </Col>

      {/* User Info Section */}
      <Col
        id="userAuth"
        md={"auto"}
        className="d-flex justify-content-between  align-items-center mb-1 p-0"
      >
        <Col id="userInfo" className="d-flex align-items-center">
          <Link to="/user" className="text-decoration-none">
            {isLoading ? (
              <Row>
                <Col>
                  <Spinner animation="border" variant="primary" />
                </Col>
              </Row>
            ) : (
              <Row className="p-3">
                <Col md={"auto"} className="d-flex align-items-center">
                  <MdAccountCircle className="text-dark fs-1" />
                </Col>
                <Col md={"auto"} className="p-0">
                  <h5 className="text-dark mb-0">{userInfo?.name}</h5>
                  <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                    {userInfo?.role}
                  </small>
                </Col>
              </Row>
            )}
          </Link>
        </Col>

        {/* Logout Button Section */}

        <Col md={"auto"} className="d-flex align-items-end">
          <Button
            onClick={handleShow}
            className="bg-white border-0 text-dark px-0"
          >
            <MdLogout className="fs-4 me-2" />
          </Button>
        </Col>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to logout?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className=""
              onClick={handleClose}
              disabled={isLoadingLogout}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={confirmLogout}
              disabled={isLoadingLogout}
              className="w-15"
            >
              {isLoadingLogout ? (
                <Spinner animation="border" variant="outline" size="sm" />
              ) : (
                "Logout"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default Sidebar;
