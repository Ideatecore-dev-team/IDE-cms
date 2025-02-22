import { Pagination } from "react-bootstrap";

const PaginationData = ({ dataPagination, handlePaginationChange }) => {
  const currentPage = dataPagination?.pagination?.currentPage || 1;
  const totalPage = dataPagination?.pagination?.totalPage || 1;

  const getPageNumbers = () => {
    const pages = [];
    const visiblePages = 4;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(
      totalPage,
      currentPage + Math.floor(visiblePages / 2),
    );

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="fw-bold">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handlePaginationChange(currentPage - 1)}
      />

      {currentPage > 3 &&
        totalPage > 4 && ( // Condition for "1" page number
          <Pagination.Item onClick={() => handlePaginationChange(1)}>
            1
          </Pagination.Item>
        )}

      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => handlePaginationChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      {currentPage < totalPage - 2 && ( // Conditionally render the last page number
        <Pagination.Item onClick={() => handlePaginationChange(totalPage)}>
          {totalPage}
        </Pagination.Item>
      )}

      <Pagination.Next
        disabled={currentPage === totalPage}
        onClick={() => handlePaginationChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default PaginationData;
