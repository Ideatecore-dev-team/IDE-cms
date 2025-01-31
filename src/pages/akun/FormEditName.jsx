import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { updateNameSchema } from "./schema/acountSchema";
import { useUpdateUserByIdMutation } from "../../services/apis/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormEditName = ({ id, name }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(updateNameSchema),
    defaultValues: {
      name,
    },
  });

  const [updateUser, { isLoading }] = useUpdateUserByIdMutation();

  const handleUpdateUserById = async (data) => {
    try {
      await updateUser({ id, data }).unwrap();
      toast.success("Update user success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      if (!isLoading) {
        navigate("/acount");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleUpdateUserById)}>
      <Form.Group controlId="name" className="mb-3">
        <Form.Label>Nama</Form.Label>
        <Form.Control
          type="text"
          placeholder="Masukkan Nama"
          {...register("name")}
        ></Form.Control>
        <Form.Text>
          <p className="text-danger isErrorMessage">
            {errors.name && errors.name.message}
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
export default FormEditName;
