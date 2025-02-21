import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import {
  useGetGalleriesQuery,
  useUpdateGalleryByIdMutation,
} from "../../services/apis/galleryApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { data: galleries, isLoading } = useGetGalleriesQuery();
  const [updateGalleryById, { isLoading: isLoadingUpdate }] =
    useUpdateGalleryByIdMutation();

  const imagePosition = {
    topLeft: "cm6u63vtl0001ta7c1gp91sd6",
    bottomLeft: "cm6u63xpo0002ta7cr26fo5o8",
    center: "cm6u63zfq0003ta7clgqi7ba2",
    topRight: "cm6u641780004ta7cpgvzkb8x",
    bottomRight: "cm6u63rfp0000ta7cog34mfxz",
  };

  const imageSizeRecomendation = {
    topLeft: "170 X 250",
    bottomLeft: "170 X 100",
    center: "170 X 358",
    topRight: "170 X 100",
    bottomRight: "170 X 250",
  };

  const getImage = (position) => {
    return galleries?.data?.find((item) => item.id === imagePosition[position]);
  };

  const handleShow = (position, id, image) => {
    setSelectedGalleryId(id);
    setSelectedPosition(position);
    setValue("image", image);
    setShowModal(true);
  };

  const handleClose = () => {
    if (!isLoadingUpdate) {
      setShowModal(false);
    }
  };

  const handleUpdateGallery = async (formData) => {
    try {
      await updateGalleryById({
        id: selectedGalleryId,
        data: { ...formData },
      }).unwrap();
      toast.success("Update category success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      if (!isLoadingUpdate) {
        setShowModal(false);
      }
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Gallery</h1>
            <p>
              Kelola konten di page
              <span className="fw-bold"> “Gallery”</span> disini.
            </p>
          </Col>
        </Row>

        {/* Gallery Layout */}
        <Row className="mb-3 justify-content-center gap-2">
          <Col md={"auto"} className="p-0">
            <div
              id="topLeft"
              className="isContentBgColor mb-2 d-flex align-items-center justify-content-center"
              style={{ width: "170px", height: "250px" }}
            >
              {isLoading && <Spinner variant="primary" />}
              {getImage("topLeft") && (
                <Image
                  src={getImage("topLeft")?.image}
                  fluid
                  onClick={() =>
                    handleShow(
                      "topLeft",
                      getImage("topLeft")?.id,
                      getImage("topLeft")?.image,
                    )
                  }
                />
              )}
            </div>
            <div
              id="bottomLeft"
              className="isContentBgColor d-flex align-items-center justify-content-center"
              style={{ width: "170px", height: "100px" }}
            >
              {isLoading && <Spinner variant="primary" />}
              {getImage("bottomLeft") && (
                <Image
                  src={getImage("bottomLeft")?.image}
                  fluid
                  onClick={() =>
                    handleShow(
                      "bottomLeft",
                      getImage("bottomLeft")?.id,
                      getImage("bottomLeft")?.image,
                    )
                  }
                />
              )}
            </div>
          </Col>
          <Col md={"auto"} className="p-0">
            <div
              id="center"
              className="isContentBgColor d-flex align-items-center justify-content-center"
              style={{ width: "170px", height: "358px" }}
            >
              {isLoading && <Spinner variant="primary" />}
              {getImage("center") && (
                <Image
                  src={getImage("center")?.image}
                  fluid
                  onClick={() =>
                    handleShow(
                      "center",
                      getImage("center")?.id,
                      getImage("center")?.image,
                    )
                  }
                />
              )}
            </div>
          </Col>
          <Col md={"auto"} className="p-0">
            <div
              id="topRight"
              className="isContentBgColor mb-2 d-flex align-items-center justify-content-center"
              style={{ width: "170px", height: "100px" }}
            >
              {isLoading && <Spinner variant="primary" />}
              {getImage("topRight") && (
                <Image
                  src={getImage("topRight")?.image}
                  fluid
                  onClick={() =>
                    handleShow(
                      "topRight",
                      getImage("topRight")?.id,
                      getImage("topRight")?.image,
                    )
                  }
                />
              )}
            </div>
            <div
              id="bottomRight"
              className="isContentBgColor d-flex align-items-center justify-content-center"
              style={{ width: "170px", height: "250px" }}
            >
              {isLoading && <Spinner variant="primary" />}
              {getImage("bottomRight") && (
                <Image
                  src={getImage("bottomRight")?.image}
                  fluid
                  onClick={() =>
                    handleShow(
                      "bottomRight",
                      getImage("bottomRight")?.id,
                      getImage("bottomRight")?.image,
                    )
                  }
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Update Gallery</Modal.Header>
        <Modal.Body>
          Are you sure you want to update gallery?
          <p>
            Our Recomendation size for this image is{" "}
            {selectedPosition && imageSizeRecomendation[selectedPosition]}
          </p>
          <Form onSubmit={handleSubmit(handleUpdateGallery)}>
            <Form.Group className="my-3">
              <Form.Control
                type="text"
                placeholder="Enter image url"
                {...register("image", {
                  required: "form is empty",
                })}
              />
              <Form.Text className="text-muted">
                <p className="text-danger isErrorMessage">
                  {errors.image && errors.image.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isLoadingUpdate || !isValid}
            >
              {isLoadingUpdate ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </ContentLayout>
  );
};

export default Gallery;
