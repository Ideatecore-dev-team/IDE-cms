import { format } from "date-fns";
import { Button, Col, Row } from "react-bootstrap";
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOpenInNew,
} from "react-icons/md";
import { Link } from "react-router-dom";

const ArticleTable = ({ articles, handleShow }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col" className="text-center">
            No.
          </th>
          <th scope="col">Tanggal</th>
          <th scope="col">Judul</th>
          <th scope="col">Kategori</th>
          <th scope="col" className="text-center">
            Manage
          </th>
        </tr>
      </thead>
      <tbody>
        {articles &&
          articles?.data?.map((article, index) => (
            <tr key={article.id}>
              <th scope="row" className="text-center align-middle">
                {(articles?.pagination?.currentPage - 1) *
                  articles?.pagination?.perPage +
                  index +
                  1}
              </th>
              <td className="align-middle">
                {format(new Date(article.createdAt), "dd MMM yyyy")}
              </td>
              <td className="align-middle">{article.title.slice(0, 65)}</td>
              <td className="align-middle">
                {article.Category.category.slice(0, 15)}
              </td>
              <td className="d-flex justify-content-evenly">
                <Row className="gap-2">
                  <Col className="p-0">
                    <Link
                      to={`/article/view/${article.id}`}
                      // target="_blank"
                      className="text-decoration-none"
                    >
                      <Button variant="success" className="btn-sm px-1">
                        <MdOpenInNew className="fs-4" />
                      </Button>
                    </Link>
                  </Col>
                  <Col className="p-0">
                    <Link
                      to={`/article/editarticle/${article.id}`}
                      className="text-decoration-none"
                    >
                      <Button variant="primary" className="btn-sm px-1">
                        <MdOutlineEdit className="fs-4" />
                      </Button>
                    </Link>
                  </Col>
                  <Col className="p-0">
                    <Button
                      variant="secondary"
                      className="btn-sm px-1"
                      onClick={() => handleShow(article.id)}
                    >
                      <MdOutlineDeleteForever className="fs-4" />
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ArticleTable;
