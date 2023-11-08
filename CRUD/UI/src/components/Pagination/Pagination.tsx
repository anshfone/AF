import React from "react";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: any
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: number[] = [];

  for (let i:number = 1; i <= Math.min(totalPages,7); i++) {
    pageNumbers.push(i);
  }
  console.log(currentPage)

  return (
    <div className="mt-10">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number} className={`flex ${number === currentPage ? "border-white" : ""}`}>
            <button onClick={() => onPageChange(number)} className="ml-10">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default Pagination;
