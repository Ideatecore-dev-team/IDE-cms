import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import ContentLayout from "../../components/layout/ContentLayout";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { createPartnerSchema } from "./schema/partnerSchema";
import {
  useGetPartnerByIdQuery,
  useUpdatePartnerMutation,
} from "../../services/apis/partnerApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditPartner = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const {
    data: dataPartner,
    isLoading: isLoadingPartner,
    isError: isErrorPartner,
  } = useGetPartnerByIdQuery(id);

  const [updatePartner, { isLoading: isLoadingUpdate }] =
    useUpdatePartnerMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(createPartnerSchema),
  });

  useEffect(() => {
    if (dataPartner) {
      reset({
        name: dataPartner.data.name,
        image: dataPartner.data.image,
        link: dataPartner.data.link,
      });
      setImageUrl(dataPartner.data.image);
    }
  }, [dataPartner, reset]);

  const handleUpdatePartnerSubmit = async (data) => {
    try {
      const res = await updatePartner({ id, data }).unwrap();
      reset();
      toast.success("Update Partner Success");
      navigate(`/partner/editpartner/${res.data.id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
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

        <Row className="mb-3 isContentBgColor rounded-3">
          <Col className="align-self-center">
            <h3 className="mt-2">Partner</h3>
          </Col>
        </Row>

        <Row>
          <Form onSubmit={handleSubmit(handleUpdatePartnerSubmit)}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Gambar Partner</Form.Label>
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

            {/* <Form.Group controlId="link" className="mb-3">
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
            </Form.Group> */}

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
        </Row>

        {isLoadingPartner && (
          <Container className="d-flex justify-content-center align-items-center">
            <Row>
              <Spinner animation="border" variant="primary" />
            </Row>
          </Container>
        )}
        {isErrorPartner && <div>Error</div>}
      </Container>
    </ContentLayout>
  );
};
export default EditPartner;
