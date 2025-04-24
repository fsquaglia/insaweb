import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showArrows = true,
  disableNext = false,
  disablePrev = false,
}) {
  const pageNumbers = [];

  // Determina qué números de página mostrar (ej. de la 1 a la totalPages)
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row items-center">
      {/* Botón de página anterior */}
      {showArrows && (
        <div
          className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-gray-500 transition duration-250 ease-in-out hover:scale-105 cursor-pointer ${
            disablePrev ? "cursor-not-allowed opacity-50" : ""
          }`}
          aria-label="Previous"
          onClick={() => !disablePrev && onPageChange(currentPage - 1)}
        >
          <IoIosArrowBack className="text-gray-500" />
        </div>
      )}

      {/* Números de página */}
      {pageNumbers.map((pageNumber) => (
        <div
          key={pageNumber}
          className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
            pageNumber === currentPage
              ? "bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white shadow-md shadow-yellow-500/20"
              : "border border-blue-gray-100 bg-transparent text-gray-500"
          } p-0 text-sm transition duration-250 ease-in-out hover:scale-105 cursor-pointer`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}

      {/* Botón de página siguiente */}
      {showArrows && (
        <div
          className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-gray-500 transition duration-250 ease-in-out hover:scale-105 cursor-pointer ${
            disableNext ? "cursor-not-allowed opacity-50" : ""
          }`}
          aria-label="Next"
          onClick={() => !disableNext && onPageChange(currentPage + 1)}
        >
          <IoIosArrowForward className="text-gray-500" />
        </div>
      )}
    </div>
  );
}

export default Pagination;
