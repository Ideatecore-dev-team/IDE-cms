import { Pagination } from "react-bootstrap";

const ProgramPagination = ({ dataProgram, handlePaginationChange }) => {
  const currentPage = dataProgram?.pagination?.currentPage || 1;
  const totalPage = dataProgram?.pagination?.totalPage || 1;

  return (
    <Pagination className="fw-bold">
      {/* "Prev" Button */}
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handlePaginationChange(currentPage - 1)}
      />

      {/* Dynamic previous page */}
      {currentPage > 1 && (
        <Pagination.Item
          onClick={() => handlePaginationChange(currentPage - 1)}
        >
          {currentPage - 1}
        </Pagination.Item>
      )}

      {/* Current page (active) */}
      <Pagination.Item active>{currentPage}</Pagination.Item>

      {/* Dynamic next page */}
      {currentPage < totalPage && (
        <Pagination.Item
          onClick={() => handlePaginationChange(currentPage + 1)}
        >
          {currentPage + 1}
        </Pagination.Item>
      )}

      {/* "Next" Button */}
      <Pagination.Next
        disabled={currentPage === totalPage}
        onClick={() => handlePaginationChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default ProgramPagination;
