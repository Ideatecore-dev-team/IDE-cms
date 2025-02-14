import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ProgramSearch = ({ handleSearch }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Form className="d-flex mb-3 w-35" onSubmit={handleSubmit(handleSearch)}>
      <Form.Control
        type="text"
        placeholder="Search program..."
        className="me-2"
        {...register("search")}
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default ProgramSearch;
