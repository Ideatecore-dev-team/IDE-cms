import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ArticleSearch = ({ handleSearch }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Form className="d-flex mb-3 w-35" onSubmit={handleSubmit(handleSearch)}>
      <Form.Control
        type="text"
        placeholder="Search articles..."
        className="me-2"
        {...register("search")}
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default ArticleSearch;
