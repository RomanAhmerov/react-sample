import React, { useMemo } from "react";

const Pagination = ({ totalPages, page, changePage }) => {
  // Computed properties
  const pagesArray = useMemo(() => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          className={page === p ? "page page__current" : "page"}
          key={p}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
