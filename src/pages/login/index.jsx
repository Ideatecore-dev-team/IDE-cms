import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../services/apis/authApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "./schema/loginSchema ";
import { removeUserInfo, setUserInfo } from "../../services/reducers/authSlice";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";

import IDELogo from "../../assets/images/IDELogo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const loginSubmit = async (data) => {
    try {
      dispatch(removeUserInfo());
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res.data));
      toast.success("Login success");
      navigate("/");
      //   console.log(res.data);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      // console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 p-0">
      <Row>
        <Col id="quote" className="align-self-center text-center">
          <p className="lead fs-2 fw-bold fst-italic">
            “Leadership is the capacity to translate vision into reality.”
          </p>
        </Col>

        <Col
          id="login"
          md={5}
          className="border border-dark border-0 rounded-3 p-4 shadow bg-white"
        >
          <Col>
            <Image src={IDELogo} className="w-50 mb-3" />
            <h4 className="fw-bold">Content Management System</h4>
            <p>Kelola Website IDE-Indonesia disini</p>
          </Col>

          <Col>
            <Form id="loginForm" onSubmit={handleSubmit(loginSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukan Email Anda"
                  defaultValue={"superadmintest@example.com"}
                  {...register("email")}
                />
                <Form.Text className="text-muted">
                  <p className="text-danger isErrorMessage">
                    {errors.email && errors.email.message}
                  </p>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan Password Anda"
                  defaultValue={"superadmin"}
                  {...register("password")}
                ></Form.Control>
                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.password && errors.password.message}
                  </p>
                </Form.Text>
              </Form.Group>

              <Button type="submit" disabled={!isValid} className="w-100 mb-3">
                {isLoading ? (
                  <span>
                    <Spinner animation="border" size="sm" />
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
