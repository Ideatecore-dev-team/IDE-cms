import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  ToggleButton,
} from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";

import {
  useGetAllTeamCategoryQuery,
  useCreateTeamCategoryMutation,
  useUpdateTeamCategoryMutation,
  useDeleteTeamCategoryMutation,
} from "../../services/apis/teamCategory";
import { createCategoryTeamSchema } from "./schema/categoryTeamSchema";

const AddCategoryTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryTeamId, setSelectedCategoryTeamId] = useState(null);

  const { data: dataTeamCategory, isLoading } = useGetAllTeamCategoryQuery();
  const [createTeamCategory, { isLoading: isLoadingCreate }] =
    useCreateTeamCategoryMutation();
  const [updateTeamCategory, { isLoading: isLoadingUpdate }] =
    useUpdateTeamCategoryMutation();
  const [deleteTeamCategory, { isLoading: isLoadingDelete }] =
    useDeleteTeamCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(createCategoryTeamSchema),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    setValue,
    formState: { errors: errorsUpdate, isValid: isValidUpdate },
  } = useForm({
    resolver: joiResolver(createCategoryTeamSchema),
    mode: "onChange",
  });

  const handleShow = (id, name) => {
    setSelectedCategoryTeamId(id);
    setValue("name", name);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };

  const handleCreateTeamCategory = async (data) => {
    try {
      await createTeamCategory(data).unwrap();
      toast.success("Create team kategori success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      reset();
    }
  };

  const handleUpdateCategory = async (formData) => {
    try {
      await updateTeamCategory({
        id: selectedCategoryTeamId,
        data: { ...formData },
      }).unwrap();
      toast.success("Update category success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      resetUpdate();
      if (!isLoadingUpdate) {
        setShowModal(false);
      }
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteTeamCategory(selectedCategoryTeamId).unwrap();
      toast.success("Delete category success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      resetUpdate();
      if (!isLoadingDelete) {
        setShowModal(false);
      }
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Tambah Kategori Team</h1>
            <p className="lead">Masukan data pada field yang tertera</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={handleSubmit(handleCreateTeamCategory)}>
              <Form.Group className="mb-3">
                <Form.Label>Team Kategori</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new category"
                  {...register("name")}
                ></Form.Control>
                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.name && errors.name.message}
                  </p>
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoadingCreate || !isValid}
              >
                {isLoadingCreate ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Tambahkan Kategori"
                )}
              </Button>
            </Form>
          </Col>
        </Row>

        <Row className="mb-3 pt-3">
          <Col md={"auto"} className="d-flex gap-2 flex-wrap">
            <ButtonGroup className="mb-3 d-flex flex-wrap gap-2">
              {isLoading && (
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
                    onClick={() =>
                      handleShow(categoryTeam.id, categoryTeam.name)
                    }
                  >
                    {categoryTeam.name}
                  </ToggleButton>
                ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>

      {/* Modal for Deleting User */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          Confirm update or delete category
        </Modal.Header>
        <Modal.Body>
          Are you sure want to update or delete this category
          <Form onSubmit={handleSubmitUpdate(handleUpdateCategory)}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                {...registerUpdate("name")}
              />
              <Form.Text className="text-muted">
                <p className="text-danger isErrorMessage">
                  {errorsUpdate.category && errorsUpdate.category.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoadingUpdate || !isValidUpdate}
              className="w-100"
            >
              {isLoadingUpdate || isLoadingDelete ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleDeleteCategory}
            disabled={isLoadingDelete}
            className="w-15"
          >
            {isLoadingDelete || isLoadingUpdate ? (
              <Spinner animation="border" variant="outline" size="sm" />
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </ContentLayout>
  );
};
export default AddCategoryTeam;
