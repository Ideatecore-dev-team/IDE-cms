import { Col, Container, Row, Spinner } from "react-bootstrap";
import ContentLayout from "../../components/layout/ContentLayout";
import { useGetAllContactUsQuery } from "../../services/apis/contactUsApi";

const ContactUs = () => {
  const { data: dataContactUs, isLoading, isError } = useGetAllContactUsQuery();
  console.log(dataContactUs);

  return (
    <ContentLayout>
      <Container>
        <Row className="border-bottom border-secondary mb-3">
          <Col className="px-0">
            <h1>Contact Us</h1>
            <p>
              Kelola pesan dari
              <span className="fw-bold"> “Contact Us”</span> disini.
            </p>
          </Col>
        </Row>

        <Row className="mb-3 isContentBgColor rounded-3 ">
          <Col className="align-self-center">
            <h2 className="mt-2">Akun Admin</h2>
          </Col>
        </Row>

        {isLoading && (
          <Container className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
        {isError && <div>Error</div>}

        <Row>
          <Col className="p-0">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center w-5">
                    No.
                  </th>
                  <th scope="col" className="text-center w-15">
                    First Name
                  </th>
                  <th scope="col" className="text-center w-15">
                    Last Name
                  </th>
                  <th scope="col" className="text-center w-15">
                    Email
                  </th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {dataContactUs?.data?.map((contact, index) => (
                  <tr key={contact.id}>
                    <th scope="row" className="text-center align-middle">
                      {index + 1}
                    </th>
                    <td className="align-middle text-center">
                      {contact.firstName}
                    </td>
                    <td className="align-middle text-center">
                      {contact.lastName}
                    </td>
                    <td className="align-middle text-center">
                      {contact.email}
                    </td>
                    <td className="align-middle small">{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </ContentLayout>
  );
};
export default ContactUs;
