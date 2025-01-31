import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "./schema/acountSchema";
import { useCreateUserMutation } from "../../services/apis/userApi";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleCreateUser = async (data) => {
    try {
      await createUser(data).unwrap();
      toast.success("Create user success");
      navigate("/acount");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Tambah Admin</h1>
            <p>Masukkan data pada field yang tertera.</p>
          </Col>
        </Row>

        <Row>
          <Form onSubmit={handleSubmit(handleCreateUser)}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                {...register("email")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.email && errors.email.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama"
                {...register("name")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.name && errors.name.message}{" "}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                {...register("password")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.password && errors.password.message}{" "}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Konfirmasi Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan konfirmasi password"
                {...register("confirmPassword")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={!isValid || isLoading}
              className="mb-3 float-end w-20"
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <>
                  <MdAddBox className="fs-4" /> Tambahkan
                </>
              )}
            </Button>
          </Form>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default AddUser;
