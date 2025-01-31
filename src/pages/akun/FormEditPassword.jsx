import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { updatePasswordSchema } from "./schema/acountSchema";
import { useUpdateUserPasswordByIdMutation } from "../../services/apis/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormEditPassword = ({ id }) => {
  const navigate = useNavigate();

  const [updateUserPassword, { isLoading }] =
    useUpdateUserPasswordByIdMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(updatePasswordSchema),
  });

  const handleUpdateUserPasswordById = async (data) => {
    try {
      await updateUserPassword({ id, data }).unwrap();
      toast.success("Update password success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      if (!isLoading) {
        navigate("/acount");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleUpdateUserPasswordById)}>
      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="masukan Password"
          {...register("password")}
        ></Form.Control>
        <Form.Text>
          <p className="text-danger isErrorMessage">
            {errors.password && errors.password.message}
          </p>
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Label>Konfirmasi Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="masukan konfirmasi password"
          {...register("confirmPassword")}
        ></Form.Control>
        <Form.Text>
          <p className="text-danger isErrorMessage">
            {errors.confirmPassword && errors.confirmPassword.message}
          </p>
        </Form.Text>
      </Form.Group>

      <Button
        type="submit"
        className="float-end w-20"
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <span className="spinner-border spinner-border-sm"></span>
        ) : (
          "Simpan"
        )}
      </Button>
    </Form>
  );
};
export default FormEditPassword;
