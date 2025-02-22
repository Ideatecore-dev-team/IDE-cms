import { toast } from "react-toastify";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { useCreateArticleMutation } from "../../services/apis/articleApi";
import ContentLayout from "../../components/layout/ContentLayout";
import { createArticleSchema } from "./schema/articleSchema";
import { useGetAllCategoryQuery } from "../../services/apis/categoryApi";
import TextEditor from "./TextEditor";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoryQuery();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      description: "undefined", // Set default value for description
    },
    resolver: joiResolver(createArticleSchema),
  });

  const handleCreateArticle = async (data) => {
    try {
      const res = await createArticle(data).unwrap();
      reset();
      toast.success("Create article success");
      navigate(`/article/editarticle/${res.data.id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setValue("categoryId", categoryId); // Sync with React Hook Form
    trigger("categoryId"); // Trigger validation manually after the category is changed
  };

  const handleEditorChange = (content) => {
    setFormValue("content", content); // Sync Quill content with React Hook Form
    trigger("content");
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Tambah Artikel</h1>
            <p className="lead">Masukan data pada field yang tertera</p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 py-2">
          <Col className="align-self-center text-end">
            <Link
              to={"/article/addcategory"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" /> Tambah Kategori
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={handleSubmit(handleCreateArticle)}>
              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Thumbnail Artikel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan url gambar"
                  {...register("image")}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.image && errors.image.message}
                  </p>
                </Form.Text>

                {imageUrl && (
                  <div className="mt-3 d-flex justify-content-center">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="img-fluid rounded border border-5 border-scondary"
                      style={{
                        maxHeight: "500px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan judul artikel"
                  {...register("title")}
                />
                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.title && errors.title.message}
                  </p>
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="categoryId" className="mb-3">
                <Form.Label>Kategori</Form.Label>
                <ButtonGroup className="mb-3 d-flex flex-wrap gap-2">
                  {isLoadingCategories && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {categories &&
                    categories.data.map((category) => (
                      <ToggleButton
                        type="radio"
                        variant="outline-dark"
                        name="categoryId" // Matches the registered field name
                        checked={selectedCategoryId === category.id} // Sync local state for visual feedback
                        key={category.id}
                        className="btn-sm px-3 rounded-1 flex-grow-0"
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.category}
                      </ToggleButton>
                    ))}
                </ButtonGroup>

                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.categoryId && errors.categoryId.message}
                  </p>
                </Form.Text>
              </Form.Group>

{/* DESCRIPTION */}
              {/* <Form.Group controlId="description" className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Masukan deskripsi"
                  {...register("description")}
                />
                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.description && errors.description.message}
                  </p>
                </Form.Text>
              </Form.Group> */}

              <Form.Group controlId="content" className="mb-3">
                <Form.Label>Artikel</Form.Label>
                <TextEditor handleEditorChange={handleEditorChange} />

                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.content && errors.content.message}
                  </p>
                </Form.Text>
              </Form.Group>

              <Button
                type="submit"
                className="float-end w-20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Simpan"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default AddArticle;
