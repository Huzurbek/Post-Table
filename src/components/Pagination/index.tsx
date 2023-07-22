import React, { useMemo, useState } from "react";
import "./style.sass";

interface IPaginationProps {
  perPage: number;
  total: number;
  page: number;
  onChangePage: (page: number) => void;
  style?: React.CSSProperties;
}

const Pagination: React.FC<IPaginationProps> = ({
  onChangePage,
  page,
  perPage,
  total,
  style,
}) => {
  const [currentPage, setCurrentPage] = useState(page);

  const totalPages = Math.ceil(total / perPage);
  const pagesList = useMemo(() => {
    const count = 3;
    const leftSection =
      page < count
        ? Array.from({ length: count }).map((_, i) => i + 1)
        : [1, "..."];
    const centerSection =
      page > count - 1 && page <= totalPages - count + 1
        ? [page - 1, page, page + 1]
        : [];
    const rightSection =
      page > totalPages - count + 1
        ? Array.from({ length: count }).map(
            (_, i) => totalPages - count + i + 1
          )
        : ["...", totalPages];
    return [...leftSection, ...centerSection, ...rightSection];
  }, [page, totalPages]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        ...style,
      }}
    >
      <button
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          if (currentPage > 1) {
            onChangePage(currentPage - 1);
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        Назад
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        {pagesList?.map((num, index) => {
          if (typeof num === "string") return num;
          return (
            <button
              key={index}
              className={`${
                page.toString() === String(num) ? "active-pagination-item" : ""
              } pagination-item`}
              onClick={() => {
                onChangePage(num);
                setCurrentPage(num);
              }}
            >
              {num}
            </button>
          );
        })}
      </div>
      <button
        className={`pagination-item ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => {
          if (currentPage < totalPages) {
            onChangePage(currentPage + 1);
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
