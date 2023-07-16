import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? "#b7c7d9" : "#f2f2f2")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#666")};
  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#b7c7d9" : "#ddd")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationSelect = styled.select`
  margin-left: 10px;
  padding: 5px;
  border: none;
  background-color: #b7c7d9;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

interface Props {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const Pagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <PaginationButton
          data-testid={`paginationPage${page}Button`}
          key={page}
          isActive={currentPage === page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PaginationButton>
      );
    }

    return buttons;
  };

  return (
    <PaginationContainer data-testid="paginationContainer">
      <PaginationButton
        data-testid="paginationPrevButton"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </PaginationButton>
      {renderPageButtons()}
      <PaginationButton
        data-testid="paginationNextButton"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
      <span>Items per page:</span>
      <PaginationSelect
        value={pageSize}
        onChange={handlePageSizeChange}
        data-testid="paginationSelect"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </PaginationSelect>
    </PaginationContainer>
  );
};

export default Pagination;
