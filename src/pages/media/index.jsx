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
  useGetMediaQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
} from "../../services/apis/mediaApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { uploadSchema } from "./schema/uploadSchema";
import MediaPagination from "./MediaPagination";
import { MdDelete } from "react-icons/md";

const Media = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [getMediaParams, setGetMediaParams] = useState({
    page: 1,
    size: 12,
  });

  const handlePaginationChange = (page) => {
    setGetMediaParams({
      ...getMediaParams,
      page,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(uploadSchema), mode: "onChange" });

  const {
    data: dataMedia,
    isLoading,
    isError,
  } = useGetMediaQuery(getMediaParams);

  const [uploadMedia, { isLoading: isLoadingUpload }] =
    useUploadMediaMutation();

  const [deleteMedia, { isLoading: isLoadingDelete }] =
    useDeleteMediaMutation();

  const handleImageClick = (item) => {
    setModalImage(item);
    setShowModal(true); // Show the modal when an image is clicked
  };
  const handleClose = () => setShowModal(false); // Close the modal

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleImageUpload = async (formData) => {
    try {
      if (!formData.image[0]) {
        alert("Please select an image to upload.");
        return;
      }

      const file = formData.image[0]; // Access the uploaded file
      const formDataToSend = new FormData();
      formDataToSend.append("image", file);

      await uploadMedia(formDataToSend).unwrap(); // Call the upload mutation
      toast.success("Image uploaded successfully!");
      reset(); // Reset form fields
      setImagePreview(null); // Clear the preview
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleImageDelete = async (url) => {
    try {
      await deleteMedia({ imageUrl: url }).unwrap();
      toast.success("Delete media success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
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
            <h1>Media Image</h1>
            <p>Silahkan upload Gambar disini</p>
          </Col>
        </Row>

        {isLoading && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isError && <div>Error</div>}

        <Row className="mb-3">
          <Col>
            <Form onSubmit={handleSubmit(handleImageUpload)}>
              <Form.Group controlId="uploadImage" className="mb-3">
                <Form.Label>Upload Gambar</Form.Label>
                <Form.Control
                  type="file"
                  {...register("image", {
                    required: "Please select an image file.",
                    validate: (value) =>
                      value[0]?.type.startsWith("image/") ||
                      "Only image files are allowed.",
                  })}
                  onChange={handleImageChange}
                />
                <Form.Text>
                  <p className="text-danger isErrorMessage">
                    {errors.image && errors.image.message}
                  </p>
                </Form.Text>

                {/* Image Preview Section */}
                {imagePreview && (
                  <div className="mt-3 d-flex justify-content-center">
                    <img
                      src={imagePreview}
                      alt={imagePreview}
                      className="img-fluid rounded border border-5 border-secondary"
                      style={{
                        maxHeight: "500px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </Form.Group>

              <Button
                type="submit"
                className="float-end w-20 mb-3"
                disabled={isLoadingUpload}
              >
                {isLoadingUpload ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Simpan"
                )}
              </Button>
            </Form>
          </Col>
        </Row>

        <Row className="g-3 mb-3">
          {dataMedia?.images &&
            dataMedia?.images.map((item, index) => (
              <Col md={4} xl={3} key={index} className="d-flex flex-wrap">
                <Image
                  src={item}
                  fluid
                  className="rounded border border-secondary"
                  onClick={() => handleImageClick(item)} // Handle image click
                />
              </Col>
            ))}
        </Row>

        <Row>
          <Col className="d-flex justify-content-end p-0">
            {dataMedia && (
              <MediaPagination
                dataMedia={dataMedia}
                handlePaginationChange={handlePaginationChange}
              />
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal to show full-size image */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        {/* <Modal.Header closeButton>
          <Modal.Title>Full-Size Image</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="d-flex justify-content-center p-1">
          <Image src={modalImage} className="w-100 rounded" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="w-10 p-2"
            disabled={isLoadingDelete}
            onClick={() => {
              handleImageDelete(modalImage);
            }}
          >
            {isLoadingDelete ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <MdDelete className="fs-4" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </ContentLayout>
  );
};
export default Media;
