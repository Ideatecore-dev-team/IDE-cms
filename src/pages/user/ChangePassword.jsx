import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { changePasswordSchema } from "./schema/changePasswordSchema";
import { useChangePasswordMutation } from "../../services/apis/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../services/reducers/authSlice";
import ContentLayout from "../../components/layout/ContentLayout";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(changePasswordSchema),
    mode: "onChange",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const changePasswordSubmit = async (data) => {
    try {
      //   console.log(data);
      const { oldPassword, newPassword } = data; // Extract only the required fields
      await changePassword({ oldPassword, newPassword }).unwrap();
      dispatch(removeUserInfo());
      toast.success("Change password success");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      //   console.log(error);
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row>
          <Col>
            <h1>Change Password</h1>
          </Col>
          <Form onSubmit={handleSubmit(changePasswordSubmit)}>
            <Form.Group>
              <Form.Label>password lama</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukan Password Anda"
                {...register("oldPassword")}
              />
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.oldPassword && errors.oldPassword.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>password baru</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukan Password Baru Anda"
                {...register("newPassword")}
              />
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.newPassword && errors.newPassword.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>konfirmasi password baru</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukan Konfirmasi Password Anda"
                {...register("confirmPassword")}
              />
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </p>
              </Form.Text>
            </Form.Group>

            <div className="text-end mt-3">
              <Button className="px-3" type="submit" disabled={!isValid}>
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default ChangePassword;
