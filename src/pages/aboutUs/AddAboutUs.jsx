import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { useState } from "react";
import ContentLayout from "../../components/layout/ContentLayout";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { createTeamSchema } from "./schema/teamSchema";
import { useGetAllTeamCategoryQuery } from "../../services/apis/teamCategory";
import { useCreateTeamMutation } from "../../services/apis/teamApi";
import { toast } from "react-toastify";

const AddAboutUs = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategoryTeamId, setSelectedCategoryTeamId] = useState(null);
  const navigate = useNavigate();

  const { data: dataTeamCategory, isLoading: isLoadingTeamCategory } =
    useGetAllTeamCategoryQuery();

  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(createTeamSchema),
  });

  const handleCreateTeamSubmit = async (data) => {
    try {
      const res = await createTeam(data).unwrap();
      reset();
      toast.success("Create team success");
      navigate(`/aboutus/editaboutus/${res.data.id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleCategoryTeamChange = (categoryTeamId) => {
    setSelectedCategoryTeamId(categoryTeamId);
    setValue("categoryTeamId", categoryTeamId);
    trigger("categoryTeamId");
  };

  return (
    <ContentLayout>
      <Container>
        <Row>
          <Col>
            <h1>Tambah Our Team</h1>
            <p className="lead">Masukan data pada field yang tertera</p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 py-2">
          <Col className="align-self-center text-end">
            <Link
              to={"/aboutus/addcategoryteam"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button variant="primary" className="btn-sm">
                <MdAddBox className="fs-4" /> Tambah Divisi
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Form onSubmit={handleSubmit(handleCreateTeamSubmit)}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Foto Team</Form.Label>
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
                    className="img-fluid rounded  border-5 border-scondary"
                    style={{
                      maxHeight: "500px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan nama"
                {...register("name")}
              />
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.name && errors.name.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="categoryTeamId" className="mb-3">
              <Form.Label>Divisi</Form.Label>
              <ButtonGroup className="mb-3 d-flex flex-wrap gap-2">
                {isLoadingTeamCategory && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}

                {dataTeamCategory &&
                  dataTeamCategory.data.map((categoryTeam) => (
                    <ToggleButton
                      key={categoryTeam.id}
                      className="btn-sm px-3 rounded-1 flex-grow-0"
                      type="radio"
                      variant="outline-dark"
                      name="categoryTeamId"
                      checked={selectedCategoryTeamId === categoryTeam.id}
                      onClick={() => {
                        handleCategoryTeamChange(categoryTeam.id);
                      }}
                    >
                      {categoryTeam.name}
                    </ToggleButton>
                  ))}
              </ButtonGroup>

              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.categoryTeamId && errors.categoryTeamId.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="position" className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan position"
                {...register("position")}
              />
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.position && errors.position.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="link" className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan link"
                {...register("link")}
              />
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.link && errors.link.message}
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
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default AddAboutUs;
