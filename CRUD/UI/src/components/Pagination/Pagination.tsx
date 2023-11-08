import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 7;
  const pageNumbers: number[] = [];

  let startPage = currentPage - Math.floor(maxPagesToShow / 2);
  let endPage = currentPage + Math.floor(maxPagesToShow / 2);

  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }

  if (startPage < 1) {
    startPage = 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" flex mt-10 justify-center items-center">
      <ul className="flex">
        {currentPage > 1 && (
          <li>
            <button onClick={() => onPageChange(currentPage - 1)}>&lt;</button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={number === currentPage ? "border-white" : ""}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
