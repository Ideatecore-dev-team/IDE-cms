import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Modal,
  Spinner,
} from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";

import {
  useGetAllProgramCategoryQuery,
  useCreateProgramCategoryMutation,
  useDeleteProgramCategoryMutation,
  useUpdateProgramCategoryMutation,
} from "../../services/apis/programCategoryApi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { createProgramCategorySchema } from "./schema/programCategorySchema";
import { toast } from "react-toastify";
import { useState } from "react";

const AddProgramCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { data: dataProgramCategory, isLoading } =
    useGetAllProgramCategoryQuery();
  const [createProgramCategory, { isLoading: isLoadingCreate }] =
    useCreateProgramCategoryMutation();
  const [deleteProgramCategory, { isLoading: isLoadingDelete }] =
    useDeleteProgramCategoryMutation();
  const [updateProgramCategory, { isLoading: isLoadingUpdate }] =
    useUpdateProgramCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(createProgramCategorySchema),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    setValue,
    formState: { errors: errorsUpdate, isValid: isValidUpdate },
  } = useForm({
    resolver: joiResolver(createProgramCategorySchema),
    mode: "onChange",
  });

  const handleShow = (id, name) => {
    setSelectedCategoryId(id);
    setValue("name", name);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingDelete) {
      setShowModal(false);
    }
  };

  const handleCreateCategory = async (data) => {
    try {
      await createProgramCategory(data).unwrap();
      toast.success("Create category success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      reset();
    }
  };

  const handleUpdateCategory = async (formData) => {
    try {
      await updateProgramCategory({
        id: selectedCategoryId,
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
      await deleteProgramCategory(selectedCategoryId).unwrap();
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
            <h1>Tambah Kategori</h1>
            <p className="lead">Masukan data pada field yang tertera</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form onSubmit={handleSubmit(handleCreateCategory)}>
              <Form.Group className="mb-3">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new category"
                  {...register("name")}
                />
                <Form.Text className="text-muted">
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
            {isLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            {dataProgramCategory &&
              dataProgramCategory?.data?.map((category) => {
                return (
                  <Button
                    variant="outline-dark"
                    key={category.id}
                    className="fw-bold"
                    onClick={() => handleShow(category.id, category.name)}
                  >
                    {category.name}
                  </Button>
                );
              })}
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

export default AddProgramCategory;
