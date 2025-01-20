import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../services/apis/authApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "./schema/loginSchema ";
import { setUserInfo } from "../../services/reducers/authSlice";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";

import logoholder from "../../assets/images/logoholder.png";

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
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res.data));
      toast.success("Login success");
      navigate("/");
      //   console.log(res.data);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="py-8 px-5">
        <Col className="align-self-center text-center">
          <p className="lead fs-2 fw-bold">
            “Leadership is the capacity to translate vision into reality.”
          </p>
        </Col>
        <Col xl={5} className="border border-3 rounded-4 p-4">
          <Image src={logoholder} className="w-50 mb-3" />
          <h4 className="fw-bold">Content Management System</h4>
          <p>Kelola Website IDE-Indonesia disini</p>

          <Form onSubmit={handleSubmit(loginSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukan Email Anda"
                defaultValue={"superadmintest@example.com"}
                {...register("email")}
              />
              <Form.Text className="text-muted">
                {errors.email ? (
                  <p className="text-danger">{errors.email.message}</p>
                ) : (
                  <p>Email is required</p>
                )}
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
                {errors.password ? (
                  <p className="text-danger">{errors.password.message}</p>
                ) : (
                  <p>Password is required</p>
                )}
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
      </Row>
    </Container>
  );
};

export default Login;
