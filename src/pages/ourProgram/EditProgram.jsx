import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
  ToggleButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import ContentLayout from "../../components/layout/ContentLayout";

import { createProgramSchema } from "./schema/programSchema";
import { toast } from "react-toastify";
import TextEditor from "./TextEditor";
import { useGetAllProgramCategoryQuery } from "../../services/apis/programCategoryApi";
import {
  useGetProgramByIdQuery,
  useUpdateProgramMutation,
} from "../../services/apis/programApi";

const EditProgram = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [selectCategoryId, setSelectCategory] = useState("");
  const [selectContent, setSelectContent] = useState("");

  const {
    data: dataProgramCategory,
    isLoading: isLoadingProgramCategory,
    isError,
  } = useGetAllProgramCategoryQuery();

  const { data: dataProgram, isLoading: isLoadingProgram } =
    useGetProgramByIdQuery(id);
  const [updateProgram, { isLoading: isLoadingUpdate }] =
    useUpdateProgramMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(createProgramSchema),
    defaultValues: {
      programCategoryId: "",
      content: "",
    },
  });

  useEffect(() => {
    if (dataProgram) {
      reset({
        image: dataProgram.data.image,
        title: dataProgram.data.title,
        programCategoryId: dataProgram.data.programCategoryId,
        description: dataProgram.data.description,
        content: dataProgram.data.content,
      });
      setImagePreview(dataProgram.data.image);
      setSelectCategory(dataProgram.data.programCategoryId);
      setSelectContent(dataProgram.data.content);
    }
  }, [dataProgram, reset]);

  const handleEditProgram = async (data) => {
    try {
      const res = await updateProgram({ id, data }).unwrap();
      // await updateArticle({ id, data }).unwrap();
      // const res = await updateArticle({ id, data }).unwrap();
      toast.success("Create Program success");
      navigate(`/ourprogram/editprogram/${res.data.id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Add Program</h1>
            <p className="lead">Masukan data pada field yang tertera</p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 py-2">
          <Col className="align-self-center text-end">
            <Link
              to={"/ourprogram/addprogramcategory"}
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

        {dataProgram && (
          <Row className="mb-3">
            <Col>
              <Form onSubmit={handleSubmit(handleEditProgram)}>
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Thumbnail Artikel</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan url gambar"
                    {...register("image")}
                    onChange={(e) => {
                      setImagePreview(e.target.value);
                    }}
                  ></Form.Control>
                  {imagePreview && (
                    <div className="mt-3 d-flex justify-content-center">
                      <Image
                        src={imagePreview}
                        fluid
                        className="rounded border-5 border-scondary"
                        style={{
                          maxHeight: "500px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                  <Form.Text>
                    <p className="text-danger isErrorMessage">
                      {errors.image && errors.image.message}
                    </p>
                  </Form.Text>
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
                    {isLoadingProgramCategory && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    {dataProgramCategory &&
                      dataProgramCategory?.data.map((programCategory) => (
                        <ToggleButton
                          key={programCategory.id}
                          className="btn-sm px-3 rounded-1 flex-grow-0"
                          variant="outline-dark"
                          type="radio"
                          checked={programCategory.id === selectCategoryId}
                          onClick={() => {
                            setSelectCategory(programCategory.id);
                            setValue("programCategoryId", programCategory.id);
                          }}
                        >
                          {programCategory.name}
                        </ToggleButton>
                      ))}
                  </ButtonGroup>
                  <Form.Text>
                    <p className="text-danger isErrorMessage">
                      {errors.programCategoryId &&
                        errors.programCategoryId.message}
                    </p>
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
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
                </Form.Group>

                <Form.Group controlId="content" className="mb-3">
                  <Form.Label>Artikel</Form.Label>
                  <div>
                    <TextEditor
                      value={selectContent}
                      onChange={(content) => {
                        setSelectContent(content); // Update the state
                        setValue("content", content); // Update react-hook-form
                      }}
                    />
                  </div>
                  <Form.Text>
                    <p className="text-danger isErrorMessage">
                      {errors.content && errors.content.message}
                    </p>
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  className="float-end w-20"
                  disabled={isLoadingUpdate}
                >
                  {isLoadingUpdate ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </Form>
            </Col>
          </Row>
        )}

        {isLoadingProgram && (
          <Container className="d-flex justify-content-center align-items-center">
            <Row>
              <Spinner animation="border" variant="primary" />
            </Row>
          </Container>
        )}

        {isError && <div>Error</div>}
      </Container>
    </ContentLayout>
  );
};
export default EditProgram;
