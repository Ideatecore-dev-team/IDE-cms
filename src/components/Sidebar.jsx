import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "../services/apis/authApi";
import { removeUserInfo } from "../services/reducers/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logoholder from "../assets/images/logoholder.png";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetUserQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(removeUserInfo());
      toast.success("Logout success");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleActiveNav = ({ isActive }) => {
    return `d-flex align-items-center text-decoration-none py-2 px-3 my-1 text-dark fw-semibold ${
      isActive ? "isActiveNav" : ""
    }`;
  };

  return (
    <Col id="sidebar" md={2} className="vh-100 d-flex flex-column">
      <Row className="flex-column flex-grow-1 justify-content-between">
        <Col id="sidebarNav" md={"auto"} className="d-flex flex-column p-0">
          <Image
            src={logoholder}
            alt="logoholder"
            className="w-75 py-2 px-3 my-3"
          />
          <NavLink to="/" className={handleActiveNav} aria-label="Home">
            <MdHome className="me-2 fs-4" />
            Home
          </NavLink>
          <NavLink to="/acount" className={handleActiveNav} aria-label="Akun">
            <MdPeople className="me-2 fs-4" />
            Akun
          </NavLink>
          <NavLink to="/umum" className={handleActiveNav} aria-label="Umum">
            <MdDashboard className="me-2 fs-4" />
            Umum
          </NavLink>
          <NavLink
            to="/aboutus"
            className={handleActiveNav}
            aria-label="About Us"
          >
            <MdInfo className="me-2 fs-4" />
            About Us
          </NavLink>
          <NavLink
            to="/ourprogram"
            className={handleActiveNav}
            aria-label="Our Program"
          >
            <MdEmojiPeople className="me-2 fs-4" />
            Our Program
          </NavLink>
          <NavLink
            to="/article"
            className={handleActiveNav}
            aria-label="Artikel"
          >
            <MdArticle className="me-2 fs-4" />
            Artikel
          </NavLink>
          <NavLink to="/galery" className={handleActiveNav} aria-label="Galery">
            <MdImage className="me-2 fs-4" />
            Galery
          </NavLink>
          <NavLink to="/media" className={handleActiveNav} aria-label="Media">
            <MdOutlinePhotoSizeSelectActual className="me-2 fs-4" />
            Media
          </NavLink>
        </Col>

        <Col
          id="userAuth"
          md={"auto"}
          className="d-flex justify-content-between p-0 align-items-center mb-3"
        >
          {/* User Info Section */}
          <Col id="userInfo" className="d-flex align-items-center">
            <Link to="/auth" className="text-decoration-none">
              {isLoading ? (
                <Row>
                  <Col>
                    <Spinner animation="border" variant="primary" />
                  </Col>
                </Row>
              ) : (
                <Row className="p-3">
                  <Col md={"auto"} className="d-flex align-items-center">
                    <MdAccountCircle className="text-dark fs-3" />
                  </Col>
                  <Col md={"auto"} className="p-0">
                    <h5 className="text-dark mb-0">{user?.data?.name}</h5>
                    <small className="text-muted">{user?.data?.role}</small>
                  </Col>
                </Row>
              )}
            </Link>
          </Col>

          {/* Logout Button Section */}
          <Col md={"auto"} className="d-flex align-items-center">
            <Button
              onClick={handleLogout}
              className="bg-white border-0 text-dark d-flex align-items-center"
            >
              <MdLogout className="me-1 fs-3" />
            </Button>
          </Col>
        </Col>
      </Row>
    </Col>
  );
};

export default Sidebar;
