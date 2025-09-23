import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 1.5rem 0;
`;

const PageButton = styled.button`
  padding: 0.6rem 1rem;
  background: ${({ active }) =>
        active ? "linear-gradient(135deg, #4caf50, #66bb6a)" : "var(--background-color)"};
  color: ${({ active }) => (active ? "#fff" : "var(--primary-text-color)")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  min-width: 40px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) =>
        active ? "linear-gradient(135deg, #43a047, #66bb6a)" : "#3d4552"};
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PaginationLink = ({ totalPages, onPageChange, currentPage, isDarkMode, setIsDarkMode }) => {
    return (
        <PaginationWrapper
        >
            <PageButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
                    color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                }}
            >
                ‹
            </PageButton>

            {[...Array(totalPages)].map((_, index) => (
                <PageButton
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </PageButton>
            ))}

            <PageButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
                    color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                }}
            >
                ›
            </PageButton>
        </PaginationWrapper>
    );
};

export default PaginationLink;
