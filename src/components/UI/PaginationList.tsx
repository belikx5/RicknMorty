import "../../styles/ui/paginationList.scss";
import React from "react";
import { createPages } from "../../services/paginationHelper";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";

type PaginationProps = {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: Function;
};

function PaginationList({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pagesCount = Math.ceil(totalCount / itemsPerPage);
  const pages = createPages(pagesCount, currentPage);
  const renderListItems = () => {
    return pages.map((page) => {
      return (
        <div
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-item ${currentPage === page ? "active" : ""}`}>
          <p>{page}</p>
        </div>
      );
    });
  };

  return (
    <div className="pagination-list">
      {pages ? (
        pagesCount > 10 ? (
          <>
            <div onClick={() => onPageChange(1)}>
              <KeyboardTabIcon className="pagination-list-tab lefttab" />
            </div>
            {renderListItems()}
            <div onClick={() => onPageChange(pagesCount)}>
              <KeyboardTabIcon className="pagination-list-tab"/>
            </div>
          </>
        ) : (
          <>{renderListItems()}</>
        )
      ) : null}
    </div>
  );
}

export default PaginationList;
