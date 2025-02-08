import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { companyInfoSchema } from "./schema/companyInfoSchema";
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
} from "../../services/apis/companyInfoApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Umum = () => {
  const { data: dataCompanyInfo } = useGetCompanyInfoQuery();

  const [updateCompanyInfo, { isLoading: isLoadingUpdate }] =
    useUpdateCompanyInfoMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(companyInfoSchema),
  });

  useEffect(() => {
    if (dataCompanyInfo?.data) {
      reset(dataCompanyInfo?.data);
    }
  }, [dataCompanyInfo, reset]);

  const handleUpdateCompanyInfo = async (formDataUpdate) => {
    try {
      await updateCompanyInfo({ data: formDataUpdate }).unwrap();
      toast.success("Update Company Info success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Umum</h1>
            <p>
              Kelola informasi umum
              <span className="fw-bold"> “IDE Indonesia”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 py-2">
          <Col className="align-self-center">
            <h3 className="mt-2">Company Info</h3>
          </Col>
        </Row>

        <Row>
          <Form onSubmit={handleSubmit(handleUpdateCompanyInfo)}>
            {/* name */}
            <Form.Group className="mb-2">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Nama"
                {...register("name")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.name && errors.name.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* description */}
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Deskripsi"
                {...register("description")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.description && errors.description.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* title */}
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Judul"
                {...register("title")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.title && errors.title.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* image */}
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Url Image"
                {...register("image")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.image && errors.image.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Phone"
                {...register("Phone")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Phone && errors.Phone.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Address */}
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Address"
                {...register("Address")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Address && errors.Address.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukan Email"
                {...register("Email")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Email && errors.Email.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Facebook */}
            <Form.Group className="mb-2">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Facebook"
                {...register("Facebook")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Facebook && errors.Facebook.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Instagram */}
            <Form.Group className="mb-2">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Instagram"
                {...register("Instagram")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Instagram && errors.Instagram.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Twitter */}
            <Form.Group className="mb-2">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Twitter"
                {...register("Twitter")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Twitter && errors.Twitter.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Linkedin */}
            <Form.Group className="mb-2">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Linkedin"
                {...register("Linkedin")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Linkedin && errors.Linkedin.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Youtube */}
            <Form.Group className="mb-2">
              <Form.Label>Youtube</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Youtube"
                {...register("Youtube")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Youtube && errors.Youtube.message}
                </p>
              </Form.Text>
            </Form.Group>

            {/* Tiktok */}
            <Form.Group className="mb-2">
              <Form.Label>Tiktok</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Tiktok"
                {...register("Tiktok")}
              ></Form.Control>
              <Form.Text>
                <p className="text-danger isErrorMessage">
                  {errors.Tiktok && errors.Tiktok.message}
                </p>
              </Form.Text>
            </Form.Group>

            <Button
              type="submit"
              className="float-end w-20"
              // disabled={isLoadingUpdate}
            >
              {isLoadingUpdate ? (
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
export default Umum;
